# 后端契约

## 范围

本产品的 v1 是“不上传图片”的版本。

这意味着：

- 去水印完全发生在浏览器中
- v1 不存在服务端图片处理 API
- v1 不存在云端兜底路径
- 任何后端逻辑都不应接收用户图片内容

## 前端处理契约

虽然处理发生在本地，但代码里的数据结构应该保持稳定。

```ts
type DetectionMethod = "auto_corner_detect" | "template_match" | "manual_selection";

type CleanupMethod =
  | "reverse_alpha_blending"
  | "opencv_inpaint"
  | "manual_selection_retry";

type CleanupFailureReason =
  | "unsupported_type"
  | "file_too_large"
  | "decode_failed"
  | "mark_not_found"
  | "browser_memory_limit"
  | "cleanup_failed";

interface WatermarkDetectionResult {
  found: boolean;
  method: DetectionMethod;
  confidence: number; // 0-100
  boundingBox?: { x: number; y: number; width: number; height: number };
}

interface BrowserCleanupResult {
  ok: boolean;
  method: CleanupMethod;
  outputBlobUrl?: string;
  failureReason?: CleanupFailureReason;
}
```

## 可选反馈接口

这个接口只允许存轻量元数据，绝不能要求上传图片。

接口：

`POST /api/feedback`

请求：

```ts
type FeedbackValue = "positive" | "negative";

type NegativeReason =
  | "mark_still_visible"
  | "image_damaged"
  | "wrong_area_removed"
  | "auto_detect_missed"
  | "other";

interface FeedbackRequest {
  sessionId: string;
  value: FeedbackValue;
  reason?: NegativeReason;
  detectionMethod?: DetectionMethod;
  cleanupMethod?: CleanupMethod;
}
```

响应：

```ts
interface FeedbackResponse {
  ok: true;
}
```

## 禁止出现的处理 API

不要实现下面这类图片处理接口：

- `POST /api/process/cloud`
- `GET /api/process/cloud/:jobId`
- 任何接收完整图片做去水印的上传接口

如果以后真的探索服务端路线，也不属于 v1 范围。

## 分析与隐私规则

- GA4 事件不得带图片内容
- session 标识可以在浏览器中生成
- v1 不允许把图片文件发送到后端
- 因为 v1 不上传图片，所以不需要图片留存策略

## 公共错误文案映射

浏览器处理错误要映射成用户能看懂的话。

- `unsupported_type` -> 不支持格式
- `file_too_large` -> 文件过大
- `decode_failed` -> 图片无法读取
- `mark_not_found` -> 提示用户手动选区
- `browser_memory_limit` -> 提示用户换小图或关闭其他标签页
- `cleanup_failed` -> 通用浏览器处理失败提示
