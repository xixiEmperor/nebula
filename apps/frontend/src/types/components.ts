/**
 * 图表组件类型定义
 * 支持多种ECharts图表类型
 */
export type ChartComponentsType = 
  | 'line-chart'      // 折线图
  | 'bar-chart'       // 柱状图
  | 'pie-chart'       // 饼图
  | 'scatter-chart'   // 散点图
  | 'radar-chart'     // 雷达图
  | 'gauge-chart'     // 仪表盘
  | 'funnel-chart'    // 漏斗图
  | 'map-chart';      // 地图

/**
 * 基础组件类型定义
 * 支持文本、图片等常规组件
 */
export type BasicComponentsType = 
  | 'basic.text'      // 文本组件
  | 'basic.title'     // 标题组件
  | 'basic.image'     // 图片组件
  | 'basic.time'      // 时间显示
  | 'basic.marquee'   // 滚动文字
  | 'basic.container'; // 容器组件

/**
 * 所有组件类型
 */
export type ComponentsType = ChartComponentsType | BasicComponentsType;

/**
 * 坐标轴样式类型
 */
interface axisStyleAttribute {
  color: string,
  fontSize: number,
  fontWeight: number,
  fontFamily: string,
}

/**
 * 坐标轴数据类型
 * 用于配置X轴和Y轴
 */
interface AxisAttribute {
  type: 'category' | 'time' | 'value',
  data: string[],
  axisLine?: {
    lineStyle: Partial<axisStyleAttribute>,
    show?: "auto" | "true" | "false",
    onZero?: boolean,
  },
  axisLabel?: Partial<Pick<axisStyleAttribute, 'color' | 'fontSize'>>,
  boundaryGap?: boolean | [number | string, number | string], // 坐标轴两边留白
}

/**
 * 饼图系列专属数据类型
 */
interface pieDataAttribute {
  name: string,
  value: number,
}

/**
 * 雷达图指示器配置
 */
interface radarIndicator {
  name: string,
  max: number,
  min?: number,
}

/**
 * 雷达图配置
 */
interface radarAttribute {
  indicator: radarIndicator[],
  shape?: 'polygon' | 'circle', // 形状：多边形或圆形
  splitNumber?: number, // 分割段数
  name?: {
    textStyle?: {
      color?: string,
      fontSize?: number,
    }
  },
}

/**
 * 系列数据类型
 * 支持多种图表类型的配置
 */
interface seriesAttribute {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'radar' | 'gauge' | 'funnel' | 'map',
  data: string[] | number[] | pieDataAttribute[] | any[],
  name?: string,
  // 饼图专属配置
  radius?: string | string[], // 圆环半径，可以是字符串或数组（内外半径）
  center?: string[], // 饼图中心位置
  roseType?: 'radius' | 'area' | false, // 是否展示成南丁格尔图
  // 折线图专属配置
  smooth?: boolean, // 是否平滑曲线
  // 散点图专属配置
  symbolSize?: number | ((value: any) => number), // 散点大小
  // 仪表盘专属配置
  min?: number, // 最小值
  max?: number, // 最大值
  // 通用样式配置
  itemStyle?: {
    color?: string | string[], // 颜色
    borderRadius?: number | number[], // 圆角
  },
  // 标签配置
  label?: {
    show?: boolean,
    position?: string,
    formatter?: string,
  },
  // 强调数据，光标悬浮于图表上时，图表的样式
  emphasis?: {
    itemStyle?: {
      shadowBlur?: number, // 阴影模糊度
      shadowColor?: string, // 阴影颜色
      shadowOffsetX?: number, // 阴影偏移量
      shadowOffsetY?: number, // 阴影偏移量
      color?: string, // 颜色
    },
    scale?: boolean, // 是否缩放
    scaleSize?: number, // 缩放大小
  }
}

/**
 * 提示框数据类型
 */
