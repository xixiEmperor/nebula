# NebulaScreen 样式主题指南

基于您的主页设计风格，我为 NebulaScreen 项目设计了一套完整的样式主题系统。这套主题以深蓝科技风格为核心，结合玻璃拟态设计和现代渐变效果。

## 🎨 主题特色

### 设计风格
- **深蓝科技风** - 以深蓝色为主色调，营造未来科技感
- **玻璃拟态设计** - 半透明背景和毛玻璃效果
- **渐变色彩** - 蓝色到青色的优雅渐变
- **现代圆角** - 统一的圆角设计语言
- **发光效果** - 动态光效和阴影

## 🎯 核心颜色系统

### Nebula 主题色彩
```css
/* 背景色彩 */
bg-nebula-bg-primary      /* #081324 - 深蓝主背景 */
bg-nebula-bg-secondary    /* #0f1c2e - 次要背景 */
bg-nebula-bg-card         /* #20262f - 卡片背景 */
bg-nebula-bg-glass        /* rgba(32,38,47,0.85) - 玻璃拟态背景 */
bg-nebula-bg-header       /* rgba(8,19,36,0.9) - 头部背景 */

/* 文字颜色 */
text-nebula-text-primary   /* #ffffff - 主要文字 */
text-nebula-text-secondary /* #cccccc - 次要文字 */
text-nebula-text-muted     /* #888888 - 弱化文字 */
text-nebula-text-accent    /* #3be4fe - 强调文字 */

/* 边框颜色 */
border-nebula-border-primary /* #37bff58a - 主要边框 */
border-nebula-border-accent  /* #3be4fe - 强调边框 */
border-nebula-border-glass   /* #2a3441 - 玻璃边框 */
```

## 🌈 渐变色系统

### 预设渐变背景
```css
bg-nebula-gradient          /* 主要渐变 135deg */
bg-nebula-gradient-reverse  /* 反向渐变 315deg */
bg-nebula-card-gradient     /* 卡片渐变背景 */
bg-nebula-border-gradient   /* 边框渐变 */
bg-glass-gradient          /* 玻璃渐变效果 */
```

### 使用示例
```html
<!-- 主要按钮 -->
<button class="bg-nebula-gradient text-white px-6 py-3 rounded-nebula-xl">
  开始使用
</button>

<!-- 玻璃卡片 -->
<div class="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl backdrop-blur-nebula">
  <h2 class="text-nebula-text-accent">标题</h2>
  <p class="text-nebula-text-secondary">内容描述</p>
</div>
```

## 💫 阴影和光效

### 预设阴影
```css
shadow-nebula-glow    /* 发光效果 */
shadow-nebula-card    /* 卡片阴影 */
shadow-nebula-button  /* 按钮阴影 */
shadow-glass         /* 玻璃阴影 */
shadow-glass-inset   /* 内阴影 */
```

### 使用示例
```html
<!-- 发光按钮 -->
<button class="bg-nebula-gradient shadow-nebula-button hover:shadow-nebula-glow transition-shadow">
  立即尝试
</button>

<!-- 玻璃卡片 -->
<div class="bg-nebula-bg-glass shadow-glass backdrop-blur-glass">
  卡片内容
</div>
```

## 🔄 动画系统

### 预设动画
```css
animate-nebula-pulse   /* 脉冲动画 */
animate-nebula-glow    /* 发光动画 */
animate-glass-shimmer  /* 光泽动画 */
```

### 使用示例
```html
<!-- 脉冲按钮 -->
<button class="animate-nebula-pulse bg-nebula-gradient">
  动态按钮
</button>

<!-- 发光元素 -->
<div class="animate-nebula-glow border border-nebula-border-accent">
  发光边框
</div>
```

## 📐 尺寸和间距

### 圆角系统
```css
rounded-nebula-sm    /* 8px */
rounded-nebula-md    /* 12px */
rounded-nebula-lg    /* 16px */
rounded-nebula-xl    /* 20px */
rounded-nebula-2xl   /* 24px */
```

### 字体间距
```css
tracking-nebula-tight  /* 1px */
tracking-nebula-normal /* 2px */
tracking-nebula-wide   /* 4px */
tracking-nebula-wider  /* 8px */
```

### 模糊效果
```css
backdrop-blur-nebula  /* 16px */
backdrop-blur-glass   /* 12px */
```

