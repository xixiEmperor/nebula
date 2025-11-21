import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JWT Payload接口
 * 定义存储在token中的数据结构
 */
export interface JwtPayload {
  sub: string;      // subject - JWT标准字段，通常存用户ID
  email: string;    // 用户邮箱
  username: string; // 用户名
}

/**
 * JWT认证策略
 * PassportStrategy是Passport.js的策略基类
 * 这个类定义了如何验证JWT token
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * 构造函数配置JWT策略
   * @param configService - 配置服务，用于读取JWT密钥
   */
  constructor(private configService: ConfigService) {
    super({
      // 从请求头的 Authorization: Bearer <token> 中提取token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // ignoreExpiration: false 表示拒绝过期的token
      ignoreExpiration: false,
      
      // 使用配置文件中的密钥来验证token签名
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  /**
   * 验证JWT payload
   * 这个方法在token验证成功后自动调用
   * 返回值会被添加到 request.user 中，供后续使用
   * 
   * @param payload - 从token中解析出的payload数据
   * @returns 用户信息对象，会被放入request.user
   */
  async validate(payload: JwtPayload) {
    // 如果payload不存在，抛出401未授权异常
    if (!payload) {
      throw new UnauthorizedException('无效的token');
    }
    
    // 返回用户信息，这些信息会被放入request对象中
    // 可以在Controller中通过 @CurrentUser() 装饰器获取
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}

