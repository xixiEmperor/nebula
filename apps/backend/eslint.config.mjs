// @ts-check - 启用 TypeScript 检查这个 JavaScript 文件
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ===== ESLint 基础配置 ===== */
export default tseslint.config(
  /* ----- 忽略文件配置 ----- */
  {
    // 忽略不需要检查的文件
    // 配置文件本身通常不需要严格的代码规范检查
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },

  /* ----- 基础规则集 ----- */
  // JavaScript 基础推荐规则：语法错误、潜在问题等
  eslint.configs.recommended,
  
  // TypeScript 基础推荐规则：类型相关的基础检查
  // 注释掉严格的类型检查，使用更宽松的规则
  ...tseslint.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked, // 严格类型检查（已注释）

  /* ----- 语言环境配置 ----- */
  {
    languageOptions: {
      // 全局变量定义：告诉 ESLint 哪些全局变量是可用的
      globals: {
        ...globals.node,  // Node.js 环境变量：process, __dirname, require 等
        ...globals.jest,  // Jest 测试环境变量：describe, it, expect 等
      },
      
      // 源码类型：指定模块系统
      // 'module': ES 模块 (import/export)
      // 'script': 传统脚本
      // 'commonjs': CommonJS 模块 (require/module.exports)
      sourceType: 'module',
      
      // 解析器选项：TypeScript 相关配置
      parserOptions: {
        // 项目服务：自动查找 tsconfig.json
        // projectService: true,  // 严格类型检查需要（已注释）
        tsconfigRootDir: __dirname,
      },
    },
  },

  /* ----- 自定义规则配置 ----- */
  {
    rules: {
      /* === JavaScript 基础规则 === */
      
      // 允许使用 console.log：开发阶段很有用
      'no-console': 'off',
      
      // 允许未使用的变量：有时需要占位变量
      'no-unused-vars': 'warn',  // 警告而不是错误
      
      /* === TypeScript 规则 === */
      
      // 允许使用 any 类型：初学者友好
      '@typescript-eslint/no-explicit-any': 'off',
      
      // 允许空函数：有时需要占位函数
      '@typescript-eslint/no-empty-function': 'off',
      
      // 允许 require 语句：兼容 CommonJS
      '@typescript-eslint/no-var-requires': 'off',
      
      /* === 进阶规则（已注释，需要时可启用） === */
      
      // 浮动 Promise 警告：异步操作应该被处理
      // '@typescript-eslint/no-floating-promises': 'warn',
      
      // 不安全参数警告：类型不匹配的参数
      // '@typescript-eslint/no-unsafe-argument': 'warn',
      
      // 不安全赋值警告：类型不匹配的赋值
      // '@typescript-eslint/no-unsafe-assignment': 'warn',
      
      // 不安全调用警告：调用可能不存在的方法
      // '@typescript-eslint/no-unsafe-call': 'warn',
      
      // 不安全成员访问警告：访问可能不存在的属性
      // '@typescript-eslint/no-unsafe-member-access': 'warn',
      
      // 不安全返回警告：返回类型不匹配
      // '@typescript-eslint/no-unsafe-return': 'warn',
    },
  },
);