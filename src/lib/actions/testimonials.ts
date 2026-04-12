'use server'

import { createStaticClient } from '@/lib/supabase/static'
import type { TestimonialRow } from '@/types/database'

// ---------------------------------------------------------------------------
// Localized shape returned to callers — no bilingual _id/_en fields exposed.
// ---------------------------------------------------------------------------

export interface LocalizedTestimonial {
  id: string
  quote: string
  client_name: string
  client_role: string | null
  client_company: string | null
  avatar_url: string | null
  sort_order: number
}

type GetTestimonialsResult =
  | { success: true; data: LocalizedTestimonial[] }
  | { success: false; error: string }

/**
 * Fetches all active testimonials ordered by sort_order, returning the quote
 * in the requested locale. Non-localized fields (client name, role, company,
 * avatar) are the same regardless of locale.
 *
 * Public action — no authentication required. Protected by RLS (SELECT is
 * allowed for all roles on rows where is_active = true).
 *
 * @param locale - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with localized testimonial items.
 */
export async function getTestimonials(
  locale: 'id' | 'en'
): Promise<GetTestimonialsResult> {
  try {
    const supabase = createStaticClient()

    const { data, error } = await supabase
      .from('testimonials')
      .select(
        'id, quote_id, quote_en, client_name, client_role, client_company, avatar_url, sort_order'
      )
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[getTestimonials] Supabase error:', error)
      return { success: false, error: 'Failed to load testimonials.' }
    }

    type TestimonialQueryRow = Pick<
      TestimonialRow,
      | 'id'
      | 'quote_id'
      | 'quote_en'
      | 'client_name'
      | 'client_role'
      | 'client_company'
      | 'avatar_url'
      | 'sort_order'
    >

    const rows = (data ?? []) as TestimonialQueryRow[]

    const localized: LocalizedTestimonial[] = rows.map((row) => ({
      id: row.id,
      quote: locale === 'id' ? row.quote_id : row.quote_en,
      client_name: row.client_name,
      client_role: row.client_role,
      client_company: row.client_company,
      avatar_url: row.avatar_url,
      sort_order: row.sort_order,
    }))

    return { success: true, data: localized }
  } catch (error) {
    console.error('[getTestimonials] Unexpected error:', error)
    return { success: false, error: 'Failed to load testimonials.' }
  }
}
