import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET() {
  try {
    const { data, error } = await supabase()
      .from('employees')
      .select('*')
      .order('name', { ascending: true })
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('employees GET:', err)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, pin } = await req.json()
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (pin && !/^\d{4}$/.test(String(pin))) {
      return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
    }

    const { data, error } = await supabase()
      .from('employees')
      .insert({ name: String(name).trim(), pin: pin ? String(pin) : null })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'An employee with that name already exists' }, { status: 409 })
      }
      throw error
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('employees POST:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, active, pin } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }
    if (pin !== undefined && pin && !/^\d{4}$/.test(String(pin))) {
      return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
    }

    const update: Record<string, unknown> = {}
    if (active !== undefined) update.active = active
    if (pin !== undefined) update.pin = pin || null

    const { data, error } = await supabase()
      .from('employees')
      .update(update)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('employees PATCH:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
