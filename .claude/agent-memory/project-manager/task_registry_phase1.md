---
name: Task Registry Phase 1
description: All Phase 1 tasks (BRATA-001 to BRATA-030), their agents, story points, statuses, and Notion page IDs
type: project
---

Phase 1 tasks created in Notion on 2026-04-11. Backend tasks (BRATA-020 to BRATA-026) added on 2026-04-11.
Sprint plan reviewed and updated on 2026-04-12 after codebase audit.

**Why:** Task breakdown was created before coding begins so the user can review and approve scope.
**How to apply:** Check this registry when updating task statuses, identifying blockers, or recommending next tasks to assign.

## Completed (inferred from git history and file audit)

| ID | Title | Agent | SP | Status |
|----|-------|-------|-----|--------|
| BRATA-001 | i18n Setup — bilingual routing and translation dictionaries | frontend-dev | 3 | done |
| BRATA-002 | Root Layout — global styles, font tokens, orange palette | frontend-dev | 2 | done |
| BRATA-003 | Shared UI Primitives — Button, SectionWrapper, Container | frontend-dev | 2 | done |
| BRATA-004 | Hero Section Copy (ID & EN) | content-writer | 2 | done |
| BRATA-005 | Services Section Copy (ID & EN) | content-writer | 2 | done |
| BRATA-006 | Portfolio Section Copy (ID & EN) | content-writer | 3 | done |
| BRATA-007 | Testimonials Section Copy (ID & EN) | content-writer | 2 | done |
| BRATA-008 | Contact Section Copy (ID & EN) | content-writer | 2 | done |
| BRATA-009 | SEO Metadata — title, description, OG tags (ID & EN) | content-writer | 2 | done |
| BRATA-015 | Navbar — smooth scroll, language switcher | frontend-dev | 3 | done |
| BRATA-016 | Footer Component | frontend-dev | 2 | done |
| BRATA-020 | Supabase project setup and environment configuration | backend-supabase | 2 | done |
| BRATA-021 | Database schema and migrations — portfolio, services, testimonials, contact submissions | backend-supabase | 3 | done |
| BRATA-022 | Row Level Security (RLS) policies for all tables | backend-supabase | 2 | done |
| BRATA-023 | Server Actions — fetch services and portfolio items | backend-supabase | 3 | done |
| BRATA-024 | Server Action — fetch testimonials | backend-supabase | 2 | done |
| BRATA-025 | Contact form Server Action — validate and persist submission to DB | backend-supabase | 3 | done |

## In Progress / Todo (Sprint 2 — 2026-04-12)

| ID | Title | Agent | SP | i18n | Status |
|----|-------|-------|-----|------|--------|
| BRATA-026 | Seed data — initial services, portfolio, and testimonials records | backend-supabase | 2 | no | todo |
| BRATA-027 | DB schema fix — add subject field to contact_submissions | backend-supabase | 1 | no | todo |
| BRATA-010 | Hero Section Component | frontend-dev | 3 | yes | todo |
| BRATA-011 | Services Section Component | frontend-dev | 3 | yes | todo |
| BRATA-012 | Portfolio Section Component | frontend-dev | 3 | yes | todo |
| BRATA-013 | Testimonials Section Component | frontend-dev | 3 | yes | todo |
| BRATA-014 | Contact Section Component — form with Server Action | frontend-dev | 5 | yes | todo |
| BRATA-028 | Landing page assembly — wire all sections into [lang]/page.tsx | frontend-dev | 2 | no | todo |
| BRATA-017 | Framer Motion Scroll Animations — all sections | frontend-dev | 3 | no | todo |
| BRATA-018 | Responsive Design Audit | frontend-dev | 2 | no | todo |
| BRATA-019 | Accessibility Audit — ARIA, keyboard nav, contrast | frontend-dev | 2 | no | todo |
| BRATA-029 | Contact form — add subject field to Server Action and Zod schema | backend-supabase | 1 | no | todo |
| BRATA-030 | Vercel deployment and environment variable configuration | backend-supabase | 2 | no | todo |

---

## Task Notes (Sprint 2 — Todo Items)

### BRATA-026: Seed data — initial services, portfolio, and testimonials records
**Agent:** backend-supabase | **SP:** 2

- [ ] Create `supabase/seed.sql` (or a new migration) with INSERT statements
- [ ] Seed 6 services matching dictionary keys (webDevelopment, mobileDevelopment, uiUxDesign, digitalMarketing, cloudInfrastructure, itConsulting) — bilingual `name_id`/`name_en`, `description_id`/`description_en`, icon name, `sort_order` 1–6
- [ ] Seed 4–6 portfolio items with bilingual titles/descriptions, tags array, category, placeholder `image_url`
- [ ] Seed 3–4 testimonials with bilingual `quote_id`/`quote_en`, client info, placeholder `avatar_url`
- [ ] Verify all rows have `is_active = true` and correct `sort_order`
- [ ] Test: run seed against local/remote Supabase and confirm `getServices`, `getPortfolioItems`, `getTestimonials` return data

