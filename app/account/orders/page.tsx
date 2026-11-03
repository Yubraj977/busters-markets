import Link from 'next/link'
import { ArrowLeft, Package, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { mapOrderRow, statusColor, statusLabel, itemCount } from '@/lib/orders'

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = user
    ? await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    : { data: [] }

  const orders = (data ?? []).map(mapOrderRow)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="p-2 hover:bg-forest-50 rounded-lg text-forest-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-forest-900">Order History</h1>
          <p className="text-sm text-gray-500">{orders.length} orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-sm text-gray-500">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <details key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-forest-200 transition-colors group">
              <summary className="list-none cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-forest-600" />
                      <span className="font-mono font-bold text-forest-900">{order.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Ordered {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[order.status]}`}>
                    {statusLabel[order.status]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>{itemCount(order)} items</span>
                    {order.estimatedDelivery && (
                      <>
                        <span className="mx-2 text-gray-300">·</span>
                        <span>Est. {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-forest-900">${(order.totalCents / 100).toFixed(2)}</span>
                    <ChevronRight size={14} className="text-gray-400 transition-transform group-open:rotate-90" />
                  </div>
                </div>
              </summary>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {order.items.map(item => (
                  <div key={item.productSku} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span className="text-forest-900 font-medium">${(item.lineTotalCents / 100).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700">${(order.subtotalCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-700">${(order.taxCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-gray-700">{order.deliveryFeeCents === 0 ? 'FREE' : `$${(order.deliveryFeeCents / 100).toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-forest-900">Total</span>
                  <span className="text-forest-900">${(order.totalCents / 100).toFixed(2)}</span>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  )
}
