import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchemaProvide } from './user.provider';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../auth/auth.module';

/**
 * 用户模块
 * Module是NestJS中组织代码的基本单元
 * 
 * @Module装饰器参数说明:
 * - imports: 导入其他模块，使用其导出的providers
 * - providers: 本模块的服务提供者，可以被注入到本模块的其他类中
 * - controllers: 本模块的控制器，处理HTTP请求
 * - exports: 导出的providers，供其他模块使用
 */
@Module({
  imports: [
    DatabaseModule, // 导入数据库模块，获取MongoDB连接
    AuthModule,     // 导入认证模块，获取JwtModule和PassportModule
  ],
  providers: [
    UserSchemaProvide, // User模型的provider，提供MongoDB的User模型
    UserService,       // 用户服务，处理业务逻辑
  ],
  controllers: [
    UserController,    // 用户控制器，处理HTTP请求
  ],
  exports: [
    UserService,       // 导出UserService，供其他模块使用
  ],
})
export class UserModule {}