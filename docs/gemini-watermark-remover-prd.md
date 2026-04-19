# PRD：Gemini Watermark Remover Online v1

## 1. 结论

这是一个**纯浏览器图片工具**，目标是帮助用户移除图片中**可见的 Gemini sparkle 水印**和类似的小型角落标记。

v1 的产品路线已经确定：

- 只做一个强首页承接核心 SEO 与转化
- 不做一组相似内页去抢同一批关键词
- 不接入远程 AI 模型
- 不做云端去水印
- 不上传图片进行处理
- 只处理**可见标记**，不处理 SynthID、隐形水印或 provenance metadata

这份文档是当前执行版 PRD。
如果与旧评审文档或历史讨论冲突，以本文件和 `docs/ai-build-brief.md` 为准。

---

## 2. 产品定义

`Gemini Watermark Remover Online` 是一个面向海外英文搜索流量的免费在线工具。

它的核心用途是：

- 上传一张带有**可见 Gemini sparkle 水印**的图片
- 在浏览器里完成检测与去除
- 让用户预览 before / after
- 让用户下载结果图

这个产品首先是一个**工具页**，不是一篇长文章，也不是一个内容站。

---

## 3. 核心用户价值

用户进入页面后，应在极短时间内理解：

- 这是一个工具
- 这是免费的
- 这是在线使用的
- 不需要注册
- 不需要上传到服务器处理
- 它主要处理 Gemini 图片里**可见的那个小角标**

一句话产品定位：

> Free in-browser tool to remove the visible Gemini sparkle watermark from images.

---

## 4. 产品目标与非目标

### 4.1 产品目标

- 承接海外英文 Google 搜索中的 Gemini 可见水印移除需求
- 通过一个强首页完成 SEO 承接和工具转化
- 用浏览器内处理建立“免费、隐私强、低摩擦”的优势
- 用 before / after 证明产品价值，而不是依赖长文解释
- 保留 FAQ 对变体词和边界问题的自然承接能力

### 4.2 非目标

- 不做账号系统
- 不做订阅或支付
- 不做批量处理
- 不做视频去水印
- 不做浏览器扩展
- 不做 API 平台
- 不做远程模型处理
- 不做云端兜底路径
- 不做一组高度相似的 SEO 子页面

---

## 5. 用户与使用场景

### 5.1 目标用户

目标用户是海外英文用户，通常从 Google 搜索进入。

他们往往具备这些特征：

- 想立即解决问题
- 不想注册
- 不想下载软件
- 对隐私比较敏感
- 不想等很久
- 更关心“这个角标能不能去掉”，不关心底层技术

### 5.2 典型场景

#### 场景 1：主关键词进入

用户搜索 `gemini watermark remover` 或 `gemini watermark remover online`，进入首页后直接上传图片并去掉可见角标。

#### 场景 2：图片场景表达

用户搜索 `remove gemini watermark from image`，本质上还是想要一个工具入口，而不是一篇解释文章。

#### 场景 3：logo / icon / mark 表达

用户不一定会说 `watermark`，也可能说：

- logo
- icon
- symbol
- mark

首页文案要自然覆盖这些表达，但不需要为它们拆独立页。

#### 场景 4：Nano Banana 相关变体

有些用户会搜 `nano banana watermark remover`。

v1 不为它建立独立页面，而是在 FAQ 中自然承接：

- 如果图片里是同类可见 sparkle 标记，可以尝试本工具
- 不承诺处理隐形水印、SynthID 或来源证明元数据

---

## 6. 页面与 SEO 架构

### 6.1 页面结构

v1 只保留：

- `/`
- `/privacy-policy`
- `/terms-of-service`

可选后续：

- `/contact`

### 6.2 SEO 原则

- 首页承接主意图和大多数变体意图
- 不做 `free`、`online`、`from image`、`logo remover`、`how-to` 等独立薄页
- 这些表达通过首页分区、FAQ、标题和元信息自然覆盖
- FAQ 内容必须真实渲染在页面里，不能只为 schema 存在

### 6.3 首页应覆盖的表达

首页应自然覆盖这些词：

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

强调：

- 不追求所谓“关键词密度”
- 追求“用户一眼看懂 + 搜索引擎一眼看懂”
- 所有词都应服务于用户理解，而不是堆砌

---

## 7. 首页模块要求

首页至少应包含以下模块：

1. Hero + 工具上传区
2. 信任标签（免费、无需注册、100% 浏览器内处理、不上传）
3. Try an example 示例图区
4. Before / After 对比区
5. How it works 三步说明
6. Works best for 适用场景区
7. Know the limits 边界说明区
8. FAQ
9. Privacy + Responsible Use
10. 页脚与法务链接

---

## 8. 功能要求

### 8.1 上传与校验

支持：

- JPG
- PNG
- WebP

