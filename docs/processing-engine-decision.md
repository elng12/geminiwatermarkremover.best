# Processing Engine Decision

## Recommended Architecture

Use a pure in-browser cleanup architecture for v1.

This means:

1. detect the visible Gemini sparkle watermark in the browser
2. remove it with deterministic image processing
3. let the user retry with manual selection if needed
4. do not use a remote AI model or cloud cleanup path in v1

## Why This Is the Right Choice

### Watermark Structure

The target mark is small, visible, and typically appears as a fixed sparkle-like
corner watermark. This is a strong fit for deterministic removal.

### Cost

A browser-only workflow keeps processing cost close to zero.

### Privacy

The strongest trust story is simple: the image never leaves the browser.

### Speed

A small visible corner mark can usually be handled faster with direct image math
than with a remote model round-trip.

### Product Honesty

This route avoids pretending that a large AI model is needed for a very small,
structured, visible watermark problem.

## Core Technical Method

### Primary Method

Use reverse alpha blending as the default cleanup strategy.

This is the preferred method when:

- the visible watermark is detected reliably
- the mark shape and overlay assumptions match the expected Gemini sparkle
- the surrounding pixels do not require heavy reconstruction

### Secondary Method

Use light local image repair only as a browser-side fallback.

Examples:

- `OpenCV.js` inpainting for small visible residual areas
- edge cleanup after the main reverse alpha pass

### Manual Retry

If auto-detection is imperfect, let the user select the visible watermark area
manually and rerun the browser cleanup.

## v1 Technical Stack

- `Canvas` for image read and write
- `Web Worker` for non-blocking processing
- `reverse alpha blending` for the main path
- `OpenCV.js` for small local cleanup support if needed
- optional template matching or corner heuristics for better auto-detection

## Recommended UX Path

1. user uploads image
2. app validates file
3. app tries auto-detection of the visible watermark
4. app runs browser cleanup
5. user sees preview
6. user downloads result or retries with manual selection

## Best-Fit Cases

This v1 is best for:

- visible Gemini sparkle watermark
- small corner marks
- images where the watermark stays near the bottom-right corner
- images that have not been heavily cropped or destroyed by compression

## Honest Limits

This v1 is not built for:

- SynthID
- invisible watermark systems
- provenance metadata
- large overlays
- complex marks over faces or dense texture
- video

## Phase Plan

### Phase 1

Ship:

- automatic visible watermark detection
- reverse alpha cleanup
- manual selection retry
- before/after preview
- download flow

### Phase 2

Improve:

- better template matching for cropped images
- stronger browser-side cleanup for compressed edge cases
- more precise manual selection UX

## Public Copy Rule

Do not say:

- AI removes any watermark perfectly
- all Gemini images use exactly the same visible watermark conditions
- hidden watermark systems are supported
- the tool uploads images for smarter processing

Do say:

- runs in your browser
- no upload required
- best for the visible Gemini sparkle watermark
- visible marks only

## Product Policy Rule

Because processing stays in the browser in v1:

- no daily credit system is needed
- no cloud fair-use language is needed
- no model-provider decision is needed
