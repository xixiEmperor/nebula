import { useState, useEffect } from "react";
import type { TimeComponentProps } from "@/types/components";

/**
 * 时间组件 - 用于显示实时时间
 */
export default function Time({
  id,
  format = "YYYY-MM-DD HH:mm:ss",
  timezone = "Asia/Shanghai",
  fontSize = 24,
  color = "#3BE4FE",
  style,
  className = "",
}: TimeComponentProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // 简单的格式化实现
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      
      let formattedTime = format;
      formattedTime = formattedTime.replace("YYYY", String(year));
      formattedTime = formattedTime.replace("MM", month);
      formattedTime = formattedTime.replace("DD", day);
      formattedTime = formattedTime.replace("HH", hours);
      formattedTime = formattedTime.replace("mm", minutes);
      formattedTime = formattedTime.replace("ss", seconds);
      
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [format, timezone]);

  return (
    <div
      id={id}
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{
        fontSize: `${fontSize}px`,
        color,
        fontFamily: "monospace",
        letterSpacing: "0.05em",
        ...style,
      }}
    >
      {currentTime}
    </div>
  );
}

