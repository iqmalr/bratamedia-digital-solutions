'use server'

import { createServerClient } from '@/lib/supabase/server'

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getContactSubmissions] Error:', error)
    return []
  }

  return (data ?? []) as ContactSubmission[]
}

export async function getContactById(id: string): Promise<ContactSubmission | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getContactById] Error:', error)
    return null
  }

  return data as ContactSubmission
}

export async function markContactAsRead(id: string): Promise<{ success: boolean }> {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from('contact_submissions')
    .update({ is_read: true })
    .eq('id', id)

  if (error) {
    console.error('[markContactAsRead] Error:', error)
    return { success: false }
  }

  return { success: true }
}

export async function markContactAsUnread(id: string): Promise<{ success: boolean }> {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from('contact_submissions')
    .update({ is_read: false })
    .eq('id', id)

  if (error) {
    console.error('[markContactAsUnread] Error:', error)
    return { success: false }
  }

  return { success: true }
}
