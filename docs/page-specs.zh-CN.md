# 页面规格说明

## 路由规划

本产品采用“一个 SEO 主首页 + 法务页”的结构。

必需路由：

- `/`
- `/privacy-policy`
- `/terms-of-service`

可选后续路由：

- `/contact`

不要为了小关键词变体继续加落地页。

## 首页 `/`

### 目的

首页必须同时完成四个任务：

1. 承接主要搜索需求
2. 把用户转化成上传行为
3. 解释“纯浏览器处理”的隐私模型
4. 清楚说明“只处理可见标记”的能力边界

### 主要查询覆盖

需要自然覆盖这些词：

- gemini watermark remover online
- gemini watermark remover
- remove gemini watermark
- remove gemini watermark from image
- gemini logo remover
- gemini icon remover
- gemini mark remover
- free online gemini watermark remover
- no sign up gemini watermark remover
- nano banana watermark remover

不要把它们机械堆在同一段里。
应把它们分配到不同模块和 FAQ 中自然承接。

### 必需模块顺序

#### 1. Hero + 工具区

目标：

- 5 秒内讲清价值
- 让用户立刻能上传
- 展示免费、无需注册、纯浏览器处理这些信任点

必须包含：

- 主标题
- 辅助标题
- 上传区域
- 文件格式提示
- 不需要上传图片的说明
- 浏览器内处理说明
- `Try an example` 入口

#### 2. 信任标签

必须包含 4 个短标签：

- Free online
- No sign-up
- 100% in your browser
- No upload required

#### 3. 示例图区域

展示 2 到 3 个 demo 场景。

每张卡片应包含：

- before 缩略图
- 标记类型标签
- 一键试用按钮

#### 4. Before/After 证明区

桌面端和移动端都使用对比滑块。

不要只用很小的并排图作为唯一移动端方案。

#### 5. How It Works

用 3 步讲清：

1. 上传图片或尝试示例图
2. 在浏览器里检测并去除可见标记
3. 预览并下载结果

#### 6. 最适合处理什么

说明支持场景：

- 小型角落 sparkle 水印
- Gemini 风格 logo 或 icon
- 位于低复杂背景上的简单可见标记
- 标记仍然靠近右下角的图片

#### 7. 限制与诚实边界

说明不支持或不稳定的场景：

- 大面积覆盖
- 标记压在人物脸部或密集纹理上
- 被严重裁切或压缩的图片
- 隐形水印
- SynthID
- 来源证明元数据
- 视频

#### 8. FAQ

必须回答：

- 是否免费
- 是否需要注册
- 支持哪些格式
- 是否支持手机
- 图片会不会上传
- 自动检测没找到时怎么办
- SynthID 问题
- 视频问题
- Nano Banana 问题

#### 9. 隐私 + 合规使用

在页面靠下位置放一个简短信任区：

- 图片在浏览器中处理
- 去水印不需要服务器上传
- 只建议处理你拥有或获授权编辑的图片
- 这个工具只针对可见 Gemini 风格标记

#### 10. 页脚

必须包含：

- 商标免责声明
- 法务页面链接
- 占位联系邮箱

### 元信息规则

- 唯一 title
- 唯一 meta description
- 清晰的单个 H1
- 只有 FAQ 内容真实渲染在页面上时才加 FAQ schema
- OG 图最好展示工具界面或 before/after 效果

### 移动端规则

- 上传框尽量无需太多滚动就能看见
- 对比滑块必须支持触控
- 下载按钮要显眼
- 手动重试控件要清楚且便于点击

## 隐私政策页 `/privacy-policy`

### 目的

用白话解释数据是怎么处理的。

### 必须覆盖

- v1 采用纯浏览器图片处理
- 正常使用下不会上传图片
- 如果用了本地浏览器缓存或状态保存，要写清楚
- GA4 分析的使用
- 隐私请求联系方式

## 服务条款页 `/terms-of-service`

### 目的

明确使用边界和免责声明。

### 必须覆盖

- 仅可处理你拥有或有权编辑的内容
- 禁止非法或滥用行为
- 服务可能变更或中断
- 仅处理可见标记
- 不承诺完美结果
- 投诉和法务联系渠道
