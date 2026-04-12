'use server'

import { createServerClient } from '@/lib/supabase/server'

export interface DashboardStats {
  totalServices: number
  totalPortfolio: number
  totalTestimonials: number
  unreadContacts: number
}

export interface RecentContact {
  id: string
  name: string
  email: string
  subject: string | null
  is_read: boolean
  created_at: string
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createServerClient()

  // Use count queries — RLS allows admin to see all rows
  const [services, portfolio, testimonials, contacts] = await Promise.all([
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('portfolio').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false),
  ])

  return {
    totalServices: services.count ?? 0,
    totalPortfolio: portfolio.count ?? 0,
    totalTestimonials: testimonials.count ?? 0,
    unreadContacts: contacts.count ?? 0,
  }
}

export async function getRecentContacts(): Promise<RecentContact[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id, name, email, subject, is_read, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('[getRecentContacts] Error:', error)
    return []
  }

  return (data ?? []) as RecentContact[]
}
