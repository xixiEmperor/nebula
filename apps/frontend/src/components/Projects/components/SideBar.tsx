import { Sidebar, SidebarHeader, SidebarProvider, SidebarContent } from "@/components/ui/sidebar"
import SideHeader from "./SideHeader"
import SideNav from "./SideNav"

export default function SideBar() {
  return (
    <SidebarProvider className="w-fit">
      <Sidebar 
        className="w-[264px] h-[100vh] bg-nebula-bg-primary border-r border-nebula-border-accent"
        collapsible="none"
      >
        <SidebarHeader className="h-[65px] p-4 border-b border-nebula-border-accent">
          <SideHeader />
        </SidebarHeader>
        
        {/* 分割线组件 */}
        {/* <SidebarSeparator className="bg-nebula-border-accent"/> */}

        <SidebarContent>
          <SideNav />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}