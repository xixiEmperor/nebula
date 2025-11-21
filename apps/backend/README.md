<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Nebula Nest - 基于 [NestJS](https://github.com/nestjs/nest) 框架构建的企业级用户认证系统。

### ✨ 特性

- 🔐 **JWT认证**: 完整的JWT身份验证机制
- 🛡️ **密码加密**: 使用bcrypt进行密码安全加密
- ✅ **参数验证**: 基于class-validator的请求验证
- 🎯 **统一响应**: 标准化的API响应格式
- 🚨 **异常处理**: 全局异常过滤和友好的错误提示
- 📝 **TypeScript**: 完整的类型安全支持
- 🗄️ **MongoDB**: 使用Mongoose进行数据持久化
- 📚 **完整文档**: 详细的API文档和使用指南

## 快速开始

### 1. 安装依赖

```bash
$ pnpm install
```

### 2. 配置环境变量

创建 `.env` 文件:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nebula-nest
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

### 3. 启动MongoDB

确保MongoDB服务正在运行。

### 4. 运行应用

```bash
# 开发模式(热重载)
$ pnpm run dev

# 生产模式
$ pnpm run build
$ pnpm run start:prod
```

应用将运行在 `http://localhost:3000`

## 📚 文档

- [快速开始](./docs/快速开始.md) - 详细的安装和配置指南
- [API使用指南](./docs/API使用指南.md) - 完整的API接口文档
- [环境配置说明](./docs/环境配置说明.md) - 环境变量配置详解
- [认证系统改进说明](./docs/认证系统改进说明.md) - 系统架构和改进说明
- [Postman集合](./docs/postman_collection.json) - API测试集合

## 🔌 API接口

| 方法 | 路径 | 说明 | 需要认证 |
|------|------|------|----------|
| POST | `/api/users/register` | 用户注册 | ❌ |
| POST | `/api/users/login` | 用户登录 | ❌ |
| GET | `/api/users/profile` | 获取当前用户 | ✅ |
| GET | `/api/users` | 获取所有用户 | ✅ |
| GET | `/api/users/:id` | 获取指定用户 | ✅ |

## 🧪 测试

```bash
# 单元测试
$ pnpm run test

# e2e测试
$ pnpm run test:e2e

# 测试覆盖率
$ pnpm run test:cov
```

## 🛠️ 技术栈

- **框架**: NestJS 11.x
- **语言**: TypeScript 5.x
- **数据库**: MongoDB + Mongoose
- **认证**: JWT + Passport
- **加密**: bcrypt
- **验证**: class-validator + class-transformer
- **配置**: @nestjs/config

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
