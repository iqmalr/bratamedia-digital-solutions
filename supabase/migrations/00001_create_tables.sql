-- =============================================================================
-- Migration: 00001_create_tables
-- Description: Core tables for Bratamedia Digital Solutions landing page data
--              (services, portfolio, testimonials, contact_submissions)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Shared: updated_at trigger function
-- Called by per-table triggers to auto-stamp updated_at on every row mutation.
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Table: services
-- Stores the software-house service offerings shown on the landing page.
-- Both Indonesian (id) and English (en) copies are stored in the same row.
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id          uuid        primary key default gen_random_uuid(),
  name_id     text        not null,
  name_en     text        not null,
  description_id text     not null,
  description_en text     not null,
  icon        text,                          -- icon identifier (e.g. "code", "mobile")
  sort_order  integer     not null default 0,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

comment on table  public.services               is 'Service offerings displayed on the landing page.';
comment on column public.services.name_id       is 'Service name in Indonesian.';
comment on column public.services.name_en       is 'Service name in English.';
comment on column public.services.description_id is 'Service description in Indonesian.';
comment on column public.services.description_en is 'Service description in English.';
comment on column public.services.icon          is 'Icon identifier used by the frontend (e.g. lucide icon name).';
comment on column public.services.sort_order    is 'Display order — lower numbers appear first.';
comment on column public.services.is_active     is 'When false the row is hidden from public views.';

-- ---------------------------------------------------------------------------
-- Table: portfolio
-- Stores showcase projects displayed on the landing page portfolio section.
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio (
  id             uuid        primary key default gen_random_uuid(),
  title_id       text        not null,
  title_en       text        not null,
  description_id text        not null,
  description_en text        not null,
  image_url      text,                        -- Supabase Storage public URL or external URL
  tags           text[]      not null default '{}',  -- tech stack tags, e.g. {"Next.js","PostgreSQL"}
  category       text,                        -- project category, e.g. "E-Commerce"
  sort_order     integer     not null default 0,
  is_active      boolean     not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger portfolio_set_updated_at
  before update on public.portfolio
  for each row execute function public.set_updated_at();

comment on table  public.portfolio               is 'Portfolio projects shown on the landing page.';
comment on column public.portfolio.title_id      is 'Project title in Indonesian.';
comment on column public.portfolio.title_en      is 'Project title in English.';
comment on column public.portfolio.description_id is 'Project description in Indonesian.';
comment on column public.portfolio.description_en is 'Project description in English.';
comment on column public.portfolio.image_url     is 'Cover image URL (Supabase Storage or external CDN).';
comment on column public.portfolio.tags          is 'Technology tags used in the project.';
comment on column public.portfolio.category      is 'Project category (e.g. "E-Commerce", "HealthTech").';
comment on column public.portfolio.sort_order    is 'Display order — lower numbers appear first.';
comment on column public.portfolio.is_active     is 'When false the row is hidden from public views.';

-- ---------------------------------------------------------------------------
-- Table: testimonials
-- Stores client testimonials displayed on the landing page.
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id             uuid        primary key default gen_random_uuid(),
  quote_id       text        not null,
  quote_en       text        not null,
  client_name    text        not null,
  client_role    text,
  client_company text,
  avatar_url     text,                        -- Supabase Storage public URL or external URL
  sort_order     integer     not null default 0,
  is_active      boolean     not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

comment on table  public.testimonials               is 'Client testimonials shown on the landing page.';
comment on column public.testimonials.quote_id      is 'Testimonial quote in Indonesian.';
comment on column public.testimonials.quote_en      is 'Testimonial quote in English.';
comment on column public.testimonials.client_name   is 'Full name of the client.';
comment on column public.testimonials.client_role   is 'Job title or role of the client.';
comment on column public.testimonials.client_company is 'Company the client represents.';
comment on column public.testimonials.avatar_url    is 'Client avatar image URL.';
comment on column public.testimonials.sort_order    is 'Display order — lower numbers appear first.';
comment on column public.testimonials.is_active     is 'When false the row is hidden from public views.';

-- ---------------------------------------------------------------------------
-- Table: contact_submissions
-- Stores messages submitted via the landing page contact form.
-- No updated_at — submissions are immutable records (is_read is updated, but
-- a full updated_at column would add noise; see RLS migration for write rules).
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  phone      text,
  message    text        not null,
  is_read    boolean     not null default false,
  created_at timestamptz not null default now()
);

comment on table  public.contact_submissions          is 'Contact form submissions from the landing page.';
comment on column public.contact_submissions.name     is 'Full name provided by the submitter.';
comment on column public.contact_submissions.email    is 'Email address provided by the submitter.';
comment on column public.contact_submissions.phone    is 'Optional phone number provided by the submitter.';
comment on column public.contact_submissions.message  is 'The message body submitted via the contact form.';
comment on column public.contact_submissions.is_read  is 'Admin flag — marks whether the submission has been reviewed.';
