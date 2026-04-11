---
name: i18n Config Split (server-only fix)
description: Why i18n is split into config.ts and index.ts, and which file to import from where
type: project
---

## The Problem

`src/i18n/index.ts` has `import "server-only"` to guard `getDictionary()`.
But `locale-context.tsx` (Client Component) and `proxy.ts` (Edge runtime) both
need `locales`, `defaultLocale`, `hasLocale`, and `Locale` — constants that are
safe for any runtime.

Importing the server-only-guarded `index.ts` from those files caused a build error:
`'server-only' cannot be imported from a Client Component module`.

## The Fix

Split into two files:

| File                   | Guard         | Contents                                        | Safe to import from    |
|------------------------|---------------|-------------------------------------------------|------------------------|
| `src/i18n/config.ts`   | none          | `locales`, `defaultLocale`, `localeLabels`, `hasLocale`, `Locale` | Anywhere (client, server, proxy) |
| `src/i18n/index.ts`    | server-only   | re-exports config + `getDictionary()`           | Server Components only |

## Import Rules

- **Server Components / layouts / pages**: `import { ... } from "@/i18n/index"` — gets everything
- **Client Components** (`locale-context.tsx`): `import { ... } from "@/i18n/config"`
- **proxy.ts** (Edge): `import { ... } from "@/i18n/config"`
- Never import `getDictionary` from anywhere but a Server Component — it will fail at runtime

**Why:** The server-only guard exists to prevent accidental client-side use of dictionary loading.
**How to apply:** When adding new i18n utilities, put isomorphic constants in `config.ts` and server-only functions in `index.ts`.
