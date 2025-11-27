/**
 * 基础组件配置面板
 * 根据组件类型显示对应的配置项
 */

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { 
  BasicComponentsType,
  TextComponentProps,
  TitleComponentProps,
  ImageComponentProps,
  TimeComponentProps,
  MarqueeComponentProps,
  ContainerComponentProps,
} from "@/types/charts-components";
import ColorPicker from "./ColorPicker";

interface BasicConfigPanelProps {
  componentType: BasicComponentsType;
  componentOptions?: any;
  onApply: (options: any) => void;
  onDelete: () => void;
}

/**
 * 基础组件配置面板
 */
export default function BasicConfigPanel({ 
  componentType, 
  componentOptions, 
  onApply, 
  onDelete 
}: BasicConfigPanelProps) {
  // 根据组件类型渲染对应的配置面板
  const renderConfigPanel = () => {
    switch (componentType) {
      case "basic.text":
        return <TextConfig options={componentOptions} onApply={onApply} />;
      case "basic.title":
        return <TitleConfig options={componentOptions} onApply={onApply} />;
      case "basic.image":
        return <ImageConfig options={componentOptions} onApply={onApply} />;
      case "basic.time":
        return <TimeConfig options={componentOptions} onApply={onApply} />;
      case "basic.marquee":
        return <MarqueeConfig options={componentOptions} onApply={onApply} />;
      case "basic.container":
        return <ContainerConfig options={componentOptions} onApply={onApply} />;
      default:
        return (
          <div className="p-6 text-nebula-text-muted">
            不支持的组件类型
          </div>
        );
    }
  };

  return (
    <>
      {/* 配置表单 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {renderConfigPanel()}
      </div>
      
      {/* 底部操作栏 */}
      <div className="p-4 border-t border-nebula-divider-primary">
        <Button
          onClick={onDelete}
          className="w-full bg-red-300 hover:bg-red-500 hover:shadow-nebula-button text-white font-medium"
        >
          删除组件
        </Button>
      </div>
    </>
  );
}

/**
 * 文本组件配置
 */
function TextConfig({ options, onApply }: { options?: TextComponentProps; onApply: (options: any) => void }) {
  const [content, setContent] = useState(options?.content || "");
  const [fontSize, setFontSize] = useState(options?.fontSize || 16);
  const [color, setColor] = useState(options?.color || "#FFFFFF");
  const [fontWeight, setFontWeight] = useState(options?.fontWeight || 400);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(options?.textAlign || "left");
  const [fontFamily, setFontFamily] = useState(options?.fontFamily || "system-ui, -apple-system, sans-serif");

  useEffect(() => {
    setContent(options?.content || "");
    setFontSize(options?.fontSize || 16);
    setColor(options?.color || "#FFFFFF");
    setFontWeight(options?.fontWeight || 400);
    setTextAlign(options?.textAlign || "left");
    setFontFamily(options?.fontFamily || "system-ui, -apple-system, sans-serif");
  }, [options]);

  const handleApply = () => {
    onApply({
      ...options,
      content,
      fontSize,
      color,
      fontWeight,
      textAlign,
      fontFamily,
    });
  };

  return (
    <div className="p-6 space-y-5">
      <ConfigSection title="文本内容">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              文本内容
            </label>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入文本内容"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="文本样式">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                字体大小
              </label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                字体粗细
              </label>
              <Input
                type="number"
                value={fontWeight}
                onChange={(e) => setFontWeight(Number(e.target.value))}
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              文字颜色
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              对齐方式
            </label>
            <div className="grid grid-cols-3 gap-2">
              <OptionButton active={textAlign === "left"} onClick={() => setTextAlign("left")}>
                左对齐
              </OptionButton>
              <OptionButton active={textAlign === "center"} onClick={() => setTextAlign("center")}>
                居中
              </OptionButton>
              <OptionButton active={textAlign === "right"} onClick={() => setTextAlign("right")}>
                右对齐
              </OptionButton>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              字体
            </label>
            <Input
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              placeholder="字体名称"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>
        </div>
      </ConfigSection>

      <Button
        onClick={handleApply}
        className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium"
      >
        应用配置
      </Button>
    </div>
  );
}

/**
 * 标题组件配置
 */
