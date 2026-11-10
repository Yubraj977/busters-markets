import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const VALID_PRIORITIES = ['low', 'normal', 'high', 'urgent']
const VALID_CATEGORIES = ['general', 'deli', 'stocking', 'cleaning', 'register', 'other']
const VALID_RECURRENCE = ['daily', 'weekly']

interface TodoRow {
  id: string
  title: string
  notes: string | null
  status: string
  assigned_to: string | null
  assigned_by: string | null
  priority: string
  category: string
  recurrence: string | null
  due_date: string | null
}

function nextDueDate(dueDate: string | null, recurrence: string): string {
  const base = dueDate ? new Date(dueDate + 'T00:00') : new Date()
  base.setDate(base.getDate() + (recurrence === 'weekly' ? 7 : 1))
  return base.toISOString().slice(0, 10)
}

async function spawnNextOccurrence(row: TodoRow) {
  if (!row.recurrence) return
  await supabase().from('todos').insert({
    title: row.title,
    notes: row.notes,
    status: row.assigned_to ? 'claimed' : 'open',
    assigned_to: row.assigned_to,
    assigned_by: row.assigned_by,
    priority: row.priority,
    category: row.category,
    recurrence: row.recurrence,
    due_date: nextDueDate(row.due_date, row.recurrence),
  })
}

export async function GET() {
  try {
    const { data, error } = await supabase()
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('todos GET:', err)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, notes, assignedTo, assignedBy, priority, dueDate, category, recurrence } = await req.json()
    if (!title || !String(title).trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return NextResponse.json({ error: 'Invalid priority' }, { status: 400 })
    }
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }
    if (recurrence && !VALID_RECURRENCE.includes(recurrence)) {
      return NextResponse.json({ error: 'Invalid recurrence' }, { status: 400 })
    }

    const { data, error } = await supabase()
      .from('todos')
      .insert({
        title: String(title).trim(),
        notes: notes ? String(notes).trim() : null,
        assigned_to: assignedTo || null,
        assigned_by: assignedTo && assignedBy ? String(assignedBy).trim() : null,
        status: assignedTo ? 'claimed' : 'open',
        priority: priority ?? 'normal',
        category: category ?? 'general',
        recurrence: recurrence || null,
        due_date: dueDate || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('todos POST:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, assignedTo, assignedBy, priority, dueDate, category, recurrence } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return NextResponse.json({ error: 'Invalid priority' }, { status: 400 })
    }
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }
    if (recurrence !== undefined && recurrence && !VALID_RECURRENCE.includes(recurrence)) {
      return NextResponse.json({ error: 'Invalid recurrence' }, { status: 400 })
    }

    const update: Record<string, unknown> = {}
    if (status) {
      update.status = status
      update.completed_at = status === 'done' ? new Date().toISOString() : null
      if (status === 'open') { update.assigned_to = null; update.assigned_by = null }
    }
    if (assignedTo !== undefined) {
      update.assigned_to = assignedTo || null
      update.assigned_by = assignedTo && assignedBy ? assignedBy : null
      if (assignedTo && !status) update.status = 'claimed'
    }
    if (priority) update.priority = priority
    if (category) update.category = category
    if (recurrence !== undefined) update.recurrence = recurrence || null
    if (dueDate !== undefined) update.due_date = dueDate || null

    const { data, error } = await supabase()
      .from('todos')
      .update(update)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (status === 'done') {
      await spawnNextOccurrence(data as TodoRow)
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('todos PATCH:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabase().from('todos').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('todos DELETE:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
