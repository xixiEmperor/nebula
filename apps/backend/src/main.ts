import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

/**
 * 应用启动函数
 * 这是应用的入口点，负责创建NestJS应用实例并启动服务器
 */
async function bootstrap() {
  // 创建NestJS应用实例
  // NestFactory.create()会创建应用并初始化所有模块
  const app = await NestFactory.create(AppModule);
  
  // 获取配置服务实例，用于读取环境变量
  const configService = app.get(ConfigService);
  
  /**
   * 启用全局验证管道
   * ValidationPipe会自动验证所有进入Controller的DTO
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true - 自动将请求数据转换为DTO实例
      transform: true,
      
      // whitelist: true - 自动过滤掉DTO中未定义的属性
      whitelist: true,
      
      // forbidNonWhitelisted: true - 如果有额外属性，抛出错误
      forbidNonWhitelisted: true,
      
      // transformOptions - 转换选项
      transformOptions: {
        // enableImplicitConversion: true - 启用隐式类型转换
        // 例如: 字符串 "123" 自动转为数字 123
        enableImplicitConversion: true,
      },
    }),
  );
  
  /**
   * 启用CORS（跨域资源共享）
   * 允许前端从不同域名访问API
   */
  app.enableCors({
    origin: '*',        // 允许所有来源（生产环境应该限制具体域名）
    credentials: true,  // 允许携带cookie
  });
  
  // 从配置中读取端口号，默认3000
  const port = configService.get<number>('app.port') || 3000;
  
  // 启动HTTP服务器，监听指定端口
  await app.listen(port);
  
  // 打印启动信息
  console.log(`🚀 应用程序运行在: http://localhost:${port}`);
  console.log(`📝 API 基础路径: http://localhost:${port}/api`);
}

// 启动应用
bootstrap();