### BRATA-027: DB schema fix — add subject field to contact_submissions
**Agent:** backend-supabase | **SP:** 1

- [ ] Create migration `supabase/migrations/00003_add_subject_to_contact.sql`
- [ ] Add `subject TEXT` column to `contact_submissions` table (nullable, so existing rows are unaffected)
- [ ] Verify existing RLS policies still apply (no policy changes needed)
- [ ] Test: run migration, confirm column exists via Supabase dashboard or SQL query

### BRATA-029: Contact form — add subject field to Server Action and Zod schema
**Agent:** backend-supabase | **SP:** 1 | **Depends on:** BRATA-027

- [ ] Add `subject` to Zod schema in `src/lib/actions/contact.ts` (string, trimmed, min 1 char)
- [ ] Update `ContactFormResult` fieldErrors type to include `'subject'`
- [ ] Add `subject` to `rawInput` parsing from `formData.get('subject')`
- [ ] Include `subject` in the Supabase `.insert()` call
- [ ] Verify TypeScript compiles with no errors

### BRATA-010: Hero Section Component
**Agent:** frontend-dev | **SP:** 3 | **i18n:** yes

- [ ] Create `src/app/components/hero.tsx` as a Server Component
- [ ] Accept `dictionary` prop (or read from context) — use `hero.headline`, `hero.subheadline`, `hero.cta.primary`, `hero.cta.secondary`
- [ ] Build layout: large headline, subheadline, two CTA buttons (primary → contact scroll, secondary → portfolio scroll)
- [ ] Use `Container` and `SectionWrapper` primitives from `src/app/components/ui/`
- [ ] Style with Tailwind v4 — orange brand palette, responsive (mobile-first)
- [ ] Add placeholder background (gradient or abstract pattern)
- [ ] Ensure buttons use `Button` from `src/components/ui/button.tsx` (shadcn)
- [ ] Test: renders correctly in both `/id` and `/en` locales

### BRATA-011: Services Section Component
**Agent:** frontend-dev | **SP:** 3 | **i18n:** yes

- [ ] Create `src/app/components/services.tsx`
- [ ] Use mock data initially (typed as `LocalizedService[]` from `src/lib/actions/services.ts`)
- [ ] Create mock data array with 6 services matching dictionary content — use icon names (e.g. lucide icons)
- [ ] Build grid layout (3×2 on desktop, 2×1 on tablet, 1×1 on mobile)
- [ ] Each card: icon, service name, description
- [ ] Use `SectionWrapper`, `SectionHeading` (title from `services.title`, subtitle from `services.subtitle`)
- [ ] Style cards with Tailwind — subtle hover effect, orange accent
- [ ] Test: renders in both locales with mock data

### BRATA-012: Portfolio Section Component
**Agent:** frontend-dev | **SP:** 3 | **i18n:** yes

- [ ] Create `src/app/components/portfolio.tsx`
- [ ] Use mock data initially (typed as `LocalizedPortfolioItem[]` from `src/lib/actions/portfolio.ts`)
- [ ] Create mock data array with 4–6 portfolio items — placeholder images, tags, categories
- [ ] Build grid layout (responsive: 1/2/3 columns)
- [ ] Each card: image placeholder, title, description, tags as badges, "View Project" link text from `portfolio.viewProject`
- [ ] Use `SectionWrapper`, `SectionHeading` (title from `portfolio.title`, subtitle from `portfolio.subtitle`)
- [ ] Add "View All" button using `portfolio.viewAll` dictionary key
- [ ] Test: renders in both locales with mock data

### BRATA-013: Testimonials Section Component
**Agent:** frontend-dev | **SP:** 3 | **i18n:** yes

- [ ] Create `src/app/components/testimonials.tsx`
- [ ] Use mock data initially (typed as `LocalizedTestimonial[]` from `src/lib/actions/testimonials.ts`)
- [ ] Create mock data array with 3–4 testimonials — placeholder avatars, client info
- [ ] Build carousel or card grid layout (responsive)
- [ ] Each card: quote text, client name, role, company, avatar placeholder
- [ ] Use `SectionWrapper`, `SectionHeading` (title from `testimonials.title`, subtitle from `testimonials.subtitle`)
- [ ] Style with Tailwind — quotation marks decorative element, orange accent
- [ ] Test: renders in both locales with mock data

### BRATA-014: Contact Section Component — form with Server Action
**Agent:** frontend-dev | **SP:** 5 | **i18n:** yes | **Depends on:** BRATA-027, BRATA-029

