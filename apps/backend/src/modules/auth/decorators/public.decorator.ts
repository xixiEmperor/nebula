import { SetMetadata } from '@nestjs/common';

// 定义元数据的key
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * @Public 装饰器
 * 用于标记路由为公开接口，跳过JWT认证
 * 
 * 使用方式:
 * @Public()
 * @Get('/public-route')
 * publicMethod() { ... }
 * 
 * 原理: SetMetadata会在路由方法上设置元数据
 * JwtAuthGuard会通过Reflector读取这个元数据
 * 如果isPublic为true，则跳过认证
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

