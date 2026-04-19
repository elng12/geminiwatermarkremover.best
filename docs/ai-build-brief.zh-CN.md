# AI 构建总说明

## 项目

为 `geminiwatermarkremover.best` 构建一个可上线的 MVP。

这不是一个演示型落地页，而是一个真实可用的工具。
用户必须能够上传图片、在浏览器里去除可见的 Gemini sparkle 风格水印、预览结果，并下载处理后的图片。

## 文档优先级

如果旧文档与本说明冲突，请以本文件和下面列出的文件为准。

优先级如下：

1. `docs/ai-build-brief.md`
2. `docs/page-specs.md`
3. `docs/copy-deck.md`
4. `docs/design-system.md`
5. `docs/backend-contract.md`
6. `docs/processing-engine-decision.md`
7. `docs/assets-and-demo-images.md`
8. 旧版 PRD 和评审文档仅作为背景参考

## 产品定义

`Gemini Watermark Remover Online` 是一个纯浏览器图片清理工具，专门处理可见的 Gemini sparkle 水印和类似的小型角落标记。

核心承诺：

- 免费在线工具
- 无需注册
- 100% 浏览器内处理
- 不需要上传图片
- v1 不设每日额度
- 只处理可见标记

产品不得宣称可移除：

- SynthID
- 隐形水印
- 来源证明元数据
- 视频水印
- 任意图片上的任意水印且保证完美处理

## 产品策略

### SEO 策略

使用一个强首页承接主要搜索意图。

不要为下列小变体单独创建相似 SEO 页面：

- free
- online
- no sign up
- from image
- logo remover

这些意图应该通过首页的分区、标题、FAQ、元信息和锚点自然覆盖。

只保留这些路由：

- `/`
- `/privacy-policy`
- `/terms-of-service`
- `/contact` 可后续再加

### 处理策略

v1 采用纯浏览器架构：

1. 在浏览器中检测可见的 Gemini 风格水印
2. 用确定性的图像处理方式去除它，而不是远程 AI 模型
3. 如果自动检测不够准，就让用户手动选区重试
4. 整个处理过程中，图片数据都留在浏览器里

v1 不允许上传图片做处理。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- 浏览器图片处理：`Canvas`、`Web Worker`、`OpenCV.js`
- 主处理方式：反向 alpha blending
- 可选的模板匹配或角落检测，用于增强自动定位
- GA4 分析

## 必须具备的功能

- 真实图片上传
- 支持 `JPG`、`PNG`、`WebP`
- 处理前前端校验
- 尽可能自动检测可见的 Gemini sparkle 水印
- 默认走反向 alpha 去除路径
- 自动检测不准时提供手动选区重试
- Before/After 预览
- 下载处理后的图片
- 带示例图的 `Try an example`
- 带合规边界的 FAQ
- 隐私优先文案
- 适合移动端的对比交互

## 默认产品规则

- 建议文件大小上限：`10MB`
- v1 全部在浏览器中处理
- 去水印不需要上传图片
- v1 不需要每日积分或公开公平使用限制
- 如果浏览器无法可靠处理某张图片，应提示用户尝试更小的文件或手动选区重试

## 首页定位

首页必须首先让人感觉这是一个工具。

首屏用户应该立刻理解：

- 工具是做什么的
- 它是免费的
- 它可以在线使用
- 不需要注册
- 全部在浏览器里运行
- 图片不会被上传去处理

## 非目标

- 不做账号系统
- v1 不做订阅系统
- 不做批量处理
- 不做视频处理
- 不做浏览器扩展
- 不做 API 产品
- 不做远程 AI 去水印模型
- v1 不做云端处理路径
- 不做社区功能
- 不做大量薄弱 SEO 页

## 交付物

AI 实现阶段应产出：

- 一个打磨完整的首页
- 法务页面
- 可运行的浏览器内处理流程
- 可用的移动端布局
- 可直接上线的文案、元信息和 FAQ
- 示例图和 before/after 效果证明

## 待补占位项

这些内容可以先用占位，后续再替换：

- 法务邮箱：`legal@yourdomain.com`
- 隐私邮箱：`privacy@yourdomain.com`
- 公司或运营主体名称
- 最终 demo 图素材
