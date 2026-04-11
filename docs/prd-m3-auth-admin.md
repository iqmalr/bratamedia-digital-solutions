# PRD — Milestone 3: Auth & Admin Panel

**Project**: Bratamedia Digital Solutions
**Milestone**: M3 — Auth & Admin Panel
**Status**: `todo`
**Depends On**: M1, M2
**Goal**: An authenticated admin can log in and access a protected panel to view incoming contact messages.

---

## Overview

This milestone builds the authentication foundation and the admin panel shell. No blog features yet — the focus is a secure login system, protected routing, and an admin layout ready to be extended in M4 and M5.

The only data surface in this milestone is the `contacts` inbox: messages submitted via the landing page contact form.

---

## Scope

### ✅ In Scope

- Supabase Auth — email and password
- Admin login page at `/admin/login`
- Next.js middleware protecting all `/admin/*` routes
- Admin layout: sidebar, header, user info
- Admin dashboard: basic stats (total incoming messages from `contacts`)
- Admin inbox: list of contact form messages
- Admin message detail page
- Sign out
- Session management via Supabase SSR

### ❌ Out of Scope

- Role-based access control — single admin only for now
- Blog or article management (M4)
- Portfolio CMS (M5)
- User management

---

## Auth Flow

```
User accesses /admin/*
    ↓
Next.js middleware checks session (Supabase SSR)
    ↓ no session
Redirect → /admin/login
    ↓ login succeeds
Redirect → /admin (dashboard)
    ↓
Session stored in HttpOnly cookie, managed by Supabase SSR
```

---

## Database Changes

### Update RLS on `contacts`

```sql
-- Authenticated admin can read all messages
create policy "admin select" on contacts
  for select
  using (auth.role() = 'authenticated');
```

No new tables required in M3. Supabase Auth built-in users table is sufficient.

---

## Server Action Signatures

```typescript
// src/lib/actions/auth.ts
"use server";

export async function signIn(formData: unknown): Promise<ActionResult<void>>
export async function signOut(): Promise<void>
export async function getSession(): Promise<Session | null>

// src/lib/actions/contacts.ts
"use server";

export async function getContacts(): Promise<ActionResult<Contact[]>>
export async function getContactById(id: string): Promise<ActionResult<Contact>>
```

---

## Acceptance Criteria

- [ ] Accessing `/admin` without a session redirects to `/admin/login`
- [ ] Login with wrong credentials shows an error message
- [ ] Successful login redirects to `/admin` dashboard
- [ ] Sign out clears the session and redirects to `/admin/login`
- [ ] Dashboard displays the total number of messages from the `contacts` table
- [ ] Inbox page lists messages with sender name, email, and date
- [ ] Message detail page shows the full message content
- [ ] Direct access to `/admin/contacts` without a session redirects to `/admin/login`
- [ ] Session persists across page refreshes
- [ ] Vercel build succeeds without errors

---

## Definition of Done

All acceptance criteria are met. An admin can log in, read incoming messages, and log out. No sensitive data leaks to the client.