import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCloverCharge } from '@/lib/clover'

export const dynamic = 'force-dynamic'

interface OrderRow {
  id: string
  clover_charge_id: string | null
  payment_status: string
  status: string
  [key: string]: unknown
}

// Interim stand-in for the webhook (not yet activated in Clover's dashboard):
// before returning orders, check Clover directly for any "paid" order and sync
// if it's actually been refunded there -- catches refunds issued straight from
// Clover's own merchant dashboard instead of through /bm-admin.
async function syncRefundsFromClover(supabase: ReturnType<typeof createAdminClient>, orders: OrderRow[]) {
  const toCheck = orders.filter(o => o.payment_status === 'paid' && o.clover_charge_id)
  if (toCheck.length === 0) return orders

  const results = await Promise.all(
    toCheck.map(async o => ({ order: o, charge: await getCloverCharge(o.clover_charge_id as string) }))
  )

  const refundedIds = results.filter(r => r.charge?.refunded).map(r => r.order.id)
  if (refundedIds.length === 0) return orders

  await supabase
    .from('orders')
    .update({ payment_status: 'refunded', status: 'cancelled' })
    .in('id', refundedIds)

  return orders.map(o =>
    refundedIds.includes(o.id) ? { ...o, payment_status: 'refunded', status: 'cancelled' } : o
  )
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    const synced = await syncRefundsFromClover(supabase, (data ?? []) as OrderRow[])
    return NextResponse.json(synced)
  } catch (err) {
    console.error('admin/orders GET:', err)
    return NextResponse.json({ error: 'Could not load orders' }, { status: 500 })
  }
}
