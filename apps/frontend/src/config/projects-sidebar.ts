import type { DropdownContent, SidebarContent } from "@/components/Projects/types/sidebarConfig";
import { Settings, LogOut, Clock, Waypoints, BookOpen } from "lucide-react";

/** 用户头像下拉菜单内容 */
export const userDropdownContent: DropdownContent[] = [
  {
    icon: Settings,
    label: "个人中心",
    href: "/settings",
  },
  {
    icon: LogOut,
    label: "退出登录",
    // href: "/settings",
  }
];

/** 通知下拉菜单内容，暂时不需要 */
/** TODO：实现多人协同编辑 */
// export const noticeDropdownContent: NoticeDropdownContent[] = [
//   {
//     icon: Bell,
//     label: "Settings",
//     href: "/settings",
//   },
// ];

/** 项目界面菜单选项 */
export const projectSidebarContent: SidebarContent[] = [
  {
    icon: Clock,
    label: "我的项目",
    href: "/projects/my-projects",
  },  
  {
    icon: Waypoints,
    label: "共创项目",
    href: "/projects/shared-projects",
  },
  {
    icon: BookOpen,
    label: "社区项目",
    href: "/projects/community-projects",
  }
];
