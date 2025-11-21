import { useMemo, useState } from "react"
import { templatesByCategory } from "@/config/templates"
import type { ScreenTemplate } from "@/types/template"
import TemplatePreview from "@/components/Editor/Template/TemplatePreview"
import Header from "./Header/Header"

// 模板库预览页面（核心展示组件）
// 插件化设计：页面仅依赖 templatesByCategory 的配置聚合，新增/修改模板只需在配置文件中完成，页面即自动展示
// - 配置来源：src/config/templates.ts
// - 展示内容：按类别（category）聚合的模板缩略图、名称、描述，支持类别切换

interface Category {
  id: string
  name: string
  type: string
  templates: ScreenTemplate[]
}

// 分类显示名称映射
const CATEGORY_NAME_MAP: Record<string, string> = {
  basic: "基础",
  dashboard: "仪表盘",
  monitor: "监控",
  "data-analysis": "数据分析",
  custom: "自定义",
}

export default function TemplatesLibrary() {
  // 类别集合，来源于统一的配置索引（插件化入口）
  const categories: Category[] = useMemo(() => {
    return Object.keys(templatesByCategory).map((key) => ({
      id: key,
      name: CATEGORY_NAME_MAP[key] || key,
      type: key,
      templates: templatesByCategory[key as keyof typeof templatesByCategory] || [],
    }))
  }, [])

  // 当前选中类别（默认选中第一项）
  const [activeType, setActiveType] = useState<string>(categories[0]?.type || "")

  // 当前类别对象
  const activeCategory = useMemo(() => {
    return categories.find((c) => c.type === activeType) || null
  }, [categories, activeType])

  // 当前列表
  const templates = activeCategory?.templates || []

  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-nebula-bg-primary p-8">
        <div className="max-w-7xl mx-auto space-y-8 mt-[40px]">
          {/* 类别选择：生产级 tabs/pills 风格 */}
          <section className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.type}
                  onClick={() => setActiveType(cat.type)}
                  className={[
                    "px-4 py-2 rounded-nebula-xl border text-sm transition-all",
                    activeType === cat.type
                      ? "bg-nebula-bg-secondary border-nebula-border-accent text-nebula-text-primary shadow-nebula-button"
                      : "bg-transparent border-nebula-border-primary text-nebula-text-secondary hover:text-nebula-text-primary hover:border-nebula-border-accent",
                  ].join(" ")}
                  aria-pressed={activeType === cat.type}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 模板卡片列表：统一卡片与悬浮效果 */}
            {!activeCategory || templates.length === 0 ? (
              <div className="text-nebula-text-secondary text-sm">暂无可展示的模板</div>
            ) : (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))" }}
              >
                {templates.map((template) => (
                  <TemplatePreview key={template.id} template={template} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}