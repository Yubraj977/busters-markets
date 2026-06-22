import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const MENU_URL   = process.env.DAILY_MENU_URL ?? 'http://localhost:3000'
const LOCAL_JSON = resolve(process.cwd(), 'data/deli-menu.json')

export const dynamic = 'force-dynamic'

// ── GET — serve menu (live server → local JSON fallback) ──────────────────
export async function GET() {
  try {
    const res = await fetch(`${MENU_URL}/api/menu`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    })
    if (res.ok) return NextResponse.json(await res.json())
  } catch {
    // fall through
  }

  try {
    return NextResponse.json(JSON.parse(readFileSync(LOCAL_JSON, 'utf-8')))
  } catch {
    return NextResponse.json({ categories: [], items: [] })
  }
}

// ── PUT — save menu to local JSON (and forward to live server if reachable) ─
export async function PUT(req: Request) {
  try {
    const body = await req.json()

    // Always write local copy
    writeFileSync(LOCAL_JSON, JSON.stringify(body, null, 2))

    // Best-effort forward to busters-daily server
    try {
      await fetch(`${MENU_URL}/api/menu`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(3000),
      })
    } catch {
      // live server not running — local save is enough
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('deli-menu PUT:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
