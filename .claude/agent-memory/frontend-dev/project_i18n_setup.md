---
name: i18n Setup
description: Architecture and key decisions for the bilingual (id/en) i18n system built without a library
type: project
---

The i18n system uses a lightweight dictionary-based approach following the Next.js 16 docs pattern exactly — no external library.

**Structure:**
- `src/i18n/types.ts` — TypeScript `Dictionary` interface covering all landing page sections
- `src/i18n/dictionaries/id.ts` — Indonesian translations (default locale)
- `src/i18n/dictionaries/en.ts` — English translations
- `src/i18n/index.ts` — server-only, exports `getDictionary(locale)`, `hasLocale()`, `locales`, `defaultLocale`, `localeLabels`
- `src/i18n/locale-context.tsx` — `"use client"` React context + `useLocale()` hook + `<LocaleProvider>` for client-side language switching
- `src/proxy.ts` — Next.js 16 Proxy (renamed from middleware) that detects Accept-Language header and redirects bare paths to `/<locale>/...`

**Route structure:**
- `app/layout.tsx` — root layout, owns `<html lang="id" suppressHydrationWarning><body>`, minimal metadata
- `app/[lang]/layout.tsx` — locale layout: validates locale (notFound if invalid), sets locale-aware metadata via generateMetadata, wraps children in `<LocaleProvider initialLocale={lang}>`
- `app/[lang]/page.tsx` — landing page, receives dict and renders sections
- `app/page.tsx` — root page safety net, immediately redirects to `/id`

**Key Next.js 16 facts applied:**
- `proxy.ts` is the new name for `middleware.ts`; the exported function is named `proxy` not `middleware`
- `params` is a Promise — always `await params` before accessing
- `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` are globally available typed helpers (no import needed)
- `generateStaticParams` in `[lang]/layout.tsx` pre-renders both locales at build time

**Why:** Keeps all translation files server-side (zero client bundle cost). Client components get locale via `useLocale()` from context. `LocaleProvider` is initialized by the server with the correct locale, so no flicker.
