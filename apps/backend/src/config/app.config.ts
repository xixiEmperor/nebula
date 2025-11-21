import { registerAs } from '@nestjs/config';

/**
 * 应用配置
 * 管理应用级别的配置项
 * 
 * 配置项说明:
 * - port: 应用监听的端口号
 * - bcryptSaltRounds: bcrypt加密轮次，影响加密强度和速度
 */
export default registerAs('app', () => ({
  // 应用端口 - 从环境变量读取，默认3000
  port: parseInt(process.env.PORT, 10) || 3000,
  
  // bcrypt加密轮次 - 数值越大越安全但越慢
  // 范围: 4-31，推荐: 10-12
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
}));

