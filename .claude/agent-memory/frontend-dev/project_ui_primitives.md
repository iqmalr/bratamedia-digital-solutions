---
name: UI Primitives & Design System
description: shadcn/ui setup, orange brand tokens, shared layout components, and where each lives
type: project
---

## shadcn/ui Installation (style: base-nova)

Initialized with `npx shadcn@latest init --defaults`. Config at `components.json`.
- Style: `base-nova` (NOT the older "default" or "new-york" styles)
- Uses `@base-ui/react` primitives under the hood (not Radix UI directly)
- Component alias: `@/components/ui/` — shadcn installs here, NOT `@/app/components/ui/`
- Utils alias: `@/lib/utils` (has `cn()` helper)
- Icons: `lucide-react`

## Brand Orange Palette (CSS custom properties in globals.css)

All defined as CSS custom properties in `src/app/globals.css`:
- `--brand`            = orange-500 (`oklch(0.703 0.191 47.604)`)
- `--brand-light`      = orange-400 (`oklch(0.75 0.183 55.934)`)
- `--brand-dark`       = orange-600 (`oklch(0.646 0.222 41.116)`)
- `--brand-subtle`     = orange-50  (`oklch(0.98 0.016 73.684)`) — dark: `oklch(0.22 0.04 55)`
- `--brand-foreground` = white

Exposed as Tailwind utilities via `@theme inline`:
- `bg-brand`, `text-brand`, `border-brand`, `ring-brand`
- `bg-brand-light`, `bg-brand-dark`, `bg-brand-subtle`, `text-brand-foreground`

## Button Variants (src/components/ui/button.tsx)

Three brand-specific variants added on top of shadcn defaults:
- `brand`         — solid orange fill, primary CTA
- `brand-outline` — orange border, transparent fill; hover fills orange
- `brand-ghost`   — no border, subtle orange hover; secondary actions

## Layout Primitives (src/app/components/ui/)

| Component        | File                      | Purpose                                   |
|------------------|---------------------------|-------------------------------------------|
| `Container`      | `container.tsx`           | `max-w-7xl` wrapper with responsive px    |
| `SectionWrapper` | `section-wrapper.tsx`     | `<section>` with py-16/20/28 + Container  |
| `SectionHeading` | `section-heading.tsx`     | `<h2>` + subtitle + optional brand accent |
| barrel export    | `index.ts`                | re-exports all three                      |

`SectionWrapper` accepts `background="muted"` for alternating section tinting.
`SectionHeading` renders an orange `<span>` accent bar above `<h2>` by default (`withAccent` prop).

## Font

Inter used as placeholder (font decision TBD). Loaded as `--font-inter` CSS var.
Geist Mono kept for code content. Both set in `src/app/layout.tsx`.
`@theme inline` in globals.css maps `--font-sans` → `--font-inter`.

**Why:** Font is TBD per project brief; Inter is clean and widely available.
**How to apply:** When final font is decided, change only the `next/font/google` import in `layout.tsx` and update the CSS var name in globals.css.
