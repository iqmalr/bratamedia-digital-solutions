# PRD — Milestone 5: Portfolio CMS

**Project**: Bratamedia Digital Solutions
**Milestone**: M5 — Portfolio CMS
**Status**: `todo`
**Depends On**: M1, M2, M3, M4
**Goal**: Portfolio content is managed from the admin panel and rendered dynamically on the landing page, replacing the static data introduced in M2.

---

## Overview

In M2, the Portfolio section was built with static data (hardcoded via i18n or a static array). This milestone moves that content to Supabase and gives the admin full control to add, edit, reorder, and remove portfolio items without touching code.

Each portfolio item stores bilingual content (`title` and `description` for both `id` and `en`) in a single row, keeping the schema simple and queries straightforward.

---

## Scope

### ✅ In Scope

- `portfolio_items` table in Supabase
- Admin: portfolio item list with drag-and-drop reordering
- Admin: create, edit, and delete portfolio items
- Cover image upload to Supabase Storage
- Portfolio section on the landing page pulling live data from Supabase
- Bilingual fields per item: `title_id`, `title_en`, `description_id`, `description_en`
- Optional: category filter UI on the public portfolio section

### ❌ Out of Scope

- Individual portfolio detail pages (future milestone)
- Testimonials CMS
- External platform integrations (Behance, Dribbble, etc.)

---

## Database Schema

### Table `portfolio_items`

```sql
create table portfolio_items (
  id             uuid primary key default gen_random_uuid(),
  title_id       text not null,
  title_en       text not null,
  description_id text,
  description_en text,
  cover_url      text,
  project_url    text,
  category       text,
  sort_order     int not null default 0,
  is_featured    boolean default false,
  is_visible     boolean default true,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table portfolio_items enable row level security;

-- Public: read visible items only
create policy "public read visible" on portfolio_items
  for select using (is_visible = true);

-- Admin: full access
create policy "admin full access" on portfolio_items
  for all using (auth.role() = 'authenticated');
```

### Supabase Storage

```
bucket: portfolio-images
  - authenticated users: upload
  - public: read
```

---

## Server Action Signatures

```typescript
// src/lib/actions/portfolio.ts
"use server";

export async function getPortfolioItems(): Promise<ActionResult<PortfolioItem[]>>
export async function createPortfolioItem(data: unknown): Promise<ActionResult<PortfolioItem>>
export async function updatePortfolioItem(id: string, data: unknown): Promise<ActionResult<PortfolioItem>>
export async function deletePortfolioItem(id: string): Promise<ActionResult<void>>
export async function reorderPortfolioItems(ids: string[]): Promise<ActionResult<void>>
```

---

## Migration from M2 Static Data

1. Seed existing static portfolio entries into the `portfolio_items` table via Supabase dashboard or a SQL seed file
2. Update `sections/portfolio.tsx` to fetch data from `getPortfolioItems` action
3. Remove static data arrays and any i18n keys that were used solely for portfolio content

---

## Acceptance Criteria

### Admin
- [ ] Admin can add a new portfolio item with all fields
- [ ] Admin can edit an existing item
- [ ] Admin can delete an item with a confirmation step
- [ ] Admin can reorder items via drag-and-drop; order persists after page refresh
- [ ] Cover image upload to Supabase Storage succeeds
- [ ] Toggling `is_visible` immediately hides or shows the item on the public section

### Public
- [ ] Portfolio section on the landing page renders data from Supabase, not static data
- [ ] Copy is displayed in the correct language (`id` or `en`) based on the active locale
- [ ] Items are ordered according to `sort_order` set by the admin
- [ ] Items with `is_visible = false` do not appear on the public page

### General
- [ ] Vercel build succeeds without errors
- [ ] No direct Supabase calls in components — all data access via `@/lib/actions/`

---

## Definition of Done

An admin can fully manage portfolio content without touching code. All static portfolio data from M2 has been seeded into the database and the static data layer has been removed.