-- =============================================================================
-- Migration: 00002_rls_policies
-- Description: Row Level Security policies for all landing page tables.
--
-- Access model:
--   services, portfolio, testimonials:
--     - anon / authenticated: SELECT active rows only
--     - authenticated with admin role: INSERT, UPDATE, DELETE (all rows)
--
--   contact_submissions:
--     - anon / authenticated: INSERT only (submit a new message)
--     - authenticated with admin role: SELECT, UPDATE (read & mark as read)
--
-- "Admin role" is stored in auth.users.raw_app_meta_data -> role = 'admin'.
-- This is set server-side via the Supabase service role key and is never
-- writable by the user themselves (app_meta_data is write-protected from
-- client-facing APIs).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Helper: is_admin()
-- Returns true when the currently authenticated user carries the admin role
-- in their app metadata. Using a stable function keeps policies readable and
-- avoids repeating the JSON extraction in every policy expression.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

comment on function public.is_admin() is
  'Returns true when the JWT app_metadata.role equals "admin". '
  'Used in RLS policies to gate admin-only write operations.';

-- =============================================================================
-- services
-- =============================================================================
alter table public.services enable row level security;

-- Public read: anyone can see active services
create policy "services_select_active"
  on public.services
  for select
  using (is_active = true);

-- Admin insert
create policy "services_insert_admin"
  on public.services
  for insert
  with check (public.is_admin());

-- Admin update
create policy "services_update_admin"
  on public.services
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admin delete
create policy "services_delete_admin"
  on public.services
  for delete
  using (public.is_admin());

-- =============================================================================
-- portfolio
-- =============================================================================
alter table public.portfolio enable row level security;

-- Public read: anyone can see active portfolio items
create policy "portfolio_select_active"
  on public.portfolio
  for select
  using (is_active = true);

-- Admin insert
create policy "portfolio_insert_admin"
  on public.portfolio
  for insert
  with check (public.is_admin());

-- Admin update
create policy "portfolio_update_admin"
  on public.portfolio
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admin delete
create policy "portfolio_delete_admin"
  on public.portfolio
  for delete
  using (public.is_admin());

-- =============================================================================
-- testimonials
-- =============================================================================
alter table public.testimonials enable row level security;

-- Public read: anyone can see active testimonials
create policy "testimonials_select_active"
  on public.testimonials
  for select
  using (is_active = true);

-- Admin insert
create policy "testimonials_insert_admin"
  on public.testimonials
  for insert
  with check (public.is_admin());

-- Admin update
create policy "testimonials_update_admin"
  on public.testimonials
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admin delete
create policy "testimonials_delete_admin"
  on public.testimonials
  for delete
  using (public.is_admin());

-- =============================================================================
-- contact_submissions
-- =============================================================================
alter table public.contact_submissions enable row level security;

-- Public insert: any visitor (anon or authenticated) can submit the form.
-- The with check(true) allows all inserts; no user-owned field to validate.
create policy "contact_submissions_insert_public"
  on public.contact_submissions
  for insert
  with check (true);

-- Admin select: only admins can read submissions
create policy "contact_submissions_select_admin"
  on public.contact_submissions
  for select
  using (public.is_admin());

-- Admin update: only admins can update (e.g. toggle is_read)
create policy "contact_submissions_update_admin"
  on public.contact_submissions
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- No delete policy for contact_submissions — submissions are audit records.
-- Admins must use the service role key (bypasses RLS) if a hard delete is
-- ever required (e.g. GDPR erasure request).
