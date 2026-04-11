---
name: Supabase Integration Setup Details
description: Package versions, env var names, client file locations, and patterns established in BRATA-020
type: project
---

Supabase packages installed (as of 2026-04-11):
- `@supabase/supabase-js` ^2.103.0
- `@supabase/ssr` ^0.10.2

Environment variable names (NEXT_PUBLIC_ prefix — safe to expose, protected by RLS):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Client utility locations:
- `src/lib/supabase/client.ts` — `createClient()` for Client Components (uses `createBrowserClient`)
- `src/lib/supabase/server.ts` — `createServerClient()` async factory for Server Components & Server Actions (uses `createServerClient` from `@supabase/ssr`)
- `src/types/database.ts` — Database type placeholder; regenerate with `npx supabase gen types typescript --project-id <id>`

Cookie handling pattern in server.ts:
- `getAll()` returns all cookies from the store
- `setAll()` wrapped in try/catch — cookie writes fail silently during RSC render (expected); middleware handles session refresh for those cases

`.gitignore` updated from `.env*` glob to explicit entries so `.env.local.example` is committable:
```
.env
.env.local
.env.*.local
.env.development
.env.production
.env.test
```

**Why:** `.env*` glob blocked committing `.env.local.example` reference file. Explicit entries keep secrets out while letting example files be tracked.

**How to apply:** When adding new env files for staging or CI, add them explicitly to `.gitignore` rather than relying on glob. Example files (`*.example`) should always be committed.
