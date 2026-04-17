-- =============================================================================
-- Migration: 00006_storage_buckets
-- Description: Create public Storage buckets for portfolio cover images and
--              testimonial client avatars, and attach RLS policies so that:
--                - Anyone can read objects (public buckets)
--                - Only authenticated admins can upload, update, or delete
--
-- Storage RLS is enforced on the storage.objects table. The is_admin() helper
-- function is already defined in 00002_rls_policies.sql.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Buckets
-- ---------------------------------------------------------------------------

-- portfolio-images: stores cover images for portfolio items
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- avatars: stores client profile photos for testimonials
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Policies (idempotent — skip if already exists)
-- ---------------------------------------------------------------------------

DO $$ BEGIN

-- portfolio-images
IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read portfolio-images' AND tablename = 'objects') THEN
  CREATE POLICY "Public read portfolio-images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-images');
END IF;

IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin upload portfolio-images' AND tablename = 'objects') THEN
  CREATE POLICY "Admin upload portfolio-images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());
END IF;

IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin update portfolio-images' AND tablename = 'objects') THEN
  CREATE POLICY "Admin update portfolio-images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'portfolio-images' AND public.is_admin());
END IF;

IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin delete portfolio-images' AND tablename = 'objects') THEN
  CREATE POLICY "Admin delete portfolio-images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'portfolio-images' AND public.is_admin());
END IF;

-- avatars
IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read avatars' AND tablename = 'objects') THEN
  CREATE POLICY "Public read avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');
END IF;

IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin upload avatars' AND tablename = 'objects') THEN
  CREATE POLICY "Admin upload avatars"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'avatars' AND public.is_admin());
END IF;

IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin update avatars' AND tablename = 'objects') THEN
  CREATE POLICY "Admin update avatars"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'avatars' AND public.is_admin());
END IF;

IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin delete avatars' AND tablename = 'objects') THEN
  CREATE POLICY "Admin delete avatars"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'avatars' AND public.is_admin());
END IF;

END $$;
