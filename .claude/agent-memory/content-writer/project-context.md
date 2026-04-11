---
name: Project Context — Bratamedia Digital Solutions
description: Core facts about the Bratamedia project: what it is, who it's for, scope, and content structure
type: project
---

## What Bratamedia Is
A software house based in Indonesia. The website serves as their primary lead-generation and portfolio showcase. Primary audience: Indonesian business owners (non-technical to semi-technical) looking to build digital products.

## Website Scope (Current)
Landing page only. Sections: Hero, Services, Portfolio, Testimonials, Contact.

## Planned Future Scope
- Admin panel
- Blog / article system (Tiptap v3 rich text editor)
- Portfolio detail pages (`/portfolio/[slug]`)

## Content Reference File
All landing page copy lives at: `src/content/landing-page-copy.md`
Covers BRATA-004 (Hero) through BRATA-009 (SEO Metadata).
Translation key format: `{ "key": { "id": "...", "en": "..." } }`

## Portfolio Projects (Fictional, Approved)
These four fictional projects are the canonical portfolio for the site. Use them consistently in testimonials, case studies, and blog articles:

1. **PasarKita** — B2B e-commerce for Indonesian SMEs. Stack: Next.js, Node.js, PostgreSQL, Midtrans. Client: Rendra Kusuma (CEO).
2. **MediTrack** — Digital medical records for clinics. Stack: React Native, Express.js, MySQL, Firebase. Client: dr. Ayu Paramitha (Ops Director).
3. **Warehous.io** — Warehouse management system. Stack: Vue.js, Laravel, Redis, Docker. Client: Budi Santoso (CTO).
4. **KelolaDana** — Personal/SME finance mobile app. Stack: Flutter, Go, PostgreSQL, AWS. Client: Lestari Wulandari (Co-Founder).

## Branding
- Primary color: Orange (exact palette TBD as of 2026-04-11)
- Language order: Indonesian (id) is primary market; English (en) is secondary

## Sitemap Coordination (for Backend Agent)
- `/` priority 1.0, changefreq monthly — ready
- `/portfolio/[slug]` priority 0.7, changefreq monthly — add when pages built
- `/blog` priority 0.8, changefreq weekly — add at blog launch
- `/blog/[slug]` priority 0.6, changefreq weekly — add per article

**Why:** Established at project start. Content writer needs this context to maintain narrative consistency across sections, articles, and future content.

**How to apply:** Always reference the four canonical portfolio projects when writing case studies, testimonials, or blog articles that reference past work. Do not invent new projects without flagging it.
