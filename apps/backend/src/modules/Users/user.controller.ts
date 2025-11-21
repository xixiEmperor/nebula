import { 
  Controller,  // 标记类为控制器
  Get,         // HTTP GET请求装饰器
  Post,        // HTTP POST请求装饰器
  Body,        // 获取请求体参数
  UseGuards,   // 使用守卫（用于认证/授权）
  Param,       // 获取路由参数
  ValidationPipe, // 参数验证管道
  HttpCode,    // 设置HTTP状态码
  HttpStatus,  // HTTP状态码常量
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from '../../DTO/userDto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser, CurrentUserType } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * 用户控制器
 * @Controller 装饰器定义路由前缀，所有路由都会以 'api/users' 开头
 * @UseGuards 在类级别应用JWT守卫，所有方法默认需要认证
 */
@Controller('api/users')
@UseGuards(JwtAuthGuard) // 全局守卫：所有接口默认需要JWT认证
export class UserController {
  /**
   * 构造函数注入UserService
   * NestJS会自动创建UserService实例并注入
   */
  constructor(private readonly userService: UserService) {}

  /**
   * 用户注册接口（公开接口，无需登录）
   * 路由: POST /api/users/register
   * @Public 装饰器标记为公开接口，跳过JWT认证
   * @HttpCode 设置成功时返回201状态码（资源创建成功）
   */
  @Public() // 标记为公开接口，不需要JWT认证
  @Post('/register')
  @HttpCode(HttpStatus.CREATED) // 201状态码表示资源创建成功
  async register(
    // @Body 获取请求体，ValidationPipe 自动验证参数
    // transform: true 自动类型转换
    // whitelist: true 自动过滤掉DTO中未定义的字段
    @Body(new ValidationPipe({ transform: true, whitelist: true })) 
    createUserDto: CreateUserDto,
  ) {
    return await this.userService.createUser(createUserDto);
  }

  /**
   * 用户登录接口（公开接口，无需登录）
   * 路由: POST /api/users/login
   * 返回JWT token供后续请求使用
   */
  @Public() // 标记为公开接口
  @Post('/login')
  @HttpCode(HttpStatus.OK) // 200状态码表示成功
  async login(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) 
    loginDto: LoginDto,
  ) {
    return await this.userService.userLogin(loginDto);
  }

  /**
   * 获取当前登录用户信息（需要JWT认证）
   * 路由: GET /api/users/profile
   * @CurrentUser 装饰器从JWT token中提取当前用户信息
   */
  @Get('/profile')
  async getProfile(@CurrentUser() user: CurrentUserType) {
    // user对象包含从JWT payload中解析出的用户信息
    // 包括: userId, email, username
    return await this.userService.findById(user.userId);
  }

  /**
   * 获取所有用户列表（需要JWT认证）
   * 路由: GET /api/users
   */
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * 根据用户ID获取用户信息（需要JWT认证）
   * 路由: GET /api/users/:id
   * @Param 装饰器从URL路径中提取参数
   * 例如: GET /api/users/507f1f77bcf86cd799439011
   */
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
}