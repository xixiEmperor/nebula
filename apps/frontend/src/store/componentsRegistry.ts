/**
 * 组件注册表
 * 用于存储组件的注册信息，便于某个组件信息在全局共享，快速拿到组件配置
 * 包括组件的id、组件的属性、组件的类型、组件的子组件等
 * 用于在编辑器中渲染组件
 * 用于在编辑器中更新组件
 * 用于在编辑器中删除组件
 * 用于在编辑器中移动组件
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
import type { ChartAttribute, ConponentsAttribute } from "@/types/charts-components"
import { enableMapSet } from "immer";

/**
 * 组件配置类型
 * 可以是图表配置或完整的组件属性配置
 */
export type ComponentConfig = ChartAttribute | ConponentsAttribute | any;

interface ComponentsRegistryStore {
  // 组件注册表
  componentsRegistry: Map<string, ComponentConfig>;
  setComponentsRegistry: (id: string, component: ComponentConfig | null) => void;
  deleteComponentsRegistry: (id: string) => void;
  resetComponentsRegistry: () => void;
  // 当前选中区域的状态
  currentArea: {
    areaId: string;
    attribute: ComponentConfig;
  } | null;
  setCurrentArea: (areaId: string, attribute: ComponentConfig) => void;
  resetCurrentArea: () => void;
}

// 允许使用map和set
enableMapSet();

// 组件注册表和区域状态管理
export const useComponentsRegistry = create<ComponentsRegistryStore>()(
  immer((set, get) => ({
    // 组件注册表
    /** 
     * 结构：Map<string, ComponentConfig>
     * 其中string为区域id，ComponentConfig为区域对应的组件属性
     * 支持图表组件和基础组件
     * 例如：Map<string, ComponentConfig> = {
     *   "area-1": {
     *     // 图表组件
     *     "title": { "text": "柱状图" },
     *     "series": [{ "type": "bar", "data": [10, 20, 30] }]
     *   },
     *   "area-2": {
     *     // 基础组件
     *     "type": "basic.text",
     *     "content": "文本内容",
     *     "fontSize": 16
     *   }
     * }
     */
    componentsRegistry: new Map<string, ComponentConfig>(),

    // 注册组件
    setComponentsRegistry: (id: string, component: ComponentConfig | null) => set((state) => {
      state.componentsRegistry.set(id, component);
    }),

    // 删除组件注册表
    deleteComponentsRegistry: (id: string) => set((state) => {
      state.componentsRegistry.delete(id);
    }),

    // 重置组件注册表,切换模板时调用
    resetComponentsRegistry: () => set((state) => {
      state.componentsRegistry.clear();
    }),

    // 当前选中区域
    currentArea: null,

    // 设置当前区域
    setCurrentArea: (areaId: string, attribute: ComponentConfig) => set((state) => {
      state.currentArea = { areaId, attribute };
    }),

    // 获取当前区域
    getCurrentArea: () => get().currentArea,

    // 重置当前区域
    resetCurrentArea: () => set((state) => {
      state.currentArea = null;
    })
  }))
);
