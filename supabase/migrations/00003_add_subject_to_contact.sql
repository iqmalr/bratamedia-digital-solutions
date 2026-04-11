-- =============================================================================
-- Migration: 00003_add_subject_to_contact
-- Description: Add nullable subject column to contact_submissions.
--              Nullable so existing rows are unaffected; the column will be
--              populated by the contact form Server Action going forward.
-- =============================================================================

alter table public.contact_submissions
  add column subject text;

comment on column public.contact_submissions.subject is 'Optional inquiry subject provided by the submitter.';
