import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getCloverCharge } from '@/lib/clover'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false
  const parts = Object.fromEntries(signatureHeader.split(',').map(kv => kv.split('=')))
  const { t, v1 } = parts
  if (!t || !v1) return false

  const expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(v1, 'hex'))
  } catch {
    return false
  }
}

// Clover's webhook payload shape isn't consistently documented across their
// platform-wide and ecommerce-specific webhook systems. Best-effort extraction
// across the shapes we've found in their docs/community resources -- if none
// match, the event is simply acknowledged and ignored rather than erroring.
function extractChargeId(body: Record<string, unknown>): string | null {
  if (typeof body.Id === 'string') return body.Id
  if (typeof body.data === 'string' && body.data.length > 5) return body.data

  const merchants = body.merchants
  if (merchants && typeof merchants === 'object') {
    for (const events of Object.values(merchants as Record<string, unknown>)) {
      if (!Array.isArray(events)) continue
      for (const ev of events) {
        if (ev && typeof ev === 'object' && typeof (ev as { objectId?: unknown }).objectId === 'string') {
          const [, id] = (ev as { objectId: string }).objectId.split(':')
          if (id) return id
        }
      }
    }
  }

  if (typeof body.id === 'string') return body.id
  return null
}

export async function POST(req: Request) {
  const rawBody = await req.text()
  let body: Record<string, unknown>
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // One-time setup handshake: Clover sends { verificationCode } when the webhook
  // URL is first registered. Log it so it can be copied into Clover's dashboard
  // to activate the webhook -- this is a manual step done once, not ongoing.
  if (typeof body.verificationCode === 'string') {
    console.log('Clover webhook verification code:', body.verificationCode)
    return NextResponse.json({ ok: true })
  }

  const secret = process.env.CLOVER_WEBHOOK_SECRET
  if (!secret) {
    console.error('clover webhook: CLOVER_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  if (!verifySignature(rawBody, req.headers.get('Clover-Signature'), secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const chargeId = extractChargeId(body)
  if (!chargeId) {
    return NextResponse.json({ ok: true })
  }

  try {
    const charge = await getCloverCharge(chargeId)
    if (charge?.refunded) {
      const supabase = createAdminClient()
      await supabase
        .from('orders')
        .update({ payment_status: 'refunded', status: 'cancelled' })
        .eq('clover_charge_id', chargeId)
        .neq('payment_status', 'refunded')
    }
  } catch (err) {
    console.error('clover webhook POST:', err)
  }

  return NextResponse.json({ ok: true })
}
