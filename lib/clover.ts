export class CloverChargeError extends Error {
  constructor(public code: 'NOT_CONFIGURED' | 'DECLINED' | 'UNREACHABLE' | 'BAD_RESPONSE', message: string) {
    super(message)
  }
}

function cloverBaseUrl(): string {
  const env = process.env.CLOVER_ENV ?? 'sandbox'
  return env === 'production' ? 'https://scl.clover.com' : 'https://scl-sandbox.dev.clover.com'
}

export async function chargeCloverCard(params: {
  cardToken: string
  amountCents: number
  currency?: string
}): Promise<{ chargeId: string }> {
  const privateToken = process.env.CLOVER_PRIVATE_TOKEN

  if (process.env.MOCK_CHECKOUT_CHARGE === 'true') {
    return { chargeId: `MOCK-${Date.now()}` }
  }

  if (!privateToken) {
    throw new CloverChargeError('NOT_CONFIGURED', 'CLOVER_PRIVATE_TOKEN is not configured')
  }

  const base = cloverBaseUrl()

  let res: Response
  try {
    res = await fetch(`${base}/v1/charges`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${privateToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: params.amountCents,
        currency: params.currency ?? 'usd',
        source: params.cardToken,
      }),
    })
  } catch {
    throw new CloverChargeError('UNREACHABLE', 'Could not reach Clover')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new CloverChargeError('DECLINED', data.message ?? `Charge failed: ${res.status}`)
  }
  if (!data.id) {
    throw new CloverChargeError('BAD_RESPONSE', 'Clover returned an unexpected charge response')
  }

  return { chargeId: data.id }
}

export class CloverRefundError extends Error {
  constructor(public code: 'NOT_CONFIGURED' | 'FAILED' | 'UNREACHABLE', message: string) {
    super(message)
  }
}

// Full refund only -- Clover's charge-level /v1/refunds endpoint doesn't support
// partial refunds for charges with tax or multiple line items, which covers every
// charge this app creates.
export async function refundCloverCharge(chargeId: string): Promise<{ refundId: string }> {
  const privateToken = process.env.CLOVER_PRIVATE_TOKEN

  if (chargeId.startsWith('MOCK-')) {
    return { refundId: `MOCK-REFUND-${Date.now()}` }
  }

  if (!privateToken) {
    throw new CloverRefundError('NOT_CONFIGURED', 'CLOVER_PRIVATE_TOKEN is not configured')
  }

  let res: Response
  try {
    res = await fetch(`${cloverBaseUrl()}/v1/refunds`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${privateToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ charge: chargeId }),
    })
  } catch {
    throw new CloverRefundError('UNREACHABLE', 'Could not reach Clover')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok || !data.id) {
    throw new CloverRefundError('FAILED', data.message ?? `Refund failed: ${res.status}`)
  }

  return { refundId: data.id }
}

export interface CloverChargeStatus {
  id: string
  refunded: boolean
  status: string
}

// Fetches a charge's current state directly from Clover. Used by the webhook
// handler to confirm what actually happened rather than trusting a guessed
// event-type name -- Clover's event payload shape isn't reliably documented,
// but re-checking the source of truth for whatever charge an event references
// works regardless of the exact event name.
export async function getCloverCharge(chargeId: string): Promise<CloverChargeStatus | null> {
  const privateToken = process.env.CLOVER_PRIVATE_TOKEN
  if (!privateToken || chargeId.startsWith('MOCK-')) return null

  let res: Response
  try {
    res = await fetch(`${cloverBaseUrl()}/v1/charges/${chargeId}`, {
      headers: { Authorization: `Bearer ${privateToken}` },
    })
  } catch {
    return null
  }
  if (!res.ok) return null

  const data = await res.json().catch(() => null)
  if (!data?.id) return null

  return {
    id: data.id,
    refunded: Boolean(data.refunded) || (typeof data.amount_refunded === 'number' && data.amount_refunded > 0),
    status: data.status ?? 'unknown',
  }
}
