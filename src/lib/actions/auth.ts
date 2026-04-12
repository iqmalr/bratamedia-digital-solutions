'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
})

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export type SignInResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<'email' | 'password', string>> }

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Signs the admin user in with email and password.
 *
 * Validates inputs with Zod, then calls signInWithPassword.
 * Returns a generic error for auth failures to avoid leaking
 * whether an account exists.
 */
export async function signIn(formData: FormData): Promise<SignInResult> {
  const rawInput = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = signInSchema.safeParse(rawInput)

  if (!parsed.success) {
    const fieldErrors: Partial<Record<'email' | 'password', string>> = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as 'email' | 'password'
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }

    return {
      success: false,
      error: 'Please fix the errors below.',
      fieldErrors,
    }
  }

  const { email, password } = parsed.data

  try {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('[signIn] Supabase auth error:', error)
      return {
        success: false,
        error: 'Invalid email or password.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('[signIn] Unexpected error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}

/**
 * Signs the current user out and redirects to the admin login page.
 */
export async function signOut(): Promise<void> {
  try {
    const supabase = await createServerClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error('[signOut] Unexpected error:', error)
  }

  redirect('/admin/login')
}

/**
 * Returns the currently authenticated user, or null.
 *
 * Uses getUser() (server-side JWT verification) instead of getSession()
 * (cookie-only, no validation).
 */
export async function getSession(): Promise<User | null> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return null
    }

    return data.user
  } catch (error) {
    console.error('[getSession] Unexpected error:', error)
    return null
  }
}

/**
 * Returns the authenticated user only if they have the admin role
 * in app_metadata. Matches the is_admin() RLS function.
 */
export async function getAdminUser(): Promise<User | null> {
  const user = await getSession()

  if (!user) {
    return null
  }

  if (user.app_metadata?.role !== 'admin') {
    return null
  }

  return user
}

/**
 * Asserts the current request is from an authenticated admin.
 * Redirects to /admin/login if not. Call at the top of admin pages/layouts.
 */
export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}
