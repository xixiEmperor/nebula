/**
 * 配置面板组件
 * 根据组件类型显示对应的配置面板（图表配置或基础组件配置）
 */

import { useComponentsRegistry } from "@/store/componentsRegistry";
import { useTemplateStroe } from "@/store/templateStore";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";
import type { ChartAttribute, BasicComponentsType } from "@/types/charts-components";
import EmptyState from "./EmptyState";
import ChartConfigPanel from "./ChartConfigPanel";
import BasicConfigPanel from "./BasicConfigPanel";

/**
 * 配置面板主组件
 */
export default function SettingBar() {
  // 从全局状态获取当前选中的区域和更新方法
  const {
    currentArea,
    setComponentsRegistry,
    deleteComponentsRegistry,
    resetCurrentArea,
  } = useComponentsRegistry(
    useShallow((state) => ({
      currentArea: state.currentArea,
      setComponentsRegistry: state.setComponentsRegistry,
      deleteComponentsRegistry: state.deleteComponentsRegistry,
      resetCurrentArea: state.resetCurrentArea,
    }))
  );

  // 从全局状态获取当前选中模板
  const { deleteArea } = useTemplateStroe(
    useShallow((state) => ({
      deleteArea: state.deleteArea,
    }))
  );

  // 获取当前选中区域的配置
  const pickedArea = useMemo(() => {
    const currArea = currentArea;
    return currArea === null ? null : currArea.attribute;
  }, [currentArea]);

  // 判断是否为基础组件
  const isBasicComponent = useMemo(() => {
    if (!pickedArea) return false;
    return pickedArea.type && (pickedArea.type as string).startsWith("basic.");
  }, [pickedArea]);

  // 判断是否为图表组件
  const isChartComponent = useMemo(() => {
    return pickedArea !== null && !isBasicComponent;
  }, [pickedArea, isBasicComponent]);

  /**
   * 应用图表配置
   */
  const handleChartApply = (newConfig: ChartAttribute) => {
    if (!currentArea) return;
    setComponentsRegistry(currentArea.areaId, newConfig);
  };

  /**
   * 应用基础组件配置
   */
  const handleBasicApply = (newOptions: any) => {
    if (!currentArea || !pickedArea) return;

    const newConfig = {
      ...pickedArea,
      options: newOptions,
    };

    setComponentsRegistry(currentArea.areaId, newConfig);
  };

  /**
   * 删除组件
   */
  const handleDelete = () => {
    if (!currentArea) return;
    deleteArea(currentArea.areaId);
    deleteComponentsRegistry(currentArea.areaId);
    resetCurrentArea();
  };

  return (
    <div className="w-full h-full flex flex-col bg-nebula-bg-secondary">
      {pickedArea === null ? (
        // ==================== 空状态UI ====================
        <EmptyState />
      ) : isChartComponent ? (
        // ==================== 图表配置面板 ====================
        <ChartConfigPanel
          chartConfig={pickedArea as ChartAttribute}
          onApply={handleChartApply}
          onDelete={handleDelete}
        />
      ) : isBasicComponent ? (
        // ==================== 基础组件配置面板 ====================
        <BasicConfigPanel
          componentType={pickedArea.type as BasicComponentsType}
          componentOptions={pickedArea.options}
          onApply={handleBasicApply}
          onDelete={handleDelete}
        />
      ) : null}

      {/* ==================== 自定义滚动条样式 ==================== */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #20262f;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3be4fe;
          border-radius: 3px;
          transition: background 0.2s;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #409ff8;
        }
      `}</style>
    </div>
  );
}
