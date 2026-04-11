---
name: Zod v4 breaking changes
description: Zod v4 removed required_error option; use .min(1, msg) instead. Installed version is 4.3.6.
type: project
---

Zod `4.3.6` is installed (`npm install zod` as of 2026-04-11).

**Breaking change from v3:** `required_error` option was removed from `z.string()` params. The `{ required_error: '...' }` option object no longer exists.

**How to apply:** Use `.min(1, 'Field is required.')` to catch missing/empty strings instead:

```ts
// v3 (broken in v4):
z.string({ required_error: 'Name is required.' })

// v4 (correct):
z.string().trim().min(1, 'Name is required.')
```

For email fields, chain `.min(1)` before `.email()` so the empty-string error message is clear before the format check runs.
