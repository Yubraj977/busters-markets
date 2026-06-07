import Link from 'next/link'
import { ArrowLeft, Package, ChevronRight } from 'lucide-react'

const orders = [
  { id: 'BM841923', date: 'Jun 5, 2026',  total: 67.42, items: 9,  status: 'Delivered', delivery: 'Jun 5, 2026' },
  { id: 'BM837641', date: 'May 28, 2026', total: 34.17, items: 5,  status: 'Delivered', delivery: 'May 28, 2026' },
  { id: 'BM830019', date: 'May 14, 2026', total: 89.03, items: 12, status: 'Delivered', delivery: 'May 15, 2026' },
  { id: 'BM821445', date: 'May 1, 2026',  total: 51.20, items: 7,  status: 'Delivered', delivery: 'May 1, 2026' },
  { id: 'BM814300', date: 'Apr 18, 2026', total: 43.88, items: 6,  status: 'Delivered', delivery: 'Apr 19, 2026' },
]

const statusColor: Record<string, string> = {
  Delivered:  'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped:    'bg-purple-100 text-purple-700',
  Cancelled:  'bg-red-100 text-red-700',
}

export default function OrdersPage() {
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

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-forest-200 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-forest-600" />
                  <span className="font-mono font-bold text-forest-900">{order.id}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Ordered {order.date}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[order.status] ?? ''}`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span>{order.items} items</span>
                <span className="mx-2 text-gray-300">·</span>
                <span>Delivered {order.delivery}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-forest-900">${order.total.toFixed(2)}</span>
                <button className="text-xs text-forest-700 font-semibold hover:text-forest-900 flex items-center gap-0.5 transition-colors">
                  Reorder <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
