import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  const correct = process.env.ADMIN_PASSWORD
  if (!correct) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD not set in .env' }, { status: 500 })
  }
  if (password === correct) {
    const res = NextResponse.json({ ok: true })
    // Server-verifiable session for sensitive admin routes (orders/refunds) --
    // sessionStorage alone (the pre-existing pattern for deli-menu/store-settings)
    // is client-only and can't be checked by an API route.
    res.cookies.set('bm_admin', correct, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })
    return res
  }
  return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
}
