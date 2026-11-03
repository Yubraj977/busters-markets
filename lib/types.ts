export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  unit: string
  category: string
  subcategory?: string
  image: string
  images?: string[]
  imageOptimizable?: boolean
  inStock: boolean
  rating: number
  reviewCount: number
  tags: string[]
  isOrganic?: boolean
  isSale?: boolean
  isNew?: boolean
  brand?: string
  sku?: string
  weight?: string
  origin?: string
  barcode?: string
  plu?: string
  department?: string
  depositAmount?: number
  taxable?: boolean
  ebtEligible?: boolean
  ageRestricted?: boolean
  minAge?: number
  isWeighed?: boolean
  isFresh?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  productCount?: number
}

export interface OrderItem {
  productSku: string
  name: string
  unit?: string
  unitPriceCents: number
  quantity: number
  lineTotalCents: number
}

export type OrderStatus =
  | 'pending' | 'paid' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Order {
  id: string
  userId: string
  cloverChargeId: string | null
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotalCents: number
  taxCents: number
  deliveryFeeCents: number
  totalCents: number
  currency: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  deliveryAddress: Address
  estimatedDelivery?: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface CheckoutRequest {
  items: { sku: string; quantity: number }[]
  cardToken: string
  customer: { name: string; email: string; phone?: string }
  deliveryAddress: Address
}

export type CheckoutErrorCode =
  | 'UNAUTHENTICATED' | 'INVALID_REQUEST' | 'NOT_CONFIGURED' | 'OUT_OF_DELIVERY_AREA'
  | 'CARD_DECLINED' | 'CLOVER_UNREACHABLE' | 'ORDER_SAVE_FAILED' | 'SERVER_ERROR'

export type CheckoutResponse =
  | { ok: true; orderId: string; cloverChargeId: string }
  | { ok: false; error: CheckoutErrorCode; message: string }

export interface Address {
  id?: string
  name: string
  street: string
  apt?: string
  city: string
  state: string
  zip: string
  phone?: string
  isDefault?: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  addresses: Address[]
  createdAt: string
}
