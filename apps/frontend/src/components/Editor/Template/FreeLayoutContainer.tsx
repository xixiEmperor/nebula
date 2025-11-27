import type { FreeLayoutArea, FreeLayoutContainerProps } from "@/types/template";
import { useEffect, useState, useRef, memo, useCallback, useMemo, use } from "react";
import { Rnd } from "react-rnd";
import UniversalRender from "../Renders/UniversalRender";
import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useTemplateStroe } from "@/store/templateStore";
import { useShallow } from "zustand/react/shallow";

interface FreeAreaProps {
  area: FreeLayoutArea;
  onAreaClick: (areaId: string, e: React.MouseEvent<HTMLDivElement>) => void;
  onAreaUpdate: (areaId: string, updates: Partial<FreeLayoutArea>) => void;
  isSelected: boolean;
}

// 使用 memo 优化性能，避免不必要的重新渲染
// memo用于组件缓存，useMemo用于缓存计算结果，useCallback用于缓存事件处理函数
const FreeArea = memo(function FreeArea({ area, onAreaClick, onAreaUpdate, isSelected }: FreeAreaProps) {
  // 拖拽状态
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const { getArea } = useTemplateStroe(useShallow((state) => ({
    getArea: state.getArea,
  })));

  console.log('test', getArea(area.id).type.endsWith('chart'))

  // 使用 useCallback 缓存事件处理函数
	// 区域点击事件
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    onAreaClick(area.id, e);
  }, [area.id, onAreaClick]);

  // 区域拖拽开始事件
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // 区域拖拽结束事件
  const handleDragStop = useCallback((_e: any, _d: any) => {
    setIsDragging(false);
    onAreaUpdate(area.id, { left: _d.x, top: _d.y });
  }, []);

  // 区域调整大小开始事件
  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  // 区域调整大小结束事件
  const handleResizeStop = useCallback((_e: any, _direction: any, _ref: any, _delta: any, _position: any) => {
    setIsResizing(false);
    onAreaUpdate(area.id, {
      width: _ref.offsetWidth,
      height: _ref.offsetHeight,
      left: _position.x,
      top: _position.y,
    });
  }, []);

  // 使用 useMemo 缓存 className，只在必要时重新计算
  // 区域容器 className
  const containerClassName = useMemo(() => {
    const baseClass = 'border-2 rounded-nebula-lg';
    const chartClass = getArea(area.id).type.endsWith('chart')
      ? 'bg-nebula-card-gradient'
      : '';
    // 拖拽/调整大小时移除过渡和模糊效果以提升性能
    const interactionClass = (isDragging || isResizing) ? '' : 'transition-all duration-300 backdrop-blur-glass';
    const stateClass = isSelected 
      ? 'border-none shadow-nebula-glow' 
      : 'border-none hover:border-nebula-border-accent';
    
    return `${baseClass} ${interactionClass} ${stateClass} ${chartClass}`;
  }, [isSelected, isDragging, isResizing]);
  console.log(containerClassName)

  // 使用 useMemo 缓存 style 对象
  // 区域容器 style
  const containerStyle = useMemo(() => ({
    zIndex: isSelected ? 1000 : area.zIndex || 1,
  }), [isSelected, area.zIndex]);

  // 使用 useMemo 缓存 Rnd 的 size 和 position 对象
  // Rnd 的 size 和 position 对象
  const rndSize = useMemo(() => ({
    width: area.width,
    height: area.height
  }), [area.width, area.height]);

  // Rnd 的 position 对象
  const rndPosition = useMemo(() => ({
    x: area.left,
    y: area.top
  }), [area.left, area.top]);

	// 直接返回一个Rnd可拖拽组件
  return (
    <Rnd
      size={rndSize}
      position={rndPosition}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      bounds="parent"
      enableResizing={isSelected}
      disableDragging={!isSelected}
      style={containerStyle}
      className={containerClassName}
      // 性能优化配置
      dragGrid={[1, 1]}
      resizeGrid={[1, 1]}
      scale={1}
    >
      <div
        className="w-full h-full cursor-pointer overflow-hidden flex flex-col items-center justify-center"
        onClick={handleClick}
      >
				{/* 通用组件渲染器：支持图表和基础组件 */}
        <UniversalRender id={area.id} />

        {/* 选中时显示装饰性边框 - 拖拽时隐藏以提升性能 */}
        {isSelected && !isDragging && !isResizing && (
          <div className="absolute inset-0 rounded-nebula-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-nebula-text-accent rounded-tl-nebula-sm" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-nebula-text-accent rounded-tr-nebula-sm" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-nebula-text-accent rounded-bl-nebula-sm" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-nebula-text-accent rounded-br-nebula-sm" />
          </div>
        )}
      </div>
    </Rnd>
  );
}, (prevProps, nextProps) => {
  // 自定义比较函数，只在关键属性变化时才重新渲染
  return (
    prevProps.area.id === nextProps.area.id &&
    prevProps.area.left === nextProps.area.left &&
    prevProps.area.top === nextProps.area.top &&
    prevProps.area.width === nextProps.area.width &&
    prevProps.area.height === nextProps.area.height &&
    prevProps.area.zIndex === nextProps.area.zIndex &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.onAreaClick === nextProps.onAreaClick &&
    prevProps.onAreaUpdate === nextProps.onAreaUpdate
  );
});

