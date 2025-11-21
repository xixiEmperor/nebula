import { RouterProvider } from "react-router-dom"
import { router } from "@/router/router"
import { ConfigProvider } from "antd"


function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#000",
          colorText: "#fff",
          colorTextDisabled: "rgba(255,255,255,0.3)",
        },
        components: {
          Message: {
            contentBg: "linear-gradient(135deg, rgba(59,228,254,0.3) 0%, rgba(64,159,248,0.2) 50%, rgba(53,200,243,0.1) 100%)"
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
