import type { ConponentsAttribute } from "@/types/charts-components";

/**
 * 基础组件配置
 * 包含文本、标题、图片、时间、滚动文字、容器等常规组件
 */

// 文本组件配置
export const textComponent: ConponentsAttribute = {
  id: "basic-text",
  name: "文本组件",
  type: "basic.text",
  options: {
    content: "这是一段文本",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 400,
    textAlign: "left",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  defaultProps: {
    content: "这是一段文本",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 400,
    textAlign: "left",
  },
};

// 标题组件配置
export const titleComponent: ConponentsAttribute = {
  id: "basic-title",
  name: "标题组件",
  type: "basic.title",
  options: {
    content: "大屏标题",
    level: 1,
    fontSize: 48,
    color: "#3BE4FE",
    fontWeight: 700,
    textAlign: "center",
  },
  defaultProps: {
    content: "大屏标题",
    level: 1,
    fontSize: 48,
    color: "#3BE4FE",
    fontWeight: 700,
    textAlign: "center",
  },
};

// 图片组件配置
export const imageComponent: ConponentsAttribute = {
  id: "basic-image",
  name: "图片组件",
  type: "basic.image",
  options: {
    src: "https://via.placeholder.com/400x300",
    alt: "图片",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    objectFit: "contain",
  },
  defaultProps: {
    src: "https://via.placeholder.com/400x300",
    alt: "图片",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    objectFit: "contain",
  },
};

// 时间组件配置
export const timeComponent: ConponentsAttribute = {
  id: "basic-time",
  name: "时间显示",
  type: "basic.time",
  options: {
    format: "YYYY-MM-DD HH:mm:ss",
    timezone: "Asia/Shanghai",
    fontSize: 24,
    color: "#3BE4FE",
  },
  defaultProps: {
    format: "YYYY-MM-DD HH:mm:ss",
    timezone: "Asia/Shanghai",
    fontSize: 24,
    color: "#3BE4FE",
  },
};

// 滚动文字组件配置
export const marqueeComponent: ConponentsAttribute = {
  id: "basic-marquee",
  name: "滚动文字",
  type: "basic.marquee",
  options: {
    content: "这是滚动文字内容，可以循环播放",
    speed: 50,
    direction: "left",
    fontSize: 18,
    color: "#FFFFFF",
  },
  defaultProps: {
    content: "这是滚动文字内容，可以循环播放",
    speed: 50,
    direction: "left",
    fontSize: 18,
    color: "#FFFFFF",
  },
};

// 容器组件配置
export const containerComponent: ConponentsAttribute = {
  id: "basic-container",
  name: "容器组件",
  type: "basic.container",
  options: {
    backgroundColor: "rgba(8, 19, 36, 0.6)",
    borderColor: "#3BE4FE",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  defaultProps: {
    backgroundColor: "rgba(8, 19, 36, 0.6)",
    borderColor: "#3BE4FE",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
};

// 导出所有基础组件
export const allBasicComponents: ConponentsAttribute[] = [
  textComponent,
  titleComponent,
  imageComponent,
  timeComponent,
  marqueeComponent,
  containerComponent,
];

// 按类型导出
export const basicComponentsByType = {
  "basic.text": textComponent,
  "basic.title": titleComponent,
  "basic.image": imageComponent,
  "basic.time": timeComponent,
  "basic.marquee": marqueeComponent,
  "basic.container": containerComponent,
};

