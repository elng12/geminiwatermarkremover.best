# Backend Contract

## Scope

This product is a no-image-upload v1.

That means:

- image cleanup happens entirely in the browser
- there is no server-side image processing API in v1
- there is no cloud fallback path in v1
- any backend logic must avoid receiving the user's image content

## Client-Side Processing Contracts

These shapes should stay stable in code even though processing is local.

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

## Optional Feedback Endpoint

This endpoint may store only lightweight metadata. It must never require image
upload.

Endpoint:

`POST /api/feedback`

Request:

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

Response:

```ts
interface FeedbackResponse {
  ok: true;
}
```

## No-Processing API Rule

Do not implement any image-processing endpoints such as:

- `POST /api/process/cloud`
- `GET /api/process/cloud/:jobId`
- any upload endpoint that receives the full image for cleanup

If a future server path is explored, it must live outside the v1 scope.

## Analytics and Privacy Rules

- GA4 events must not include image content
- session identifiers may be generated in the browser
- no image file should be sent to the backend in v1
- no image file retention policy is needed for v1 because no image is uploaded

## Public Error Message Mapping

Map browser failures to plain UI copy.

- `unsupported_type` -> unsupported file type message
- `file_too_large` -> file too large message
- `decode_failed` -> image could not be read
- `mark_not_found` -> ask the user to use manual selection
- `browser_memory_limit` -> suggest smaller file or fewer open tabs
- `cleanup_failed` -> generic browser cleanup failure message
