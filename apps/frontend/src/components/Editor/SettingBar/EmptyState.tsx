/**
 * 空状态组件
 */
export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
      <div className="text-center relative z-10">
        {/* 配置图标 */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-nebula-xl bg-nebula-bg-card border border-nebula-border-primary flex items-center justify-center">
          <svg
            className="w-10 h-10 text-nebula-text-accent"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        
        {/* 标题 */}
        <h3 className="text-lg font-medium text-nebula-text-primary mb-2 tracking-nebula-normal">
          配置面板
        </h3>
        
        {/* 描述 */}
        <p className="text-sm text-nebula-text-muted mb-4 tracking-nebula-tight leading-relaxed">
          点击画布中的图表组件
          <br />
          即可在此进行配置
        </p>
        
        {/* 提示标签 */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-nebula-md bg-nebula-bg-card border border-nebula-border-primary">
          <div className="w-2 h-2 rounded-full bg-nebula-text-accent animate-pulse" />
          <span className="text-xs text-nebula-text-secondary">等待选择组件</span>
        </div>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute inset-x-4 inset-y-4 border border-nebula-divider-subtle rounded-nebula-lg pointer-events-none opacity-30" />
    </div>
  );
}