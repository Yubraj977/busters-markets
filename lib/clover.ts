export class CloverChargeError extends Error {
  constructor(public code: 'NOT_CONFIGURED' | 'DECLINED' | 'UNREACHABLE' | 'BAD_RESPONSE', message: string) {
    super(message)
  }
}

export async function chargeCloverCard(params: {
  cardToken: string
  amountCents: number
  currency?: string
}): Promise<{ chargeId: string }> {
  const privateToken = process.env.CLOVER_PRIVATE_TOKEN
  const env = process.env.CLOVER_ENV ?? 'sandbox'

  if (process.env.MOCK_CHECKOUT_CHARGE === 'true') {
    return { chargeId: `MOCK-${Date.now()}` }
  }

  if (!privateToken) {
    throw new CloverChargeError('NOT_CONFIGURED', 'CLOVER_PRIVATE_TOKEN is not configured')
  }

  const base = env === 'production' ? 'https://scl.clover.com' : 'https://scl-sandbox.dev.clover.com'

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
