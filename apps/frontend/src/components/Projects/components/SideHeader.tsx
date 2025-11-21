import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown } from "lucide-react";
import { userDropdownContent } from "@/config/projects-sidebar";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStroe";

function UserDropdown() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      {/* 下拉菜单的触发器，控制下拉菜单的显示和隐藏 */}
      <DropdownMenuTrigger className="flex-1 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0">
        <SidebarMenuButton className="flex hover:bg-nebula-bg-secondary active:bg-nebula-bg-secondary data-[state=open]:bg-nebula-bg-secondary outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0">
          <div className="flex items-center gap-1">
              <User size={20} color="white"/>
              <span className="text-nebula-text-primary">{user?.username}</span>
              <ChevronDown size={16} color="white"/>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      {/* 下拉菜单的内容 */}
      <DropdownMenuContent className="border-none w-[250px] bg-nebula-dark-gradient rounded-[12px] mt-2 p-4">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col justify-center items-center">
            <div className="rounded-full p-2 border border-nebula-border-accent">
              <User color="white" size={28}/>
            </div>
            <p className="text-nebula-text-primary font-normal text-sm mt-2">{user?.username}</p>
            <p className="text-nebula-text-primary font-normal text-[12px] mt-1">{user?.email || ""}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          { userDropdownContent.map((item) => (
            <DropdownMenuItem 
              key={item.label}
              className="hover:!bg-nebula-info active:bg-nebula-bg-secondary mt-2" 
              onClick={() => {
                if (item.label === "退出登录") {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userInfo");
                  navigate("/");
                  return
                }
                navigate(item.href);
              }}
            >
              <item.icon color="white"/>
              <p className="text-nebula-text-primary">{item.label}</p>
            </DropdownMenuItem>
          )) }

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function SideHeader() {
  return (
    <>
      <SidebarMenu>
        {/* 侧边栏菜单的具体菜单项 */}
        <SidebarMenuItem className="flex justify-between gap-4">
          {/* 用户头像下拉菜单 */}
          <UserDropdown/>

          {/* 多人协作通知，暂未实现 */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <SidebarMenuButton className="bg-blue-500">
                <Bell />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

            </DropdownMenuContent>
          </DropdownMenu> */}
        </SidebarMenuItem>

      </SidebarMenu>
    </>
  )
}