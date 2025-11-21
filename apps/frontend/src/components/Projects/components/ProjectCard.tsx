// 项目卡片组件：用于在网格视图中展示单个项目的缩略图、标题与最后修改时间
import { Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
// 复用已有的项目卡片类型定义（列表与表格视图兼容）
import type { ProjectCardWithTable, ProjectCardWithList } from "@/components/Projects/types/projectCard"

// 支持两种结构：包含缩略图/描述的表格卡片与简化的列表卡片
type ProjectCardData = ProjectCardWithTable | ProjectCardWithList

// 组件入参：传入项目数据与可选的点击事件
interface ProjectCardProps {
  project: ProjectCardData
  className?: string
  onClick?: () => void
}

export default function ProjectCard({ project, className, onClick }: ProjectCardProps) {
  // 判断是否有缩略图；没有则使用占位样式
  const hasThumb = "thumbnail" in project && !!project.thumbnail
  // 日期展示与列表保持一致
  const formattedDate = project.lastModified.toLocaleDateString()

  return (
    <article
      className={cn(
        "group bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl overflow-hidden transition-all hover:border-nebula-border-accent hover:shadow-nebula-glow",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* 缩略图区域：固定 16:9 比例 */}
      <div className="aspect-video">
        {hasThumb ? (
          <img
            src={(project as ProjectCardWithTable).thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          // 无图占位：深色渐变背景 + 图片图标
          <div className="w-full h-full bg-nebula-dark-gradient flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-white/70" />
          </div>
        )}
      </div>

      {/* 信息区：左侧标题 + 右侧最后修改时间 */}
      <div className="p-3 flex items-center justify-between">
        <h3 className="text-nebula-text-primary text-sm font-medium truncate">
          {project.title}
        </h3>
        <span className="text-nebula-text-secondary text-xs whitespace-nowrap">
          最后修改 {formattedDate}
        </span>
      </div>
    </article>
  )
}