function TitleConfig({ options, onApply }: { options?: TitleComponentProps; onApply: (options: any) => void }) {
  const [content, setContent] = useState(options?.content || "");
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5 | 6>(options?.level || 1);
  const [fontSize, setFontSize] = useState(options?.fontSize || 48);
  const [color, setColor] = useState(options?.color || "#3BE4FE");
  const [fontWeight, setFontWeight] = useState(options?.fontWeight || 700);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(options?.textAlign || "center");

  useEffect(() => {
    setContent(options?.content || "");
    setLevel(options?.level || 1);
    setFontSize(options?.fontSize || 48);
    setColor(options?.color || "#3BE4FE");
    setFontWeight(options?.fontWeight || 700);
    setTextAlign(options?.textAlign || "center");
  }, [options]);

  const handleApply = () => {
    onApply({
      ...options,
      content,
      level,
      fontSize,
      color,
      fontWeight,
      textAlign,
    });
  };

  return (
    <div className="p-6 space-y-5">
      <ConfigSection title="标题内容">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              标题文本
            </label>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入标题"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              标题级别 (H{level})
            </label>
            <Input
              type="number"
              min={1}
              max={6}
              value={level}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= 6) {
                  setLevel(val as 1 | 2 | 3 | 4 | 5 | 6);
                }
              }}
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="标题样式">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                字体大小
              </label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                字体粗细
              </label>
              <Input
                type="number"
                value={fontWeight}
                onChange={(e) => setFontWeight(Number(e.target.value))}
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              文字颜色
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              对齐方式
            </label>
            <div className="grid grid-cols-3 gap-2">
              <OptionButton active={textAlign === "left"} onClick={() => setTextAlign("left")}>
                左对齐
              </OptionButton>
              <OptionButton active={textAlign === "center"} onClick={() => setTextAlign("center")}>
                居中
              </OptionButton>
              <OptionButton active={textAlign === "right"} onClick={() => setTextAlign("right")}>
                右对齐
              </OptionButton>
            </div>
          </div>
        </div>
      </ConfigSection>

      <Button
        onClick={handleApply}
        className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium"
      >
        应用配置
      </Button>
    </div>
  );
}

/**
 * 图片组件配置
 */
function ImageConfig({ options, onApply }: { options?: ImageComponentProps; onApply: (options: any) => void }) {
  const [src, setSrc] = useState(options?.src || "");
  const [alt, setAlt] = useState(options?.alt || "");
  const [width, setWidth] = useState(options?.width || "100%");
  const [height, setHeight] = useState(options?.height || "100%");
  const [borderRadius, setBorderRadius] = useState(options?.borderRadius || 0);
  const [objectFit, setObjectFit] = useState<"contain" | "cover" | "fill" | "none" | "scale-down">(options?.objectFit || "contain");

  useEffect(() => {
    setSrc(options?.src || "");
    setAlt(options?.alt || "");
    setWidth(options?.width || "100%");
    setHeight(options?.height || "100%");
    setBorderRadius(options?.borderRadius || 0);
    setObjectFit(options?.objectFit || "contain");
  }, [options]);

  const handleApply = () => {
    onApply({
      ...options,
      src,
      alt,
      width,
      height,
      borderRadius,
      objectFit,
    });
  };

  return (
    <div className="p-6 space-y-5">
      <ConfigSection title="图片源">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              图片URL
            </label>
            <Input
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="请输入图片URL"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              替代文本
            </label>
            <Input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="图片描述"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="尺寸设置">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                宽度
              </label>
              <Input
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100%"
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                高度
              </label>
              <Input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="100%"
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              圆角
            </label>
            <Input
              type="number"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              填充方式
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionButton active={objectFit === "contain"} onClick={() => setObjectFit("contain")}>
                包含
              </OptionButton>
              <OptionButton active={objectFit === "cover"} onClick={() => setObjectFit("cover")}>
                覆盖
              </OptionButton>
              <OptionButton active={objectFit === "fill"} onClick={() => setObjectFit("fill")}>
                填充
              </OptionButton>
              <OptionButton active={objectFit === "none"} onClick={() => setObjectFit("none")}>
                原始
              </OptionButton>
            </div>
          </div>
        </div>
      </ConfigSection>

      <Button
        onClick={handleApply}
        className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium"
      >
        应用配置
      </Button>
    </div>
  );
}

/**
 * 时间组件配置
 */
function TimeConfig({ options, onApply }: { options?: TimeComponentProps; onApply: (options: any) => void }) {
  const [format, setFormat] = useState(options?.format || "YYYY-MM-DD HH:mm:ss");
  const [timezone, setTimezone] = useState(options?.timezone || "Asia/Shanghai");
  const [fontSize, setFontSize] = useState(options?.fontSize || 24);
  const [color, setColor] = useState(options?.color || "#3BE4FE");

  useEffect(() => {
    setFormat(options?.format || "YYYY-MM-DD HH:mm:ss");
    setTimezone(options?.timezone || "Asia/Shanghai");
    setFontSize(options?.fontSize || 24);
    setColor(options?.color || "#3BE4FE");
  }, [options]);

  const handleApply = () => {
    onApply({
      ...options,
      format,
      timezone,
      fontSize,
      color,
    });
  };

  return (
    <div className="p-6 space-y-5">
      <ConfigSection title="时间格式">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              格式字符串
            </label>
            <Input
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              placeholder="YYYY-MM-DD HH:mm:ss"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
            <p className="text-xs text-nebula-text-muted">
              例: YYYY-MM-DD HH:mm:ss
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              时区
            </label>
            <Input
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="Asia/Shanghai"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="显示样式">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              字体大小
            </label>
            <Input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              文字颜色
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>
        </div>
      </ConfigSection>

      <Button
        onClick={handleApply}
        className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium"
      >
        应用配置
      </Button>
    </div>
  );
}

