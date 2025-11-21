import { useState } from "react";
import type { ScreenTemplate, FreeLayoutTemplate } from "@/types/template";
import { allTemplates, templatesByCategory } from "@/config/templates";
import TemplatePreview from "./TemplatePreview";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateSelectorProps {
  onSelect: (template: ScreenTemplate | FreeLayoutTemplate) => void;
  onClose?: () => void;
}

/**
 * 模板选择器组件
 * 展示所有可用模板，支持分类筛选和选择
 */
export default function TemplateSelector({
  onSelect,
  onClose,
}: TemplateSelectorProps) {
  // 选中的模板id
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  // 激活的分类
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // 模板点击: 点击后设置选中的模板id
  const handleTemplateClick = (template: ScreenTemplate | FreeLayoutTemplate) => {
    setSelectedTemplateId(template.id);
  };

  // 确认选择: 确认选择后调用onSelect回调
  const handleConfirm = () => {
    const selected = allTemplates.find((t) => t.id === selectedTemplateId);
    if (selected) {
      onSelect(selected);
    }
  };

  // 获取模板: 根据分类获取模板
  const getTemplatesByCategory = (category: string) => {
    if (category === "all") return allTemplates;
    return templatesByCategory[category as keyof typeof templatesByCategory] || [];
  };

  // 模板分类
  const categories = [
    { value: "all", label: "全部模板" },
    { value: "basic", label: "基础布局" },
    { value: "dashboard", label: "仪表盘" },
    { value: "monitor", label: "监控大屏" },
    { value: "data-analysis", label: "数据分析" },
    { value: "custom", label: "自定义" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90vw] h-[85vh] max-w-7xl bg-nebula-bg-secondary rounded-nebula-xl border-2 border-nebula-border-primary shadow-nebula-card overflow-hidden flex flex-col">
        {/* 标题栏 */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-nebula-divider-primary bg-nebula-bg-header backdrop-blur-nebula">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-nebula-gradient-cyan rounded-full" />
            <h2 className="text-xl font-medium text-nebula-text-primary tracking-nebula-normal">
              选择大屏模板
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-nebula-bg-glass transition-colors"
          >
            <svg
              className="w-5 h-5 text-nebula-text-secondary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 分类标签 */}
        <div className="px-6 py-4 bg-nebula-bg-primary/50">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="bg-nebula-bg-secondary h-12">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-nebula-glow-gradient data-[state=active]:text-white transition-all px-6"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* 模板网格 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTemplatesByCategory(activeCategory).map((template) => (
              <TemplatePreview
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onClick={() => handleTemplateClick(template)}
              />
            ))}
          </div>

          {/* 空状态 */}
          {getTemplatesByCategory(activeCategory).length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-nebula-text-muted">
              <svg
                className="w-16 h-16 mb-4 opacity-50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>暂无模板</p>
            </div>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="h-20 px-6 flex items-center justify-between border-t border-nebula-divider-primary bg-nebula-bg-header backdrop-blur-nebula">
          <div className="text-sm text-nebula-text-muted">
            {selectedTemplateId
              ? `已选择: ${
                  allTemplates.find((t) => t.id === selectedTemplateId)?.name
                }`
              : "请选择一个模板"}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-nebula-lg border border-nebula-border-primary text-nebula-text-secondary hover:border-nebula-border-accent hover:text-nebula-text-primary transition-all"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedTemplateId}
              className="px-6 py-2.5 rounded-nebula-lg bg-nebula-glow-gradient text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-nebula-button transition-all"
            >
              确认使用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

