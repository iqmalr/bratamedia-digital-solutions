# PRD — Milestone 1: Project Foundation & Setup

**Project**: Bratamedia Digital Solutions
**Milestone**: M1 — Foundation
**Status**: `todo`
**Depends On**: —
**Goal**: Bootstrap the project with a complete configuration — no features yet, but fully ready for development across all subsequent milestones.

---

## Overview

This milestone produces no user-visible UI. The output is a clean, fully configured codebase that all agents can build on top of from M2 onward.

---

## Scope

### ✅ In Scope

- Initialize Next.js 16 with App Router and TypeScript strict mode
- Configure Tailwind CSS v4
- Set up shadcn/ui
- Set up Supabase client (browser & server)
- Configure `@/*` path alias (maps to `./src/*`)
- Configure ESLint
- Establish base folder structure
- Set up i18n (next-intl) with `id` and `en` locales
- Create `.env.local.example` with all required keys documented
- Configure root `layout.tsx` and `globals.css`

### ❌ Out of Scope

- Any page content or UI components
- Database tables or Supabase connections

---

## Folder Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── sections/
│   ├── layout/
│   └── shared/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── actions/
│   └── types/
│       └── index.ts
└── messages/
    ├── id.json
    └── en.json
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## Acceptance Criteria

- [ ] `npm run dev` runs without errors
- [ ] `npm run build` succeeds without errors
- [ ] `npm run lint` is clean — zero errors, zero warnings
- [ ] `@/*` path alias resolves correctly
- [ ] `/` and `/en` routes render without errors (blank page is acceptable)
- [ ] `src/lib/supabase/client.ts` and `server.ts` exist and are correctly typed
- [ ] `messages/id.json` and `messages/en.json` exist with an empty namespace structure
- [ ] `.env.local.example` documents all required environment variables

---

## Definition of Done

All acceptance criteria are met and reviewed by the Orchestrator before Milestone 2 begins.