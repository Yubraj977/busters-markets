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
  isWeighed?: boolean
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

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  subtotal: number
  tax: number
  deliveryFee: number
  address: Address
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

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
