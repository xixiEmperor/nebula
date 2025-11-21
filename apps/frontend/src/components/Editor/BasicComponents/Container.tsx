import type { ContainerComponentProps } from "@/types/components";

/**
 * 容器组件 - 可放置子组件的容器
 */
export default function Container({
  id,
  backgroundColor = "rgba(8, 19, 36, 0.6)",
  borderColor = "#3BE4FE",
  borderWidth = 1,
  borderRadius = 8,
  padding = 16,
  style,
  className = "",
  children,
}: ContainerComponentProps) {
  return (
    <div
      id={id}
      className={`w-full h-full ${className}`}
      style={{
        backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
        padding: `${padding}px`,
        ...style,
      }}
    >
      {children && children.length > 0 ? (
        <div className="w-full h-full flex flex-col gap-4">
          {/* 这里可以渲染子组件 */}
          {children.map((child) => (
            <div key={child.id} className="flex-1">
              {/* 子组件渲染逻辑 */}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center">
          <div className="text-nebula-text-muted">
            容器组件
            <br />
            <span className="text-sm opacity-70">可放置其他组件</span>
          </div>
        </div>
      )}
    </div>
  );
}

