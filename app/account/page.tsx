import Link from 'next/link'
import { Package, MapPin, Heart, Settings, ChevronRight, ShoppingBag, Store } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { mapOrderRow, statusColor, statusLabel, itemCount } from '@/lib/orders'
import { getMyStaffRole } from '@/lib/staff-roles'
import SignOutButton from '@/components/account/SignOutButton'

const quickLinks = [
  { icon: Package,   label: 'Order History',   sub: 'View and track all orders',   href: '/account/orders' },
  { icon: MapPin,    label: 'Saved Addresses',  sub: 'Manage delivery locations',   href: '/account' },
  { icon: Heart,     label: 'Saved Lists',      sub: 'Your favorite items',         href: '/account' },
  { icon: Settings,  label: 'Account Settings', sub: 'Profile, password, and more', href: '/account' },
]

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const staffRole = await getMyStaffRole()

  const links = staffRole
    ? [{ icon: Store, label: 'Store Dashboard', sub: `Tasks, orders & more (${staffRole.role})`, href: '/bm-admin' }, ...quickLinks]
    : quickLinks

  const [recentOrdersResult, orderCountResult, itemsResult] = user
    ? await Promise.all([
        supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3),
        supabase
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        supabase
          .from('order_items')
          .select('quantity, orders!inner(user_id)')
          .eq('orders.user_id', user.id),
      ])
    : [{ data: [] }, { count: 0 }, { data: [] }] as const

  const recentOrders = (recentOrdersResult.data ?? []).map(mapOrderRow)
  const totalOrders = orderCountResult.count ?? 0
  const itemsBought = (itemsResult.data ?? []).reduce((sum: number, row: { quantity: number }) => sum + row.quantity, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">👤</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-forest-900">Welcome back!</h1>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
        <SignOutButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: String(totalOrders), icon: ShoppingBag },
          { label: 'Items Bought', value: String(itemsBought), icon: Package },
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

          {recentOrders.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center text-sm text-gray-500">
              No orders yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-forest-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-mono text-sm font-bold text-forest-900">{order.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-xs text-gray-400 ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[order.status]}`}>
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{itemCount(order)} items</span>
                    <span className="font-bold text-forest-900">${(order.totalCents / 100).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div>
          <h2 className="font-display font-bold text-xl text-forest-900 mb-4">My Account</h2>
          <div className="space-y-2">
            {links.map(({ icon: Icon, label, sub, href }) => (
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
