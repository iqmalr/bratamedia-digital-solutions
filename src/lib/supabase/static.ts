import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Creates a Supabase client using the anon key without cookies.
 *
 * Use this for public data fetching in statically rendered pages (SSG/ISR).
 * This client does NOT read auth cookies, so it only sees data allowed by
 * the anon role RLS policies (e.g. active services, portfolio, testimonials).
 *
 * Do NOT use this for authenticated operations — use createServerClient instead.
 */
export function createStaticClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}
