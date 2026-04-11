# Agent Instructions — Bratamedia Digital Solutions

This file is the single source of truth for AI agents working on this codebase.
Write imperatively. Every statement here is a directive, not a suggestion.

## Read First

Read `node_modules/next/dist/docs/` before writing any Next.js code. This is Next.js 16 — it has breaking changes from older versions. APIs, conventions, and file structure differ from your training data. Heed deprecation notices.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **React**: v19 with React Compiler enabled
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui — install via `npx shadcn@latest add <component>`, do not copy-paste
- **Rich Text Editor**: Tiptap v3 — initialize via `npx tiptap init`, do not manually code setup
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL) — client in `src/lib/supabase/`, types in `src/types/database.ts`
- **Data Layer**: Server Actions in `src/lib/actions/` — locale-aware fetch, Zod validation
- **i18n**: Bilingual — Indonesian (id, default) & English (en), dictionary-based in `src/i18n/`
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (html/body, Inter font)
│   ├── page.tsx                # Root redirect to /[lang]
│   ├── globals.css             # Tailwind v4, orange brand palette (OKLCH)
│   ├── [lang]/                 # Locale-segmented routes
│   │   ├── layout.tsx          # Locale layout (LocaleProvider, Navbar, Footer)
│   │   └── page.tsx            # Landing page
│   └── components/             # Shared UI components
│       ├── navbar.tsx
│       ├── footer.tsx
│       └── ui/                 # Primitives (Container, SectionWrapper, SectionHeading)
├── components/ui/              # shadcn/ui components (Button, etc.)
├── content/                    # Static content reference (copy, translations)
├── i18n/
│   ├── config.ts               # Isomorphic: locales, defaultLocale, hasLocale
│   ├── index.ts                # Server-only: getDictionary()
│   ├── locale-context.tsx      # Client: useLocale(), switchLocale()
│   ├── types.ts                # Dictionary type definitions
│   └── dictionaries/           # id.ts, en.ts
├── lib/
│   ├── supabase/               # Supabase clients (client.ts, server.ts)
│   ├── actions/                # Server Actions (services, portfolio, testimonials, contact)
│   └── utils.ts
├── types/
│   └── database.ts             # Supabase Database types (Row/Insert/Update variants)
└── proxy.ts                    # Locale detection & redirect (Next.js 16 proxy, NOT middleware)
supabase/
└── migrations/                 # SQL migrations (schema, RLS policies)
```

## Code Conventions

- All code (variables, functions, comments, commits) in **English**
- Use path alias `@/*` for imports (maps to `./src/*`)
- Prefer Server Components by default; only use `"use client"` when needed
- Keep components small and focused
- Use `kebab-case` for file/folder names
- When adding dependencies, use `npm install`

## Git Workflow

### Branching

The production branch is **`master`** (not `main` — this is intentional, do not rename it).

- All work happens on **feature branches**. Never commit directly to `master`.
- Only the **project owner** merges PRs into `master`. Agents create PRs but never merge.
- Never force push to any shared branch.

Branch naming:
- `feat/<task-id>-<short-description>` — e.g. `feat/brata-010-hero-section`
- `fix/<task-id>-<short-description>` — bug fixes
- `chore/<description>` — maintenance, deps, config
- `refactor/<description>` — code restructuring

### Conventional Commits

```
<type>(<scope>): <short summary>

<optional body explaining why>
```

**Types:** `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `perf`

**Scopes:** `i18n`, `ui`, `layout`, `nav`, `hero`, `services`, `portfolio`, `testimonials`, `contact`, `db`, `actions`, `auth`, `deps`, `config`

**Rules:**
- Subject: imperative mood, lowercase, no period, max 72 chars
- Reference task ID in subject or body (e.g. `BRATA-010`)
- Body: explain *why*, not *what*
- Do not add `Co-Authored-By` trailers

### Pull Requests

- One PR per task or small group of related tasks
- PR title follows conventional commit format
- PR body: summary + test plan
- Agents create PRs but **never merge**

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
