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
      .from('store_settings')
      .select('data')
      .eq('id', 1)
      .single()
    if (!error && data) return NextResponse.json(data.data)
  } catch {}

  return NextResponse.json({ storeHours: {}, deliHours: {} })
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const { error } = await supabase()
      .from('store_settings')
      .upsert({ id: 1, data: body, updated_at: new Date().toISOString() })

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('store-settings PUT:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
