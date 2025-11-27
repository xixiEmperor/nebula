import { useEffect, useRef } from "react";
import type { MarqueeComponentProps } from "@/types/charts-components";

/**
 * 滚动文字组件 - 跑马灯效果
 */
export default function Marquee({
  id,
  content = "滚动文字内容",
  speed = 50,
  direction = "left",
  fontSize = 18,
  color = "#FFFFFF",
  style,
  className = "",
}: MarqueeComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    let animationId: number;
    let position = direction === "left" || direction === "right" ? 0 : 0;

    const animate = () => {
      if (direction === "left") {
        position -= speed / 60;
        if (Math.abs(position) >= text.offsetWidth) {
          position = container.offsetWidth;
        }
        text.style.transform = `translateX(${position}px)`;
      } else if (direction === "right") {
        position += speed / 60;
        if (position >= container.offsetWidth) {
          position = -text.offsetWidth;
        }
        text.style.transform = `translateX(${position}px)`;
      } else if (direction === "up") {
        position -= speed / 60;
        if (Math.abs(position) >= text.offsetHeight) {
          position = container.offsetHeight;
        }
        text.style.transform = `translateY(${position}px)`;
      } else if (direction === "down") {
        position += speed / 60;
        if (position >= container.offsetHeight) {
          position = -text.offsetHeight;
        }
        text.style.transform = `translateY(${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    // 初始位置
    if (direction === "left" || direction === "right") {
      position = direction === "left" ? container.offsetWidth : -text.offsetWidth;
    } else {
      position = direction === "up" ? container.offsetHeight : -text.offsetHeight;
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [content, speed, direction]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`w-full h-full overflow-hidden flex items-center ${className}`}
      style={{
        ...style,
      }}
    >
      <div
        ref={textRef}
        className="whitespace-nowrap"
        style={{
          fontSize: `${fontSize}px`,
          color,
          position: "absolute",
        }}
      >
        {content}
      </div>
    </div>
  );
}

