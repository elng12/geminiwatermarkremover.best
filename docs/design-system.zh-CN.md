# 设计系统

## 视觉目标

打造一个“工具优先”的界面：感觉快速、干净、可信，同时保留一点个性，避免落入普通 SaaS 模板感。

整体气质应是：

- modern
- precise
- privacy-first
- capable
- slightly bold

## 字体

使用：

- 标题：`Sora`
- 正文和界面：`Plus Jakarta Sans`

规则：

- 大标题，字距略紧
- UI 标签要干净
- 避免默认系统字体带来的平庸感
- 正文短、易读

### 字体尺度

| Token       | 字体              | 大小   | 行高 | 字重 | 字距      | 用途             |
|-------------|-------------------|--------|------|------|-----------|------------------|
| display-lg  | Sora              | 48px   | 1.1  | 700  | -0.02em   | Hero H1          |
| heading-lg  | Sora              | 32px   | 1.2  | 600  | -0.01em   | 模块标题 (H2)     |
| heading-md  | Sora              | 24px   | 1.3  | 600  | normal    | 卡片标题 (H3)     |
| heading-sm  | Sora              | 18px   | 1.4  | 600  | normal    | FAQ 标题          |
| body-lg     | Plus Jakarta Sans | 18px   | 1.6  | 400  | normal    | Hero 辅助文案     |
| body-md     | Plus Jakarta Sans | 16px   | 1.5  | 400  | normal    | 正文段落          |
| body-sm     | Plus Jakarta Sans | 14px   | 1.5  | 400  | normal    | 提示文字、标签     |
| caption     | Plus Jakarta Sans | 12px   | 1.4  | 500  | 0.01em    | 隐私提示、免责声明  |

## 颜色系统

### 基础色

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Surface alt: `#EEF4FF`
- Text main: `#0F172A`
- Text muted: `#475569`
- Border: `#D9E2F1`

### 品牌色

- Primary blue: `#2563EB`
- Primary blue dark: `#1D4ED8`
- Accent sky: `#38BDF8`
- CTA orange: `#F97316`
- Success green: `#10B981`
- Warning amber: `#F59E0B`
- Error red: `#EF4444`

### 语义色 / 状态背景

- Error bg: `#FEF2F2`
- Warning bg: `#FFFBEB`
- Success bg: `#ECFDF5`
- Info bg: `#EFF6FF`

### 使用原则

- 蓝色负责传递信任与操作感
- 橙色只保留给最强 CTA
- 绿色只用于成功状态
- 红色只用于错误状态
- 不要过度依赖渐变

## 背景处理

采用明亮底色加轻微层次感：

- Hero 背后可以有柔和的蓝色径向光晕
- 可以加很轻的网格或点阵纹理，但必须克制
- 卡片保持清爽白底

避免：

- 过重的玻璃拟态
- 紫白默认创业站风格
- 默认暗色模式上线

## 布局

- 最大内容宽度：`1200px`
- 模块间距：桌面 `72px`，移动端 `48px`
- 卡片圆角：`20px`
- 按钮圆角：`14px`
- 输入框圆角：`16px`
- Hero 和效果证明区留足呼吸感

### 响应式断点

| 名称    | 宽度         | 说明                            |
|---------|-------------|--------------------------------|
| mobile  | < 640px     | 单列布局，上传卡全宽              |
| tablet  | 640–1024px  | 两列弱化，对比滑块保持全宽         |
| desktop | > 1024px    | 完整双列 Hero，最大宽度 1200px    |

### 阴影层次

- shadow-sm: `0 1px 2px rgba(15,23,42,0.06)` — 次按钮、输入框
- shadow-md: `0 4px 12px rgba(15,23,42,0.08)` — 卡片默认
- shadow-lg: `0 8px 24px rgba(15,23,42,0.12)` — 主 CTA hover、上传卡片
- shadow-focus: `0 0 0 3px rgba(37,99,235,0.3)` — focus ring

## 组件

### 上传卡片

- 大型虚线拖拽框
- 清晰主操作按钮
- 明确文件支持提示
- 一行“不需要上传图片”的承诺
- 一行“浏览器内处理”的承诺

### 信任标签

- pill 风格
- 浅蓝底
- 深色文字
- icon + 短标签

### 对比滑块

- 宽卡片样式
- 明显拖拽手柄
- 有 before / after 标签
- 必须支持触控

### 按钮

主按钮：

- 纯橙色
- 白字
- 轻微浮起阴影

次按钮：

- 白底或浅蓝底
- 蓝色文字
- 清晰边框

三级按钮：

- 文字链接
- hover 时有下划线

### FAQ

- 堆叠式手风琴
- 大点击区域
- 答案短而直接

### 手动选区帮助

- 中等宽度面板或内嵌卡片
- 清楚的框选区域
- 明显的重试路径
- 不要出现吓人的技术术语

### Demo 卡片

- 固定宽度卡片，移动端全宽
- 展示 before 缩略图
- 左下角或底部有标记类型标签（pill 样式）
- 底部 `Try this example` 按钮（次按钮样式）
- hover 时轻微抬升（shadow-lg）

### 处理中状态

- 卡片内半透明遮罩覆盖
- 居中不确定性进度指示器（品牌蓝旋转动画）
- 动画下方一行状态文案
- 显示 "如果自动检测不准，可以手动选区" 的次要提示
- 超过 3 秒无响应时，显示 "仍在处理..." 的二级提示

### 结果反馈

- 水平排列两个反馈按钮
- 正向：浅绿底 + 深绿文字 + 👍 图标
- 负向：浅灰底 + 深灰文字 + 👎 图标
- 点击后按钮变为选中态（实心填充）
- 负向反馈可展开可选原因列表

## 动效

- 时长：`150ms` 到 `250ms`
- 只做有意义的过渡
- hover 时轻微抬升
- 尊重 `prefers-reduced-motion`

## 图片规则

- 使用真实工具处理结果
- 不要用假 UI 假装真实结果
- 不要用图库照片充当 hero 主视觉
- demo 图必须能清楚看到 sparkle 标记位置

## 无障碍

- 对比度至少符合 WCAG AA
- 上传和 FAQ 必须支持键盘访问
- 有清晰 focus ring
- 错误状态不能只靠颜色表达
- 移动端点击区域要舒适

## 暗色模式

v1 不上线暗色模式。所有颜色 Token 只定义 Light 主题。
如果后续支持，颜色系统须通过 CSS 变量或 Tailwind `dark:` 前缀扩展，无需改动组件结构。

## 实现说明

### CSS 变量命名

所有颜色通过 CSS 变量暴露，命名方式：`--color-{语义}-{层级}`

```css
:root {
  --color-bg-base: #F8FAFC;
  --color-bg-surface: #FFFFFF;
  --color-bg-surface-alt: #EEF4FF;
  --color-text-main: #0F172A;
  --color-text-muted: #475569;
  --color-border-default: #D9E2F1;
  --color-brand-primary: #2563EB;
  --color-brand-primary-dark: #1D4ED8;
  --color-brand-accent: #38BDF8;
  --color-cta: #F97316;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

### Tailwind 扩展

在 `tailwind.config.ts` 中通过 `extend.colors` 挂载上述变量。
组件中只使用语义化 class（如 `bg-surface`、`text-muted`），禁止直接写 hex 值。

### 间距 Token

使用 Tailwind 默认 4px 基线网格。自定义间距只在必要时添加（如 section-gap: 72px → `space-section`）。

### 通用规则

- 设计 token 命名保持稳定
- 避免随处写零散的间距和颜色值
