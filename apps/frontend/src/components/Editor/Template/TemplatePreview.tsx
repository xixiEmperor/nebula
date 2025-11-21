import type { ScreenTemplate, FreeLayoutTemplate } from "@/types/template";

interface TemplatePreviewProps {
  template: ScreenTemplate | FreeLayoutTemplate;
  isSelected?: boolean;
  onClick?: () => void;
}

/**
 * 模板预览卡片组件
 * 展示模板的缩略图和基本信息
 */
export default function TemplatePreview({
  template,
  isSelected = false,
  onClick,
}: TemplatePreviewProps) {
  // 获取分类显示名称
  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      basic: "基础",
      dashboard: "仪表盘",
      monitor: "监控",
      "data-analysis": "数据分析",
      custom: "自定义",
    };
    return categoryMap[category] || category;
  };

  return (
    <div
      className={`
        relative group cursor-pointer rounded-nebula-lg overflow-hidden
        border-2 transition-all duration-300
        ${
          isSelected
            ? "border-nebula-border-accent shadow-nebula-glow"
            : "border-nebula-border-primary hover:border-nebula-border-accent"
        }
        bg-nebula-bg-card backdrop-blur-glass
      `}
      onClick={onClick}
    >
      {/* 模板预览区域 */}
      <div className="relative aspect-video bg-nebula-bg-primary p-2">
        {/* 简化的模板网格预览 */}
        {
          template.layoutMode === "grid" ?         
          (
          <div
            className="w-full h-full relative"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${template.gridCols}, 1fr)`,
              gridTemplateRows: `repeat(${template.gridRows}, 1fr)`,
              gap: "1px",
              backgroundColor: "rgba(59, 228, 254, 0.1)",
            }}
          >
            {template.areas.map((area) => (
              <div
                key={area.id}
                className="bg-nebula-accent-gradient opacity-40 group-hover:opacity-60 transition-opacity rounded-sm"
                style={{
                  gridColumn: `${area.x + 1} / span ${area.w}`,
                  gridRow: `${area.y + 1} / span ${area.h}`,
                }}
              />
            ))}
          </div>
          ) : (
            <div 
              className="w-full h-full relative"
              style={{
                backgroundColor: "rgba(59, 228, 254, 0.1)",
              }}
            > 
              {template.areas.map((area) => (
                <div key={area.id} className="w-full h-full relative" />
              ))}
            </div>
          )
        }


        {/* 选中标识，如果选中则在右上角显示一个勾 */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-nebula-text-accent flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* 模板信息 */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-nebula-text-primary font-medium text-base tracking-nebula-tight">
            {template.name}
          </h3>
          <span className="text-xs px-2 py-1 rounded bg-nebula-glow-gradient text-white">
            {getCategoryName(template.category)}
          </span>
        </div>
        <p className="text-nebula-text-muted text-sm tracking-nebula-tight line-clamp-2">
          {template.description}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-nebula-text-muted">
          <span>{template.areas.length} 个区域</span>
          {
            template.layoutMode === "grid" && (
              <span>
                {template.gridCols}×{template.gridRows} 网格
              </span>
            )
          }
        </div>
      </div>

      {/* Hover效果 */}
      <div className="absolute inset-0 rounded-nebula-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-nebula-text-accent rounded-tl-nebula-lg" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-nebula-text-accent rounded-tr-nebula-lg" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-nebula-text-accent rounded-bl-nebula-lg" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-nebula-text-accent rounded-br-nebula-lg" />
      </div>
    </div>
  );
}

