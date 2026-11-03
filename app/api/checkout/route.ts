import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getBackofficeProducts } from '@/lib/backoffice'
import { chargeCloverCard, CloverChargeError } from '@/lib/clover'
import { calcOrderTotals } from '@/lib/pricing'
import type { CheckoutRequest, CheckoutResponse, Address } from '@/lib/types'

export const dynamic = 'force-dynamic'

function isValidAddress(a: unknown): a is Address {
  if (!a || typeof a !== 'object') return false
  const addr = a as Record<string, unknown>
  const hasFields = ['street', 'city', 'state', 'zip'].every(
    k => typeof addr[k] === 'string' && (addr[k] as string).trim()
  )
  return hasFields && typeof addr.name === 'string' && Boolean(addr.name.trim())
}

function isValidBody(body: unknown): body is CheckoutRequest {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  if (!Array.isArray(b.items) || b.items.length === 0) return false
  if (!b.items.every(i => i && typeof i.sku === 'string' && Number.isInteger(i.quantity) && i.quantity > 0)) return false
  if (typeof b.cardToken !== 'string' || !b.cardToken.trim()) return false
  const customer = b.customer as Record<string, unknown> | undefined
  if (!customer || typeof customer.name !== 'string' || !customer.name.trim()) return false
  if (typeof customer.email !== 'string' || !customer.email.trim()) return false
  if (!isValidAddress(b.deliveryAddress)) return false
  return true
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json<CheckoutResponse>(
        { ok: false, error: 'UNAUTHENTICATED', message: 'You must be signed in to check out' },
        { status: 401 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!isValidBody(body)) {
      return NextResponse.json<CheckoutResponse>(
        { ok: false, error: 'INVALID_REQUEST', message: 'Checkout request is missing required fields' },
        { status: 400 }
      )
    }

    // Recompute the charge from live backoffice prices — never trust a client-supplied amount.
    const products = await getBackofficeProducts()
    const priceBySku = new Map(products.map(p => [p.sku ?? p.id, p]))

    let subtotalCents = 0
    const lineItems: { productSku: string; name: string; unit?: string; unitPriceCents: number; quantity: number; lineTotalCents: number }[] = []
    for (const item of body.items) {
      const product = priceBySku.get(item.sku)
      if (!product) {
        return NextResponse.json<CheckoutResponse>(
          { ok: false, error: 'INVALID_REQUEST', message: `Unknown product: ${item.sku}` },
          { status: 400 }
        )
      }
      const unitPriceCents = Math.round(product.price * 100)
      const lineTotalCents = unitPriceCents * item.quantity
      subtotalCents += lineTotalCents
      lineItems.push({
        productSku: item.sku,
        name: product.name,
        unit: product.unit,
        unitPriceCents,
        quantity: item.quantity,
        lineTotalCents,
      })
    }

    const totals = calcOrderTotals(subtotalCents)

    let charge
    try {
      charge = await chargeCloverCard({ cardToken: body.cardToken, amountCents: totals.totalCents })
    } catch (err) {
      if (err instanceof CloverChargeError) {
        const status = err.code === 'NOT_CONFIGURED' ? 503 : err.code === 'DECLINED' ? 402 : 502
        const error = err.code === 'NOT_CONFIGURED' ? 'NOT_CONFIGURED'
          : err.code === 'DECLINED' ? 'CARD_DECLINED' : 'CLOVER_UNREACHABLE'
        return NextResponse.json<CheckoutResponse>({ ok: false, error, message: err.message }, { status })
      }
      throw err
    }

    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        clover_charge_id: charge.chargeId,
        status: 'paid',
        payment_status: 'paid',
        subtotal_cents: totals.subtotalCents,
        tax_cents: totals.taxCents,
        delivery_fee_cents: totals.deliveryFeeCents,
        total_cents: totals.totalCents,
        customer_name: body.customer.name,
        customer_email: body.customer.email,
        customer_phone: body.customer.phone ?? null,
        delivery_street: body.deliveryAddress.street,
        delivery_apt: body.deliveryAddress.apt ?? null,
        delivery_city: body.deliveryAddress.city,
        delivery_state: body.deliveryAddress.state,
        delivery_zip: body.deliveryAddress.zip,
      })
      .select()
      .single()

    if (orderErr || !order) {
      console.error('checkout POST: order insert failed after successful charge', orderErr)
      return NextResponse.json<CheckoutResponse>(
        {
          ok: false,
          error: 'ORDER_SAVE_FAILED',
          message: `Payment succeeded (charge ${charge.chargeId}) but we couldn't save your order. Please contact support.`,
        },
        { status: 500 }
      )
    }

    const { error: itemsErr } = await supabase.from('order_items').insert(
      lineItems.map(li => ({
        order_id: order.id,
        product_sku: li.productSku,
        name: li.name,
        unit: li.unit ?? null,
        unit_price_cents: li.unitPriceCents,
        quantity: li.quantity,
        line_total_cents: li.lineTotalCents,
      }))
    )

    if (itemsErr) {
      console.error('checkout POST: order_items insert failed after successful charge', itemsErr)
      return NextResponse.json<CheckoutResponse>(
        {
          ok: false,
          error: 'ORDER_SAVE_FAILED',
          message: `Payment succeeded (charge ${charge.chargeId}) but we couldn't save your order items. Please contact support.`,
        },
        { status: 500 }
      )
    }

    return NextResponse.json<CheckoutResponse>({ ok: true, orderId: order.id, cloverChargeId: charge.chargeId })
  } catch (err) {
    console.error('checkout POST:', err)
    return NextResponse.json<CheckoutResponse>(
      { ok: false, error: 'SERVER_ERROR', message: 'Checkout failed unexpectedly' },
      { status: 500 }
    )
  }
}
