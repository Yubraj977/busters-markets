import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { refundCloverCharge, CloverRefundError } from '@/lib/clover'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { data: order, error: fetchErr } = await supabase
      .from('orders')
      .select('id, clover_charge_id, payment_status')
      .eq('id', id)
      .single()

    if (fetchErr || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    if (!order.clover_charge_id) {
      return NextResponse.json({ error: 'Order has no associated charge to refund' }, { status: 400 })
    }
    if (order.payment_status === 'refunded') {
      return NextResponse.json({ error: 'Order was already refunded' }, { status: 400 })
    }

    let refund
    try {
      refund = await refundCloverCharge(order.clover_charge_id)
    } catch (err) {
      const message = err instanceof CloverRefundError ? err.message : 'Refund failed'
      return NextResponse.json({ error: message }, { status: 502 })
    }

    const { data: updated, error: updateErr } = await supabase
      .from('orders')
      .update({ payment_status: 'refunded', status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()

    if (updateErr) {
      console.error('admin/orders refund: Clover refund succeeded but DB update failed', updateErr)
      return NextResponse.json(
        { error: `Refund succeeded (${refund.refundId}) but updating the order record failed -- please check Clover directly.` },
        { status: 500 }
      )
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error('admin/orders/[id]/refund POST:', err)
    return NextResponse.json({ error: 'Refund failed unexpectedly' }, { status: 500 })
  }
}
