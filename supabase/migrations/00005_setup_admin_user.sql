-- =============================================================================
-- Reference: Admin user setup
-- Run these commands in the Supabase SQL Editor after creating a user
-- via the Auth dashboard (Authentication > Users > Add User).
-- =============================================================================

-- After creating the user via dashboard, set their role to admin:
-- Replace 'admin@bratamedia.id' with the actual admin email.
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@bratamedia.id';

-- Verify the admin role was set:
SELECT id, email, raw_app_meta_data->>'role' as role
FROM auth.users
WHERE email = 'admin@bratamedia.id';
