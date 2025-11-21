
const StyleShowcase = () => {
  return (
    <div className="min-h-screen bg-nebula-bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-nebula-text-primary mb-8 text-center tracking-nebula-wide">
          NebulaScreen 样式主题展示
        </h1>

        {/* 颜色调色板 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            🎨 颜色调色板
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 背景色 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">背景色彩</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-bg-primary rounded-md border border-nebula-border-glass"></div>
                  <span className="text-nebula-text-secondary text-sm">bg-nebula-bg-primary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-bg-secondary rounded-md border border-nebula-border-glass"></div>
                  <span className="text-nebula-text-secondary text-sm">bg-nebula-bg-secondary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-bg-card rounded-md border border-nebula-border-glass"></div>
                  <span className="text-nebula-text-secondary text-sm">bg-nebula-bg-card</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-bg-glass rounded-md border border-nebula-border-glass"></div>
                  <span className="text-nebula-text-secondary text-sm">bg-nebula-bg-glass</span>
                </div>
              </div>
            </div>

            {/* 文字色彩 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">文字色彩</h3>
              <div className="space-y-3">
                <div className="text-nebula-text-primary">text-nebula-text-primary</div>
                <div className="text-nebula-text-secondary">text-nebula-text-secondary</div>
                <div className="text-nebula-text-muted">text-nebula-text-muted</div>
                <div className="text-nebula-text-accent">text-nebula-text-accent</div>
              </div>
            </div>

            {/* 状态色彩 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">状态色彩</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-success rounded-md"></div>
                  <span className="text-nebula-success text-sm">Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-warning rounded-md"></div>
                  <span className="text-nebula-warning text-sm">Warning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-error rounded-md"></div>
                  <span className="text-nebula-error text-sm">Error</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nebula-info rounded-md"></div>
                  <span className="text-nebula-info text-sm">Info</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 渐变背景 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            🌈 渐变背景
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 主要渐变 */}
            <div className="bg-nebula-gradient h-32 rounded-nebula-xl flex flex-col items-center justify-center shadow-nebula-button">
              <span className="text-white font-semibold text-lg mb-2">主要渐变</span>
              <code className="text-white/80 text-xs">bg-nebula-gradient</code>
            </div>
            
            {/* 反向渐变 */}
            <div className="bg-nebula-gradient-reverse h-32 rounded-nebula-xl flex flex-col items-center justify-center shadow-nebula-button">
              <span className="text-white font-semibold text-lg mb-2">反向渐变</span>
              <code className="text-white/80 text-xs">bg-nebula-gradient-reverse</code>
            </div>
            
            {/* 卡片渐变 */}
            <div className="bg-nebula-card-gradient h-32 rounded-nebula-xl flex flex-col items-center justify-center border border-nebula-border-primary">
              <span className="text-white font-semibold text-lg mb-2">卡片渐变</span>
              <code className="text-white/80 text-xs">bg-nebula-card-gradient</code>
            </div>
            
            {/* 玻璃渐变 */}
            <div className="bg-glass-gradient h-32 rounded-nebula-xl flex flex-col items-center justify-center border border-nebula-border-accent backdrop-blur-glass">
              <span className="text-nebula-text-accent font-semibold text-lg mb-2">玻璃渐变</span>
              <code className="text-nebula-text-secondary text-xs">bg-glass-gradient</code>
            </div>
            
            {/* 深色渐变 */}
            <div className="bg-nebula-dark-gradient h-32 rounded-nebula-xl flex flex-col items-center justify-center border border-nebula-border-glass">
              <span className="text-white font-semibold text-lg mb-2">深色渐变</span>
              <code className="text-white/80 text-xs">bg-nebula-dark-gradient</code>
            </div>
            
            {/* 强调渐变 */}
            <div className="bg-nebula-accent-gradient h-32 rounded-nebula-xl flex flex-col items-center justify-center border border-nebula-border-accent">
              <span className="text-nebula-text-accent font-semibold text-lg mb-2">强调渐变</span>
              <code className="text-nebula-text-secondary text-xs">bg-nebula-accent-gradient</code>
            </div>
            
            {/* 发光渐变 */}
            <div className="bg-nebula-glow-gradient h-32 rounded-nebula-xl flex flex-col items-center justify-center border border-nebula-border-accent shadow-nebula-glow">
              <span className="text-nebula-text-accent font-semibold text-lg mb-2">发光渐变</span>
              <code className="text-nebula-text-secondary text-xs">bg-nebula-glow-gradient</code>
            </div>
          </div>
          
          {/* 渐变对比展示 */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-nebula-text-accent mb-4">渐变对比效果</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-nebula-text-primary font-medium">卡片背景对比</h4>
                <div className="flex gap-4">
                  <div className="flex-1 bg-nebula-bg-card p-4 rounded-nebula-lg">
                    <span className="text-nebula-text-secondary text-sm">普通背景</span>
                  </div>
                  <div className="flex-1 bg-nebula-card-gradient p-4 rounded-nebula-lg">
                    <span className="text-nebula-text-secondary text-sm">渐变背景</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-nebula-text-primary font-medium">玻璃效果对比</h4>
                <div className="flex gap-4">
                  <div className="flex-1 bg-nebula-bg-glass p-4 rounded-nebula-lg border border-nebula-border-primary backdrop-blur-glass">
                    <span className="text-nebula-text-secondary text-sm">普通玻璃</span>
                  </div>
                  <div className="flex-1 bg-glass-gradient p-4 rounded-nebula-lg border border-nebula-border-accent backdrop-blur-glass">
                    <span className="text-nebula-text-secondary text-sm">渐变玻璃</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 按钮样式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            🔘 按钮样式
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 主要按钮 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">主要按钮</h3>
              <div className="space-y-4">
                <button className="w-full bg-nebula-gradient text-white font-semibold py-3 px-6 rounded-nebula-xl tracking-nebula-normal shadow-nebula-button hover:shadow-nebula-glow transition-all">
                  主要操作
                </button>
                <button className="w-full bg-nebula-gradient text-white font-semibold py-2 px-4 rounded-nebula-lg tracking-nebula-tight">
                  中等按钮
                </button>
                <button className="w-full bg-nebula-gradient text-white font-medium py-1 px-3 rounded-nebula-md text-sm">
                  小型按钮
                </button>
              </div>
            </div>

            {/* 次要按钮 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">次要按钮</h3>
              <div className="space-y-4">
                <button className="w-full bg-transparent border border-nebula-border-accent text-nebula-text-accent hover:bg-nebula-bg-glass py-3 px-6 rounded-nebula-xl tracking-nebula-normal transition-all">
                  次要操作
                </button>
                <button className="w-full bg-nebula-bg-card text-nebula-text-primary hover:bg-nebula-bg-secondary py-3 px-6 rounded-nebula-xl tracking-nebula-normal transition-all">
                  普通按钮
                </button>
                <button className="w-full bg-transparent text-nebula-text-accent hover:text-nebula-text-primary py-3 px-6 rounded-nebula-xl tracking-nebula-normal transition-all">
                  文字按钮
                </button>
              </div>
            </div>

            {/* 状态按钮 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">状态按钮</h3>
              <div className="space-y-4">
                <button className="w-full bg-nebula-success text-white py-3 px-6 rounded-nebula-xl tracking-nebula-normal">
                  成功按钮
                </button>
                <button className="w-full bg-nebula-warning text-white py-3 px-6 rounded-nebula-xl tracking-nebula-normal">
                  警告按钮
                </button>
                <button className="w-full bg-nebula-error text-white py-3 px-6 rounded-nebula-xl tracking-nebula-normal">
                  危险按钮
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 卡片样式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            🃏 卡片样式
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 玻璃卡片 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl shadow-glass backdrop-blur-nebula p-6">
              <h3 className="text-nebula-text-accent text-xl font-semibold tracking-nebula-normal mb-4">
                玻璃卡片
              </h3>
              <p className="text-nebula-text-secondary text-sm mb-4">
                这是一个玻璃拟态效果的卡片，具有半透明背景和模糊效果。
              </p>
              <button className="bg-nebula-gradient text-white px-4 py-2 rounded-nebula-lg text-sm font-medium">
                了解更多
              </button>
            </div>

            {/* 发光卡片 */}
            <div className="bg-nebula-bg-card border border-nebula-border-accent rounded-nebula-xl shadow-nebula-glow p-6 animate-nebula-glow">
              <h3 className="text-nebula-text-accent text-xl font-semibold tracking-nebula-normal mb-4">
                发光卡片
              </h3>
              <p className="text-nebula-text-secondary text-sm mb-4">
                这是一个具有发光动画效果的卡片，边框会持续发光。
              </p>
              <button className="bg-transparent border border-nebula-border-accent text-nebula-text-accent px-4 py-2 rounded-nebula-lg text-sm font-medium hover:bg-nebula-bg-glass transition-all">
                查看详情
              </button>
            </div>

            {/* 渐变卡片 */}
            <div className="bg-nebula-card-gradient border border-nebula-border-glass rounded-nebula-xl shadow-nebula-card p-6">
              <h3 className="text-nebula-text-primary text-xl font-semibold tracking-nebula-normal mb-4">
                深色渐变卡片
              </h3>
              <p className="text-nebula-text-secondary text-sm mb-4">
                使用深色渐变背景，营造层次感和深度感。
              </p>
              <button className="bg-nebula-gradient text-white px-4 py-2 rounded-nebula-lg text-sm font-medium shadow-nebula-button">
                立即体验
              </button>
            </div>
            
            {/* 强调渐变卡片 */}
            <div className="bg-nebula-accent-gradient border border-nebula-border-accent rounded-nebula-xl shadow-glass p-6 backdrop-blur-glass">
              <h3 className="text-nebula-text-accent text-xl font-semibold tracking-nebula-normal mb-4">
                强调渐变卡片
              </h3>
              <p className="text-nebula-text-secondary text-sm mb-4">
                使用强调色渐变，突出重要内容区域。
              </p>
              <button className="bg-transparent border border-nebula-border-accent text-nebula-text-accent px-4 py-2 rounded-nebula-lg text-sm font-medium hover:bg-nebula-bg-glass transition-all">
                了解更多
              </button>
            </div>
            
            {/* 发光渐变卡片 */}
            <div className="bg-nebula-glow-gradient border border-nebula-border-accent rounded-nebula-xl shadow-nebula-glow p-6 animate-nebula-glow">
              <h3 className="text-nebula-text-accent text-xl font-semibold tracking-nebula-normal mb-4">
                发光渐变卡片
              </h3>
              <p className="text-nebula-text-secondary text-sm mb-4">
                结合发光效果的渐变卡片，适合重要提示。
              </p>
              <button className="bg-nebula-gradient text-white px-4 py-2 rounded-nebula-lg text-sm font-medium shadow-nebula-button">
                特别关注
              </button>
            </div>
          </div>
        </section>

        {/* 输入框样式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            📝 输入框样式
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">基础输入框</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="标准输入框"
                  className="w-full bg-nebula-bg-card border border-nebula-border-glass text-nebula-text-primary placeholder-nebula-text-muted px-4 py-3 rounded-nebula-md focus:border-nebula-border-accent focus:shadow-nebula-glow outline-none transition-all"
                />
                <input 
                  type="text" 
                  placeholder="发光输入框"
                  className="w-full bg-nebula-bg-glass border border-nebula-border-accent text-nebula-text-primary placeholder-nebula-text-muted px-4 py-3 rounded-nebula-md shadow-nebula-glow outline-none backdrop-blur-glass"
                />
                <textarea 
                  placeholder="文本域"
                  rows={3}
                  className="w-full bg-nebula-bg-card border border-nebula-border-glass text-nebula-text-primary placeholder-nebula-text-muted px-4 py-3 rounded-nebula-md focus:border-nebula-border-accent focus:shadow-nebula-glow outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">状态提示</h3>
              <div className="space-y-4">
                <div className="bg-nebula-success/20 border border-nebula-success text-nebula-success px-4 py-3 rounded-nebula-md text-sm">
                  ✓ 操作成功提示
                </div>
                <div className="bg-nebula-warning/20 border border-nebula-warning text-nebula-warning px-4 py-3 rounded-nebula-md text-sm">
                  ⚠ 警告提示信息
                </div>
                <div className="bg-nebula-error/20 border border-nebula-error text-nebula-error px-4 py-3 rounded-nebula-md text-sm">
                  ✗ 错误提示信息
                </div>
                <div className="bg-nebula-info/20 border border-nebula-info text-nebula-info px-4 py-3 rounded-nebula-md text-sm">
                  ℹ 信息提示内容
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 动画效果 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            ✨ 动画效果
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula text-center">
              <h3 className="text-nebula-text-accent font-semibold mb-4">脉冲动画</h3>
              <div className="animate-nebula-pulse bg-nebula-gradient w-16 h-16 rounded-full mx-auto mb-4"></div>
              <code className="text-nebula-text-secondary text-xs">animate-nebula-pulse</code>
            </div>

            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula text-center">
              <h3 className="text-nebula-text-accent font-semibold mb-4">发光动画</h3>
              <div className="animate-nebula-glow bg-nebula-bg-card border border-nebula-border-accent w-16 h-16 rounded-full mx-auto mb-4"></div>
              <code className="text-nebula-text-secondary text-xs">animate-nebula-glow</code>
            </div>

            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula text-center">
              <h3 className="text-nebula-text-accent font-semibold mb-4">光泽动画</h3>
              <div className="animate-glass-shimmer bg-glass-gradient w-16 h-16 rounded-full mx-auto mb-4 border border-nebula-border-glass"></div>
              <code className="text-nebula-text-secondary text-xs">animate-glass-shimmer</code>
            </div>
          </div>
        </section>

        {/* 圆角和间距 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            📐 圆角和间距
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">圆角尺寸</h3>
              <div className="space-y-4">
                <div className="bg-nebula-bg-card p-3 rounded-nebula-sm">
                  <span className="text-nebula-text-secondary text-sm">rounded-nebula-sm (8px)</span>
                </div>
                <div className="bg-nebula-bg-card p-3 rounded-nebula-md">
                  <span className="text-nebula-text-secondary text-sm">rounded-nebula-md (12px)</span>
                </div>
                <div className="bg-nebula-bg-card p-3 rounded-nebula-lg">
                  <span className="text-nebula-text-secondary text-sm">rounded-nebula-lg (16px)</span>
                </div>
                <div className="bg-nebula-bg-card p-3 rounded-nebula-xl">
                  <span className="text-nebula-text-secondary text-sm">rounded-nebula-xl (20px)</span>
                </div>
                <div className="bg-nebula-bg-card p-3 rounded-nebula-2xl">
                  <span className="text-nebula-text-secondary text-sm">rounded-nebula-2xl (24px)</span>
                </div>
              </div>
            </div>

            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">字体间距</h3>
              <div className="space-y-4">
                <div className="text-nebula-text-primary tracking-nebula-tight">
                  tracking-nebula-tight (1px)
                </div>
                <div className="text-nebula-text-primary tracking-nebula-normal">
                  tracking-nebula-normal (2px)
                </div>
                <div className="text-nebula-text-primary tracking-nebula-wide">
                  tracking-nebula-wide (4px)
                </div>
                <div className="text-nebula-text-primary tracking-nebula-wider">
                  tracking-nebula-wider (8px)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 分割线样式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            📏 分割线样式
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基础分割线 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">基础分割线</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">主要分割线 (玻璃边框色)</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-nebula-text-primary mb-2">内容区域 1</div>
                    <hr className="border-nebula-divider-primary" />
                    <div className="text-nebula-text-primary mt-2">内容区域 2</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">border-nebula-divider-primary</code>
                </div>
                
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">微妙分割线 (10% 白色透明)</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-nebula-text-primary mb-2">列表项 1</div>
                    <hr className="border-nebula-divider-subtle" />
                    <div className="text-nebula-text-primary mt-2">列表项 2</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">border-nebula-divider-subtle</code>
                </div>
                
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">强调分割线 (30% 青蓝色)</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-nebula-text-primary mb-2">重要区域 1</div>
                    <hr className="border-nebula-divider-accent" />
                    <div className="text-nebula-text-primary mt-2">重要区域 2</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">border-nebula-divider-accent</code>
                </div>
                
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">强分割线 (50% 青蓝色)</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-nebula-text-primary mb-2">突出区域 1</div>
                    <hr className="border-nebula-divider-strong" />
                    <div className="text-nebula-text-primary mt-2">突出区域 2</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">border-nebula-divider-strong</code>
                </div>
              </div>
            </div>

            {/* 渐变分割线 */}
            <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
              <h3 className="text-nebula-text-accent font-semibold mb-4">渐变分割线</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">水平渐变分割线</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-nebula-text-primary mb-3">章节标题 1</div>
                    <div className="h-px bg-divider-gradient"></div>
                    <div className="text-nebula-text-primary mt-3">章节内容区域</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">bg-divider-gradient</code>
                </div>
                
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">强渐变分割线</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-nebula-text-primary mb-3">重要章节 1</div>
                    <div className="h-px bg-divider-gradient-strong"></div>
                    <div className="text-nebula-text-primary mt-3">重要内容区域</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">bg-divider-gradient-strong</code>
                </div>
                
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">垂直渐变分割线</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md flex">
                    <div className="flex-1 text-nebula-text-primary pr-3">左侧内容区域</div>
                    <div className="w-px bg-divider-gradient-vertical h-16"></div>
                    <div className="flex-1 text-nebula-text-primary pl-3">右侧内容区域</div>
                  </div>
                  <code className="text-nebula-text-muted text-xs mt-1 block">bg-divider-gradient-vertical</code>
                </div>
                
                <div>
                  <p className="text-nebula-text-secondary text-sm mb-2">组合效果展示</p>
                  <div className="bg-nebula-bg-card p-4 rounded-nebula-md">
                    <div className="text-center">
                      <h4 className="text-nebula-text-accent font-semibold mb-2">产品特性</h4>
                      <div className="h-px bg-divider-gradient mb-4"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-nebula-text-secondary text-sm">
                          <div className="mb-2">• 直观的拖拽编辑</div>
                          <div className="mb-2">• 丰富的组件库</div>
                          <div>• 实时数据连接</div>
                        </div>
                        <div className="text-nebula-text-secondary text-sm border-l border-nebula-divider-accent pl-4">
                          <div className="mb-2">• 响应式设计</div>
                          <div className="mb-2">• 多种主题风格</div>
                          <div>• 一键发布部署</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 分割线使用场景 */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-nebula-text-accent mb-4">分割线使用场景</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
                <h4 className="text-nebula-text-accent font-semibold mb-4">卡片内容分割</h4>
                <div className="space-y-3">
                  <div className="text-nebula-text-primary text-sm">用户信息</div>
                  <hr className="border-nebula-divider-primary" />
                  <div className="text-nebula-text-secondary text-sm">账户设置</div>
                  <hr className="border-nebula-divider-primary" />
                  <div className="text-nebula-text-secondary text-sm">隐私设置</div>
                </div>
              </div>
              
              <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
                <h4 className="text-nebula-text-accent font-semibold mb-4">列表项分割</h4>
                <div className="space-y-3">
                  <div className="text-nebula-text-primary text-sm">项目 A</div>
                  <hr className="border-nebula-divider-subtle" />
                  <div className="text-nebula-text-primary text-sm">项目 B</div>
                  <hr className="border-nebula-divider-subtle" />
                  <div className="text-nebula-text-primary text-sm">项目 C</div>
                </div>
              </div>
              
              <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-xl p-6 backdrop-blur-nebula">
                <h4 className="text-nebula-text-accent font-semibold mb-4">重要区域分割</h4>
                <div className="space-y-3">
                  <div className="text-nebula-text-primary text-sm">常规内容</div>
                  <hr className="border-nebula-divider-accent" />
                  <div className="text-nebula-text-accent text-sm font-medium">重要提示</div>
                  <hr className="border-nebula-divider-accent" />
                  <div className="text-nebula-text-primary text-sm">其他内容</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 阴影效果 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            🌟 阴影效果
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-nebula-bg-card p-6 rounded-nebula-xl shadow-nebula-glow">
              <h4 className="text-nebula-text-accent font-semibold mb-2">发光阴影</h4>
              <code className="text-nebula-text-secondary text-xs">shadow-nebula-glow</code>
            </div>
            
            <div className="bg-nebula-bg-card p-6 rounded-nebula-xl shadow-nebula-card">
              <h4 className="text-nebula-text-accent font-semibold mb-2">卡片阴影</h4>
              <code className="text-nebula-text-secondary text-xs">shadow-nebula-card</code>
            </div>
            
            <div className="bg-nebula-bg-card p-6 rounded-nebula-xl shadow-nebula-button">
              <h4 className="text-nebula-text-accent font-semibold mb-2">按钮阴影</h4>
              <code className="text-nebula-text-secondary text-xs">shadow-nebula-button</code>
            </div>
            
            <div className="bg-nebula-bg-glass p-6 rounded-nebula-xl shadow-glass backdrop-blur-glass border border-nebula-border-glass">
              <h4 className="text-nebula-text-accent font-semibold mb-2">玻璃阴影</h4>
              <code className="text-nebula-text-secondary text-xs">shadow-glass</code>
            </div>
          </div>
        </section>

        {/* 使用示例 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-nebula-text-accent mb-6 tracking-nebula-normal">
            🎪 综合示例
          </h2>
          
          <div className="bg-nebula-bg-glass border border-nebula-border-primary rounded-nebula-2xl p-8 backdrop-blur-nebula shadow-nebula-card">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-nebula-text-accent tracking-nebula-wide mb-4">
                数据可视化新纪元
              </h3>
              <p className="text-nebula-text-secondary text-lg max-w-2xl mx-auto">
                将复杂信息转化为智能视觉盛宴，告别繁琐代码，通过直观的拖拽式编辑器快速构建专业级数据大屏。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-nebula-gradient text-white font-semibold px-8 py-4 rounded-nebula-xl tracking-nebula-normal shadow-nebula-button hover:shadow-nebula-glow transition-all animate-nebula-pulse">
                立即开始体验
              </button>
              <button className="bg-transparent border border-nebula-border-accent text-nebula-text-accent hover:bg-nebula-bg-glass px-8 py-4 rounded-nebula-xl tracking-nebula-normal transition-all">
                查看更多示例
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center text-nebula-text-muted text-sm">
          <p>NebulaScreen 样式主题系统 - 让您的界面更加出色</p>
        </footer>
      </div>
    </div>
  );
};

export default StyleShowcase;
