-- =============================================================================
-- Migration: 00007_create_articles
-- Description: Blog/article system with bilingual support, Tiptap JSON content,
--              categories, tags, and SEO fields.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Table: articles
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text        NOT NULL UNIQUE,
  title_id      text        NOT NULL,
  title_en      text        NOT NULL,
  excerpt_id    text,
  excerpt_en    text,
  content_id    jsonb,                          -- Tiptap JSON document (Indonesian)
  content_en    jsonb,                          -- Tiptap JSON document (English)
  cover_image_url text,
  category      text,
  tags          text[]      NOT NULL DEFAULT '{}',
  author_name   text        NOT NULL DEFAULT 'Bratamedia',
  is_published  boolean     NOT NULL DEFAULT false,
  published_at  timestamptz,
  sort_order    integer     NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER articles_set_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE  public.articles                IS 'Blog articles with bilingual content stored as Tiptap JSON.';
COMMENT ON COLUMN public.articles.slug           IS 'URL-safe identifier, unique across all articles.';
COMMENT ON COLUMN public.articles.content_id     IS 'Tiptap JSON document for Indonesian content.';
COMMENT ON COLUMN public.articles.content_en     IS 'Tiptap JSON document for English content.';
COMMENT ON COLUMN public.articles.cover_image_url IS 'Cover image URL (Supabase Storage or external).';
COMMENT ON COLUMN public.articles.is_published   IS 'When false the article is a draft, hidden from public views.';
COMMENT ON COLUMN public.articles.published_at   IS 'Timestamp when the article was first published. Set on publish.';

-- ---------------------------------------------------------------------------
-- RLS policies
-- ---------------------------------------------------------------------------
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public read: anyone can see published articles
CREATE POLICY "articles_select_published"
  ON public.articles
  FOR SELECT
  USING (is_published = true);

-- Admin full CRUD
CREATE POLICY "articles_select_admin"
  ON public.articles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "articles_insert_admin"
  ON public.articles
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "articles_update_admin"
  ON public.articles
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "articles_delete_admin"
  ON public.articles
  FOR DELETE
  USING (public.is_admin());