/**
 * 滚动文字组件配置
 */
function MarqueeConfig({ options, onApply }: { options?: MarqueeComponentProps; onApply: (options: any) => void }) {
  const [content, setContent] = useState(options?.content || "");
  const [speed, setSpeed] = useState(options?.speed || 50);
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down">(options?.direction || "left");
  const [fontSize, setFontSize] = useState(options?.fontSize || 18);
  const [color, setColor] = useState(options?.color || "#FFFFFF");

  useEffect(() => {
    setContent(options?.content || "");
    setSpeed(options?.speed || 50);
    setDirection(options?.direction || "left");
    setFontSize(options?.fontSize || 18);
    setColor(options?.color || "#FFFFFF");
  }, [options]);

  const handleApply = () => {
    onApply({
      ...options,
      content,
      speed,
      direction,
      fontSize,
      color,
    });
  };

  return (
    <div className="p-6 space-y-5">
      <ConfigSection title="滚动内容">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              文本内容
            </label>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入滚动文字"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              滚动速度
            </label>
            <Input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              滚动方向
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionButton active={direction === "left"} onClick={() => setDirection("left")}>
                向左
              </OptionButton>
              <OptionButton active={direction === "right"} onClick={() => setDirection("right")}>
                向右
              </OptionButton>
              <OptionButton active={direction === "up"} onClick={() => setDirection("up")}>
                向上
              </OptionButton>
              <OptionButton active={direction === "down"} onClick={() => setDirection("down")}>
                向下
              </OptionButton>
            </div>
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="文字样式">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              字体大小
            </label>
            <Input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              文字颜色
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>
        </div>
      </ConfigSection>

      <Button
        onClick={handleApply}
        className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium"
      >
        应用配置
      </Button>
    </div>
  );
}

/**
 * 容器组件配置
 */
function ContainerConfig({ options, onApply }: { options?: ContainerComponentProps; onApply: (options: any) => void }) {
  const [backgroundColor, setBackgroundColor] = useState(options?.backgroundColor || "rgba(8, 19, 36, 0.6)");
  const [borderColor, setBorderColor] = useState(options?.borderColor || "#3BE4FE");
  const [borderWidth, setBorderWidth] = useState(options?.borderWidth || 1);
  const [borderRadius, setBorderRadius] = useState(options?.borderRadius || 8);
  const [padding, setPadding] = useState(options?.padding || 16);

  useEffect(() => {
    setBackgroundColor(options?.backgroundColor || "rgba(8, 19, 36, 0.6)");
    setBorderColor(options?.borderColor || "#3BE4FE");
    setBorderWidth(options?.borderWidth || 1);
    setBorderRadius(options?.borderRadius || 8);
    setPadding(options?.padding || 16);
  }, [options]);

  const handleApply = () => {
    onApply({
      ...options,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      padding,
    });
  };

  return (
    <div className="p-6 space-y-5">
      <ConfigSection title="背景设置">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              背景颜色
            </label>
            <Input
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              placeholder="rgba(8, 19, 36, 0.6)"
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
            <p className="text-xs text-nebula-text-muted">
              支持 rgba、hex 等格式
            </p>
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="边框设置">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              边框颜色
            </label>
            <ColorPicker value={borderColor} onChange={setBorderColor} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                边框宽度
              </label>
              <Input
                type="number"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
                边框圆角
              </label>
              <Input
                type="number"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
              />
            </div>
          </div>
        </div>
      </ConfigSection>

      <ConfigSection title="内边距">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs text-nebula-text-secondary tracking-nebula-tight">
              内边距 (px)
            </label>
            <Input
              type="number"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
            />
          </div>
        </div>
      </ConfigSection>

      <Button
        onClick={handleApply}
        className="w-full bg-nebula-glow-gradient hover:shadow-nebula-button text-white font-medium"
      >
        应用配置
      </Button>
    </div>
  );
}

/**
 * 配置区域组件
 */
interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
}

function ConfigSection({ title, children }: ConfigSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-nebula-divider-primary">
        <div className="w-1 h-4 bg-nebula-text-accent rounded-full" />
        <h4 className="text-sm font-medium text-nebula-text-primary tracking-nebula-normal">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

/**
 * 选项按钮组件
 */
interface OptionButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function OptionButton({ active, onClick, children }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-nebula-md text-xs font-medium transition-all ${
        active
          ? "bg-nebula-text-accent text-white shadow-nebula-button"
          : "bg-nebula-bg-card border border-nebula-border-primary text-nebula-text-secondary hover:border-nebula-border-accent"
      }`}
    >
      {children}
    </button>
  );
}

