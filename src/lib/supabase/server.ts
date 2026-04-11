import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

/**
 * Creates a Supabase client for use in Server Components, Server Actions,
 * and Route Handlers.
 *
 * IMPORTANT — Next.js 16 breaking change:
 * `cookies()` from `next/headers` is now an async function. This helper is
 * therefore async and must be awaited at the call site.
 *
 * The client reads and writes auth cookies automatically via `@supabase/ssr`,
 * keeping the user session in sync across requests.
 *
 * Uses the public anon key — always protected by Row Level Security policies.
 * Use the service role key ONLY in trusted migration/seed scripts, never here.
 *
 * @returns A typed Supabase client bound to the current request's cookies.
 *
 * @example
 * ```ts
 * // Inside a Server Component or Server Action:
 * const supabase = await createServerClient()
 * const { data } = await supabase.from('articles').select('*')
 * ```
 */
export async function createServerClient() {
  // In Next.js 16, cookies() is async — must be awaited.
  const cookieStore = await cookies()

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // `setAll` is called from a Server Component during rendering.
            // Cookies can only be mutated inside Server Actions or Route
            // Handlers, so this error is expected when reading during RSC
            // render and can safely be ignored. The Supabase middleware
            // (src/lib/supabase/middleware.ts) handles session refresh for
            // read-only Server Component contexts.
          }
        },
      },
    }
  )
}
