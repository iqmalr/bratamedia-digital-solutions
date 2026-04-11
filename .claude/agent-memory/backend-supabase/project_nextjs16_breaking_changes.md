---
name: Next.js 16 Breaking Changes Relevant to Supabase Setup
description: Key Next.js 16 API differences discovered from the docs that affect Supabase/auth code
type: project
---

`cookies()` from `next/headers` is **async** in Next.js 16 — must be awaited. In v14 and earlier it was synchronous. This directly affects how the Supabase server client is constructed.

**Why:** Docs at `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md` explicitly state: "cookies is an asynchronous function that returns a promise. You must use async/await". The synchronous form still works in Next.js 15 with a deprecation warning but is expected to break.

**How to apply:** Any server utility that reads cookies (Supabase server client factory, middleware helpers, auth checks) must be an `async` function and must `await cookies()` before passing `cookieStore` to `@supabase/ssr`. Call sites must also `await` the factory function.
