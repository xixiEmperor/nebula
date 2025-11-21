import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { List, Grid } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import ProjectList from "./ProjectList"
import ProjectCard from "./ProjectCard"
import type { ProjectCardWithTable, ProjectCardWithList } from "@/components/Projects/types/projectCard"

type ProjectType = "我的项目" | "共创项目" | "社区项目"
type ProjectTypeEnum = "my-projects" | "shared-projects" | "community-projects"
type ViewType = "list" | "grid"

// 切换项目列表或网格视图
function ToggleView({viewType, onViewChange}: {viewType: ViewType, onViewChange: (value: ViewType) => void}) {
  // 模拟数据：混合包含缩略图的卡片与无缩略图的卡片
  type ProjectCardData = ProjectCardWithTable | ProjectCardWithList
  const mockProjects: ProjectCardData[] = [
    {
      id: "p-001",
      title: "营销看板",
      description: "渠道转化监控",
      thumbnail: "/src/assets/thumbs/gauge-chart/basic-gauge-chart.png",
      lastModified: new Date(),
      createdAt: new Date("2025-10-01"),
    } as ProjectCardWithTable,
    {
      id: "p-002",
      title: "供应链态势",
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      createdAt: new Date("2025-09-20"),
    } as ProjectCardWithList,
    {
      id: "p-003",
      title: "运营日报",
      description: "核心指标汇总",
      thumbnail: "/src/assets/thumbs/gauge-chart/temperature-gauge-chart.png",
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      createdAt: new Date("2025-08-12"),
    } as ProjectCardWithTable,
    {
      id: "p-004",
      title: "财务总览",
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      createdAt: new Date("2025-07-01"),
    } as ProjectCardWithList,
  ]

  return (
      <Tabs 
        value={viewType} 
        onValueChange={(value) => onViewChange(value as ViewType)}
        className="flex flex-col h-full"
      >
        {/* tab栏切换组件，改变项目的展示方式(列表 or 网格) */}
        <TabsList className="bg-nebula-bg-secondary self-end mr-4 mt-2">
          <TabsTrigger 
            value="list"
            className="data-[state=active]:bg-nebula-info transition-colors"
          >
            <List size={16} color="white"/>
          </TabsTrigger>
          <TabsTrigger 
            value="grid"
            className="data-[state=active]:bg-nebula-info transition-colors"
          >
            <Grid size={16} color="white"/>
          </TabsTrigger>
        </TabsList>
        {/* 项目列表或网格视图 */}
        <div className="flex-1 px-6">
          {
            viewType === "list" ? (
              <TabsContent value="list">
                <ProjectList />
              </TabsContent>
            ) : (
              <TabsContent value="grid">
                {/* 网格视图：渲染项目卡片 */}
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
                >
                  {mockProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              </TabsContent>
            )
          }
        </div>
      </Tabs>
  )
}

// 具体的项目展示
export default function Project() {
  const location = useLocation()
  const [projectType, setProjectType] = useState<ProjectTypeEnum>("my-projects")
  const [viewType, setViewType] = useState<ViewType>("list")
  const navigate = useNavigate()
  useEffect(() => {
    // 渲染完毕后根据路径设置项目类型
    setProjectType(location.pathname.split("/")[2] as ProjectTypeEnum)
  }, [location.pathname])

  const getTitle = (): ProjectType => {
    switch (projectType) {
      case "my-projects":
        return "我的项目"
      case "shared-projects":
        return "共创项目"
      case "community-projects":
        return "社区项目"
      default:
        return "我的项目"
    }
  }
  
  const title = getTitle()

  const handleViewChange = (newViewType: ViewType) => {
    setViewType(newViewType)
    // 这里可以添加其他逻辑，比如保存到 localStorage 或触发其他状态更新
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="h-[65px] border-b border-nebula-border-accent flex items-center justify-between px-[30px] tracking-[2px] text-nebula-text-primary text-lg">
        <span>{title}</span>
        <button 
          className="bg-nebula-glow-gradient text-white text-[14px] font-[550] px-6 py-3 rounded-nebula-xl h-[40px] flex items-center"
          onClick={() => navigate("/editor")}
        >
          新建项目
        </button>
      </div>
      <ToggleView viewType={viewType} onViewChange={handleViewChange} />
    </div>
  )
}