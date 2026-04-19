# Gemini Watermark Remover Online

Browser-only image tool for removing the visible Gemini sparkle watermark and similar small corner marks.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- Static export output

## Local development

```bash
npm install
npm run dev
```

Default dev URL:

```text
http://localhost:3000
```

If port `3000` is already occupied, start Next on another port:

```bash
npx next dev --hostname 0.0.0.0 --port 3002
```

## Build

```bash
npm run build
```

Static export files are generated into `out/`.

## Smoke test

```bash
npm run smoke
```

## Browser E2E

```bash
npm run e2e
```

## Full check

```bash
npm run check
```

If Playwright cannot find a local browser, run this once:

```bash
npx playwright install chromium
```

## Project structure

```text
app/                  Next.js routes and metadata
components/           Shared React components
docs/                 Product, copy, and design documentation
lib/                  Shared site config and content
public/               Demo images, OG image, browser runtime assets
scripts/              Build support and browser test scripts
server/               Local preview utilities
src/                  Legacy browser runtime and styles
```

## Notes

- Image cleanup runs locally in the browser.
- The app does not upload user images for processing in v1.
- Search Console verification can be provided with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Canonical, Open Graph, `robots.txt`, and `sitemap.xml` use `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) at build time.
