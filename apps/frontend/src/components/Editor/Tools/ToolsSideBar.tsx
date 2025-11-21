/**
 * 侧边栏组件，集成了以下组件：
 * 1. 功能选择
 * 2. ComponentsTypeSwitcher：切换当前选中的要使用的组件的类型
 * 3. SettingBar：配置面板组件，当点击拖拽到模板中的组件后，可以对其进行配置更改
 * 4. children: 侧边栏右侧主页面，也就是拖拽组件的对应归处
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import ComponentsTypeSwitcher from "../Chooser/ComponentsChooser"
import BasicComponentsShower from "../Chooser/BasicComponentsShower"
import SettingBar from "../SettingBar/SettingBar"

export function AppSidebar() {
  return (
    <Sidebar className="h-[100vh] border-r border-nebula-divider-primary overflow-hidden">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-nebula-text-primary">功能选择</SidebarGroupLabel>
          <SidebarGroupContent>
						<Tabs defaultValue="components" className="w-full">
							<TabsList className="bg-nebula-bg-secondary h-12 w-full flex justify-evenly border-b border-nebula-divider-primary">
                <TabsTrigger 
									className="data-[state=active]:bg-nebula-glow-gradient data-[state=active]:text-white transition-all px-6" 
									value="basic-components"
								>
									基础组件
								</TabsTrigger>
								<TabsTrigger 
									className="data-[state=active]:bg-nebula-glow-gradient data-[state=active]:text-white transition-all px-6" 
									value="charts-components"
								>
									图表组件
								</TabsTrigger>
								<TabsTrigger 
									className="data-[state=active]:bg-nebula-glow-gradient data-[state=active]:text-white transition-all px-6" 
									value="settings"
								>
									属性配置
								</TabsTrigger>
							</TabsList>
							<TabsContent value="basic-components">
								<BasicComponentsShower />
							</TabsContent>
							<TabsContent value="charts-components">
								<ComponentsTypeSwitcher />
							</TabsContent>
							<TabsContent value="settings">
								<SettingBar />
							</TabsContent>
						</Tabs>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
 
export default function ToolsSideBar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar /> 
      <main className="w-full relative">
        <SidebarTrigger className="absolute top-[18px] left-0 z-[1] text-nebula-text-primary"/>
        {children}
      </main>
    </SidebarProvider>
  )
}
