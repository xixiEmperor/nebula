/**
 * 通用组件渲染器
 * 根据组件类型自动选择合适的渲染器（图表渲染器或基础组件渲染器）
 */

import type { RenderProps } from "@/types/render";
import type { ComponentsType } from "@/types/components";
import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useShallow } from "zustand/react/shallow";
import { memo } from "react";
import Render from "./Render";
import BasicRender from "./BasicRender";

/**
 * 判断是否为基础组件
 */
function isBasicComponent(type?: ComponentsType): boolean {
  if (!type) return false;
  return type.startsWith("basic.");
}

/**
 * 通用渲染器
 * @param id 组件容器的唯一标识符
 */
const UniversalRender = memo(function UniversalRender({ id }: RenderProps) {
  // 从全局状态获取当前组件的配置
  const currentComponent = useComponentsRegistry(useShallow(state =>
    state.componentsRegistry.get(id)
  ));
  
  // 如果组件配置不存在，返回占位符
  if (!currentComponent) {
    return 
  }

  // 根据组件类型选择对应的渲染器
  const componentType = currentComponent.type as ComponentsType;
  
  if (isBasicComponent(componentType)) {
    // 渲染基础组件
    return <BasicRender id={id} />;
  } else {
    // 渲染图表组件
    return <Render id={id} />;
  }
}, (prevProps, nextProps) => {
  // 只在 id 不变时避免重新渲染
  return prevProps.id === nextProps.id;
});

export default UniversalRender;

