/**
 * 路由配置文件
 * 定义应用的所有路由
 */

import { createBrowserRouter } from "react-router-dom"
import { lazy } from "react"

// 懒加载页面组件
const Index = lazy(() => import("@/pages/index"))
const AuthPage = lazy(() => import("@/pages/auth"))
const Projects = lazy(() => import("@/pages/projects"))
const StyleShowcase = lazy(() => import("@/pages/style-showcase"))
const EditorPage = lazy(() => import("@/pages/editor"))
const Project = lazy(() => import("@/components/Projects/components/Project"))
const ComponentsLibraryPage = lazy(() => import("@/pages/components"))
const TemplatesLibraryPage = lazy(() => import("@/pages/templates"))
const RJSFDemo = lazy(() => import("@/components/Editor/SettingBar/setting-form"))

/**
 * 路由配置
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Index,
  },
  {
    path: "/login",
    Component: AuthPage,
  },
  {

   path: "/rjsf-demo",
   Component: RJSFDemo,
  },
  {
    path: "/projects",
    Component: Projects,
    children: [
      {
        index: true, // 默认路由
        Component: Project, // 重定向到项目列表
      },
      {
        path: "/projects/:category", // 动态路由
        Component: Project, // 使用动态路由参数来动态选择组件
      },
    ],
  },
  {
    path: "/editor",
    Component: EditorPage,
  },
  {
    path: "/components",
    Component: ComponentsLibraryPage,
  },
  {
    path: "/templates",
    Component: TemplatesLibraryPage,
  },
  {
    path: "/style-showcase",
    Component: StyleShowcase,
  }
])