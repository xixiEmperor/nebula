/**
 * 图表渲染组件
 * 负责渲染ECharts图表并处理图表实例的生命周期
 */

import type { RenderProps } from "@/types/render";
import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useShallow } from "zustand/react/shallow";
import * as echarts from "echarts";
import { useEffect, useRef, memo } from "react";

/**
 * 图表渲染组件
 * @param id 图表容器的唯一标识符：模板中对应div的id
 */
const Render = memo(function Render({ id }: RenderProps) {
  // 从全局状态获取当前组件的配置
  const currentComponent = useComponentsRegistry(useShallow(state =>
    state.componentsRegistry.get(id)
  ));
  
  // 使用ref保存图表实例，避免重复创建
  const chartRef = useRef<echarts.ECharts | null>(null);
  
  /**
   * 图表初始化和更新逻辑
   */
  useEffect(() => {
    if (!currentComponent) return;

    const domElement = document.getElementById(id);
    if (!domElement) return;

    // 如果图表实例不存在，则初始化
    if (!chartRef.current) {
      chartRef.current = echarts.init(domElement);
    }

    // 更新图表配置（使用merge模式）
    chartRef.current.setOption(currentComponent as any, true);

    // 清理函数：组件卸载时销毁图表
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, [id, currentComponent]);

  /**
   * 监听窗口大小变化，自动调整图表尺寸
   * 这里需要对浏览器窗口大小变化进行监听，也需要对图表渲染到的element尺寸进行监听，否则可能出现重设容器尺寸，图表尺寸不变的情况
   */
  useEffect(() => {
    // 定义resize处理函数
    const handleResize = () => {
      if (chartRef.current) {
        // 调用ECharts的resize方法自适应容器大小
        chartRef.current.resize();
      }
    };

    // 监听窗口resize事件
    window.addEventListener('resize', handleResize);

    // 使用ResizeObserver监听容器尺寸变化（更精确）（浏览器Observer之一）
    const domElement = document.getElementById(id);
    let resizeObserver: ResizeObserver | null = null;
    
    if (domElement && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(domElement);
    }

    // 清理函数：移除事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver && domElement) {
        // 停止对某一element的监听
        resizeObserver.unobserve(domElement);
        // 停止Observer的工作，销毁Observer实例
        resizeObserver.disconnect();
      }
    };
  }, [id]);

  return (
    <div id={id} className="w-full h-full"></div>
  )
}, (prevProps, nextProps) => {
  // 只在 id 不变时避免重新渲染，因为组件配置通过 zustand 获取
  return prevProps.id === nextProps.id;
});

export default Render;