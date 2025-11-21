import { allBasicComponents } from "@/config/basic_components";
import { 
  Type, 
  Heading, 
  Image as ImageIcon, 
  Clock, 
  ScrollText, 
  Box, 
  LayoutTemplate 
} from "lucide-react";

const iconMap: Record<string, any> = {
  "basic.text": Type,
  "basic.title": Heading,
  "basic.image": ImageIcon,
  "basic.time": Clock,
  "basic.marquee": ScrollText,
  "basic.container": Box,
};

export default function BasicComponentsShower() {
  return (
    <div className="grid grid-cols-2 gap-3 p-2 w-full">
      {allBasicComponents.map((component) => {
        const Icon = iconMap[component.type] || LayoutTemplate;
        
        return (
          <div
            key={component.id}
            draggable
            className={`
              flex flex-col items-center justify-center 
              aspect-square
              bg-nebula-bg-secondary 
              border border-nebula-divider-primary 
              rounded-lg 
              cursor-grab 
              hover:bg-nebula-bg-glass 
              hover:border-nebula-text-accent 
              hover:shadow-nebula-glow 
              transition-all duration-200
            `}
            onDragStart={(e) => {
              // 将组件配置转换为JSON字符串
              // 注入 type 和 isBasicComponent 标识，以便接收端区分处理
              e.dataTransfer.setData("text/plain", JSON.stringify({
                ...component.options,
                type: component.type,
                isBasicComponent: true,
                title: { text: component.name } // 兼容 FreeLayoutContainer 的命名逻辑
              }));
            }}
          >
            <div className="p-3 rounded-full bg-nebula-bg-primary mb-2 transition-transform">
              <Icon className="w-6 h-6 text-nebula-text-primary" />
            </div>
            <span className="text-xs text-nebula-text-muted font-medium">
              {component.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

