'use server'

import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type UploadResult =
  | { success: true; url: string }
  | { success: false; error: string }

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Uploads an image file to the specified Supabase Storage bucket.
 *
 * The admin user's session must be present in the request cookies — RLS
 * policies on `storage.objects` restrict INSERT to rows where `is_admin()`
 * returns true, so no explicit auth check is needed here; the upload itself
 * will fail if the caller is not an authenticated admin.
 *
 * Validates file type (JPEG, PNG, WebP) and size (max 2 MB) before uploading.
 * Generates a collision-resistant filename using a timestamp + random suffix.
 *
 * @param formData - FormData containing a `file` entry of type File.
 * @param bucket   - Target bucket: 'portfolio-images' or 'avatars'.
 * @returns `{ success: true, url }` with the public URL, or `{ success: false, error }`.
 */
export async function uploadImage(
  formData: FormData,
  bucket: 'portfolio-images' | 'avatars'
): Promise<UploadResult> {
  try {
    const file = formData.get('file') as File | null

    if (!file || file.size === 0) {
      return { success: false, error: 'No file selected.' }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.',
      }
    }

    if (file.size > MAX_SIZE) {
      return {
        success: false,
        error: 'File too large. Maximum size is 2 MB.',
      }
    }

    // Build a collision-resistant filename: <timestamp>-<random>.ext
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const supabase = await createServerClient()

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('[uploadImage] Storage error:', uploadError)
      return { success: false, error: 'Failed to upload image. Please try again.' }
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filename)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('[uploadImage] Unexpected error:', error)
    return { success: false, error: 'Failed to upload image. Please try again.' }
  }
}

/**
 * Removes an image from the specified Supabase Storage bucket.
 *
 * Accepts either the full public URL or just the filename. The admin session
 * must be present — RLS restricts DELETE to `is_admin()` callers.
 *
 * @param path   - Full public URL or bare filename of the object to remove.
 * @param bucket - Bucket to remove from: 'portfolio-images' or 'avatars'.
 * @returns `{ success: true }` or `{ success: false, error }`.
 */
export async function deleteImage(
  path: string,
  bucket: 'portfolio-images' | 'avatars'
): Promise<{ success: boolean; error?: string }> {
  try {
    // If a full URL was supplied, extract just the filename (last path segment).
    const filename = path.includes('/') ? path.split('/').pop()! : path

    const supabase = await createServerClient()

    const { error } = await supabase.storage.from(bucket).remove([filename])

    if (error) {
      console.error('[deleteImage] Storage error:', error)
      return { success: false, error: 'Failed to delete image.' }
    }

    return { success: true }
  } catch (error) {
    console.error('[deleteImage] Unexpected error:', error)
    return { success: false, error: 'Failed to delete image.' }
  }
}
