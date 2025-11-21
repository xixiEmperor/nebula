/**
 * 认证容器组件
 * 管理登录和注册表单的切换
 */

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

/**
 * 认证类型
 */
type AuthType = "login" | "register";

/**
 * 认证容器组件
 */
export default function Auth() {
  // 当前显示的表单类型
  const [authType, setAuthType] = useState<AuthType>("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-nebula-bg-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 渐变圆形装饰 */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-nebula-text-accent/10 rounded-full blur-3xl animate-nebula-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-nebula-gradient-start/10 rounded-full blur-3xl animate-nebula-pulse" style={{ animationDelay: "1s" }} />
        
        {/* 网格线装饰 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#3be4fe 1px, transparent 1px), linear-gradient(90deg, #3be4fe 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Logo和标题 */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-nebula-lg bg-nebula-glow-gradient flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-nebula-text-primary tracking-nebula-normal">
          NebulaScreen
        </h1>
      </div>

      {/* 表单容器 */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* 表单卡片 */}
        <div className="bg-nebula-bg-glass backdrop-blur-nebula rounded-nebula-2xl border border-nebula-border-primary p-8 shadow-2xl">
          {/* 切换动画容器 */}
          <div className="relative">
            {authType === "login" ? (
              <LoginForm onSwitchToRegister={() => setAuthType("register")} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setAuthType("login")} />
            )}
          </div>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-xs text-nebula-text-muted mt-8 tracking-nebula-tight">
          登录即表示您同意我们的服务条款和隐私政策
        </p>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-nebula-border-accent rounded-nebula-2xl opacity-20 animate-nebula-pulse" />
      <div className="absolute bottom-10 left-10 w-48 h-48 border border-nebula-text-accent rounded-full opacity-10" />
    </div>
  );
}

