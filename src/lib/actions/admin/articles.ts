'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminArticle {
  id: string
  slug: string
  title_id: string
  title_en: string
  excerpt_id: string | null
  excerpt_en: string | null
  content_id: Record<string, unknown> | null
  content_en: Record<string, unknown> | null
  cover_image_url: string | null
  category: string | null
  tags: string[]
  author_name: string
  is_published: boolean
  published_at: string | null
  sort_order: number
  created_at: string
}

type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required.')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, and hyphens only.'),
  title_id: z.string().trim().min(1, 'Indonesian title is required.'),
  title_en: z.string().trim().min(1, 'English title is required.'),
  excerpt_id: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  excerpt_en: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  content_id: z.string().optional().transform((val) => {
    if (!val || val === '') return null
    try {
      return JSON.parse(val) as Record<string, unknown>
    } catch {
      return null
    }
  }),
  content_en: z.string().optional().transform((val) => {
    if (!val || val === '') return null
    try {
      return JSON.parse(val) as Record<string, unknown>
    } catch {
      return null
    }
  }),
  cover_image_url: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? null : val ?? null)),
  category: z
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
  author_name: z.string().trim().min(1).default('Bratamedia'),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
})

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

export async function getAllArticles(): Promise<AdminArticle[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, slug, title_id, title_en, excerpt_id, excerpt_en, content_id, content_en, cover_image_url, category, tags, author_name, is_published, published_at, sort_order, created_at'
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllArticles] Error:', error)
    return []
  }

  return (data ?? []) as AdminArticle[]
}

export async function getArticleById(id: string): Promise<AdminArticle | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, slug, title_id, title_en, excerpt_id, excerpt_en, content_id, content_en, cover_image_url, category, tags, author_name, is_published, published_at, sort_order, created_at'
    )
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getArticleById] Error:', error)
    return null
  }

  return data as AdminArticle
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

export async function createArticle(formData: FormData): Promise<ActionResult> {
  const raw = {
    slug: formData.get('slug'),
    title_id: formData.get('title_id'),
    title_en: formData.get('title_en'),
    excerpt_id: formData.get('excerpt_id'),
    excerpt_en: formData.get('excerpt_en'),
    content_id: formData.get('content_id'),
    content_en: formData.get('content_en'),
    cover_image_url: formData.get('cover_image_url'),
    category: formData.get('category'),
    tags: formData.get('tags'),
    author_name: formData.get('author_name'),
    is_published: formData.get('is_published') === 'on',
    sort_order: formData.get('sort_order'),
  }

  const parsed = articleSchema.safeParse(raw)

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

  const publishedAt = parsed.data.is_published ? new Date().toISOString() : null

  const { data, error } = await supabase
    .from('articles')
    .insert({
      slug: parsed.data.slug,
      title_id: parsed.data.title_id,
      title_en: parsed.data.title_en,
      excerpt_id: parsed.data.excerpt_id,
      excerpt_en: parsed.data.excerpt_en,
      content_id: parsed.data.content_id,
      content_en: parsed.data.content_en,
      cover_image_url: parsed.data.cover_image_url,
      category: parsed.data.category,
      tags: parsed.data.tags,
      author_name: parsed.data.author_name,
      is_published: parsed.data.is_published,
      published_at: publishedAt,
      sort_order: parsed.data.sort_order,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[createArticle] Error:', error)
    return { success: false, error: 'Failed to create article. Please try again.' }
  }

  revalidatePath('/admin/articles')

  return { success: true, id: data.id as string }
}

export async function updateArticle(id: string, formData: FormData): Promise<ActionResult> {
  const raw = {
    slug: formData.get('slug'),
    title_id: formData.get('title_id'),
    title_en: formData.get('title_en'),
    excerpt_id: formData.get('excerpt_id'),
    excerpt_en: formData.get('excerpt_en'),
    content_id: formData.get('content_id'),
    content_en: formData.get('content_en'),
    cover_image_url: formData.get('cover_image_url'),
    category: formData.get('category'),
    tags: formData.get('tags'),
    author_name: formData.get('author_name'),
    is_published: formData.get('is_published') === 'on',
    sort_order: formData.get('sort_order'),
  }

  const parsed = articleSchema.safeParse(raw)

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

  // Preserve existing published_at if already published; set it on first publish
  let publishedAt: string | null = null
  if (parsed.data.is_published) {
    const { data: existing } = await supabase
      .from('articles')
      .select('published_at')
      .eq('id', id)
      .single()
    publishedAt = existing?.published_at ?? new Date().toISOString()
  }

  const { error } = await supabase
    .from('articles')
    .update({
      slug: parsed.data.slug,
      title_id: parsed.data.title_id,
      title_en: parsed.data.title_en,
      excerpt_id: parsed.data.excerpt_id,
      excerpt_en: parsed.data.excerpt_en,
      content_id: parsed.data.content_id,
      content_en: parsed.data.content_en,
      cover_image_url: parsed.data.cover_image_url,
      category: parsed.data.category,
      tags: parsed.data.tags,
      author_name: parsed.data.author_name,
      is_published: parsed.data.is_published,
      published_at: publishedAt,
      sort_order: parsed.data.sort_order,
    })
    .eq('id', id)

  if (error) {
    console.error('[updateArticle] Error:', error)
    return { success: false, error: 'Failed to update article. Please try again.' }
  }

  revalidatePath('/admin/articles')

  return { success: true, id }
}

export async function deleteArticle(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient()

  const { error } = await supabase.from('articles').delete().eq('id', id)

  if (error) {
    console.error('[deleteArticle] Error:', error)
    return { success: false, error: 'Failed to delete article. Please try again.' }
  }

  revalidatePath('/admin/articles')

  return { success: true }
}

export async function toggleArticlePublished(
  id: string,
  isPublished: boolean
): Promise<{ success: boolean }> {
  const supabase = await createServerClient()

  // If publishing for first time, set published_at; if unpublishing, keep existing
  let publishedAt: string | undefined
  if (isPublished) {
    const { data: existing } = await supabase
      .from('articles')
      .select('published_at')
      .eq('id', id)
      .single()
    publishedAt = existing?.published_at ?? new Date().toISOString()
  }

  const updatePayload: Record<string, unknown> = { is_published: isPublished }
  if (isPublished && publishedAt) {
    updatePayload.published_at = publishedAt
  }

  const { error } = await supabase.from('articles').update(updatePayload).eq('id', id)

  if (error) {
    console.error('[toggleArticlePublished] Error:', error)
    return { success: false }
  }

  revalidatePath('/admin/articles')

  return { success: true }
}
