---
name: Task Registry Phase 1
description: All Phase 1 tasks (BRATA-001 to BRATA-019), their agents, story points, statuses, and Notion page IDs
type: project
---

Phase 1 tasks created in Notion on 2026-04-11. Backend tasks (BRATA-020 to BRATA-026) added on 2026-04-11. All set to "Not started". Implementation pending user review.

**Why:** Task breakdown was created before coding begins so the user can review and approve scope.
**How to apply:** Check this registry when updating task statuses, identifying blockers, or recommending next tasks to assign.

## Task Registry

| ID | Title | Agent | SP | i18n | Status | Notion ID |
|----|-------|-------|-----|------|--------|-----------|
| BRATA-001 | i18n Setup — bilingual routing and translation dictionaries | frontend-dev | 3 | yes | Not started | 33fba7db-7f15-8171-ada7-db7085f45623 |
| BRATA-002 | Root Layout — global styles, font tokens, orange palette | frontend-dev | 2 | no | Not started | 33fba7db-7f15-8125-9c89-fd5750b8f927 |
| BRATA-003 | Shared UI Primitives — Button, SectionWrapper, Container | frontend-dev | 2 | no | Not started | 33fba7db-7f15-8101-a21c-efe3d726cd9a |
| BRATA-004 | Hero Section Copy (ID & EN) | content-writer | 2 | yes | Not started | 33fba7db-7f15-81f7-adab-fe2ab39b465d |
| BRATA-005 | Services Section Copy (ID & EN) | content-writer | 2 | yes | Not started | 33fba7db-7f15-81e8-8ea8-fc96ef64d369 |
| BRATA-006 | Portfolio Section Copy (ID & EN) | content-writer | 3 | yes | Not started | 33fba7db-7f15-81c5-bf05-c5ac1d9918ce |
| BRATA-007 | Testimonials Section Copy (ID & EN) | content-writer | 2 | yes | Not started | 33fba7db-7f15-81fa-bd9e-e49c8128672a |
| BRATA-008 | Contact Section Copy (ID & EN) | content-writer | 2 | yes | Not started | 33fba7db-7f15-8193-ad07-cbe757288725 |
| BRATA-009 | SEO Metadata — title, description, OG tags (ID & EN) | content-writer | 2 | yes | Not started | 33fba7db-7f15-81dd-bead-faf9273ffdc1 |
| BRATA-010 | Hero Section Component | frontend-dev | 3 | yes | Not started | 33fba7db-7f15-8150-95af-d8a232dccb4d |
| BRATA-011 | Services Section Component | frontend-dev | 3 | yes | Not started | 33fba7db-7f15-8169-927c-daeb755a2424 |
| BRATA-012 | Portfolio Section Component | frontend-dev | 3 | yes | Not started | 33fba7db-7f15-81b9-bc9f-d0e08e3efa3f |
| BRATA-013 | Testimonials Section Component | frontend-dev | 3 | yes | Not started | 33fba7db-7f15-8168-aa8c-e85085228acb |
| BRATA-014 | Contact Section Component — form with Server Action | frontend-dev | 5 | yes | Not started | 33fba7db-7f15-81a6-a9fd-f167dce13f67 |
| BRATA-015 | Navbar — smooth scroll, language switcher | frontend-dev | 3 | yes | Not started | 33fba7db-7f15-8107-9e9d-c05c94998563 |
| BRATA-016 | Footer Component | frontend-dev | 2 | yes | Not started | 33fba7db-7f15-8153-8591-ebdadf7ae1d4 |
| BRATA-017 | Framer Motion Scroll Animations — all sections | frontend-dev | 3 | no | Not started | 33fba7db-7f15-81e7-ba58-f752e71cc0f9 |
| BRATA-018 | Responsive Design Audit | frontend-dev | 2 | no | Not started | 33fba7db-7f15-819f-90e1-d07518be82a2 |
| BRATA-019 | Accessibility Audit — ARIA, keyboard nav, contrast | frontend-dev | 2 | no | Not started | 33fba7db-7f15-8167-adf0-c9c49c0f4d8e |

| BRATA-020 | Supabase project setup and environment configuration | backend-supabase | 2 | no | Not started | 33fba7db-7f15-8144-9976-cc4265294160 |
| BRATA-021 | Database schema and migrations — portfolio, services, testimonials, contact submissions | backend-supabase | 3 | no | Not started | 33fba7db-7f15-81ae-bb4b-d27ac72d562c |
| BRATA-022 | Row Level Security (RLS) policies for all tables | backend-supabase | 2 | no | Not started | 33fba7db-7f15-814f-8d17-c0928fecb1f2 |
| BRATA-023 | Server Actions — fetch services and portfolio items | backend-supabase | 3 | no | Not started | 33fba7db-7f15-8102-97ff-ea412ffe9e3f |
| BRATA-024 | Server Action — fetch testimonials | backend-supabase | 2 | no | Not started | 33fba7db-7f15-816b-bc03-eac58f772770 |
| BRATA-025 | Contact form Server Action — validate and persist submission to DB | backend-supabase | 3 | no | Not started | 33fba7db-7f15-8171-b973-f444beeed9df |
| BRATA-026 | Seed data — initial services, portfolio, and testimonials records | backend-supabase | 2 | no | Not started | 33fba7db-7f15-81db-9d13-d09ce917c5d9 |

## Story Point Totals
- frontend-dev: 33 points (BRATA-001 to 003, 010 to 019)
- content-writer: 13 points (BRATA-004 to 009)
- backend-supabase: 17 points (BRATA-020 to 026)
- Total Phase 1: 63 points

## Key Dependency Chains
1. BRATA-001 must complete before BRATA-002
2. BRATA-002 must complete before BRATA-003
3. BRATA-003 + content tasks (004-008) must complete before section UI tasks (010-014)
4. BRATA-001 + BRATA-002 can unblock BRATA-015 and BRATA-016 in parallel
5. All section components (010-016) must complete before BRATA-017, 018, 019
