import type { Order, OrderItem, OrderStatus } from '@/lib/types'

export const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  payment_failed: 'Payment Failed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export const statusColor: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  paid: 'bg-blue-100 text-blue-700',
  payment_failed: 'bg-red-100 text-red-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

interface OrderRow {
  id: string
  user_id: string
  clover_charge_id: string | null
  status: OrderStatus
  payment_status: Order['paymentStatus']
  subtotal_cents: number
  tax_cents: number
  delivery_fee_cents: number
  total_cents: number
  currency: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  delivery_street: string
  delivery_apt: string | null
  delivery_city: string
  delivery_state: string
  delivery_zip: string
  estimated_delivery: string | null
  created_at: string
  updated_at: string
  order_items: OrderItemRow[]
}

interface OrderItemRow {
  product_sku: string
  name: string
  unit: string | null
  unit_price_cents: number
  quantity: number
  line_total_cents: number
}

export function mapOrderRow(row: OrderRow): Order {
  const items: OrderItem[] = (row.order_items ?? []).map(i => ({
    productSku: i.product_sku,
    name: i.name,
    unit: i.unit ?? undefined,
    unitPriceCents: i.unit_price_cents,
    quantity: i.quantity,
    lineTotalCents: i.line_total_cents,
  }))

  return {
    id: row.id,
    userId: row.user_id,
    cloverChargeId: row.clover_charge_id,
    status: row.status,
    paymentStatus: row.payment_status,
    subtotalCents: row.subtotal_cents,
    taxCents: row.tax_cents,
    deliveryFeeCents: row.delivery_fee_cents,
    totalCents: row.total_cents,
    currency: row.currency,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone ?? undefined,
    deliveryAddress: {
      name: row.customer_name,
      street: row.delivery_street,
      apt: row.delivery_apt ?? undefined,
      city: row.delivery_city,
      state: row.delivery_state,
      zip: row.delivery_zip,
    },
    estimatedDelivery: row.estimated_delivery ?? undefined,
    items,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function itemCount(order: Order): number {
  return order.items.reduce((sum, i) => sum + i.quantity, 0)
}
