/**
 * 登录表单组件
 * 提供用户登录功能
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/user";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStroe";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

/**
 * 登录表单组件
 */
export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  // 表单状态
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  /**
   * 处理登录提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: 在这里调用登录API
    try {
      const response: any = await login({ email, password });
      if (response.code === 200) {
        // 保存token，跳转到主页
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        navigate('/projects');
        messageApi.success(response.message);
      } else {
        messageApi.error(response.message);
      }
    } catch (err) {
      messageApi.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-nebula-text-primary mb-2 tracking-nebula-normal">
            欢迎回来
          </h2>
          <p className="text-sm text-nebula-text-muted tracking-nebula-tight">
            登录您的 NebulaScreen 账户
          </p>
        </div>

        {/* 邮箱输入 */}
        <div className="space-y-2">
          <label className="text-sm text-nebula-text-secondary tracking-nebula-tight">
            邮箱地址
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="请输入邮箱地址"
            required
            className="h-11 bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
          />
        </div>

        {/* 密码输入 */}
        <div className="space-y-2">
          <label className="text-sm text-nebula-text-secondary tracking-nebula-tight">
            密码
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            required
            className="h-11 bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
          />
        </div>

        {/* 忘记密码链接 */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-nebula-text-accent hover:underline tracking-nebula-tight"
          >
            忘记密码？
          </button>
        </div>

        {/* 登录按钮 */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium text-base"
        >
          {loading ? "登录中..." : "登录"}
        </Button>

        {/* 切换到注册 */}
        <div className="text-center">
          <span className="text-sm text-nebula-text-muted tracking-nebula-tight">
            还没有账户？
          </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="ml-2 text-sm text-nebula-text-accent hover:underline font-medium tracking-nebula-tight"
          >
            立即注册
          </button>
        </div>
      </form>
    </>
  );
}

