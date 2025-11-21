import { useMemo, useState } from "react"
import { allKindsOfCharts } from "@/config/charts_index"
import type { ConponentsAttribute } from "@/types/components"
import Header from "./Header/Header"

// 组件库页面（核心展示组件）
// 插件化设计：页面仅依赖 allKindsOfCharts 的配置聚合，新增/修改组件只需在配置文件中完成，页面即自动展示
// - 配置来源：src/config/charts_index.ts 以及各 charts/* 配置文件
// - 展示内容：按类别（type）聚合的组件缩略图、名称、ID，支持搜索过滤

interface Category {
  id: string
  name: string
  type: string
  charts: ConponentsAttribute[]
}

export default function ComponentsLibrary() {
  // 类别集合，来源于统一的配置索引（插件化入口）
  const categories = allKindsOfCharts as Category[]

  // 当前选中类别（默认选中第一项）
  const [activeType, setActiveType] = useState<string>(categories[0]?.type || "")


  // 当前类别对象
  const activeCategory = useMemo(() => {
    return categories.find(c => c.type === activeType) || null
  }, [categories, activeType])

  // 当前列表（生产模式移除搜索过滤，直接展示当前类别）
  const charts = activeCategory?.charts || []

  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-nebula-bg-primary p-8">
        <div className="max-w-7xl mx-auto space-y-8 mt-[40px]">
          {/* 类别选择：生产级 tabs/pills 风格 */}
          <section className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {categories.map(cat => (
                <button
                  key={cat.type}
                  onClick={() => setActiveType(cat.type)}
                  className={[
                    "px-4 py-2 rounded-nebula-xl border text-sm transition-all",
                    activeType === cat.type
                      ? "bg-nebula-bg-secondary border-nebula-border-accent text-nebula-text-primary shadow-nebula-button"
                      : "bg-transparent border-nebula-border-primary text-nebula-text-secondary hover:text-nebula-text-primary hover:border-nebula-border-accent"
                  ].join(" ")}
                  aria-pressed={activeType === cat.type}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 组件卡片列表：统一卡片与悬浮效果，移除搜索与开发说明 */}
            {!activeCategory || charts.length === 0 ? (
              <div className="text-nebula-text-secondary text-sm">暂无可展示的组件</div>
            ) : (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))" }}
              >
                {charts.map((chart) => {
                  const thumbSrc = `/src/assets/thumbs/${chart.type}/${chart.id}.png`
                  return (
                    <article
                      key={chart.id}
                      className="group bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl overflow-hidden transition-all hover:border-nebula-border-accent hover:shadow-nebula-glow"
                    >
                      <div className="aspect-video bg-black/10">
                        <img
                          src={thumbSrc}
                          alt={chart.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      {/* <div className="p-3">
                        <h3 className="text-sm font-semibold text-nebula-text-primary truncate" title={chart.name}>{chart.name}</h3>
                      </div> */}
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}