---
name: Navbar & Footer Architecture
description: How Navbar and Footer are structured, how they receive i18n data, and integration with [lang]/layout.tsx
type: project
---

Both Navbar and Footer are Client Components (`"use client"`) because they consume `useLocale()` from `@/i18n/locale-context`. Dictionary data is fetched server-side in `src/app/[lang]/layout.tsx` and passed as props — this keeps the client boundary lean while still using server-fetched translations.

**Why:** `useLocale()` requires a client context. But we do NOT want to fetch dictionaries client-side. The pattern is: Server layout fetches dict, passes relevant slices as typed props to Client Components.

**How to apply:** Follow this prop-passing pattern for any global UI that needs both i18n and interactivity. Do not fetch dictionaries inside client components.

## File locations
- `src/app/components/navbar.tsx` — sticky header, scroll blur, mobile hamburger, language toggle
- `src/app/components/footer.tsx` — grid layout, quick links, contact info, social icons, copyright

## Integration point
`src/app/[lang]/layout.tsx` — fetches `dict` once, passes `dict.navbar` to `<Navbar>` and `dict.footer` + `dict.navbar.links` to `<Footer>`. The layout also wraps children in a flex column with `pt-16` to offset the fixed navbar.

## Layout structure in [lang]/layout.tsx
```
<LocaleProvider>
  <Navbar dict={dict.navbar} />
  <div className="flex min-h-screen flex-col pt-16">
    <main className="flex-1">{children}</main>
    <Footer dict={dict.footer} navLinks={dict.navbar.links} />
  </div>
</LocaleProvider>
```

## Navbar features
- Fixed top, `z-50`
- Scroll detection: `bg-background/90 backdrop-blur-md shadow-sm` when scrolled > 16px
- `prefers-reduced-motion` respected via Framer Motion's `useReducedMotion()` — mobile menu AnimatePresence variants are emptied when reduced motion is requested
- Language toggle shows ID/EN pill with active locale highlighted in brand orange
- `switchLocale()` from `useLocale()` handles navigation to the other locale path
- Hamburger uses CSS transforms (no Framer Motion) for the X animation — always respects reduced motion via CSS media query override in globals.css

## Footer features
- `"use client"` — uses `useLocale()` for column heading labels (Navigation vs Navigasi)
- Copyright year computed with `new Date().getFullYear()` — handles `{year}` placeholder in dictionary string
- Social icons are inline SVG — no icon library dependency
- Contact info uses semantic `<address>` element

## Anchor link convention
Section hrefs use plain hash anchors: `#hero`, `#services`, `#portfolio`, `#testimonials`, `#contact`. `scroll-behavior: smooth` is set globally in `globals.css` (disabled for `prefers-reduced-motion`).
