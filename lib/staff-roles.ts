import { createClient } from '@/lib/supabase/server'

export interface StaffRole {
  userId: string
  name: string
  email: string
  role: 'staff' | 'admin'
}

export async function getMyStaffRole(): Promise<StaffRole | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('staff_roles')
    .select('user_id, name, role, active')
    .eq('user_id', user.id)
    .single()

  if (!data || !data.active) return null

  return { userId: data.user_id, name: data.name, email: user.email ?? '', role: data.role }
}
