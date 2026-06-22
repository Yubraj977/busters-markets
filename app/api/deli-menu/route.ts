import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MENU_URL = process.env.DAILY_MENU_URL ?? 'http://localhost:3000'

export const dynamic = 'force-dynamic'

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── GET: live busters-daily → Supabase → empty ────────────────────────────
export async function GET() {
  // 1. Try live Roku TV server
  try {
    const res = await fetch(`${MENU_URL}/api/menu`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    })
    if (res.ok) return NextResponse.json(await res.json())
  } catch {}

  // 2. Supabase
  try {
    const { data, error } = await supabase()
      .from('deli_menu')
      .select('data')
      .eq('id', 1)
      .single()
    if (!error && data) return NextResponse.json(data.data)
  } catch {}

  return NextResponse.json({ categories: [], items: [] })
}

// ── PUT: save to Supabase + best-effort forward to live server ────────────
export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const { error } = await supabase()
      .from('deli_menu')
      .upsert({ id: 1, data: body, updated_at: new Date().toISOString() })

    if (error) throw error

    // Best-effort forward to busters-daily
    try {
      await fetch(`${MENU_URL}/api/menu`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(3000),
      })
    } catch {}

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('deli-menu PUT:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
