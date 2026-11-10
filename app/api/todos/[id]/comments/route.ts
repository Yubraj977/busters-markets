import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { data, error } = await supabase()
      .from('todo_comments')
      .select('*')
      .eq('todo_id', id)
      .order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('todo comments GET:', err)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { author, body } = await req.json()
    if (!author || !String(author).trim()) {
      return NextResponse.json({ error: 'author is required' }, { status: 400 })
    }
    if (!body || !String(body).trim()) {
      return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 })
    }

    const { data, error } = await supabase()
      .from('todo_comments')
      .insert({ todo_id: id, author: String(author).trim(), body: String(body).trim() })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('todo comments POST:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
