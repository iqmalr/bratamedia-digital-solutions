@AGENTS.md

# Bratamedia Digital Solutions

Landing page & portfolio website for Bratamedia Digital Solutions, a software house.
Will evolve into a fullstack app with admin panel and blog/article system.

## Tech Stack

- **Framework**: Next.js 16 (App Router) — always read `node_modules/next/dist/docs/` before writing Next.js code
- **Language**: TypeScript (strict mode)
- **React**: v19 with React Compiler enabled
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui — install via `npx shadcn@latest add <component>`
- **Rich Text Editor**: Tiptap v3 — initialize via CLI (`npx tiptap init`), do NOT manually code tiptap setup
- **Animation**: Framer Motion
- **i18n**: Bilingual — Indonesian (id) & English (en)
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/              # Next.js App Router pages & layouts
│   ├── components/   # Shared components
│   ├── globals.css   # Global styles (Tailwind)
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Homepage / Landing page
│   ├── robot.ts      # robots.txt config
│   └── sitemap.ts    # Sitemap config
```

## Landing Page Sections

1. **Hero** — main banner with CTA
2. **Services** — software house service offerings
3. **Portfolio** — showcase of past projects
4. **Testimonials** — client reviews
5. **Contact** — contact form / info

## Design & Branding

- **Primary color**: Orange (exact palette TBD)
- **Font**: TBD — will be decided later

## Code Conventions

- All code (variables, functions, comments, commits) in **English**
- Use path alias `@/*` for imports (maps to `./src/*`)
- Prefer Server Components by default; only use `"use client"` when needed
- Keep components small and focused
- Use `kebab-case` for file/folder names

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Important Rules

- **Read Next.js 16 docs** at `node_modules/next/dist/docs/` before writing any Next.js code — this version has breaking changes from older versions
- **Do NOT manually code Tiptap** — always use CLI to initialize
- **shadcn/ui components** — install via CLI, do not copy-paste from external sources
- When adding dependencies, use `npm install`
