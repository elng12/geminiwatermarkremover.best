# Assets and Demo Images

## Goal

Prepare a small, high-trust asset set that helps users understand the tool
without needing a long explanation.

## Required Asset Groups

### 1. Demo Images

Need `2` to `3` real examples for homepage try-before-upload flow.

Required scenarios:

- standard visible Gemini sparkle watermark in the bottom-right corner
- a lightly compressed or resized image with the same visible sparkle mark
- a Nano Banana or Gemini-style image that still shows the visible sparkle mark

For each scenario, prepare:

- original image
- cleaned image
- optional selected-area preview
- short label
- short alt text

### 2. OG Image

Need one social preview image that shows:

- the product name
- one clean before/after comparison
- `100% in your browser` positioning

### 3. Favicon and App Icon

Use a simple geometric mark.
Do not imitate Google or Gemini branding.

## Asset File Plan

Recommended paths:

- `public/demo/demo-01-before.webp`
- `public/demo/demo-01-after.webp`
- `public/demo/demo-02-before.webp`
- `public/demo/demo-02-after.webp`
- `public/demo/demo-03-before.webp`
- `public/demo/demo-03-after.webp`
- `public/og/og-home.png`
- `public/icons/favicon.svg`

## Naming Rules

Use stable, descriptive names:

- `demo-01-sparkle-before.webp`
- `demo-01-sparkle-after.webp`
- `demo-02-compressed-sparkle-before.webp`
- `demo-02-compressed-sparkle-after.webp`
- `demo-03-nano-banana-before.webp`
- `demo-03-nano-banana-after.webp`

Avoid random filenames.

## Content Rules

- use real tool outputs
- do not fake a perfect result in a mocked screenshot
- keep the visible watermark area large enough that users understand the change
- do not use copyrighted third-party content without permission

## Demo Card Copy Rules

Each demo should have:

- short title
- one-line description
- `Try this example` button

Example labels:

- `Visible sparkle cleanup`
- `Compressed image retry`
- `Nano Banana visible mark`

## Alt Text Rules

Keep alt text plain and descriptive.

Examples:

- `Example image with a visible Gemini sparkle watermark in the corner`
- `Cleaned result after removing a visible Gemini sparkle watermark`

## Source and Rights Checklist

Before shipping a demo asset, confirm:

- the team owns the image or has permission to use it
- the cleaned result can be shown publicly
- the demo does not create legal confusion about brand ownership

## Open Placeholder

If final assets are not ready, ship with a content checklist and placeholder
cards, but do not fake before/after proof with decorative stock art.
