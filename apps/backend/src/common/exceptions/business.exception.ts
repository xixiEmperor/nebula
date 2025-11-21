import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 业务异常类
 * 继承自HttpException，用于抛出业务逻辑错误
 * 
 * 使用场景:
 * - 用户不存在
 * - 邮箱已被注册
 * - 密码错误
 * - 权限不足
 * 
 * 使用方式:
 * throw new BusinessException('用户不存在', HttpStatus.NOT_FOUND);
 * 
 * 这个异常会被全局异常过滤器捕获并格式化返回给前端
 */
export class BusinessException extends HttpException {
  /**
   * 构造函数
   * @param message - 错误信息，会返回给前端
   * @param statusCode - HTTP状态码，默认400（请求错误）
   */
  constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(
      {
        code: statusCode,      // HTTP状态码
        message,               // 错误信息
        success: false,        // 标记为失败
      },
      statusCode,
    );
  }
}

