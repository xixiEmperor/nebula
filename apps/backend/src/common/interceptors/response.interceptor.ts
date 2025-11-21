import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { ApiSuccess } from '@nebula/shared';


/**
 * 响应拦截器
 * 拦截器在NestJS中用于在请求处理前后添加额外的逻辑
 * 
 * 作用:
 * 自动将Controller返回的数据包装成统一的响应格式
 * 
 * 例如:
 * Controller返回: { id: 1, name: 'test' }
 * 拦截器处理后: {
 *   code: 200,
 *   message: '操作成功',
 *   data: { id: 1, name: 'test' },
 *   success: true
 * }
 * 
 * 在 app.module.ts 中注册为全局拦截器
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiSuccess<T>> {
  /**
   * 拦截方法
   * @param context - 执行上下文
   * @param next - 调用处理器，用于继续处理请求
   * @returns Observable<Response<T>> 包装后的响应
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiSuccess<T>> {
    // next.handle() 返回一个RxJS Observable
    // 使用 pipe 和 map 操作符对响应数据进行转换
    return next.handle().pipe(
      map((data) => ({
        code: 200,             // 成功状态码
        message: '操作成功',   // 成功信息
        data,                  // Controller返回的原始数据
        success: true,         // 标记为成功
      })),
    );
  }
}

