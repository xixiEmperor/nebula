import { useState } from "react";
import type { ScreenTemplate, FreeLayoutTemplate, FreeLayoutArea } from "@/types/template";
import { TemplateContainer, FreeLayoutContainer, TemplateSelector } from "./Template";
import ToolsSideBar from "./Tools/ToolsSideBar";
import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useShallow } from "zustand/react/shallow";
import { useTemplateStroe } from "@/store/templateStore";

/**
 * 编辑器主组件
 * 提供模板选择和画布编辑功能
 */
export default function Editor() {
  // 当前选中的模板（模板画布或自由画布）
  const {setTemplate, getTemplate, createArea, updateArea, getArea} = useTemplateStroe(useShallow(state => ({
    setTemplate: state.setTemplate,
    getTemplate: state.getTemplate,
    createArea: state.createArea,
    updateArea: state.updateArea,
    getArea: state.getArea,
  })));
  const currentTemplate = getTemplate();

  // 控制模板选择器是否显示
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const { setCurrentArea, componentsRegistry } = useComponentsRegistry(useShallow(state => ({
    setCurrentArea: state.setCurrentArea,
    componentsRegistry: state.componentsRegistry,
  })));

  // 模板选择
  const handleTemplateSelect = (template: ScreenTemplate | FreeLayoutTemplate) => {
    setTemplate(template);
    setShowTemplateSelector(false);
    // 设置当前区域为模板的第一个区域
    if (template.areas.length > 0) {
      setCurrentArea(template.areas[0].id, template.areas[0].attribute);
    }
  };

  // 区域点击
  const handleAreaClick = (areaId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // 更新当前区域
    if (currentTemplate) {
      // 使用store的getArea方法获取区域
      const area = getArea(areaId);
      // 获取当前区域已注册的组件
      const component = componentsRegistry.get(areaId);
      if (area) {
        setCurrentArea(areaId, component);
      }
    }
  };

  // 处理自由布局区域更新
  const handleFreeAreaUpdate = (areaId: string, updates: Partial<FreeLayoutArea>) => {
    // 使用store的updateArea方法
    updateArea(areaId, updates);
  };

  // 处理自由布局区域创建
  const handleFreeAreaCreate = (area: FreeLayoutArea) => {
    // 使用store的createArea方法
    createArea(area);
  };

  return (
    <ToolsSideBar>
      <div className="w-full h-screen bg-nebula-bg-primary flex flex-col overflow-y-scroll">
        {/* 顶部工具栏 */}
        <div className="h-16 bg-nebula-bg-header border-b border-nebula-divider-primary flex items-center justify-between px-8 backdrop-blur-nebula z-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-nebula-text-primary tracking-nebula-normal">
              NebulaScreen 编辑器
            </h1>
            {currentTemplate && (
              <span className="text-sm text-nebula-text-muted">
                当前模板: {currentTemplate.name}
              </span>
            )}
          </div>
          <button
            onClick={() => setShowTemplateSelector(true)}
            className="px-6 py-2.5 rounded-nebula-lg bg-nebula-glow-gradient text-white font-medium hover:shadow-nebula-button transition-all"
          >
            {currentTemplate ? "更换模板" : "选择模板"}
          </button>
        </div>

        {/* 编辑器主体 */}
        <div className="flex-1 overflow-hidden">
          {currentTemplate ? (
            <div className="w-full h-full p-4">
              {currentTemplate.layoutMode === 'free' ? (
                // 自由布局模式
                <FreeLayoutContainer
                  id={currentTemplate.id}
                  canvasWidth={(currentTemplate as FreeLayoutTemplate).canvasWidth}
                  canvasHeight={(currentTemplate as FreeLayoutTemplate).canvasHeight}
                  backgroundColor={currentTemplate.backgroundColor}
                  backgroundImage={currentTemplate.backgroundImage}
                  showGrid={true}
                  onAreaClick={handleAreaClick}
                  onAreaUpdate={handleFreeAreaUpdate}
                  onAreaCreate={handleFreeAreaCreate}
                />
              ) : (
                // 网格布局模式
                <TemplateContainer
                  areas={currentTemplate.areas}
                  gridRows={currentTemplate.gridRows}
                  gridCols={currentTemplate.gridCols}
                  backgroundColor={currentTemplate.backgroundColor}
                  backgroundImage={currentTemplate.backgroundImage}
                  showGrid={false}
                  onAreaClick={handleAreaClick}
                />
              )}
            </div>
          ) : (
            // 空状态 - 提示选择模板
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto mb-6 text-nebula-text-accent opacity-50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
                <h2 className="text-2xl font-medium text-nebula-text-primary mb-3 tracking-nebula-normal">
                  开始创建你的大屏
                </h2>
                <p className="text-nebula-text-muted mb-8 tracking-nebula-tight">
                  选择一个模板开始编辑，或者从空白画布开始
                </p>
                <button
                  onClick={() => setShowTemplateSelector(true)}
                  className="px-8 py-3 rounded-nebula-lg bg-nebula-glow-gradient text-white font-medium text-lg hover:shadow-nebula-button transition-all"
                >
                  选择模板
                </button>
              </div>

              {/* 装饰性元素 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-nebula-border-accent rounded-nebula-xl animate-nebula-pulse" />
                <div className="absolute bottom-32 right-32 w-48 h-48 border-2 border-nebula-border-accent rounded-nebula-2xl animate-nebula-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-nebula-text-accent rounded-full opacity-10" />
              </div>
            </div>
          )}
        </div>

        {/* 模板选择器弹窗 */}
        {showTemplateSelector && (
          <TemplateSelector
            onSelect={handleTemplateSelect}
            onClose={() => setShowTemplateSelector(false)}
          />
        )}
      </div>
    </ToolsSideBar>
  );
}
