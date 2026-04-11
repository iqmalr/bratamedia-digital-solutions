# PRD — Milestone 4: Blog & CMS

**Project**: Bratamedia Digital Solutions
**Milestone**: M4 — Blog & CMS
**Status**: `todo`
**Depends On**: M1, M2, M3
**Goal**: An admin can create, edit, and publish blog articles. Published articles appear on the public site with full bilingual support (id/en).

---

## Overview

This milestone delivers a complete blog system — a Tiptap v3 rich text editor for the admin, public article pages for visitors, and full bilingual support. All content is stored in Supabase. Articles are locale-scoped: an `id` article appears under `/blog`, an `en` article under `/en/blog`.

---

## Scope

### ✅ In Scope

- `articles` table in Supabase
- Admin: article list with status indicators and actions
- Admin: create and edit article pages with Tiptap v3 editor
- Admin: publish / unpublish / delete articles
- Admin: cover image upload to Supabase Storage
- Public: article list page (`/blog`, `/en/blog`)
- Public: article detail page (`/blog/[slug]`, `/en/blog/[slug]`)
- Dynamic SEO metadata per article (`generateMetadata`)
- `sitemap.ts` updated to include all published articles
- Optional: latest 3 articles previewed in landing page

### ❌ Out of Scope

- Article comments
- Categories or tags (can be added in a future milestone)
- Portfolio CMS (M5)
- Newsletter or subscription

---

## Database Schema

### Table `articles`

```sql
create table articles (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  content      text not null,           -- Tiptap HTML output
  cover_url    text,
  locale       text not null default 'id',  -- 'id' | 'en'
  status       text not null default 'draft',  -- 'draft' | 'published'
  published_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

alter table articles enable row level security;

-- Public: read published articles only
create policy "public read published" on articles
  for select using (status = 'published');

-- Admin: full access
create policy "admin full access" on articles
  for all using (auth.role() = 'authenticated');
```

### Supabase Storage

```
bucket: article-images
  - authenticated users: upload
  - public: read
```

---

## Server Action Signatures

```typescript
// src/lib/actions/articles.ts
"use server";

export async function getArticles(locale: string): Promise<ActionResult<Article[]>>
export async function getArticleBySlug(slug: string): Promise<ActionResult<Article>>
export async function createArticle(data: unknown): Promise<ActionResult<Article>>
export async function updateArticle(id: string, data: unknown): Promise<ActionResult<Article>>
export async function deleteArticle(id: string): Promise<ActionResult<void>>
export async function toggleArticleStatus(id: string): Promise<ActionResult<Article>>

// src/lib/actions/upload.ts
"use server";

export async function uploadImage(file: File, bucket: string): Promise<ActionResult<string>>
```

---

## i18n Namespace Addition

```json
{
  "blog": {
    "title": "",
    "subtitle": "",
    "read_more": "",
    "empty": "",
    "published_at": "",
    "back": ""
  }
}
```

---

## Technical Notes

- Tiptap must be initialized via `npx tiptap init` — do **not** set it up manually
- Editor output is an HTML string stored in the `content` column
- Images are uploaded to Supabase Storage; the returned URL is inserted into the editor content
- Slugs are auto-generated from the title but editable by the admin
- Slug uniqueness is enforced at the database level (`unique` constraint)

---

## Acceptance Criteria

### Admin
- [ ] Admin can create a new article with title, slug, excerpt, cover image, Tiptap content, locale, and status
- [ ] Admin can edit an existing article
- [ ] Admin can toggle status between draft and published
- [ ] Admin can delete an article with a confirmation step
- [ ] Cover image upload to Supabase Storage succeeds and the image renders in the editor
- [ ] Duplicate slugs are rejected with a clear error message

### Public
- [ ] `/blog` and `/en/blog` display only published articles for their respective locale
- [ ] `/blog/[slug]` renders the full article content
- [ ] `generateMetadata` produces a dynamic title and description per article
- [ ] `sitemap.ts` includes all published articles

### General
- [ ] Draft articles are not visible on public pages
- [ ] Vercel build succeeds without errors
- [ ] No direct Supabase calls in components — all data access via `@/lib/actions/`

---

## Definition of Done

An admin can publish an article and it immediately appears on the public site. At least one inaugural article in each locale (`id` and `en`) is live in production.