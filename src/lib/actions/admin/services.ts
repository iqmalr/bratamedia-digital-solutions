'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminService {
  id: string
  name_id: string
  name_en: string
  description_id: string
  description_en: string
  icon: string | null
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

const serviceSchema = z.object({
  name_id: z.string().trim().min(1, 'Indonesian name is required.'),
  name_en: z.string().trim().min(1, 'English name is required.'),
  description_id: z.string().trim().min(1, 'Indonesian description is required.'),
  description_en: z.string().trim().min(1, 'English description is required.'),
  icon: z
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

export async function getAllServices(): Promise<AdminService[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('services')
    .select('id, name_id, name_en, description_id, description_en, icon, sort_order, is_active, created_at')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getAllServices] Error:', error)
    return []
  }

  return (data ?? []) as AdminService[]
}

export async function getServiceById(id: string): Promise<AdminService | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('services')
    .select('id, name_id, name_en, description_id, description_en, icon, sort_order, is_active, created_at')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getServiceById] Error:', error)
    return null
  }

  return data as AdminService
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

export async function createService(formData: FormData): Promise<ActionResult> {
  const raw = {
    name_id: formData.get('name_id'),
    name_en: formData.get('name_en'),
    description_id: formData.get('description_id'),
    description_en: formData.get('description_en'),
    icon: formData.get('icon'),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parsed = serviceSchema.safeParse(raw)

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
      .from('services')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()
    sort_order = maxRow ? (maxRow.sort_order as number) + 1 : 0
  }

  const { data, error } = await supabase
    .from('services')
    .insert({
      name_id: parsed.data.name_id,
      name_en: parsed.data.name_en,
      description_id: parsed.data.description_id,
      description_en: parsed.data.description_en,
      icon: parsed.data.icon,
      sort_order,
      is_active: parsed.data.is_active,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[createService] Error:', error)
    return { success: false, error: 'Failed to create service. Please try again.' }
  }

  revalidatePath('/admin/services')

  return { success: true, id: data.id as string }
}

export async function updateService(id: string, formData: FormData): Promise<ActionResult> {
  const raw = {
    name_id: formData.get('name_id'),
    name_en: formData.get('name_en'),
    description_id: formData.get('description_id'),
    description_en: formData.get('description_en'),
    icon: formData.get('icon'),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on',
  }

  const parsed = serviceSchema.safeParse(raw)

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
    .from('services')
    .update({
      name_id: parsed.data.name_id,
      name_en: parsed.data.name_en,
      description_id: parsed.data.description_id,
      description_en: parsed.data.description_en,
      icon: parsed.data.icon,
      sort_order: parsed.data.sort_order,
      is_active: parsed.data.is_active,
    })
    .eq('id', id)

  if (error) {
    console.error('[updateService] Error:', error)
    return { success: false, error: 'Failed to update service. Please try again.' }
  }

  revalidatePath('/admin/services')

  return { success: true, id }
}

export async function deleteService(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient()

  const { error } = await supabase.from('services').delete().eq('id', id)

  if (error) {
    console.error('[deleteService] Error:', error)
    return { success: false, error: 'Failed to delete service. Please try again.' }
  }

  revalidatePath('/admin/services')

  return { success: true }
}

export async function toggleServiceActive(
  id: string,
  isActive: boolean,
): Promise<{ success: boolean }> {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from('services')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    console.error('[toggleServiceActive] Error:', error)
    return { success: false }
  }

  revalidatePath('/admin/services')

  return { success: true }
}