- [ ] Create `src/app/components/contact.tsx` — must be `"use client"` (form state)
- [ ] Build form with fields: name, email, phone (optional), subject, message (textarea)
- [ ] Labels and placeholders from `contact.form.*` dictionary keys
- [ ] Wire form submission to `submitContactForm` Server Action
- [ ] Implement client-side validation feedback (show `fieldErrors` per field)
- [ ] Show success/error toast or inline message using `contact.form.successMessage`/`errorMessage`
- [ ] Show contact info sidebar: address, email, phone from `contact.info.*`
- [ ] Use `SectionWrapper`, `SectionHeading` (title from `contact.title`, subtitle from `contact.subtitle`)
- [ ] Disable submit button while submitting, show `contact.form.submitting` text
- [ ] Test: form renders in both locales, validation errors display, success state works

### BRATA-028: Landing page assembly — wire all sections into [lang]/page.tsx
**Agent:** frontend-dev | **SP:** 2 | **Depends on:** BRATA-010 to BRATA-014

- [ ] Create `src/app/[lang]/page.tsx`
- [ ] Import and render all sections in order: Hero → Services → Portfolio → Testimonials → Contact
- [ ] Pass `lang` param to each section (for dictionary/locale)
- [ ] Load dictionary via `getDictionary(lang)` and pass relevant slices to each component
- [ ] Ensure each section has an `id` attribute for smooth-scroll anchoring (matches Navbar links)
- [ ] Add SEO metadata using `seo.*` dictionary keys via `generateMetadata`
- [ ] Test: full page renders at `/id` and `/en`, all sections visible, scroll anchors work

### BRATA-017: Framer Motion Scroll Animations — all sections
**Agent:** frontend-dev | **SP:** 3 | **Depends on:** BRATA-028

- [ ] Add `framer-motion` fade-in-up animation to each section on scroll (viewport trigger)
- [ ] Stagger child animations within grid sections (Services, Portfolio, Testimonials cards)
- [ ] Hero section: animate headline, subheadline, and CTAs sequentially
- [ ] Keep animations subtle and performant (duration ~0.5s, `once: true` on viewport)
- [ ] Ensure animations respect `prefers-reduced-motion` media query
- [ ] Test: scroll through page, each section animates in smoothly

### BRATA-018: Responsive Design Audit
**Agent:** frontend-dev | **SP:** 2 | **Depends on:** BRATA-028

- [ ] Test all sections at breakpoints: 320px, 375px, 768px, 1024px, 1440px
- [ ] Fix any overflow, text truncation, or layout breaking issues
- [ ] Verify Navbar mobile menu works correctly at small widths
- [ ] Verify grid layouts collapse properly (Services, Portfolio, Testimonials)
- [ ] Check Contact form usability on mobile (touch targets, input sizing)
- [ ] Verify Footer layout at all breakpoints

### BRATA-019: Accessibility Audit — ARIA, keyboard nav, contrast
**Agent:** frontend-dev | **SP:** 2 | **Depends on:** BRATA-028

- [ ] Add `aria-label` to navigation landmarks, sections, and interactive elements
- [ ] Ensure all form inputs have associated `<label>` elements
- [ ] Verify tab order is logical across entire page
- [ ] Test keyboard navigation: Navbar links, CTA buttons, form fields, submit
- [ ] Check color contrast ratios (WCAG AA) for text on orange backgrounds
- [ ] Add `role` attributes where semantic HTML isn't sufficient
- [ ] Verify screen reader announces section headings and form errors

### BRATA-030: Vercel deployment and environment variable configuration
**Agent:** backend-supabase | **SP:** 2 | **Depends on:** all other tasks

- [ ] Connect Git repo to Vercel project
- [ ] Set environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Configure build settings (Next.js 16, output directory)
- [ ] Run production build (`npm run build`) locally to catch errors before deploy
- [ ] Trigger first deployment and verify all pages render
- [ ] Test both locale routes (`/id`, `/en`) on production URL
- [ ] Verify contact form submission works against production Supabase

---

## Story Point Totals (Sprint 2)
- frontend-dev: 21 points (BRATA-010 to 014, 017, 018, 019, 028)
- backend-supabase: 6 points (BRATA-026, 027, 029, 030)
- Total Sprint 2: 27 points

## Key Dependency Chains (Sprint 2)
1. BRATA-027 + BRATA-029 (schema + action fix) must complete before BRATA-014 (Contact Component)
2. BRATA-026 (seed data) should complete before or alongside section components so data renders
3. BRATA-010 to BRATA-014 must all complete before BRATA-028 (landing page assembly)
4. BRATA-028 must complete before BRATA-017 (animations) and BRATA-018/019 (audits)
5. BRATA-030 (Vercel deploy) is the final gate before Phase 1 ships
