'use server'

import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

// Zod v4: required_error was removed — use .min(1) or a custom error message
// via the second argument of the type method instead.
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.'),
})

// ---------------------------------------------------------------------------
// Response type
// ---------------------------------------------------------------------------

export type ContactFormResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<'name' | 'email' | 'phone' | 'message', string>> }

// ---------------------------------------------------------------------------
// Rate limiting helper
// ---------------------------------------------------------------------------

/**
 * Simple in-memory rate limiter keyed by IP address.
 *
 * Tracks the number of submissions within a rolling window. This is a
 * best-effort protection for Vercel serverless functions — the counter
 * resets when the instance is recycled. For production-grade rate limiting,
 * use an edge-based solution (e.g. Upstash Redis with @upstash/ratelimit).
 *
 * Limit: 5 submissions per IP per 10 minutes.
 */
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

interface RateLimitRecord {
  count: number
  windowStart: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true
  }

  record.count += 1
  return false
}

// ---------------------------------------------------------------------------
// Server Action
// ---------------------------------------------------------------------------

/**
 * Handles contact form submissions from the landing page.
 *
 * - Validates all fields with Zod (name, email, optional phone, message).
 * - Applies a simple in-memory rate limit per IP (5 requests / 10 minutes).
 * - Inserts a row into the contact_submissions table via the anon Supabase
 *   client. The RLS INSERT policy allows unauthenticated writes, while SELECT
 *   is restricted to admin users.
 *
 * Public action — no authentication required to submit.
 * Caller should NOT expose raw Supabase errors to the user.
 *
 * @param formData - The FormData submitted from the contact form.
 *                   Expected fields: name, email, phone (optional), message.
 * @returns `{ success: true }` on success, or
 *          `{ success: false, error, fieldErrors? }` on validation failure or
 *          server error.
 */
export async function submitContactForm(
  formData: FormData
): Promise<ContactFormResult> {
  // -------------------------------------------------------------------------
  // 1. Rate limiting
  // -------------------------------------------------------------------------
  // next/headers `headers()` is async in Next.js 16.
  // We attempt to read the forwarded IP for rate limiting. If unavailable,
  // we fall back to a fixed key so the limit still applies (conservatively).
  let clientIp = 'unknown'
  try {
    const { headers } = await import('next/headers')
    const headerStore = await headers()
    clientIp =
      headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headerStore.get('x-real-ip') ??
      'unknown'
  } catch {
    // headers() is only available in a request context; tolerate missing.
  }

  if (isRateLimited(clientIp)) {
    return {
      success: false,
      error: 'Too many submissions. Please wait a few minutes before trying again.',
    }
  }

  // -------------------------------------------------------------------------
  // 2. Parse and validate inputs
  // -------------------------------------------------------------------------
  const rawInput = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  }

  const parsed = contactFormSchema.safeParse(rawInput)

  if (!parsed.success) {
    const fieldErrors: Partial<Record<'name' | 'email' | 'phone' | 'message', string>> = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as 'name' | 'email' | 'phone' | 'message'
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }

    return {
      success: false,
      error: 'Please fix the errors in the form.',
      fieldErrors,
    }
  }

  const { name, email, phone, message } = parsed.data

  // -------------------------------------------------------------------------
  // 3. Insert into database
  // -------------------------------------------------------------------------
  try {
    const supabase = await createServerClient()

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone: phone ?? null,
      message,
    })

    if (error) {
      console.error('[submitContactForm] Supabase insert error:', error)
      return {
        success: false,
        error: 'Something went wrong. Please try again or contact us directly.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('[submitContactForm] Unexpected error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.',
    }
  }
}
