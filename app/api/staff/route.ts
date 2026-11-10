import { NextResponse } from 'next/server'
import { getMyStaffRole } from '@/lib/staff-roles'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// Listing is available to any logged-in staff member (needed for the task
// "assign to" picker) -- only inviting/editing roles is admin-only.
export async function GET() {
  const me = await getMyStaffRole()
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('staff_roles')
      .select('user_id, name, role, active')
      .order('name', { ascending: true })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('staff GET:', err)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  const me = await getMyStaffRole()
  if (!me || me.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  try {
    const { email, name, role } = await req.json()
    if (!email || !String(email).trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (role !== 'staff' && role !== 'admin') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const cleanEmail = String(email).trim().toLowerCase()
    const supabase = createAdminClient()

    // Creates the account and emails them a sign-in link. If they already have
    // an account (e.g. an existing customer), fall back to looking them up and
    // just grant the role -- no new account needed.
    const { data: invited, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(cleanEmail)

    let userId: string
    if (inviteErr) {
      const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 })
      if (listErr) throw listErr
      const existing = list.users.find(u => u.email?.toLowerCase() === cleanEmail)
      if (!existing) {
        return NextResponse.json({ error: inviteErr.message }, { status: 400 })
      }
      userId = existing.id
    } else {
      userId = invited.user.id
    }

    const { data, error } = await supabase
      .from('staff_roles')
      .upsert({ user_id: userId, name: String(name).trim(), role, active: true }, { onConflict: 'user_id' })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('staff POST:', err)
    return NextResponse.json({ error: 'Could not invite staff member' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const me = await getMyStaffRole()
  if (!me || me.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  try {
    const { userId, role, active } = await req.json()
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    if (role !== undefined && role !== 'staff' && role !== 'admin') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const update: Record<string, unknown> = {}
    if (role !== undefined) update.role = role
    if (active !== undefined) update.active = active

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('staff_roles')
      .update(update)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('staff PATCH:', err)
    return NextResponse.json({ error: 'Could not update' }, { status: 500 })
  }
}
