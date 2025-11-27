import type { TextComponentProps } from "@/types/charts-components";

/**
 * 文本组件 - 用于显示静态或动态文本
 */
export default function Text({
  id,
  content = "文本内容",
  fontSize = 16,
  color = "#FFFFFF",
  fontWeight = 400,
  textAlign = "left",
  fontFamily = "system-ui, -apple-system, sans-serif",
  style,
  className = "",
}: TextComponentProps) {
  return (
    <div
      id={id}
      className={`w-full h-full flex items-center ${className} border-none`}
      style={{
        fontSize: `${fontSize}px`,
        color,
        fontWeight,
        textAlign,
        fontFamily,
        ...style,
      }}
    >
      <p className="w-full break-words whitespace-pre-wrap">{content}</p>
    </div>
  );
}

