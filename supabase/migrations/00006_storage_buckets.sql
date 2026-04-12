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
-- Policies: portfolio-images
-- ---------------------------------------------------------------------------

CREATE POLICY "Public read portfolio-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin upload portfolio-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());

CREATE POLICY "Admin update portfolio-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images' AND public.is_admin());

CREATE POLICY "Admin delete portfolio-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images' AND public.is_admin());

-- ---------------------------------------------------------------------------
-- Policies: avatars
-- ---------------------------------------------------------------------------

CREATE POLICY "Public read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Admin upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND public.is_admin());

CREATE POLICY "Admin update avatars"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND public.is_admin());

CREATE POLICY "Admin delete avatars"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND public.is_admin());
