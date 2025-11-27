/**
 * 图表配置面板组件
 * 用于配置已选中的图表组件属性
 */

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ChartAttribute } from "@/types/charts-components";
import ColorPicker from "./ColorPicker";

interface ChartConfigPanelProps {
  chartConfig: ChartAttribute;
  onApply: (config: ChartAttribute) => void;
  onDelete: () => void;
}

/**
 * 图表配置面板
 */
export default function ChartConfigPanel({ chartConfig, onApply, onDelete }: ChartConfigPanelProps) {
  // ==================== 配置表单状态 ====================
  // 标题配置
  const [titleText, setTitleText] = useState<string>("");
  const [titleSubtext, setTitleSubtext] = useState<string>("");
  const [titleColor, setTitleColor] = useState<string>("#ffffff");
  const [titleFontSize, setTitleFontSize] = useState<number>(22);
  const [titlePosition, setTitlePosition] = useState<"left" | "center" | "right">("center");
  
  // 副标题样式
  const [subtitleColor, setSubtitleColor] = useState<string>("#cccccc");
  const [subtitleFontSize, setSubtitleFontSize] = useState<number>(14);
  
  // 图例配置
  const [legendShow, setLegendShow] = useState<boolean>(true);
  const [legendPosition, setLegendPosition] = useState<"left" | "center" | "right">("center");
  const [legendOrient, setLegendOrient] = useState<"horizontal" | "vertical">("horizontal");
  const [legendColor, setLegendColor] = useState<string>("#ffffff");
  const [legendFontSize, setLegendFontSize] = useState<number>(12);
  
  // 提示框配置
  const [tooltipShow, setTooltipShow] = useState<boolean>(true);
  const [tooltipTrigger, setTooltipTrigger] = useState<"item" | "axis">("item");

  // 坐标轴配置
  const [axisLabelColor, setAxisLabelColor] = useState<string>("#ffffff");
  const [axisLabelFontSize, setAxisLabelFontSize] = useState<number>(12);
  const [axisLineColor, setAxisLineColor] = useState<string>("#ffffff");

  // 系列配置
  const [smooth, setSmooth] = useState<boolean>(false); // 折线图平滑
  const [showLabel, setShowLabel] = useState<boolean>(false); // 显示数据标签

  // ==================== 判断图表是否为多系列 ====================
  const isMultiSeries = useMemo(() => {
    return chartConfig?.series && chartConfig.series.length > 1;
  }, [chartConfig]);

  // 判断图表是否有坐标轴
  const hasAxis = useMemo(() => {
    return chartConfig?.xAxis !== undefined || chartConfig?.yAxis !== undefined;
  }, [chartConfig]);

  // ==================== 当配置改变时，更新表单状态 ====================
  useEffect(() => {
    if (chartConfig) {
      // 标题配置
      setTitleText(chartConfig.title?.text || "");
      setTitleSubtext(chartConfig.title?.subtext || "");
      setTitleColor(chartConfig.title?.textStyle?.color || "#ffffff");
      setTitleFontSize(chartConfig.title?.textStyle?.fontSize || 22);
      setTitlePosition(chartConfig.title?.left || "center");
      
      // 副标题样式
      setSubtitleColor(chartConfig.title?.subtextStyle?.color || "#cccccc");
      setSubtitleFontSize(chartConfig.title?.subtextStyle?.fontSize || 14);
      
      // 图例配置
      setLegendShow(chartConfig.legend?.show !== false);
      setLegendPosition(chartConfig.legend?.left || "center");
      setLegendOrient(chartConfig.legend?.orient || "horizontal");
      setLegendColor(chartConfig.legend?.textStyle?.color || "#ffffff");
      setLegendFontSize(chartConfig.legend?.textStyle?.fontSize || 12);
      
      // 提示框配置
      setTooltipShow(chartConfig.tooltip?.show !== false);
      setTooltipTrigger(chartConfig.tooltip?.trigger || "item");
      
      // 坐标轴配置
      setAxisLabelColor(chartConfig.xAxis?.axisLabel?.color || "#ffffff");
      setAxisLabelFontSize(chartConfig.xAxis?.axisLabel?.fontSize || 12);
      setAxisLineColor(chartConfig.xAxis?.axisLine?.lineStyle?.color || "#ffffff");
      
      // 系列配置
      if (chartConfig.series && chartConfig.series[0]) {
        setSmooth(chartConfig.series[0].smooth || false);
        setShowLabel(chartConfig.series[0].label?.show || false);
      }
    }
  }, [chartConfig]);

  /**
   * 应用配置到图表
   */
  const handleApply = () => {
    // 构建新的配置对象
    const newConfig: ChartAttribute = {
      ...chartConfig,
      // 标题配置
      title: {
        ...chartConfig?.title,
        text: titleText,
        subtext: titleSubtext,
        left: titlePosition,
        textStyle: {
          ...chartConfig?.title?.textStyle,
          color: titleColor,
          fontSize: titleFontSize,
        },
        subtextStyle: {
          ...chartConfig?.title?.subtextStyle,
          color: subtitleColor,
          fontSize: subtitleFontSize,
        },
      },
      // 图例配置
      legend: {
        ...chartConfig?.legend,
        show: legendShow,
        left: legendPosition,
        orient: legendOrient,
        textStyle: {
          color: legendColor,
          fontSize: legendFontSize,
        },
      },
      // 提示框配置
      tooltip: {
        ...chartConfig?.tooltip,
        show: tooltipShow,
        trigger: tooltipTrigger,
      },
      // X轴配置
      xAxis: chartConfig?.xAxis ? {
        ...chartConfig.xAxis,
        axisLabel: {
          ...chartConfig.xAxis.axisLabel,
          color: axisLabelColor,
          fontSize: axisLabelFontSize,
        },
        axisLine: {
          ...chartConfig.xAxis.axisLine,
          lineStyle: {
            ...chartConfig.xAxis.axisLine?.lineStyle,
            color: axisLineColor,
          },
        },
      } : undefined,
      // Y轴配置
      yAxis: chartConfig?.yAxis ? {
        ...chartConfig.yAxis,
        axisLabel: {
          ...chartConfig.yAxis.axisLabel,
          color: axisLabelColor,
          fontSize: axisLabelFontSize,
        },
        axisLine: {
          ...chartConfig.yAxis.axisLine,
          lineStyle: {
            ...chartConfig.yAxis.axisLine?.lineStyle,
            color: axisLineColor,
          },
        },
      } : undefined,
      // 系列配置 - 应用到所有系列
      series: chartConfig?.series?.map(series => ({
        ...series,
        smooth: series.type === 'line' ? smooth : undefined,
        label: {
          ...series.label,
          show: showLabel,
        },
      })),
    };

    onApply(newConfig);
  };

  return (
    <>
      {/* ==================== 配置表单 ==================== */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="space-y-5">
          {/* ==================== 标题配置区域 ==================== */}
          <ConfigSection title="标题配置">
            <div className="space-y-3">
              {/* 主标题文本 */}
              <div className="space-y-2">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  主标题文本
                </label>
                <Input
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  placeholder="请输入图表标题"
                  className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
                />
              </div>
              
              {/* 主标题样式 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    标题颜色
                  </label>
                  <ColorPicker value={titleColor} onChange={setTitleColor} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    字体大小
                  </label>
                  <Input
                    type="number"
                    value={titleFontSize}
                    onChange={(e) => setTitleFontSize(Number(e.target.value))}
                    className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
                  />
                </div>
              </div>

              {/* 标题位置 */}
              <div className="space-y-2">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  标题位置
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <OptionButton active={titlePosition === "left"} onClick={() => setTitlePosition("left")}>
                    左侧
                  </OptionButton>
                  <OptionButton active={titlePosition === "center"} onClick={() => setTitlePosition("center")}>
                    居中
                  </OptionButton>
                  <OptionButton active={titlePosition === "right"} onClick={() => setTitlePosition("right")}>
                    右侧
                  </OptionButton>
                </div>
              </div>
              
              {/* 副标题文本 */}
              <div className="space-y-2">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  副标题文本
                </label>
                <Input
                  value={titleSubtext}
                  onChange={(e) => setTitleSubtext(e.target.value)}
                  placeholder="请输入副标题"
                  className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary placeholder:text-nebula-text-muted focus-visible:ring-nebula-border-accent"
                />
              </div>

              {/* 副标题样式 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    副标题颜色
                  </label>
                  <ColorPicker value={subtitleColor} onChange={setSubtitleColor} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    副标题字号
                  </label>
                  <Input
                    type="number"
                    value={subtitleFontSize}
                    onChange={(e) => setSubtitleFontSize(Number(e.target.value))}
                    className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* ==================== 图例配置区域 ==================== */}
          <ConfigSection 
            title="图例配置"
            tip={!isMultiSeries ? "提示：只有多系列图表才会显示图例" : undefined}
            disabled={!isMultiSeries}
          >
            <div className="space-y-3">
              {/* 是否显示图例 */}
              <div className="flex items-center justify-between p-3 rounded-nebula-md bg-nebula-bg-card border border-nebula-border-primary">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  显示图例
                </label>
                <ToggleSwitch checked={legendShow} onChange={setLegendShow} disabled={!isMultiSeries} />
              </div>

              {/* 图例位置 */}
              <div className="space-y-2">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  图例位置
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <OptionButton active={legendPosition === "left"} onClick={() => setLegendPosition("left")}>
                    左侧
                  </OptionButton>
                  <OptionButton active={legendPosition === "center"} onClick={() => setLegendPosition("center")}>
                    居中
                  </OptionButton>
                  <OptionButton active={legendPosition === "right"} onClick={() => setLegendPosition("right")}>
                    右侧
                  </OptionButton>
                </div>
              </div>

              {/* 图例方向 */}
              <div className="space-y-2">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  图例方向
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <OptionButton active={legendOrient === "horizontal"} onClick={() => setLegendOrient("horizontal")}>
                    水平
                  </OptionButton>
                  <OptionButton active={legendOrient === "vertical"} onClick={() => setLegendOrient("vertical")}>
                    垂直
                  </OptionButton>
                </div>
              </div>

              {/* 图例样式 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    文字颜色
                  </label>
                  <ColorPicker value={legendColor} onChange={setLegendColor} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    字体大小
                  </label>
                  <Input
                    type="number"
                    value={legendFontSize}
                    onChange={(e) => setLegendFontSize(Number(e.target.value))}
                    className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* ==================== 提示框配置区域 ==================== */}
          <ConfigSection title="提示框配置">
            <div className="space-y-3">
              {/* 是否显示提示框 */}
              <div className="flex items-center justify-between p-3 rounded-nebula-md bg-nebula-bg-card border border-nebula-border-primary">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  显示提示框
                </label>
                <ToggleSwitch checked={tooltipShow} onChange={setTooltipShow} />
              </div>
              
              {/* 触发方式选择 */}
              {tooltipShow && (
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    触发方式
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <OptionButton active={tooltipTrigger === "item"} onClick={() => setTooltipTrigger("item")}>
                      数据项
                    </OptionButton>
                    <OptionButton active={tooltipTrigger === "axis"} onClick={() => setTooltipTrigger("axis")}>
                      坐标轴
                    </OptionButton>
                  </div>
                </div>
              )}
            </div>
          </ConfigSection>

          {/* ==================== 坐标轴配置区域 ==================== */}
          {hasAxis && (
            <ConfigSection title="坐标轴配置">
              <div className="space-y-3">
                {/* 坐标轴标签样式 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                      标签颜色
                    </label>
                    <ColorPicker value={axisLabelColor} onChange={setAxisLabelColor} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                      标签字号
                    </label>
                    <Input
                      type="number"
                      value={axisLabelFontSize}
                      onChange={(e) => setAxisLabelFontSize(Number(e.target.value))}
                      className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
                    />
                  </div>
                </div>

                {/* 坐标轴线颜色 */}
                <div className="space-y-2">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    轴线颜色
                  </label>
                  <ColorPicker value={axisLineColor} onChange={setAxisLineColor} />
                </div>
              </div>
            </ConfigSection>
          )}

          {/* ==================== 系列配置区域 ==================== */}
          <ConfigSection title="系列配置">
            <div className="space-y-3">
              {/* 显示数据标签 */}
              <div className="flex items-center justify-between p-3 rounded-nebula-md bg-nebula-bg-card border border-nebula-border-primary">
                <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                  显示数据标签
                </label>
                <ToggleSwitch checked={showLabel} onChange={setShowLabel} />
              </div>
              
              {/* 折线图平滑 */}
              {chartConfig?.series?.[0]?.type === 'line' && (
                <div className="flex items-center justify-between p-3 rounded-nebula-md bg-nebula-bg-card border border-nebula-border-primary">
                  <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                    平滑曲线
                  </label>
                  <ToggleSwitch checked={smooth} onChange={setSmooth} />
                </div>
              )}
            </div>
          </ConfigSection>
        </div>
      </div>
      
      {/* ==================== 底部操作栏 ==================== */}
      <div className="p-4 border-t border-nebula-divider-primary">
        <Button
          onClick={handleApply}
          className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium mb-2"
        >
          应用配置
        </Button>
        <Button
          onClick={onDelete}
          className="w-full bg-red-300 hover:bg-red-500 hover:shadow-nebula-button text-white font-medium"
        >
          删除组件
        </Button>
      </div>
    </>
  );
}

/**
 * 配置区域组件
 */
interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  tip?: string;
  disabled?: boolean;
}

