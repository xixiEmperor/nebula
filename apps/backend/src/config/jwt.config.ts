import { registerAs } from '@nestjs/config';

/**
 * JWT配置
 * registerAs创建一个命名空间配置
 * 可以通过 configService.get('jwt.secret') 访问
 * 
 * 配置项说明:
 * - secret: JWT签名密钥，用于生成和验证token
 * - expiresIn: token过期时间
 */
export default registerAs('jwt', () => ({
  // JWT密钥 - 从环境变量读取，如果没有则使用默认值
  // ⚠️ 生产环境必须设置强密钥！
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  
  // Token过期时间 - 支持的格式: 7d(7天), 24h(24小时), 30m(30分钟)等
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
}));

