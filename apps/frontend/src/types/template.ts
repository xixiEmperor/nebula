export interface TemplateAttribute {
  id: string;
  name: string;
  type: string;
}

// 布局模式类型
export type LayoutMode = 'grid' | 'free';

// 模板布局区域定义（网格布局）
export interface TemplateArea {
  id: string;
  type: string;
  name: string;
  x: number; // 网格位置 X
  y: number; // 网格位置 Y
  w: number; // 宽度（网格列数）
  h: number; // 高度（网格行数）
  minW?: number; // 最小宽度
  minH?: number; // 最小高度
  maxW?: number; // 最大宽度
  maxH?: number; // 最大高度
  description?: string; // 区域用途描述
  attribute?: import("@/types/charts-components").ChartAttribute; // 区域的图表属性
}

// 自由布局区域定义
export interface FreeLayoutArea {
  id: string;
  type: string;
  name: string;
  position: 'absolute';
  left: number;   // 像素值 或 '%'
  top: number;    // 像素值 或 '%'
  width: number | string;  // 像素值 或 '%'
  height: number | string; // 像素值 或 '%'
  zIndex?: number;
  description?: string;
  attribute?: import("@/types/charts-components").ChartAttribute;
}

// 大屏模板定义（网格布局）
export interface ScreenTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string; // 缩略图
  category: 'basic' | 'dashboard' | 'monitor' | 'data-analysis' | 'custom';
  layoutMode?: LayoutMode; // 布局模式，默认为grid
  gridRows: number; // 网格行数
  gridCols: number; // 网格列数
  areas: TemplateArea[]; // 可拖入组件的区域
  backgroundColor?: string;
  backgroundImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 自由布局模板定义
export interface FreeLayoutTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  category: 'basic' | 'dashboard' | 'monitor' | 'data-analysis' | 'custom';
  layoutMode: 'free';
  canvasWidth: number | string;  // 画布宽度（px 或 vw）
  canvasHeight: number | string; // 画布高度（px 或 vh）
  areas: FreeLayoutArea[]; // 自由布局区域
  backgroundColor?: string;
  backgroundImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 模板容器的通用属性（网格布局）
export interface TemplateContainerProps {
  areas: TemplateArea[];
  gridRows: number;
  gridCols: number;
  backgroundColor?: string;
  backgroundImage?: string;
  showGrid?: boolean; // 是否显示网格线（编辑模式）
  onAreaClick?: (areaId: string, e: React.MouseEvent<HTMLDivElement>) => void;
}

// 自由布局容器属性
export interface FreeLayoutContainerProps {
  id: string; // 画布的唯一标识符, 便于在画布上挂载新的div节点
  canvasWidth: number | string;
  canvasHeight: number | string;
  backgroundColor?: string;
  backgroundImage?: string;
  showGrid?: boolean;
  onAreaClick?: (areaId: string, e: React.MouseEvent<HTMLDivElement>) => void;
  onAreaUpdate?: (areaId: string, updates: Partial<FreeLayoutArea>) => void;
  onAreaCreate?: (area: FreeLayoutArea) => void;
}
