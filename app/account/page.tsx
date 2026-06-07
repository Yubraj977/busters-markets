import Link from 'next/link'
import { Package, MapPin, Heart, Settings, ChevronRight, ShoppingBag } from 'lucide-react'

const recentOrders = [
  { id: 'BM841923', date: 'Jun 5, 2026', total: 67.42, items: 9,  status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
  { id: 'BM837641', date: 'May 28, 2026', total: 34.17, items: 5, status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
  { id: 'BM830019', date: 'May 14, 2026', total: 89.03, items: 12, status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
]

const quickLinks = [
  { icon: Package,   label: 'Order History',   sub: 'View and track all orders',   href: '/account/orders' },
  { icon: MapPin,    label: 'Saved Addresses',  sub: 'Manage delivery locations',   href: '/account' },
  { icon: Heart,     label: 'Saved Lists',      sub: 'Your favorite items',         href: '/account' },
  { icon: Settings,  label: 'Account Settings', sub: 'Profile, password, and more', href: '/account' },
]

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">👤</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-forest-900">Welcome back!</h1>
          <p className="text-gray-500 text-sm">yubrajkhatri977@gmail.com</p>
        </div>
        <Link
          href="/auth/login"
          className="ml-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
        >
          Sign Out
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: '24', icon: ShoppingBag },
          { label: 'Items Bought', value: '187', icon: Package },
          { label: 'Total Saved', value: '$34.50', icon: Heart },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
            <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Icon size={18} className="text-forest-700" />
            </div>
            <div className="font-display font-bold text-2xl text-forest-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-forest-900">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-forest-700 font-semibold hover:text-forest-900 flex items-center gap-0.5">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-forest-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-mono text-sm font-bold text-forest-900">{order.id}</span>
                    <span className="text-xs text-gray-400 ml-2">{order.date}</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{order.items} items</span>
                  <span className="font-bold text-forest-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h2 className="font-display font-bold text-xl text-forest-900 mb-4">My Account</h2>
          <div className="space-y-2">
            {quickLinks.map(({ icon: Icon, label, sub, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-forest-200 hover:bg-forest-50 transition-all group"
              >
                <div className="w-9 h-9 bg-forest-50 rounded-xl flex items-center justify-center group-hover:bg-forest-100 transition-colors">
                  <Icon size={17} className="text-forest-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-forest-900">{label}</p>
                  <p className="text-xs text-gray-500 truncate">{sub}</p>
                </div>
                <ChevronRight size={15} className="text-gray-400 group-hover:text-forest-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
