import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const FILE = resolve(process.cwd(), 'data/store-settings.json')

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(JSON.parse(readFileSync(FILE, 'utf-8')))
  } catch {
    return NextResponse.json({ storeHours: {}, deliHours: {} })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    writeFileSync(FILE, JSON.stringify(body, null, 2))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('store-settings PUT:', err)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}
