# AI Build Brief

## Project

Build a production-ready MVP for `geminiwatermarkremover.best`.

This project is a real tool, not a mock landing page.
Users must be able to upload an image, remove the visible Gemini sparkle-style
watermark in the browser, preview the result, and download the cleaned image.

## Source of Truth

If any older project document conflicts with this brief, follow this file and
the files listed below.

Priority order:

1. `docs/ai-build-brief.md`
2. `docs/page-specs.md`
3. `docs/copy-deck.md`
4. `docs/design-system.md`
5. `docs/backend-contract.md`
6. `docs/processing-engine-decision.md`
7. `docs/assets-and-demo-images.md`
8. Older PRD and review files are background context only

## Product Definition

`Gemini Watermark Remover Online` is a pure in-browser image cleanup tool for
the visible Gemini sparkle watermark and similar small visible corner marks.

Core promises:

- Free online tool
- No sign-up required
- 100% in-browser processing
- No upload required
- No daily limit in v1
- Visible marks only

The product must not claim to remove:

- SynthID
- Invisible watermarks
- Provenance metadata
- Video watermarks
- Any watermark on any image with perfect accuracy

## Product Strategy

### SEO Strategy

Use one strong homepage to carry the main search intent.

Do not create near-duplicate SEO pages for:

- free
- online
- no sign up
- from image
- logo remover

Those intents should be covered naturally inside homepage sections, headings,
FAQ, metadata, and anchor links.

Keep only these routes:

- `/`
- `/privacy-policy`
- `/terms-of-service`
- `/contact` is optional and can be added later

### Processing Strategy

Use a pure browser architecture in v1:

1. Detect the visible Gemini-style watermark in the browser
2. Remove it with deterministic image processing, not a remote AI model
3. Let the user retry with manual selection if auto-detection is imperfect
4. Keep all image data inside the browser during processing

No image should be uploaded for processing in v1.

## Technical Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Browser image processing with `Canvas`, `Web Worker`, and `OpenCV.js`
- Deterministic cleanup with reverse alpha blending as the primary method
- Optional template matching or corner detection for better auto-locate logic
- GA4 for analytics

## Must-Have Features

- Real image upload
- Support `JPG`, `PNG`, and `WebP`
- Client-side validation before processing
- Automatic detection of the visible Gemini sparkle watermark when possible
- Reverse alpha blending for the default cleanup path
- Manual area selection retry if auto-detection misses the mark
- Before/after preview
- Download cleaned image
- `Try an example` with demo images
- FAQ with compliance boundaries
- Privacy-first messaging
- Mobile-friendly comparison UI

## Default Product Rules

- Suggested file size limit: `10MB`
- Processing happens entirely in the browser in v1
- No image upload is required for cleanup
- No daily credit system or public fair-use limit is needed in v1
- If the browser cannot process a file reliably, guide the user to try a
  smaller image or a manual selection retry

## Homepage Positioning

The homepage must feel like a tool first.

Above the fold, users should immediately understand:

- what the tool does
- that it is free
- that it works online
- that no sign-up is required
- that everything runs in the browser
- that images are not uploaded for processing

## Non-Goals

- No account system
- No subscription system in v1
- No batch processing
- No video processing
- No browser extension
- No API product
- No remote AI cleanup model
- No cloud processing path in v1
- No community features
- No thin SEO page cluster

## Deliverables

The AI implementation should produce:

- a polished homepage
- legal pages
- real in-browser processing flow
- usable mobile layout
- production-ready copy, metadata, and FAQ
- demo image handling and before/after proof

## Open Placeholders

These may ship with placeholders and be replaced later:

- legal email: `legal@yourdomain.com`
- privacy email: `privacy@yourdomain.com`
- company or operator name
- final demo image set