## 🎪 组件样式示例

### 1. 头部导航栏
```html
<header class="bg-nebula-bg-header border border-nebula-border-primary rounded-nebula-xl backdrop-blur-nebula">
  <div class="flex justify-between items-center px-10 py-4">
    <img src="/logo.png" alt="Logo" class="h-12">
    <nav class="flex gap-10">
      <a href="#" class="text-nebula-text-primary hover:text-nebula-text-accent">首页</a>
      <a href="#" class="text-nebula-text-primary hover:text-nebula-text-accent">项目</a>
    </nav>
    <button class="bg-nebula-gradient px-6 py-2 rounded-nebula-xl text-white">
      登录
    </button>
  </div>
</header>
```

### 2. 主要按钮
```html
<!-- 主要操作按钮 -->
<button class="bg-nebula-gradient hover:shadow-nebula-button text-white font-semibold px-8 py-3 rounded-nebula-xl tracking-nebula-normal transition-all">
  开始使用
</button>

<!-- 次要按钮 -->
<button class="bg-transparent border border-nebula-border-accent text-nebula-text-accent hover:bg-nebula-bg-glass px-6 py-3 rounded-nebula-xl transition-all">
  查看模板
</button>
```

### 3. 玻璃卡片
```html
<div class="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl shadow-glass backdrop-blur-nebula p-6">
  <h3 class="text-nebula-text-accent text-2xl font-semibold tracking-nebula-normal mb-4">
    数据可视化新纪元
  </h3>
  <p class="text-nebula-text-secondary text-sm opacity-80 mb-6">
    告别繁琐代码，通过直观的拖拽式编辑器，快速构建专业级数据大屏。
  </p>
  <button class="w-full bg-nebula-gradient py-3 rounded-nebula-xl text-white font-semibold tracking-nebula-normal">
    立即尝试
  </button>
</div>
```

### 4. 输入框
```html
<input 
  type="text" 
  placeholder="请输入内容"
  class="bg-nebula-bg-card border border-nebula-border-glass text-nebula-text-primary placeholder-nebula-text-muted px-4 py-3 rounded-nebula-md focus:border-nebula-border-accent focus:shadow-nebula-glow outline-none transition-all"
>
```

### 5. 状态指示器
```html
<!-- 成功状态 -->
<div class="bg-nebula-success/20 border border-nebula-success text-nebula-success px-4 py-2 rounded-nebula-md">
  操作成功
</div>

<!-- 警告状态 -->
<div class="bg-nebula-warning/20 border border-nebula-warning text-nebula-warning px-4 py-2 rounded-nebula-md">
  请注意
</div>

<!-- 错误状态 -->
<div class="bg-nebula-error/20 border border-nebula-error text-nebula-error px-4 py-2 rounded-nebula-md">
  操作失败
</div>
```

## 🎨 设计原则

### 1. 层次感
- 使用不同透明度创建视觉层次
- 合理运用阴影和模糊效果
- 通过颜色深浅区分重要性

### 2. 一致性
- 统一的圆角规范（8px、12px、16px、20px、24px）
- 一致的间距系统
- 统一的动画时长和缓动函数

### 3. 可访问性
- 保证文字对比度符合标准
- 提供清晰的焦点状态
- 支持键盘导航

### 4. 响应式设计
- 移动端适配
- 不同屏幕尺寸的布局调整
- 触摸友好的交互区域

## 🚀 最佳实践

### 1. 颜色使用
- 主要内容使用 `text-nebula-text-primary`
- 次要信息使用 `text-nebula-text-secondary`
- 强调内容使用 `text-nebula-text-accent`
- 背景优先使用 nebula 主题色彩

### 2. 动效使用
- 交互反馈使用 `transition-all`
- 重要元素可添加 `animate-nebula-pulse`
- 悬停效果使用 `hover:shadow-nebula-glow`

### 3. 布局建议
- 卡片间距使用 `gap-6` 或 `gap-8`
- 内边距使用 `p-6` 或 `p-8`
- 圆角优先使用 nebula 系列

这套主题系统完全基于您的主页设计风格，保持了视觉一致性，同时提供了丰富的扩展能力。您可以直接在项目中使用这些预设的样式类，也可以根据具体需求进行调整。
