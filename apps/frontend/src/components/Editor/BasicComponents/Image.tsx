import type { ImageComponentProps } from "@/types/components";

/**
 * 图片组件 - 用于显示图片
 */
export default function Image({
  id,
  src = "https://via.placeholder.com/400x300",
  alt = "图片",
  width = "100%",
  height = "100%",
  borderRadius = 0,
  objectFit = "contain",
  style,
  className = "",
}: ImageComponentProps) {
  return (
    <div
      id={id}
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          objectFit,
        }}
        className="max-w-full max-h-full"
      />
    </div>
  );
}

