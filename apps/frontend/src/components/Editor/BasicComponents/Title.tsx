import type { TitleComponentProps } from "@/types/charts-components";

/**
 * 标题组件 - 用于显示标题文字
 */
export default function Title({
  id,
  content = "标题",
  level = 1,
  fontSize,
  color = "#3BE4FE",
  fontWeight = 700,
  textAlign = "center",
  style,
  className = "",
}: TitleComponentProps) {
  // 根据标题级别设置默认字号
  const defaultFontSize = {
    1: 48,
    2: 40,
    3: 32,
    4: 28,
    5: 24,
    6: 20,
  }[level];

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{
        fontSize: `${fontSize || defaultFontSize}px`,
        color,
        fontWeight,
        textAlign,
        ...style,
      }}
    >
      {content}
    </Tag>
  );
}

