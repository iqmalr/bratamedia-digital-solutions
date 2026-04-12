'use server'

import { createStaticClient } from '@/lib/supabase/static'
import type { ServiceRow } from '@/types/database'

// ---------------------------------------------------------------------------
// Localized shape returned to callers — no bilingual _id/_en fields exposed.
// ---------------------------------------------------------------------------

export interface LocalizedService {
  id: string
  name: string
  description: string
  icon: string | null
  sort_order: number
}

type GetServicesResult =
  | { success: true; data: LocalizedService[] }
  | { success: false; error: string }

/**
 * Fetches all active services ordered by sort_order, returning copy in the
 * requested locale.
 *
 * Public action — no authentication required. Protected by RLS (SELECT is
 * allowed for all roles on rows where is_active = true).
 *
 * @param locale - 'id' for Indonesian, 'en' for English.
 * @returns Typed action response with localized service items.
 */
export async function getServices(
  locale: 'id' | 'en'
): Promise<GetServicesResult> {
  try {
    const supabase = createStaticClient()

    const { data, error } = await supabase
      .from('services')
      .select('id, name_id, name_en, description_id, description_en, icon, sort_order')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[getServices] Supabase error:', error)
      return { success: false, error: 'Failed to load services.' }
    }

    const rows = (data ?? []) as Pick<
      ServiceRow,
      'id' | 'name_id' | 'name_en' | 'description_id' | 'description_en' | 'icon' | 'sort_order'
    >[]

    const localized: LocalizedService[] = rows.map((row) => ({
      id: row.id,
      name: locale === 'id' ? row.name_id : row.name_en,
      description: locale === 'id' ? row.description_id : row.description_en,
      icon: row.icon,
      sort_order: row.sort_order,
    }))

    return { success: true, data: localized }
  } catch (error) {
    console.error('[getServices] Unexpected error:', error)
    return { success: false, error: 'Failed to load services.' }
  }
}
