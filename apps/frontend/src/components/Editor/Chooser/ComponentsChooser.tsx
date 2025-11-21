/**
 * 侧边栏组件选择组件，用于选择组件类型，相应的下面会给出对应的所有组件
 */

import { useState, useRef, useEffect }from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import type { ConponentsAttribute } from "@/types/components"
import { allKindsOfCharts } from "@/config/charts_index"
import { Pagination } from "antd"


interface ComponentsShowerProps {
  currentPageComponents: ConponentsAttribute[]
}

const componentsTypes = [
  {
    name: "柱状图",
    type: "bar-chart",
  },
  {
    name: "折线图",
    type: "line-chart",
  },
  {
    name: "饼图",
    type: "pie-chart",
  },
  {
    name: "散点图",
    type: "scatter-chart",
  },
  {
    name: "雷达图",
    type: "radar-chart",
  },
  {
    name: "仪表盘",
    type: "gauge-chart",
  },
  {
    name: "漏斗图",
    type: "funnel-chart",
  }
]

function ComponentsShower({ currentPageComponents }: ComponentsShowerProps) {

  // 初始化图标展示容器
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gap: "1rem",
    }}>
      {currentPageComponents.map((chart) => (
          <div
            id={`${chart.id}-sidebar`}
            key={chart.id}
            className="bg-nebula-glow-gradient border cursor-grab overflow-hidden
             border-nebula-border-accent rounded-nebula-xl shadow-nebula-glow"
            onDragStart={(e) => {
              // 原生拖拽api只能传递字符串，所以需要将组件配置对象转换为JSON字符串
              e.dataTransfer?.setData("text/plain", JSON.stringify(chart.options))
            }}
          >
            <img src={`/src/assets/thumbs/${chart.type}/${chart.id}.png`} alt=""  className="w-full h-full object-contain"/>
          </div>
      ))}
    </div>
  )
}

export default function ComponentsTypeSwitcher() {
  // 当前激活的组件，默认选中第一个
  const [activeComponent, setActiveComponent] = useState(componentsTypes[0])
  // 当前分页应该展示的组件列表
  const [currentPageComponents, setCurrentPageComponents] = useState<ConponentsAttribute[]>([])
  // 用户使用的组件类型列表
  const activeKindOfCharts = allKindsOfCharts.find((chart) => chart.type === activeComponent.type)?.charts || []

  useEffect(() => {
    setCurrentPageComponents(activeKindOfCharts.slice((currentPage.current - 1) * pageSize, currentPage.current * pageSize))
  }, [activeComponent])


  const pageSize = 2                                   // 每页显示的组件数量
  const total = activeKindOfCharts.length              // 组件总数
  const currentPage = useRef(1)                        // 当前页码

  return (
    <SidebarMenu className="flex flex-col">
      {/* 侧边栏功能切换栏 */}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-nebula-bg-secondary data-[state=open]:text-nebula-text-primary hover:bg-nebula-bg-secondary hover:text-nebula-text-primary hover:shadow-nebula-button"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-nebula-text-primary">
                  {activeComponent.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-nebula-bg-secondary border border-nebula-divider-primary"
            align="start"
            side="right"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-nebula-text-primary">
              组件类型选择
            </DropdownMenuLabel>
            {componentsTypes.map((component) => (
              <DropdownMenuItem
                key={component.name}
                onClick={() => {
                  setActiveComponent(component); 
                  currentPage.current = 1;
                }}
                className="gap-2 p-2 text-nebula-text-primary hover:!text-nebula-text-primary hover:!bg-nebula-bg-secondary hover:shadow-nebula-button"
              >
                {component.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {/* 组件选择器 */}
			<SidebarMenuItem className="flex-1 h-full">
          <ComponentsShower currentPageComponents={currentPageComponents} />
			</SidebarMenuItem>

      {/* 分页器 */}
      <SidebarFooter>
        <Pagination 
          className="w-full"
          align="center"
          defaultCurrent={currentPage.current} 
          total={total} 
          pageSize={pageSize}
          showTotal={(total) => `共 ${total} 个`}
          onChange={(page) => {
            currentPage.current = page
            setCurrentPageComponents(activeKindOfCharts.slice((page - 1) * pageSize, page * pageSize))
          }} 
        />
      </SidebarFooter>
    </SidebarMenu>
  )
}