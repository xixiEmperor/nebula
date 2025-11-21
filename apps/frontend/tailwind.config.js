export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// NebulaScreen 主题色彩系统
  			nebula: {
  				// 主要背景色
  				'bg-primary': '#081324',      // 深蓝主背景
  				'bg-secondary': '#0f1c2e',    // 次要背景
  				'bg-card': '#20262f',         // 卡片背景
  				'bg-glass': 'rgba(32,38,47,0.85)', // 玻璃拟态背景
  				'bg-header': 'rgba(8,19,36,0.9)',  // 头部背景
  				
  				// 文字颜色
  				'text-primary': '#ffffff',    // 主要文字
  				'text-secondary': '#cccccc',  // 次要文字
  				'text-muted': '#888888',      // 弱化文字
  				'text-accent': '#3be4fe',     // 强调文字
  				
  				// 边框颜色
  				'border-primary': '#37bff58a', // 主要边框
  				'border-accent': '#3be4fe',    // 强调边框
  				'border-glass': '#2a3441',     // 玻璃边框
  				
  				// 分割线颜色
  				'divider-primary': '#2a3441',  // 主要分割线 (玻璃边框色)
  				'divider-accent': 'rgba(59, 228, 254, 0.3)', // 强调分割线
  				'divider-subtle': 'rgba(255, 255, 255, 0.1)', // 微妙分割线
  				'divider-strong': 'rgba(59, 228, 254, 0.5)', // 强分割线
  				
  				// 渐变色彩
  				'gradient-start': '#409ff8',   // 渐变起始色
  				'gradient-mid': '#38cdf1',     // 渐变中间色
  				'gradient-end': '#35c8f3',     // 渐变结束色
  				'gradient-cyan': '#3c9ef9',    // 青色渐变
  				
  				// 状态颜色
  				'success': '#00e5ff',
  				'warning': '#ff6f00',
  				'error': '#ff4444',
  				'info': '#1e90ff',
  			},
  			
  			// 兼容原有颜色
  			'text-primary': '#ffffff',
  			'text-secondary': '#cccccc',
  			'text-muted': '#888888',
  			'bg-primary': '#0f1c2e',
  			'bg-secondary': '#1a1a1a',
  			'bg-card': '#1e2832',
  			'accent-blue': '#1e90ff',
  			'accent-cyan': '#00e5ff',
  			'accent-orange': '#ff6f00',
  			'accent-purple': '#9c27b0',
  			'border-primary': '#2a3441',
  			'border-accent': '#1e90ff',
  			
  			// Shadcn/ui 颜色系统
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		
		// 渐变色配置
		backgroundImage: {
			'nebula-gradient': 'linear-gradient(135deg, #409ff8 0%, #38cdf1 50%, #35c8f3 100%)',
			'nebula-gradient-reverse': 'linear-gradient(315deg, #409ff8 0%, #38cdf1 50%, #35c8f3 100%)',
			'nebula-card-gradient': 'linear-gradient(135deg, rgba(15,28,46,0.95) 0%, rgba(32,38,47,0.9) 50%, rgba(8,19,36,0.85) 100%)',
			'nebula-border-gradient': 'linear-gradient(135deg, #3be4fe 0%, #409ff8 50%, #35c8f3 100%)',
			'glass-gradient': 'linear-gradient(135deg, rgba(59,228,254,0.15) 0%, rgba(64,159,248,0.1) 50%, rgba(255,255,255,0.05) 100%)',
			'nebula-dark-gradient': 'linear-gradient(135deg, #0a1525 0%, #1a2332 50%, #0f1c2e 100%)',
			'nebula-accent-gradient': 'linear-gradient(135deg, rgba(59,228,254,0.2) 0%, rgba(64,159,248,0.15) 100%)',
			'nebula-glow-gradient': 'linear-gradient(135deg, rgba(59,228,254,0.3) 0%, rgba(64,159,248,0.2) 50%, rgba(53,200,243,0.1) 100%)',
			
			// 分割线渐变
			'divider-gradient': 'linear-gradient(90deg, transparent 0%, rgba(59, 228, 254, 0.3) 50%, transparent 100%)',
			'divider-gradient-vertical': 'linear-gradient(180deg, transparent 0%, rgba(59, 228, 254, 0.3) 50%, transparent 100%)',
			'divider-gradient-strong': 'linear-gradient(90deg, transparent 0%, rgba(59, 228, 254, 0.6) 50%, transparent 100%)',
		},
  		
  		// 阴影配置
  		boxShadow: {
  			'nebula-glow': '0 0 20px rgba(59, 228, 254, 0.3)',
  			'nebula-card': '0 8px 32px rgba(0, 0, 0, 0.3)',
  			'nebula-button': '0 4px 16px rgba(64, 159, 248, 0.3)',
  			'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  			'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
  		},
  		
  		// 边框圆角
  		borderRadius: {
  			'nebula-sm': '8px',
  			'nebula-md': '12px',
  			'nebula-lg': '16px',
  			'nebula-xl': '20px',
  			'nebula-2xl': '24px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		
  		// 字体间距
  		letterSpacing: {
  			'nebula-tight': '1px',
  			'nebula-normal': '2px',
  			'nebula-wide': '4px',
  			'nebula-wider': '8px',
  		},
  		
  		// 动画配置
  		animation: {
  			'nebula-pulse': 'nebula-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'nebula-glow': 'nebula-glow 2s ease-in-out infinite alternate',
  			'glass-shimmer': 'glass-shimmer 3s ease-in-out infinite',
  		},
  		
  		keyframes: {
  			'nebula-pulse': {
  				'0%, 100%': {
  					opacity: '1',
  					transform: 'scale(1)',
  				},
  				'50%': {
  					opacity: '0.8',
  					transform: 'scale(1.05)',
  				},
  			},
  			'nebula-glow': {
  				'from': {
  					'box-shadow': '0 0 20px rgba(59, 228, 254, 0.2)',
  				},
  				'to': {
  					'box-shadow': '0 0 30px rgba(59, 228, 254, 0.6)',
  				},
  			},
  			'glass-shimmer': {
  				'0%': {
  					'background-position': '-200% 0',
  				},
  				'100%': {
  					'background-position': '200% 0',
  				},
  			},
  		},
  		
  		// 滤镜效果
  		backdropBlur: {
  			'nebula': '16px',
  			'glass': '12px',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}