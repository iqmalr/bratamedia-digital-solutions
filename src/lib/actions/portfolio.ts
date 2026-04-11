'use server'

import { createServerClient } from '@/lib/supabase/server'
import type { PortfolioRow } from '@/types/database'

// ---------------------------------------------------------------------------
// Localized shape returned to callers — no bilingual _id/_en fields exposed.
// ---------------------------------------------------------------------------

export interface LocalizedPortfolioItem {
  id: string
  title: string
  description: string
  image_url: string | null
  tags: string[]
  category: string | null
  sort_order: number
}

type GetPortfolioResult =
  | { success: true; data: LocalizedPortfolioItem[] }
  | { success: false; error: string }

/** Columns fetched from the database for portfolio queries. */
type PortfolioQueryRow = Pick<
  PortfolioRow,
  | 'id'
  | 'title_id'
  | 'title_en'
  | 'description_id'
  | 'description_en'
  | 'image_url'
  | 'tags'
  | 'category'
  | 'sort_order'
>

/** Maps a raw DB row to the localized shape. */
function toLocalized(
  row: PortfolioQueryRow,
  locale: 'id' | 'en'
): LocalizedPortfolioItem {
  return {
    id: row.id,
    title: locale === 'id' ? row.title_id : row.title_en,
    description: locale === 'id' ? row.description_id : row.description_en,
    image_url: row.image_url,
    tags: row.tags,
    category: row.category,
    sort_order: row.sort_order,
  }
}

const PORTFOLIO_SELECT =
  'id, title_id, title_en, description_id, description_en, image_url, tags, category, sort_order'

/**
 * Fetches all active portfolio items ordered by sort_order, returning copy in
 * the requested locale.
 *
 * Public action — no authentication required. Protected by RLS (SELECT is
 * allowed for all roles on rows where is_active = true).
 *
 * @param locale - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with localized portfolio items.
 */
export async function getPortfolioItems(
  locale: 'id' | 'en'
): Promise<GetPortfolioResult> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('portfolio')
      .select(PORTFOLIO_SELECT)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[getPortfolioItems] Supabase error:', error)
      return { success: false, error: 'Failed to load portfolio items.' }
    }

    const rows = (data ?? []) as PortfolioQueryRow[]
    return { success: true, data: rows.map((row) => toLocalized(row, locale)) }
  } catch (error) {
    console.error('[getPortfolioItems] Unexpected error:', error)
    return { success: false, error: 'Failed to load portfolio items.' }
  }
}

/**
 * Fetches active portfolio items filtered by category, ordered by sort_order.
 *
 * Public action — no authentication required.
 *
 * @param category - Category string to filter by (e.g. "E-Commerce").
 * @param locale - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with localized, filtered portfolio items.
 */
export async function getPortfolioByCategory(
  category: string,
  locale: 'id' | 'en'
): Promise<GetPortfolioResult> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('portfolio')
      .select(PORTFOLIO_SELECT)
      .eq('is_active', true)
      .eq('category', category)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[getPortfolioByCategory] Supabase error:', error)
      return { success: false, error: 'Failed to load portfolio items.' }
    }

    const rows = (data ?? []) as PortfolioQueryRow[]
    return { success: true, data: rows.map((row) => toLocalized(row, locale)) }
  } catch (error) {
    console.error('[getPortfolioByCategory] Unexpected error:', error)
    return { success: false, error: 'Failed to load portfolio items.' }
  }
}
