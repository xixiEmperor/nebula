import Header from "./Header/Header"
import { Button } from "./ui/button"
// import { useUserStore } from "@/store/userStroe"
import { useNavigate } from "react-router-dom"

/**
 * 首页内容区域：进行轻微美化（微动效、阴影、可读性优化），保持原有风格与布局意图
 */
function Content() {
  const navigate = useNavigate()
  // const { user } = useUserStore(state => ({
  //   user: state.user,
  // }))

  const handleClick = () => {
    navigate("login")
  }

  return (
    <>
      {/* 主体容器：在桌面端居中，移动端垂直堆叠，增强响应式体验 */}
      <div className="relative z-10 w-full md:h-[500px] h-auto flex md:flex-row flex-col md:justify-evenly justify-center items-center md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:px-[100px] px-6 gap-8">
        {/* 左边 */}
        <div className="flex flex-col justify-around md:h-full w-full md:max-w-[50%]">
          <div>
            <h1 className="text-[40px] md:text-[52px] font-bold text-white tracking-[5px] md:tracking-[8px] leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.12)]">
              将您的数据快速搭建为您的<br />智能可视化大屏
            </h1>
            <p className="text-white/90 mt-[20px] leading-relaxed max-w-[560px]">
              通过拖拽和配置，快速构建数据大屏,打造你的专属数据大屏
            </p>
          </div>

          {/* 两个按钮：增加微动效与可访问性，不改变原有配色风格 */}
          <div className="flex gap-[20px] mt-[24px]">
            <Button
              className="w-[200px] h-[40px] font-[600] tracking-[2px] rounded-[20px] bg-gradient-to-r from-[#409ff8] to-[#38cdf1] shadow-[0_0_10px_rgba(56,205,241,0.35)] transition-all duration-300 hover:from-[#38cdf1] hover:to-[#409ff8] hover:shadow-[0_0_20px_rgba(56,205,241,0.45)] focus-visible:ring-2 focus-visible:ring-[#3be4fe] focus-visible:ring-offset-0"
              aria-label="开始使用"
              onClick={handleClick}
            >
              开始使用
            </Button>
            <Button
              className="w-[150px] h-[40px] rounded-[20px] bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0"
              aria-label="查看模板"
              onClick={() => navigate('/templates')}
            >
              查看模板
            </Button>
          </div>
        </div>

        {/* 右边：卡片加入轻量玻璃效果与柔和发光，维持主题蓝色系 */}
        <div className="w-full md:w-[450px] h-[380px] flex flex-col gap-[20px] justify-center items-center border border-[#3be4fe]/50 shadow-lg rounded-[20px] bg-[rgba(32,38,47,0.75)] backdrop-blur-sm p-[25px] ring-1 ring-[#3be4fe]/20 hover:ring-[#3be4fe]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,228,254,0.30)]">
          <h1 className="text-[28px] md:text-[36px] font-[600] text-[#3be4fe] tracking-[2px] text-center leading-snug">
            数据可视化新纪元：将复杂信息转化为智能视觉盛宴
          </h1>
          <p className="text-white/85 text-[14px] leading-relaxed text-center">
            告别繁琐代码，通过直观的拖拽式编辑器，快速、灵活地构建专业级数据大屏。一站式连接您的多源数据，实现实时监控与深度洞察，为每一次决策提供强有力的数据支持。
          </p>
          <Button
            className="w-full h-[40px] font-[600] tracking-[2px] rounded-[20px] bg-gradient-to-r from-[#409ff8] to-[#38cdf1] transition-all duration-300 hover:from-[#38cdf1] hover:to-[#409ff8] hover:shadow-[0_0_18px_rgba(56,205,241,0.40)] focus-visible:ring-2 focus-visible:ring-[#3be4fe] focus-visible:ring-offset-0"
            aria-label="多元组件"
            onClick={() => navigate('/components')}
          >
            多元组件
          </Button>
        </div>
      </div>
    </>
  )
}

/**
 * 首页容器：在背景上叠加轻量渐变层，提升对比度与可读性
 * 不改变原有深色+蓝色霓虹的视觉风格
 */
export default function Index() {
  return (
    <>
      <div className="relative min-h-screen bg-[url('/src/assets/images/welcome-bg.png')] bg-cover bg-center">
        {/* 背景叠层：微弱的深色渐变，避免文字与复杂背景的冲突 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(0,0,0,0.35)] via-[rgba(0,0,0,0.20)] to-[rgba(0,0,0,0.45)] pointer-events-none" />
        <Header />
        <Content />
      </div>
    </>
  )
}