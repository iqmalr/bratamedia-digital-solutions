/**
 * Supabase database type definitions.
 *
 * Manually maintained to match the schema defined in:
 *   supabase/migrations/00001_create_tables.sql
 *
 * Once a Supabase project is linked, regenerate with:
 *   npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
 *
 * Until then, keep this file in sync with any schema migrations manually.
 */

// ---------------------------------------------------------------------------
// Row types — shape of a single database row as returned by SELECT
// ---------------------------------------------------------------------------

export interface ServiceRow {
  id: string
  name_id: string
  name_en: string
  description_id: string
  description_en: string
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PortfolioRow {
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
  updated_at: string
}

export interface TestimonialRow {
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
  updated_at: string
}

export interface ContactSubmissionRow {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

// ---------------------------------------------------------------------------
// Insert types — shape of a row payload for INSERT operations
// Omits server-generated fields (id, created_at, updated_at).
// ---------------------------------------------------------------------------

export type ServiceInsert = Omit<ServiceRow, 'id' | 'created_at' | 'updated_at'>

export type PortfolioInsert = Omit<PortfolioRow, 'id' | 'created_at' | 'updated_at'>

export type TestimonialInsert = Omit<TestimonialRow, 'id' | 'created_at' | 'updated_at'>

export type ContactSubmissionInsert = Omit<ContactSubmissionRow, 'id' | 'is_read' | 'created_at'>

// ---------------------------------------------------------------------------
// Update types — all fields optional except id (which is never updated)
// ---------------------------------------------------------------------------

export type ServiceUpdate = Partial<ServiceInsert>

export type PortfolioUpdate = Partial<PortfolioInsert>

export type TestimonialUpdate = Partial<TestimonialInsert>

/** Admin-updatable fields on contact_submissions (only is_read today). */
export type ContactSubmissionUpdate = Pick<ContactSubmissionRow, 'is_read'>

// ---------------------------------------------------------------------------
// Supabase Database interface
// Used to type the Supabase client: createClient<Database>(...)
// ---------------------------------------------------------------------------

/**
 * The Database type passed to the Supabase client must satisfy the
 * `GenericTable` constraint: each table's Row/Insert/Update must extend
 * `Record<string, unknown>`. TypeScript's `Omit<Interface, keys>` utility
 * produces a mapped type without an index signature, so it fails that
 * constraint. We intersect each slot with `Record<string, unknown>` here
 * to satisfy the Supabase client's type system while keeping our strongly-
 * typed Row/Insert/Update aliases usable everywhere else in application code.
 */
export type Database = {
  public: {
    Tables: {
      services: {
        Row: ServiceRow & Record<string, unknown>
        Insert: ServiceInsert & Record<string, unknown>
        Update: ServiceUpdate & Record<string, unknown>
        Relationships: []
      }
      portfolio: {
        Row: PortfolioRow & Record<string, unknown>
        Insert: PortfolioInsert & Record<string, unknown>
        Update: PortfolioUpdate & Record<string, unknown>
        Relationships: []
      }
      testimonials: {
        Row: TestimonialRow & Record<string, unknown>
        Insert: TestimonialInsert & Record<string, unknown>
        Update: TestimonialUpdate & Record<string, unknown>
        Relationships: []
      }
      contact_submissions: {
        Row: ContactSubmissionRow & Record<string, unknown>
        Insert: ContactSubmissionInsert & Record<string, unknown>
        Update: ContactSubmissionUpdate & Record<string, unknown>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
  }
}