/**
 * 自由布局容器组件 - 用于渲染自由布局模板
 * 支持自由拖拽和调整组件尺寸
 */
export default function FreeLayoutContainer({
	id,
  canvasWidth,
  canvasHeight,
  backgroundColor = '#081324',
  backgroundImage,
  showGrid = true,
  onAreaClick,
  onAreaUpdate,
  onAreaCreate,
}: FreeLayoutContainerProps) {
  // 区域列表
  const [areas, setAreas] = useState<FreeLayoutArea[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // 组件注册钩子
  const { setComponentsRegistry } = useComponentsRegistry(useShallow(state => ({
    setComponentsRegistry: state.setComponentsRegistry,
  })));

  // 从全局状态获取所有区域
  const { template } = useTemplateStroe(useShallow(state => ({
    template: state.template,
  })));

  // 处理区域更新 - 使用 useCallback 缓存
  const handleAreaUpdate = useCallback((areaId: string, updates: Partial<FreeLayoutArea>) => {
    setAreas(prev => prev.map(area => 
      area.id === areaId ? { ...area, ...updates } : area
    ));
    onAreaUpdate?.(areaId, updates);
  }, [onAreaUpdate]);

  // 处理区域点击 - 使用 useCallback 缓存
  const handleAreaClick = useCallback((areaId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedAreaId(areaId);
    onAreaClick?.(areaId, e);
  }, [onAreaClick]);

  // 处理画布点击（取消选中）- 使用 useCallback 缓存
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === canvasRef.current) {
      setSelectedAreaId(null);
    }
  }, []);

  // 初始化区域
  useEffect(() => {
    setAreas(template?.areas as FreeLayoutArea[]);
  }, [template?.areas]);

  // 处理拖拽到画布（创建新区域）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleDragOver = (e: DragEvent) => {
			// 此处必须阻止默认行为，否则无法拖拽
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'copy';
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const droppedData = e.dataTransfer?.getData("text/plain");

      if (droppedData) {
        try {
          const chartOptions = JSON.parse(droppedData);
          console.log(chartOptions)

          let initWidth
          let initHeight
          
          // 计算组件初始尺寸
          if (chartOptions.type.startsWith('basic') 
            && chartOptions.type !== 'basic.container'
            && chartOptions.type !== 'basic.image'
          ) {
            initWidth = chartOptions.fontSize * (chartOptions.format ?? chartOptions.content).length
            initHeight = chartOptions.fontSize * 1.5
          }
          else {
            initWidth = 400
            initHeight = 300
          }
          
          // 计算相对画布的位置
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // 创建新区域
          const newArea: FreeLayoutArea = {
            id: `area-${Date.now()}`,
            type: chartOptions.type,
            name: chartOptions.title?.text || '自定义区域',
            position: 'absolute',
            left: Math.max(0, x - 200), // 默认宽度一半
            top: Math.max(0, y - 150),  // 默认高度一半
            width: initWidth,
            height: initHeight,
            zIndex: areas.length + 1,
          };

          setAreas(prev => [...prev, newArea]);
          setComponentsRegistry(newArea.id, chartOptions.options ?? chartOptions);
          onAreaCreate?.(newArea);
          setSelectedAreaId(newArea.id);

        } catch (error) {
          console.error("解析拖拽数据失败:", error);
        }
      }
    };

    canvas.addEventListener("dragover", handleDragOver);
    canvas.addEventListener("drop", handleDrop);

    return () => {
      canvas.removeEventListener("dragover", handleDragOver);
      canvas.removeEventListener("drop", handleDrop);
    };
  }, [areas.length, setComponentsRegistry, onAreaCreate]);

  return (
    <div
			id={id}
      ref={canvasRef}
      className="relative overflow-hidden"
      style={{
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleCanvasClick}
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
            backgroundSize: '20px 20px',
          }}
        />
      )}

      {/* 渲染各个区域 */}
      {areas.map((area) => (
        <FreeArea
          key={area.id}
          area={area}
          onAreaClick={handleAreaClick}
          onAreaUpdate={handleAreaUpdate}
          isSelected={selectedAreaId === area.id}
        />
      ))}

      {/* 空画布提示 */}
      {areas.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="text-nebula-text-accent text-2xl font-bold tracking-nebula-wide mb-4">
            空白画布
          </div>
          <div className="text-nebula-text-muted text-lg tracking-nebula-normal mb-8">
            从左侧拖拽组件到画布开始创建您的大屏
          </div>
          <div className="px-6 py-3 rounded-nebula-md bg-nebula-accent-gradient text-nebula-text-primary text-sm">
            支持自由拖拽和调整尺寸
          </div>
        </div>
      )}
    </div>
  );
}

