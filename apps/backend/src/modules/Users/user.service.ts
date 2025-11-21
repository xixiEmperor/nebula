import { Injectable, Inject, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto, LoginResponseDto, UserResponseDto } from '../../DTO/userDto';
import { BusinessException } from '../../common/exceptions/business.exception';

/**
 * 用户服务类
 * @Injectable() 装饰器标记这是一个可注入的服务类，可以在其他地方通过依赖注入使用
 */
@Injectable()
export class UserService {
  // 创建日志记录器实例，用于记录服务中的操作日志
  private readonly logger = new Logger(UserService.name);

  /**
   * 构造函数 - NestJS会自动注入所需的依赖
   * @param userModel - MongoDB的User模型，通过@Inject注入自定义的provider
   * @param jwtService - JWT服务，用于生成和验证token
   * @param configService - 配置服务，用于读取环境变量配置
   */
  constructor(
    @Inject('User_Model') private readonly userModel: Model<any>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 查找所有用户（不返回密码字段）
   * @returns Promise<UserResponseDto[]> 用户列表
   */
  async findAll(): Promise<UserResponseDto[]> {
    try {
      // 查询所有用户
      // .select('-password') 表示排除password字段，保护用户隐私
      // .lean() 返回纯JavaScript对象而不是Mongoose文档，提高性能
      const users = await this.userModel.find().select('-password').lean();
      
      // 将MongoDB文档转换为符合前端需要的格式
      return users.map((user: any) => ({
        id: user._id.toString(), // MongoDB的_id转为字符串
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
    } catch (error: any) {
      // 记录错误日志，方便排查问题
      this.logger.error(`查询用户列表失败: ${error.message}`);
      // 抛出业务异常，会被全局异常过滤器捕获并处理
      throw new BusinessException('查询用户列表失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 根据用户ID查找用户（不返回密码字段）
   * @param userId - 用户ID
   * @returns Promise<UserResponseDto> 用户信息
   * @throws BusinessException 用户不存在时抛出404错误
   */
  async findById(userId: string): Promise<UserResponseDto> {
    try {
      // 根据MongoDB的_id查找用户
      const user: any = await this.userModel.findById(userId).select('-password').lean();
      
      // 如果用户不存在，抛出404异常
      if (!user) {
        throw new BusinessException('用户不存在', HttpStatus.NOT_FOUND);
      }
      
      // 返回格式化的用户信息
      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error: any) {
      // 如果是业务异常，直接抛出（不需要再次包装）
      if (error instanceof BusinessException) {
        throw error;
      }
      // 其他错误记录日志并抛出通用异常
      this.logger.error(`查询用户失败: ${error.message}`);
      throw new BusinessException('查询用户失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 创建用户（用户注册功能）
   * @param createUserDto - 包含用户名、邮箱、密码的注册数据
   * @returns Promise<UserResponseDto> 创建成功的用户信息（不含密码）
   * @throws BusinessException 邮箱或用户名已存在时抛出409冲突错误
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      // 步骤1: 检查邮箱是否已被注册（保证邮箱唯一性）
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        throw new BusinessException('该邮箱已被注册', HttpStatus.CONFLICT);
      }

      // 步骤2: 检查用户名是否已被使用（保证用户名唯一性）
      const existingUsername = await this.userModel.findOne({ username: createUserDto.username });
      if (existingUsername) {
        throw new BusinessException('该用户名已被使用', HttpStatus.CONFLICT);
      }

      // 步骤3: 使用bcrypt加密密码
      // saltRounds决定加密强度，数值越大越安全但越慢，从配置文件读取
      const saltRounds = this.configService.get<number>('app.bcryptSaltRounds');
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

      // 步骤4: 在数据库中创建新用户
      // 注意：保存的是加密后的密码，不是明文密码
      const newUser = await this.userModel.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword, // 存储加密后的密码
      });

      // 步骤5: 记录成功日志
      this.logger.log(`用户注册成功: ${newUser.email}`);

      // 步骤6: 返回用户信息（重要：不返回密码字段）
      return {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };
    } catch (error: any) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error(`用户注册失败: ${error.message}`);
      throw new BusinessException('用户注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 用户登录功能
   * @param loginDto - 包含邮箱和密码的登录数据
   * @returns Promise<LoginResponseDto> 包含JWT token和用户信息
   * @throws BusinessException 邮箱或密码错误时抛出401未授权错误
   */
  async userLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      // 步骤1: 根据邮箱查找用户
      const user: any = await this.userModel.findOne({ email: loginDto.email }).lean();
      if (!user) {
        // 注意：为了安全，不明确告诉用户是邮箱不存在还是密码错误
        throw new BusinessException('邮箱或密码错误', HttpStatus.UNAUTHORIZED);
      }

      // 步骤2: 使用bcrypt验证密码
      // bcrypt.compare会自动处理加密比对，返回true或false
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new BusinessException('邮箱或密码错误', HttpStatus.UNAUTHORIZED);
      }

      // 步骤3: 生成JWT token
      // payload是存储在token中的数据（不要放敏感信息如密码）
      const payload = {
        sub: user._id.toString(), // sub是JWT标准字段，通常存用户ID
        email: user.email,
        username: user.username,
      };

      // signAsync会使用配置的密钥对payload进行签名，生成token
      const token = await this.jwtService.signAsync(payload);

      // 步骤4: 记录登录成功日志
      this.logger.log(`用户登录成功: ${user.email}`);

      // 步骤5: 返回token和用户基本信息
      // 前端收到后应该保存token，在后续请求中携带它
      return {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      };
    } catch (error: any) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error(`用户登录失败: ${error.message}`);
      throw new BusinessException('登录失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 验证用户是否存在（内部方法）
   * @param userId - 用户ID
   * @returns Promise<boolean> 存在返回true，否则返回false
   */
  async validateUser(userId: string): Promise<boolean> {
    try {
      const user = await this.userModel.findById(userId);
      // !! 将对象转为boolean，有值为true，null为false
      return !!user;
    } catch {
      return false;
    }
  }
}