interface tooltipAttribute {
  show?: boolean, // 是否显示提示框
  trigger?: 'item' | 'axis', // 触发方式: item: 数据项图形触发，axis: 坐标轴触发
  formatter?: string, // 提示框浮层内容格式器
}

/**
 * 图例数据类型
 * 用于标识不同系列
 */
interface legendAttribute {
  left?: 'left' | 'center' | 'right', // 水平位置
  orient?: 'horizontal' | 'vertical', // 方向: horizontal: 水平，vertical: 垂直
  show?: boolean, // 是否显示
  top?: number | "top" | "bottom" | "center", // 垂直位置
  textStyle?: {
    color?: string, // 文字颜色
    fontSize?: number, // 文字大小
  },
}

/**
 * 标题数据类型
 */
interface titleAttribute {
  text?: string, // 主标题
  subtext?: string, // 副标题
  left?: 'left' | 'center' | 'right', // 水平位置
  top?: number, // 垂直位置
  textStyle?: {
    color?: string, // 标题颜色
    fontSize?: number, // 标题字体大小
    fontWeight?: string | number, // 标题字体粗细
  },
  subtextStyle?: {
    color?: string, // 副标题颜色
    fontSize?: number, // 副标题字体大小
  },
}

/**
 * 图表属性配置
 * 包含ECharts的主要配置项
 */
export interface ChartAttribute {
  title?: titleAttribute, // 标题配置
  tooltip?: tooltipAttribute, // 提示框配置
  series?: seriesAttribute[], // 系列配置
  legend?: legendAttribute, // 图例配置
  xAxis?: AxisAttribute, // X轴配置
  yAxis?: AxisAttribute, // Y轴配置
  radar?: radarAttribute, // 雷达图配置
  color?: string[], // 调色盘颜色列表
  backgroundColor?: string, // 背景色
  grid?: { // 网格配置
    left?: number | string,
    right?: number | string,
    top?: number | string,
    bottom?: number | string,
    containLabel?: boolean,
  },
}


/**
 * 数据源配置
 * 待测
 */
export interface DataSourceConfig {
  enabled: boolean;           // 是否启用数据源
  type: 'api' | 'static';     // 数据类型
  apiConfig?: {
    url: string;              // API地址
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    params?: Record<string, any>;
    body?: Record<string, any>;
    refreshInterval?: number; // 刷新间隔（秒）
  };
  dataMapping?: {             // 数据映射配置
    [chartField: string]: string; // ECharts字段 -> API响应路径
  };
  transform?: string;         // 数据转换函数（JS代码字符串）
}

/**
 * 基础组件属性
 */
export interface BasicComponentProps {
  id?: string;
  content?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * 文本组件属性
 */
export interface TextComponentProps extends BasicComponentProps {
  fontSize?: number;
  color?: string;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
}

/**
 * 标题组件属性
 */
export interface TitleComponentProps extends BasicComponentProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  fontSize?: number;
  color?: string;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
}

/**
 * 图片组件属性
 */
export interface ImageComponentProps extends BasicComponentProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * 时间组件属性
 */
export interface TimeComponentProps extends BasicComponentProps {
  format?: string;
  timezone?: string;
  fontSize?: number;
  color?: string;
}

/**
 * 滚动文字组件属性
 */
export interface MarqueeComponentProps extends BasicComponentProps {
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  fontSize?: number;
  color?: string;
}

/**
 * 容器组件属性
 */
export interface ContainerComponentProps extends BasicComponentProps {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  children?: ConponentsAttribute[];
}

/**
 * 组件属性
 * 扩展支持数据源配置
 */
export interface ConponentsAttribute{
  id: string,
  name: string,
  type: ComponentsType,
  options: ChartAttribute | BasicComponentProps | TextComponentProps | TitleComponentProps | ImageComponentProps | TimeComponentProps | MarqueeComponentProps | ContainerComponentProps,
  children?: ConponentsAttribute[],
  defaultProps?: Record<string, any>,
  dataSource?: DataSourceConfig, // 数据源配置
}