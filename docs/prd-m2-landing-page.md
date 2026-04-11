# PRD — Milestone 2: Landing Page

**Project**: Bratamedia Digital Solutions
**Milestone**: M2 — Landing Page
**Status**: `todo`
**Depends On**: M1
**Goal**: Ship a fully responsive, bilingual (id/en), SEO-ready landing page with scroll animations and a working contact form.

---

## Overview

This milestone delivers the only public-facing page visitors will see at launch. All content is static — no database reads required except for the contact form submission. The five sections and copy can be developed in parallel between the Frontend and Content Writer agents.

---

## Scope

### ✅ In Scope

- Five landing page sections: Hero, Services, Portfolio, Testimonials, Contact
- Header and Footer with navigation and language switcher
- Framer Motion scroll animations per section
- Full i18n — all copy available in both `id` and `en`
- Contact form submitting to Supabase via Server Action
- SEO: dynamic metadata, OG tags, `sitemap.ts`, `robot.ts`
- Responsive layout: mobile, tablet, desktop
- Deployment to Vercel

### ❌ Out of Scope

- Admin panel or authentication
- Blog or article system
- CMS of any kind
- Portfolio data from database — content is static (i18n / static array) for now, migrated to DB in M5

---

## Database Schema

### Table `contacts`

```sql
create table contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz default now()
);

-- Anyone can insert; no one can select (until admin is built in M3)
alter table contacts enable row level security;
create policy "public insert" on contacts for insert with check (true);
```

---

## i18n Namespace Structure

```json
{
  "nav": { "services": "", "portfolio": "", "testimonials": "", "contact": "" },
  "hero": { "headline": "", "subheadline": "", "cta": "" },
  "services": { "title": "", "items": { "<slug>": { "name": "", "description": "" } } },
  "portfolio": { "title": "", "items": { "<slug>": { "title": "", "category": "" } } },
  "testimonials": { "title": "" },
  "contact": { "title": "", "name": "", "email": "", "message": "", "submit": "", "success": "", "error": "" },
  "footer": { "tagline": "", "copyright": "" }
}
```

Key structure must be **identical** across `id.json` and `en.json`.

---

## Acceptance Criteria

- [ ] All 5 sections, header, and footer render without errors
- [ ] Language switcher works — all copy switches correctly between `id` and `en`
- [ ] Contact form submits successfully and data appears in the `contacts` table in Supabase
- [ ] Contact form shows appropriate success and error states
- [ ] All Framer Motion animations run correctly; `prefers-reduced-motion` is respected
- [ ] Page is fully responsive at mobile (375px), tablet (768px), and desktop (1280px)
- [ ] Lighthouse scores: Performance ≥ 90, SEO = 100, Accessibility ≥ 90
- [ ] `sitemap.ts` and `robot.ts` return correct output
- [ ] Vercel deployment succeeds without build errors
- [ ] No hardcoded display copy in components — all text via i18n keys

---

## Definition of Done

All acceptance criteria are met, reviewed by the Orchestrator, and the page is live on the Vercel production URL.