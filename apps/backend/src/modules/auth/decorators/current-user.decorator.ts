import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 当前用户类型定义
 * JWT验证成功后，这些信息会被放入request.user
 */
export interface CurrentUserType {
  userId: string;   // 用户ID
  email: string;    // 用户邮箱
  username: string; // 用户名
}

/**
 * @CurrentUser 参数装饰器
 * 用于在Controller方法中获取当前登录用户信息
 * 
 * 使用方式:
 * 1. 获取整个用户对象:
 *    getProfile(@CurrentUser() user: CurrentUserType) { ... }
 * 
 * 2. 只获取特定字段:
 *    getProfile(@CurrentUser('userId') userId: string) { ... }
 * 
 * 原理: 
 * - JWT守卫验证成功后会把用户信息放入request.user
 * - 这个装饰器从request.user中提取用户信息
 */
export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserType | undefined, ctx: ExecutionContext) => {
    // 获取HTTP请求对象
    const request = ctx.switchToHttp().getRequest();
    // 从request中取出user（由JWT策略放入的）
    const user = request.user;

    // 如果指定了字段名(data)，返回该字段；否则返回整个user对象
    return data ? user?.[data] : user;
  },
);

