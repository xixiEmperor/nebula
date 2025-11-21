import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './modules/Users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';

/**
 * 应用根模块
 * 这是整个应用的入口模块，负责:
 * 1. 导入所有功能模块
 * 2. 配置全局模块（如ConfigModule）
 * 3. 注册全局过滤器和拦截器
 */
@Module({
  imports: [
    // 配置模块 - 管理环境变量和配置
    ConfigModule.forRoot({
      isGlobal: true,  // 设为全局模块，所有模块都可以使用ConfigService
      load: [jwtConfig, appConfig], // 加载配置文件
      envFilePath: ['.env.local', '.env'], // 环境变量文件路径，优先级从左到右
    }),
    
    // 认证模块 - 提供JWT认证功能
    AuthModule,
    
    // 用户模块 - 用户相关的业务功能
    UserModule,
  ],
  
  controllers: [], // 根模块通常不直接定义controller
  
  providers: [
    // 注册全局异常过滤器
    // APP_FILTER是NestJS的特殊token，用于注册全局过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // 捕获所有异常并格式化响应
    },
    
    // 注册全局响应拦截器
    // APP_INTERCEPTOR是NestJS的特殊token，用于注册全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 统一包装所有成功响应
    },
  ],
})
export class AppModule {}
