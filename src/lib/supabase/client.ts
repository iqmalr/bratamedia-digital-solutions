import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

/**
 * Creates a Supabase client for use in Client Components.
 *
 * Uses the public anon key — subject to Row Level Security policies.
 * Call this inside Client Component bodies or event handlers, not at module
 * level, so the instance is created fresh per component mount.
 *
 * @returns A typed Supabase client bound to the browser session.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
