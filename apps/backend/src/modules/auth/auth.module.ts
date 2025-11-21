import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * 认证模块
 * 集中管理JWT认证相关的配置和服务
 * 
 * 职责:
 * 1. 配置PassportModule，指定默认使用JWT策略
 * 2. 配置JwtModule，设置密钥和过期时间
 * 3. 注册JwtStrategy，定义如何验证token
 * 4. 导出JwtModule和PassportModule，供其他模块使用
 */
@Module({
  imports: [
    // 注册Passport模块，指定默认策略为jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // 异步注册JwtModule，从配置服务读取配置
    JwtModule.registerAsync({
      imports: [ConfigModule], // 导入ConfigModule以使用ConfigService
      
      // useFactory: 工厂函数，返回JWT配置
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        // 从配置文件读取token过期时间，默认7天
        const expiresIn = configService.get<string>('jwt.expiresIn') || '7d';
        return {
          // JWT签名密钥，用于生成和验证token
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            // token过期时间
            expiresIn: expiresIn as any,
          },
        };
      },
      
      // inject: 声明工厂函数需要注入的依赖
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy, // JWT验证策略
  ],
  exports: [
    JwtModule,      // 导出JwtModule，其他模块可以使用JwtService生成token
    PassportModule, // 导出PassportModule，其他模块可以使用认证守卫
  ],
})
export class AuthModule {}

