import { Link } from "react-router-dom";
import { NavItems } from "@/config/header";

export default function Header() {
  return (
    <div className="border border-[#37bff58a] border-solid rounded-2xl bg-[rgba(8,19,36,0.9)] px-[40px] fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
      {/* 头部logo */}
      <Link to={'/'} className="w-[152px] h-[70px] flex items-center justify-center">
        <img src="/src/assets/images/logo.png" alt="logo" className="w-fit h-full object-contain"/>
      </Link>

      {/* 导航栏 */}
      <div className="flex items-center gap-[40px]">        
        {NavItems.map((item) => (
          <Link key={item.href} to={item.href} className="text-[#fff]">{item.label}</Link>
        ))}
        <Link to="/login">
          <div className="text-[#fff] text-sm rounded-2xl w-[100px] h-[30px] bg-gradient-to-r from-[#35c8f3] to-[#3c9ef9] text-center leading-[30px] ">
            登录/注册
          </div>
        </Link>
      </div>
    </div>
  )
}