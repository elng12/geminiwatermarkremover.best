# Design System

## Visual Goal

Create a tool-first interface that feels fast, clean, and trustworthy, with
enough personality to avoid generic SaaS sameness.

The mood should be:

- modern
- precise
- privacy-first
- capable
- slightly bold

## Typography

Use:

- Headings: `Sora`
- Body and UI: `Plus Jakarta Sans`

Rules:

- large headline with tight tracking
- clean UI labels
- avoid default system feel
- keep body copy readable and short

### Type Scale

| Token       | Font              | Size   | Line Height | Weight | Tracking  | Usage              |
|-------------|-------------------|--------|-------------|--------|-----------|--------------------|
| display-lg  | Sora              | 48px   | 1.1         | 700    | -0.02em   | Hero H1            |
| heading-lg  | Sora              | 32px   | 1.2         | 600    | -0.01em   | Section title (H2) |
| heading-md  | Sora              | 24px   | 1.3         | 600    | normal    | Card title (H3)    |
| heading-sm  | Sora              | 18px   | 1.4         | 600    | normal    | FAQ title           |
| body-lg     | Plus Jakarta Sans | 18px   | 1.6         | 400    | normal    | Hero supporting    |
| body-md     | Plus Jakarta Sans | 16px   | 1.5         | 400    | normal    | Body paragraph     |
| body-sm     | Plus Jakarta Sans | 14px   | 1.5         | 400    | normal    | Helper text, labels|
| caption     | Plus Jakarta Sans | 12px   | 1.4         | 500    | 0.01em    | Privacy, disclaimer|

## Color System

### Base

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Surface alt: `#EEF4FF`
- Text main: `#0F172A`
- Text muted: `#475569`
- Border: `#D9E2F1`

### Brand

- Primary blue: `#2563EB`
- Primary blue dark: `#1D4ED8`
- Accent sky: `#38BDF8`
- CTA orange: `#F97316`
- Success green: `#10B981`
- Warning amber: `#F59E0B`
- Error red: `#EF4444`

### Semantic / State Backgrounds

- Error bg: `#FEF2F2`
- Warning bg: `#FFFBEB`
- Success bg: `#ECFDF5`
- Info bg: `#EFF6FF`

### Usage

- blue signals trust and action
- orange is reserved for the strongest CTA
- green is only for success states
- red is only for error states
- do not overuse gradients

## Background Treatment

Use a bright base with subtle depth:

- soft radial blue glow behind hero
- faint grid or dot texture only if very subtle
- crisp white cards on top

Avoid:

- heavy glassmorphism
- purple-on-white startup defaults
- dark mode as the default launch style

## Layout

- max content width: `1200px`
- section spacing: `72px` desktop, `48px` mobile
- card radius: `20px`
- button radius: `14px`
- input radius: `16px`
- generous whitespace around hero and comparison proof

### Responsive Breakpoints

| Name    | Width       | Description                        |
|---------|-------------|------------------------------------|
| mobile  | < 640px     | Single column, upload card full width |
| tablet  | 640–1024px  | Relaxed two-column, slider full width |
| desktop | > 1024px    | Full two-column hero, max 1200px   |

### Elevation

- shadow-sm: `0 1px 2px rgba(15,23,42,0.06)` — secondary buttons, inputs
- shadow-md: `0 4px 12px rgba(15,23,42,0.08)` — cards default
- shadow-lg: `0 8px 24px rgba(15,23,42,0.12)` — primary CTA hover, upload card
- shadow-focus: `0 0 0 3px rgba(37,99,235,0.3)` — focus ring

## Components

### Upload Card

- large dashed dropzone
- clear primary action
- visible file support line
- one-line no-upload-required promise
- one-line in-browser processing promise

### Trust Badges

- pill style
- light blue background
- dark text
- icon plus short label

### Comparison Slider

- full-width card
- thick visible handle
- labels for before and after
- must work on touch

### Buttons

Primary:

- solid orange
- white text
- slightly lifted shadow

Secondary:

- white or pale blue background
- blue text
- strong border

Tertiary:

- text link with underline on hover

### FAQ

- stacked accordion
- large tap targets
- answer text stays short and plain

### Manual Selection Helper

- medium-width panel or inline card
- clear crop box or selection area
- obvious retry path
- no scary technical language

### Demo Card

- fixed-width card, full width on mobile
- shows before thumbnail
- mark type label at bottom-left or bottom (pill style)
- `Try this example` button at bottom (secondary style)
- subtle raise on hover (shadow-lg)

### Processing State

- semi-transparent overlay inside the card
- centered indeterminate spinner (brand blue)
- one-line status text below the animation
- secondary hint: "If auto-detection misses, you can select manually"
- after 3 seconds, show "Still processing..." as a secondary message

### Result Feedback

- two buttons in a horizontal row
- positive: light green bg + dark green text + 👍 icon
- negative: light gray bg + dark gray text + 👎 icon
- selected state uses solid fill
- negative feedback expands an optional reason list

## Motion

- duration: `150ms` to `250ms`
- use only meaningful transitions
- subtle raise on hover
- respect `prefers-reduced-motion`

## Imagery Rules

- use real tool outputs
- no fake UI mockups pretending to be results
- no stock hero photography
- demo images should show the actual sparkle mark location clearly

## Accessibility

- minimum contrast should meet WCAG AA
- keyboard access for upload and FAQ
- visible focus rings
- error states must not rely on color only
- touch targets should be comfortable on mobile

## Dark Mode

v1 does not ship dark mode. All color tokens are defined for the Light theme only.
If dark mode is added later, extend via CSS variables or Tailwind `dark:` prefix without changing component structure.

## Implementation Notes

### CSS Variable Naming

All colors are exposed as CSS variables using the pattern `--color-{semantic}-{level}`

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

### Tailwind Extension

Mount the above variables via `extend.colors` in `tailwind.config.ts`.
Components must use semantic classes (e.g. `bg-surface`, `text-muted`) instead of raw hex values.

### Spacing Tokens

Use the Tailwind default 4px baseline grid. Add custom spacing only when necessary (e.g. section-gap: 72px → `space-section`).

### General Rules

- keep the design token names stable
- avoid ad-hoc one-off spacing and color values
