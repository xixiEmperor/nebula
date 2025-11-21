import type { TemplateArea, TemplateContainerProps } from "@/types/template";
import { useEffect } from "react";
import UniversalRender from "../Renders/UniversalRender";
import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useShallow } from "zustand/react/shallow";

interface AreaProps {
  area: TemplateArea;
  onAreaClick: (areaId: string, e: React.MouseEvent<HTMLDivElement>) => void;
}

function Area({ area, onAreaClick }: AreaProps) {
  // 当前区域组件
  const currentComponent = useComponentsRegistry(useShallow(state =>
    state.componentsRegistry.get(area.id)
  ));
  // 设置组件注册表
  const setComponentsRegistry = useComponentsRegistry(state => state.setComponentsRegistry);

  useEffect(() => {
    // 获取区域DOM元素
    const dropTarget = document.getElementById(area.id)
    if (!dropTarget) return

    // 添加拖拽进入事件监听器 - 必须调用preventDefault才能允许放置
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.dataTransfer!.dropEffect = 'move'
    }

    // 添加放置事件监听器
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const droppedData = e.dataTransfer?.getData("text/plain")

      if (droppedData) {
        try {
          // 解析拖拽数据
          const chartOptions = JSON.parse(droppedData)
          setComponentsRegistry(area.id, chartOptions)
        } catch (error) {
          console.error("解析拖拽数据失败:", error)
        }
      }
    }

    // 添加拖拽进入事件监听器
    dropTarget.addEventListener("dragover", handleDragOver)
    dropTarget.addEventListener("drop", handleDrop)

    // 清理函数
    return () => {
      // 清理事件监听器
      dropTarget.removeEventListener("dragover", handleDragOver)
      dropTarget.removeEventListener("drop", handleDrop)
    }
  }, [area.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      id={area.id}
      key={area.id}
      className="relative group border-2 border-nebula-border-primary rounded-nebula-lg bg-nebula-bg-glass backdrop-blur-glass 
                hover:border-nebula-border-accent hover:shadow-nebula-glow transition-all duration-300 cursor-pointer
                flex flex-col items-center justify-center overflow-hidden"
      style={{
        gridColumn: `${area.x + 1} / span ${area.w}`,
        gridRow: `${area.y + 1} / span ${area.h}`,
      }}
      onClick={(e) => {
        onAreaClick?.(area.id, e)
      }}
    >
      {
        currentComponent !== null ? (
          // 渲染已注册的组件（支持图表和基础组件）
          <UniversalRender id={area.id} />
        ) : (
          // 渲染区域占位内容
          <div className="flex flex-col items-center justify-center text-center p-4 z-10">
            <div className="text-nebula-text-accent text-lg font-medium tracking-nebula-normal mb-2">
              {area.name}
            </div>
            {area.description && (
              <div className="text-nebula-text-muted text-sm tracking-nebula-tight">
                {area.description}
              </div>
            )}
            <div className="mt-4 px-4 py-2 rounded-nebula-sm bg-nebula-accent-gradient text-nebula-text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              拖拽组件到此处
            </div>
          </div>
        )
      }

      {/* 装饰性边框效果 */}
      <div className="absolute inset-0 rounded-nebula-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-nebula-text-accent rounded-tl-nebula-sm" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-nebula-text-accent rounded-tr-nebula-sm" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-nebula-text-accent rounded-bl-nebula-sm" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-nebula-text-accent rounded-br-nebula-sm" />
      </div>
    </div>
  )
}

/**
 * 模板容器组件 - 用于渲染大屏模板的布局区域
 * 使用CSS Grid布局系统，支持拖拽放置组件
 */
export default function TemplateContainer({
  areas,
  gridRows,
  gridCols,
  backgroundColor = '#081324',
  backgroundImage,
  showGrid = true,
  onAreaClick,
}: TemplateContainerProps) {

  // 组件注册表
  const { setComponentsRegistry, resetComponentsRegistry } = useComponentsRegistry(useShallow(state => ({
    setComponentsRegistry: state.setComponentsRegistry,
    resetComponentsRegistry: state.resetComponentsRegistry,
  })));

  useEffect(() => {
    // 初始化组件注册表
    for (const area of areas) {
      setComponentsRegistry(area.id, null);
    }
    // 切换模板时重置组件注册表
    return () => {
      resetComponentsRegistry();
    };
  }, [areas, setComponentsRegistry, resetComponentsRegistry]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        gap: '16px',
        padding: '16px',
      }}
    >
      {/* 网格背景（可选） */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 228, 254, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 228, 254, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: `${100 / gridCols}% ${100 / gridRows}%`,
          }}
        />
      )}

      {/* 渲染各个区域 */}
      {areas.map((area) => (
        <Area key={area.id} area={area} onAreaClick={onAreaClick} />
      ))}
    </div>
  );
}

