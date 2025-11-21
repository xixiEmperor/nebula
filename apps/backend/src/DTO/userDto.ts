/**
 * class-validator 验证装饰器
 * 这些装饰器会自动验证传入的数据，确保数据符合要求
 */
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

/**
 * 用户注册DTO（Data Transfer Object - 数据传输对象）
 * DTO用于定义客户端和服务器之间传输的数据结构
 * 
 * 验证装饰器说明:
 * - @IsNotEmpty() - 不能为空
 * - @IsString() - 必须是字符串
 * - @MinLength(n) - 最小长度
 * - @MaxLength(n) - 最大长度
 * - @IsEmail() - 必须是邮箱格式
 * - @Matches() - 必须匹配正则表达式
 */
export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(2, { message: '用户名至少2个字符' })
  @MaxLength(20, { message: '用户名最多20个字符' })
  username: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码至少6个字符' })
  @MaxLength(50, { message: '密码最多50个字符' })
  // 正则表达式: 必须包含至少一个字母和一个数字
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, {
    message: '密码必须包含字母和数字',
  })
  password: string;
}

/**
 * 用户登录DTO
 * 登录时只需要邮箱和密码
 */
export class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;
}

/**
 * 登录响应数据
 */
export class LoginResponseDto {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

/**
 * 用户响应数据（不包含密码）
 */
export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}