import {
  ExceptionFilter,  // 异常过滤器接口
  Catch,            // 装饰器，用于指定要捕获的异常类型
  ArgumentsHost,    // 提供访问底层平台的方法（HTTP、WebSocket等）
  HttpException,    // NestJS的HTTP异常基类
  HttpStatus,       // HTTP状态码常量
} from '@nestjs/common';
import { Response } from 'express';

/**
 * 全局HTTP异常过滤器
 * @Catch() 不传参数表示捕获所有类型的异常
 * 
 * 作用:
 * 1. 捕获应用中的所有异常
 * 2. 统一格式化错误响应
 * 3. 隐藏敏感的错误信息（如数据库错误）
 * 
 * 在 app.module.ts 中注册为全局过滤器
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 异常处理方法
   * @param exception - 捕获到的异常
   * @param host - 参数宿主，提供访问请求和响应对象的方法
   */
  catch(exception: unknown, host: ArgumentsHost) {
    // 切换到HTTP上下文
    const ctx = host.switchToHttp();
    // 获取响应对象
    const response = ctx.getResponse<Response>();
    
    // 默认值：500服务器内部错误
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';

    // 判断异常类型并提取信息
    if (exception instanceof HttpException) {
      // 如果是HttpException（包括BusinessException）
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        // 简单字符串形式的错误信息
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        // 对象形式的错误响应，提取message字段
        message = (exceptionResponse as any).message || message;
      }
    } else if (exception instanceof Error) {
      // 如果是普通Error对象
      message = exception.message;
    }

    // 统一的错误响应格式
    response.status(status).json({
      code: status,                      // HTTP状态码
      message,                           // 错误信息
      success: false,                    // 标记为失败
      timestamp: new Date().toISOString(), // 错误发生时间
    });
  }
}

