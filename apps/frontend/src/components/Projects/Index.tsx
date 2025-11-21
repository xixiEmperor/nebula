import SideBar from "./components/SideBar"
import { Outlet } from "react-router-dom"

export default function Projects() {
  return (
    <div className="bg-nebula-bg-primary flex">
      <SideBar />
      <div className="w-full h-[100vh] overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}