/**
 * 注册表单组件
 * 提供用户注册功能
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/api/user";
import { message } from "antd";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

/**
 * 注册表单组件
 */
export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  // 表单状态
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 处理注册提交
   */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 验证密码是否一致
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    // 验证密码强度
    if (password.length < 6) {
      setError("密码长度至少为6位");
      return;
    }

    setLoading(true);

    // TODO: 在这里调用注册API
    try {
      const response: any = await register({ username, email, password });
      if (response.code === 200) {
        // 注册成功，跳转到登录或直接登录
        messageApi.success('注册成功！');
        onSwitchToLogin();
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
      <form className="space-y-5">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-nebula-text-primary mb-2 tracking-nebula-normal">
            创建账户
          </h2>
          <p className="text-sm text-nebula-text-muted tracking-nebula-tight">
            加入 NebulaScreen，开启数据可视化之旅
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="p-3 rounded-nebula-md bg-nebula-error/10 border border-nebula-error/30">
            <p className="text-sm text-nebula-error text-center">{error}</p>
          </div>
        )}

        {/* 用户名输入 */}
        <div className="space-y-2">
          <label className="text-sm text-nebula-text-secondary tracking-nebula-tight">
            用户名
          </label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
            required
            className="h-11 bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
          />
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
            placeholder="请输入密码（至少6位）"
            required
            minLength={6}
            className="h-11 bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
          />
        </div>

        {/* 确认密码输入 */}
        <div className="space-y-2">
          <label className="text-sm text-nebula-text-secondary tracking-nebula-tight">
            确认密码
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="请再次输入密码"
            required
            className="h-11 bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
          />
        </div>

        {/* 注册按钮 */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium text-base"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? "注册中..." : "注册"}
        </Button>

        {/* 切换到登录 */}
        <div className="text-center">
          <span className="text-sm text-nebula-text-muted tracking-nebula-tight">
            已有账户？
          </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="ml-2 text-sm text-nebula-text-accent hover:underline font-medium tracking-nebula-tight"
          >
            立即登录
          </button>
        </div>
      </form>
    </>
  );
}

