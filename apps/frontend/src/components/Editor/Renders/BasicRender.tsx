/**
 * 基础组件渲染器
 * 负责渲染基础组件（文本、标题、图片、时间等）并处理组件的生命周期
 */

import type { RenderProps } from "@/types/render";
import type { 
  BasicComponentsType,
  TextComponentProps,
  TitleComponentProps,
  ImageComponentProps,
  TimeComponentProps,
  MarqueeComponentProps,
  ContainerComponentProps,
} from "@/types/components";
import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useShallow } from "zustand/react/shallow";
import { memo } from "react";
import { Text, Title, Image, Time, Marquee, Container } from "../BasicComponents";

/**
 * 组件类型映射表
 * 将组件类型映射到对应的React组件
 */
const COMPONENT_MAP = {
  "basic.text": Text,
  "basic.title": Title,
  "basic.image": Image,
  "basic.time": Time,
  "basic.marquee": Marquee,
  "basic.container": Container,
} as const;

/**
 * 基础组件渲染器
 * @param id 组件容器的唯一标识符：模板中对应区域的id
 */
const BasicRender = memo(function BasicRender({ id }: RenderProps) {
  // 从全局状态获取当前组件的配置
  const currentComponent = useComponentsRegistry(useShallow(state =>
    state.componentsRegistry.get(id)
  ));
  
  // 如果组件配置不存在，返回占位符
  if (!currentComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center text-nebula-text-muted">
        组件配置未找到
      </div>
    );
  }

  // 获取组件类型
  const componentType = currentComponent.type as BasicComponentsType;
  
  // 根据类型获取对应的组件
  const Component = COMPONENT_MAP[componentType];
  
  // 如果组件类型不支持，显示错误信息
  if (!Component) {
    return (
      <div className="w-full h-full flex items-center justify-center text-nebula-text-muted">
        不支持的组件类型: {componentType}
      </div>
    );
  }

  // 获取组件属性
  const componentProps = currentComponent.options || {};

  // 根据不同的组件类型渲染对应的组件
  switch (componentType) {
    case "basic.text":
      return <Component id={id} {...(componentProps as TextComponentProps)} />;
    
    case "basic.title":
      return <Component id={id} {...(componentProps as TitleComponentProps)} />;
    
    case "basic.image":
      return <Component id={id} {...(componentProps as ImageComponentProps)} />;
    
    case "basic.time":
      return <Component id={id} {...(componentProps as TimeComponentProps)} />;
    
    case "basic.marquee":
      return <Component id={id} {...(componentProps as MarqueeComponentProps)} />;
    
    case "basic.container":
      return <Component id={id} {...(componentProps as ContainerComponentProps)} />;
    
    default:
      return (
        <div className="w-full h-full flex items-center justify-center text-nebula-text-muted">
          未知组件类型
        </div>
      );
  }
}, (prevProps, nextProps) => {
  // 只在 id 不变时避免重新渲染，因为组件配置通过 zustand 获取
  return prevProps.id === nextProps.id;
});

export default BasicRender;

