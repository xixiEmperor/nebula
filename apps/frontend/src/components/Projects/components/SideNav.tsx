import { projectSidebarContent } from "@/config/projects-sidebar"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup } from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router-dom"

export default function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <SidebarGroup className="text-nebula-text-primary">
      <SidebarMenu>
        {projectSidebarContent.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <SidebarMenuItem 
              key={item.label}
              className="mt-3"
            >
              <SidebarMenuButton 
                isActive={isActive}
                className="h-[40px] hover:bg-nebula-bg-secondary active:bg-nebula-gradient data-[state-open]:bg-nebula-gradient hover:text-nebula-text-accent active:text-nebula-text-accent data-[active=true]:bg-nebula-gradient"
                onClick={() => {
                  if (item.href) {
                    navigate(item.href)
                  }
                }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}