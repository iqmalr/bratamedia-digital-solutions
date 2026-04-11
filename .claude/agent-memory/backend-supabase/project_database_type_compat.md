---
name: Supabase Database type compatibility fix
description: Omit<Interface, keys> fails Record<string, unknown> constraint in supabase-js GenericTable; fix is to intersect with Record<string, unknown> in the Database type
type: project
---

The `Database` type's table entries (`Row`, `Insert`, `Update`) must satisfy `Record<string, unknown>` to meet `GenericTable`'s constraint in `@supabase/supabase-js`. TypeScript's `Omit<Interface, keys>` utility type produces a mapped type **without an index signature**, so it does not extend `Record<string, unknown>`. This causes `.insert()` calls to resolve to `never`, producing cryptic overload errors.

**Why:** The `@supabase/supabase-js` v2.103.0 `GenericTable` type requires `Record<string, unknown>` for `Row`, `Insert`, and `Update`. When `Schema` fails the `GenericSchema` check, the Supabase client's `from()` result uses `never` for the table type, making `.insert()` arguments type as `never`.

**Fix applied in `src/types/database.ts`:** Each table slot in the `Database` type intersects its typed shapes with `Record<string, unknown>`:

```ts
services: {
  Row: ServiceRow & Record<string, unknown>
  Insert: ServiceInsert & Record<string, unknown>
  Update: ServiceUpdate & Record<string, unknown>
  Relationships: []
}
```

**Also required:** Each table entry must include `Relationships: []` — the `GenericTable` shape added this field in newer versions.

**How to apply:** Any new table added to `src/types/database.ts` must follow this same pattern. Always add `Relationships: []` and intersect all three slots with `Record<string, unknown>`.
