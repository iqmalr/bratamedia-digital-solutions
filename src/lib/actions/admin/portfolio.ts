'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminPortfolioItem {
  id: string
  title_id: string
  title_en: string
  description_id: string
  description_en: string
  image_url: string | null
  tags: string[]
  category: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

const portfolioSchema = z.object({
  title_id: z.string().trim().min(1, 'Indonesian title is required.'),
  title_en: z.string().trim().min(1, 'English title is required.'),
  description_id: z.string().trim().min(1, 'Indonesian description is required.'),
  description_en: z.string().trim().min(1, 'English description is required.'),
  image_url: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  tags: z
    .string()
    .trim()
    .transform((val) =>
      val ? val.split(',').map((t) => t.trim()).filter(Boolean) : []
    ),
  category: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  sort_order: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

export async function getAllPortfolioItems(): Promise<AdminPortfolioItem[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('portfolio')
    .select(
      'id, title_id, title_en, description_id, description_en, image_url, tags, category, sort_order, is_active, created_at'
    )
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getAllPortfolioItems] Error:', error)
    return []
  }

  return (data ?? []) as AdminPortfolioItem[]
}

export async function getPortfolioItemById(id: string): Promise<AdminPortfolioItem | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('portfolio')
    .select(
      'id, title_id, title_en, description_id, description_en, image_url, tags, category, sort_order, is_active, created_at'
    )
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getPortfolioItemById] Error:', error)
    return null
  }

  return data as AdminPortfolioItem
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

export async function createPortfolioItem(formData: FormData): Promise<ActionResult> {
  const raw = {
    title_id: formData.get('title_id'),
    title_en: formData.get('title_en'),
    description_id: formData.get('description_id'),
    description_en: formData.get('description_en'),
    image_url: formData.get('image_url'),
    tags: formData.get('tags'),
    category: formData.get('category'),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parsed = portfolioSchema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return { success: false, error: 'Please fix the errors in the form.', fieldErrors }
  }

  const supabase = await createServerClient()

  // Determine next sort_order if not provided or is default 0
  let { sort_order } = parsed.data
  if (sort_order === 0) {
    const { data: maxRow } = await supabase
      .from('portfolio')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()
    sort_order = maxRow ? (maxRow.sort_order as number) + 1 : 0
  }

  const { data, error } = await supabase
    .from('portfolio')
    .insert({
      title_id: parsed.data.title_id,
      title_en: parsed.data.title_en,
      description_id: parsed.data.description_id,
      description_en: parsed.data.description_en,
      image_url: parsed.data.image_url,
      tags: parsed.data.tags,
      category: parsed.data.category,
      sort_order,
      is_active: parsed.data.is_active,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[createPortfolioItem] Error:', error)
    return { success: false, error: 'Failed to create portfolio item. Please try again.' }
  }

  revalidatePath('/admin/portfolio')

  return { success: true, id: data.id as string }
}

export async function updatePortfolioItem(id: string, formData: FormData): Promise<ActionResult> {
  const raw = {
    title_id: formData.get('title_id'),
    title_en: formData.get('title_en'),
    description_id: formData.get('description_id'),
    description_en: formData.get('description_en'),
    image_url: formData.get('image_url'),
    tags: formData.get('tags'),
    category: formData.get('category'),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parsed = portfolioSchema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return { success: false, error: 'Please fix the errors in the form.', fieldErrors }
  }

  const supabase = await createServerClient()

  const { error } = await supabase
    .from('portfolio')
    .update({
      title_id: parsed.data.title_id,
      title_en: parsed.data.title_en,
      description_id: parsed.data.description_id,
      description_en: parsed.data.description_en,
      image_url: parsed.data.image_url,
      tags: parsed.data.tags,
      category: parsed.data.category,
      sort_order: parsed.data.sort_order,
      is_active: parsed.data.is_active,
    })
    .eq('id', id)

  if (error) {
    console.error('[updatePortfolioItem] Error:', error)
    return { success: false, error: 'Failed to update portfolio item. Please try again.' }
  }

  revalidatePath('/admin/portfolio')

  return { success: true, id }
}

export async function deletePortfolioItem(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient()

  const { error } = await supabase.from('portfolio').delete().eq('id', id)

  if (error) {
    console.error('[deletePortfolioItem] Error:', error)
    return { success: false, error: 'Failed to delete portfolio item. Please try again.' }
  }

  revalidatePath('/admin/portfolio')

  return { success: true }
}

export async function togglePortfolioItemActive(
  id: string,
  isActive: boolean,
): Promise<{ success: boolean }> {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from('portfolio')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    console.error('[togglePortfolioItemActive] Error:', error)
    return { success: false }
  }

  revalidatePath('/admin/portfolio')

  return { success: true }
}
