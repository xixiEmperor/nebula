import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

/**
 * JWT认证守卫
 * 守卫(Guard)在NestJS中用于控制请求是否可以访问路由
 * 继承自AuthGuard('jwt')，使用JWT策略进行认证
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * @param reflector - 反射器，用于读取装饰器元数据
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 判断请求是否可以继续执行
   * @param context - 执行上下文，包含请求的详细信息
   * @returns boolean 或 Promise<boolean> - true表示允许访问，false表示拒绝
   */
  canActivate(context: ExecutionContext) {
    // 使用Reflector检查当前路由是否有 @Public() 装饰器
    // getAllAndOverride 会同时检查方法和类级别的装饰器
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(), // 检查方法级别
      context.getClass(),   // 检查类级别
    ]);

    // 如果是公开路由（有@Public()装饰器），直接允许访问
    if (isPublic) {
      return true;
    }

    // 否则调用父类的canActivate，执行JWT验证
    return super.canActivate(context);
  }

  /**
   * 处理认证结果
   * @param err - 认证过程中的错误
   * @param user - 认证成功后的用户信息
   * @param info - 额外信息
   * @returns 用户信息对象
   */
  handleRequest(err: any, user: any) {
    // 如果有错误或用户不存在，抛出401未授权异常
    if (err || !user) {
      throw err || new UnauthorizedException('身份验证失败，请重新登录');
    }
    // 返回用户信息，会被放入request.user
    return user;
  }
}

