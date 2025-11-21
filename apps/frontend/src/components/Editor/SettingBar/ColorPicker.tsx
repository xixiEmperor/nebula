import { Input } from "@/components/ui/input";

/**
 * 颜色选择器组件
 */
interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-9 rounded-nebula-md border border-nebula-border-primary bg-nebula-bg-card cursor-pointer"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-nebula-bg-card border-nebula-border-primary text-nebula-text-primary"
      />
    </div>
  );
}