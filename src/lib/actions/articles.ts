'use server'

import { createStaticClient } from '@/lib/supabase/static'
import type { ArticleRow } from '@/types/database'

// ---------------------------------------------------------------------------
// Localized shape returned to callers — no bilingual _id/_en fields exposed.
// ---------------------------------------------------------------------------

export interface LocalizedArticle {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: Record<string, unknown> | null
  cover_image_url: string | null
  category: string | null
  tags: string[]
  author_name: string
  published_at: string | null
}

type GetArticlesResult =
  | { success: true; data: LocalizedArticle[] }
  | { success: false; error: string }

type GetArticleResult =
  | { success: true; data: LocalizedArticle }
  | { success: false; error: string }

// ---------------------------------------------------------------------------
// Column selection shared across all public queries
// ---------------------------------------------------------------------------

const PUBLIC_COLUMNS =
  'id, slug, title_id, title_en, excerpt_id, excerpt_en, content_id, content_en, cover_image_url, category, tags, author_name, published_at' as const

type ArticlePublicRow = Pick<
  ArticleRow,
  | 'id'
  | 'slug'
  | 'title_id'
  | 'title_en'
  | 'excerpt_id'
  | 'excerpt_en'
  | 'content_id'
  | 'content_en'
  | 'cover_image_url'
  | 'category'
  | 'tags'
  | 'author_name'
  | 'published_at'
>

function toLocalized(row: ArticlePublicRow, locale: 'id' | 'en'): LocalizedArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: locale === 'id' ? row.title_id : row.title_en,
    excerpt: locale === 'id' ? row.excerpt_id : row.excerpt_en,
    content: locale === 'id' ? row.content_id : row.content_en,
    cover_image_url: row.cover_image_url,
    category: row.category,
    tags: row.tags,
    author_name: row.author_name,
    published_at: row.published_at,
  }
}

// ---------------------------------------------------------------------------
// Public actions
// ---------------------------------------------------------------------------

/**
 * Fetches all published articles ordered by published_at DESC, returning copy
 * in the requested locale.
 *
 * Public action — no authentication required. Protected by RLS (SELECT is
 * allowed for the anon role on rows where is_published = true).
 *
 * @param locale - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with localized article items.
 */
export async function getPublishedArticles(
  locale: 'id' | 'en'
): Promise<GetArticlesResult> {
  try {
    const supabase = createStaticClient()

    const { data, error } = await supabase
      .from('articles')
      .select(PUBLIC_COLUMNS)
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('[getPublishedArticles] Supabase error:', error)
      return { success: false, error: 'Failed to load articles.' }
    }

    const rows = (data ?? []) as ArticlePublicRow[]
    return { success: true, data: rows.map((row) => toLocalized(row, locale)) }
  } catch (error) {
    console.error('[getPublishedArticles] Unexpected error:', error)
    return { success: false, error: 'Failed to load articles.' }
  }
}

/**
 * Fetches a single published article by its slug, returning copy in the
 * requested locale.
 *
 * Public action — no authentication required. Returns an error response when
 * the article does not exist or is not published (RLS filters unpublished rows
 * for the anon role, so a missing row is indistinguishable from not found).
 *
 * @param slug   - The article's URL slug.
 * @param locale - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with a single localized article.
 */
export async function getArticleBySlug(
  slug: string,
  locale: 'id' | 'en'
): Promise<GetArticleResult> {
  try {
    const supabase = createStaticClient()

    const { data, error } = await supabase
      .from('articles')
      .select(PUBLIC_COLUMNS)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // PostgREST "no rows" error — article not found or not published
        return { success: false, error: 'Article not found.' }
      }
      console.error('[getArticleBySlug] Supabase error:', error)
      return { success: false, error: 'Failed to load article.' }
    }

    return { success: true, data: toLocalized(data as ArticlePublicRow, locale) }
  } catch (error) {
    console.error('[getArticleBySlug] Unexpected error:', error)
    return { success: false, error: 'Failed to load article.' }
  }
}

/**
 * Fetches all published articles belonging to a given category, ordered by
 * published_at DESC, returning copy in the requested locale.
 *
 * Public action — no authentication required. Protected by RLS.
 *
 * @param category - The category string to filter by.
 * @param locale   - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with localized article items.
 */
export async function getArticlesByCategory(
  category: string,
  locale: 'id' | 'en'
): Promise<GetArticlesResult> {
  try {
    const supabase = createStaticClient()

    const { data, error } = await supabase
      .from('articles')
      .select(PUBLIC_COLUMNS)
      .eq('is_published', true)
      .eq('category', category)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('[getArticlesByCategory] Supabase error:', error)
      return { success: false, error: 'Failed to load articles.' }
    }

    const rows = (data ?? []) as ArticlePublicRow[]
    return { success: true, data: rows.map((row) => toLocalized(row, locale)) }
  } catch (error) {
    console.error('[getArticlesByCategory] Unexpected error:', error)
    return { success: false, error: 'Failed to load articles.' }
  }
}
