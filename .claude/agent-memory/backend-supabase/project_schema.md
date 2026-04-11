---
name: Database Schema
description: Table schemas, relationships, RLS model, and admin role pattern for the Bratamedia Supabase database
type: project
---

Four tables live in the `public` schema, created in migration `00001_create_tables.sql`.

**Tables**

- `services` — landing page service offerings; bilingual (name_id/name_en, description_id/description_en), icon, sort_order, is_active, created_at, updated_at
- `portfolio` — showcase projects; bilingual titles/descriptions, image_url, tags (text[]), category, sort_order, is_active, created_at, updated_at
- `testimonials` — client quotes; bilingual quote_id/quote_en, client_name, client_role, client_company, avatar_url, sort_order, is_active, created_at, updated_at
- `contact_submissions` — contact form data; name, email, phone, message, is_read (bool), created_at (NO updated_at — immutable audit record)

**Shared trigger:** `public.set_updated_at()` is a `before update` trigger function applied to services, portfolio, and testimonials. contact_submissions intentionally omits it.

**TypeScript types** are in `src/types/database.ts`. Exports: `ServiceRow`, `PortfolioRow`, `TestimonialRow`, `ContactSubmissionRow` plus Insert/Update variants and the `Database` interface used by the Supabase client.

**RLS model** (migration `00002_rls_policies.sql`):

- services/portfolio/testimonials: public SELECT where is_active = true; admin INSERT/UPDATE/DELETE
- contact_submissions: public INSERT (any visitor); admin SELECT and UPDATE (mark is_read); NO delete policy (service role needed for GDPR erasure)
- Admin check: `public.is_admin()` function reads `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`. app_metadata is set server-side with the service role key; users cannot elevate themselves.

**Why:** Bilingual schema stores both locales in the same row (no separate translation table) for simplicity at this stage. Admin role in app_metadata (not user_metadata) because app_metadata is write-protected from client-facing APIs.

**How to apply:** When writing Server Actions that query these tables, filter `is_active = true` for public reads (though RLS enforces it anyway — defense in depth). For admin writes, always verify `is_admin()` at the action level before calling Supabase. Never use service role key in user-facing code.