建议文件大小上限：

- 10MB

要求：

- 用户选中文件时立即做前端校验
- 不支持格式、文件过大、文件损坏时要给白话错误提示

### 8.2 处理方式

v1 全部在浏览器中处理。

默认流程：

1. 用户上传图片
2. 浏览器检测右下角或目标区域中的可见 sparkle 标记
3. 使用确定性图像算法去除标记
4. 如果自动检测不准，则提供手动选区重试
5. 用户查看结果并下载

### 8.3 处理方法

主方法：

- reverse alpha blending

补充方法：

- 必要时使用浏览器内的轻量局部修补
- 例如 `OpenCV.js` 的小范围 inpainting

### 8.4 手动重试

如果自动检测未命中，应允许用户：

- 手动框选小区域
- 再次执行浏览器内处理

这比引入远程模型更符合本产品 v1 的最佳实践。

### 8.5 结果区

处理成功后必须提供：

- before / after 对比
- 下载按钮
- 再试一张按钮
- 结果反馈组件

### 8.6 示例图

首页必须提供 2 到 3 组示例图。

要求：

- 一键试用
- 使用真实工具结果
- 不使用虚假装饰图

---

## 9. 用户体验要求

### 9.1 首屏感知

用户一进页面就应看懂：

- 这是一个 Gemini 可见水印去除工具
- 它是免费的
- 它在浏览器里运行
- 图片不会上传处理
- 可以立即开始

### 9.2 移动端

移动端必须支持：

- 选图
- 处理
- 对比
- 下载
- 反馈

对比方式：

- 移动端必须用 slider 或等效交互
- 不要只给压缩后的并排图

### 9.3 错误提示

错误提示必须解释“这对用户意味着什么”。

例如：

> This file type is not supported. Please upload a JPG, PNG, or WebP image.

而不是直接暴露技术错误码。

---

## 10. 合规与边界

### 10.1 只处理可见标记

页面必须明确：

- 工具处理的是**可见** Gemini 风格标记
- 不承诺移除 SynthID
- 不承诺移除 invisible watermark
- 不承诺移除 provenance metadata
- 不处理视频

FAQ 推荐答案：

> This tool is for visible Gemini marks only. It does not remove SynthID, invisible watermarks, or provenance metadata.

### 10.2 合规使用说明

页面必须提示：

- 只建议处理你拥有或被授权编辑的图片
- 不鼓励移除第三方受保护的版权标记

### 10.3 商标免责声明

页面必须包含：

> Not affiliated with, endorsed by, or sponsored by Google LLC. Gemini is a trademark of Google LLC.

至少出现在：

- 页脚
- FAQ / trust 区邻近位置

---

## 11. 隐私策略

v1 隐私承诺应非常清楚：

- 图片在浏览器中处理
- 正常使用下不会上传图片
- 不存在云端去水印处理
- 不使用用户图片训练模型
- 分析工具只使用 GA4，且不发送图片内容

---

## 12. 分析与指标

v1 至少接入：

- Google Search Console
- GA4

建议跟踪：

- landing_page_view
- upload_start
- upload_success
- process_start
- process_success
- process_fail
- manual_retry_start
- manual_retry_success
- download_click
- faq_expand
- result_rate_positive
- result_rate_negative

---

## 13. 技术要求

### 13.1 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- Canvas
- Web Worker
- OpenCV.js

### 13.2 性能要求

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- 图片处理时主线程不能明显卡死

### 13.3 无障碍

- 上传控件可键盘访问
- 错误提示不能只靠颜色表达
- 对比控件应可触控

---

## 14. 验收标准

v1 交付必须满足：

- 用户无需注册即可使用
- 用户可上传 JPG、PNG、WebP 图片
- 处理在浏览器中完成
- 页面明确表达“不上传图片处理”
- 用户可预览 before / after
- 用户可下载处理结果
- 用户可在自动检测失败时手动选区重试
- 页面明确写出 visible-only 边界
- FAQ 包含 Nano Banana 问题
- FAQ 明确不处理 SynthID / invisible watermark / provenance metadata
- 页面包含 Privacy Policy 与 Terms of Service 链接
- 页面包含商标免责声明

---

## 15. 开放问题

当前剩余未定项不再包括“是否用模型”或“是否做云端”。
这些已经定了：**不做。**

当前真正的开放问题只有：

1. demo 图最终用哪几张
2. 手动选区交互采用什么具体形式最顺手
3. 右下角自动检测的阈值如何微调
4. 法务邮箱与运营主体名称何时补齐

---

## 16. 当前版本判断

这份 PRD 已经不是“方案探索稿”，而是当前可执行版本。

最重要的路线共识只有一句话：

> v1 做成一个强首页上的纯浏览器 Gemini 可见水印去除工具，不上传图片，不接模型，不做云端兜底。