function ConfigSection({ title, children, tip, disabled }: ConfigSectionProps) {
  return (
    <div className={`space-y-3 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-2 pb-2 border-b border-nebula-divider-primary">
        <div className="w-1 h-4 bg-nebula-text-accent rounded-full" />
        <h4 className="text-sm font-medium text-nebula-text-primary tracking-nebula-normal">
          {title}
        </h4>
      </div>
      
      {tip && (
        <div className="flex items-start gap-2 p-2 rounded-nebula-md bg-nebula-bg-card border border-nebula-divider-accent">
          <svg
            className="w-4 h-4 text-nebula-text-accent flex-shrink-0 mt-0.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs text-nebula-text-secondary leading-relaxed">
            {tip}
          </span>
        </div>
      )}
      
      <div className={disabled ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
}

/**
 * 开关组件
 */
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? "bg-nebula-text-accent" : "bg-nebula-divider-primary"
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/**
 * 选项按钮组件
 */
interface OptionButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function OptionButton({ active, onClick, children }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-nebula-md text-xs font-medium transition-all ${
        active
          ? "bg-nebula-text-accent text-white shadow-nebula-button"
          : "bg-nebula-bg-card border border-nebula-border-primary text-nebula-text-secondary hover:border-nebula-border-accent"
      }`}
    >
      {children}
    </button>
  );
}

