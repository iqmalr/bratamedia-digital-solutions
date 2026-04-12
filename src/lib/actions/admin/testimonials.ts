'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminTestimonial {
  id: string
  quote_id: string
  quote_en: string
  client_name: string
  client_role: string | null
  client_company: string | null
  avatar_url: string | null
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

const testimonialSchema = z.object({
  quote_id: z.string().trim().min(1, 'Indonesian quote is required.'),
  quote_en: z.string().trim().min(1, 'English quote is required.'),
  client_name: z.string().trim().min(1, 'Client name is required.'),
  client_role: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  client_company: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  avatar_url: z
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

export async function getAllTestimonials(): Promise<AdminTestimonial[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('testimonials')
    .select(
      'id, quote_id, quote_en, client_name, client_role, client_company, avatar_url, sort_order, is_active, created_at',
    )
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getAllTestimonials] Error:', error)
    return []
  }

  return (data ?? []) as AdminTestimonial[]
}

export async function getTestimonialById(id: string): Promise<AdminTestimonial | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('testimonials')
    .select(
      'id, quote_id, quote_en, client_name, client_role, client_company, avatar_url, sort_order, is_active, created_at',
    )
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getTestimonialById] Error:', error)
    return null
  }

  return data as AdminTestimonial
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

export async function createTestimonial(formData: FormData): Promise<ActionResult> {
  const raw = {
    quote_id: formData.get('quote_id'),
    quote_en: formData.get('quote_en'),
    client_name: formData.get('client_name'),
    client_role: formData.get('client_role'),
    client_company: formData.get('client_company'),
    avatar_url: formData.get('avatar_url'),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parsed = testimonialSchema.safeParse(raw)

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
      .from('testimonials')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()
    sort_order = maxRow ? (maxRow.sort_order as number) + 1 : 0
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      quote_id: parsed.data.quote_id,
      quote_en: parsed.data.quote_en,
      client_name: parsed.data.client_name,
      client_role: parsed.data.client_role,
      client_company: parsed.data.client_company,
      avatar_url: parsed.data.avatar_url,
      sort_order,
      is_active: parsed.data.is_active,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[createTestimonial] Error:', error)
    return { success: false, error: 'Failed to create testimonial. Please try again.' }
  }

  revalidatePath('/admin/testimonials')

  return { success: true, id: data.id as string }
}

export async function updateTestimonial(id: string, formData: FormData): Promise<ActionResult> {
  const raw = {
    quote_id: formData.get('quote_id'),
    quote_en: formData.get('quote_en'),
    client_name: formData.get('client_name'),
    client_role: formData.get('client_role'),
    client_company: formData.get('client_company'),
    avatar_url: formData.get('avatar_url'),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parsed = testimonialSchema.safeParse(raw)

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
    .from('testimonials')
    .update({
      quote_id: parsed.data.quote_id,
      quote_en: parsed.data.quote_en,
      client_name: parsed.data.client_name,
      client_role: parsed.data.client_role,
      client_company: parsed.data.client_company,
      avatar_url: parsed.data.avatar_url,
      sort_order: parsed.data.sort_order,
      is_active: parsed.data.is_active,
    })
    .eq('id', id)

  if (error) {
    console.error('[updateTestimonial] Error:', error)
    return { success: false, error: 'Failed to update testimonial. Please try again.' }
  }

  revalidatePath('/admin/testimonials')

  return { success: true, id }
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient()

  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    console.error('[deleteTestimonial] Error:', error)
    return { success: false, error: 'Failed to delete testimonial. Please try again.' }
  }

  revalidatePath('/admin/testimonials')

  return { success: true }
}

export async function toggleTestimonialActive(
  id: string,
  isActive: boolean,
): Promise<{ success: boolean }> {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from('testimonials')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    console.error('[toggleTestimonialActive] Error:', error)
    return { success: false }
  }

  revalidatePath('/admin/testimonials')

  return { success: true }
}
