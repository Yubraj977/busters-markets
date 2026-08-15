import { Product } from './types'

export interface BackofficeInventoryItem {
  sku: string
  barcode: string | null
  plu: string | null
  name: string
  brand: string | null
  department: string | null
  category: string | null
  imageUrl: string | null
  images?: string[]
  price: number
  salePrice: number | null
  saleStartsAt: string | null
  saleEndsAt: string | null
  quantityOnHand: number
  unit: string
  isWeighed: boolean
  taxable: boolean
  ebtEligible: boolean
  ageRestricted: boolean
  depositAmount: number | null
}

export async function getBackofficeInventory(): Promise<BackofficeInventoryItem[]> {
  const baseUrl = process.env.BACKOFFICE_API_URL
  const apiKey = process.env.STOREFRONT_API_KEY

  if (!baseUrl || !apiKey) {
    throw new Error('BACKOFFICE_API_URL / STOREFRONT_API_KEY are not configured')
  }

  const res = await fetch(`${baseUrl}/api/public/inventory`, {
    headers: {
      'X-API-Key': apiKey,
      'ngrok-skip-browser-warning': 'true',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Backoffice inventory request failed: ${res.status}`)
  }

  const data = await res.json()
  return data.items ?? []
}

// Keep in sync with the remotePatterns allowlist in next.config.ts.
// Anything outside this list (bulk-imported produce photos hotlinked from
// random third-party sites) can't go through next/image's optimizer, so we
// render those with `unoptimized` instead of a broken image.
const OPTIMIZABLE_IMAGE_HOSTS = [/(^|\.)supabase\.co$/, /(^|\.)ngrok-free\.dev$/, /(^|\.)ngrok\.io$/]

function isOptimizableImage(url: string): boolean {
  if (url.startsWith('/')) return true
  try {
    const { hostname, protocol } = new URL(url)
    if (protocol !== 'https:') return false
    if (hostname === 'images.unsplash.com') return true
    return OPTIMIZABLE_IMAGE_HOSTS.some(pattern => pattern.test(hostname))
  } catch {
    return false
  }
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'item'
  )
}

export function toProduct(item: BackofficeInventoryItem): Product {
  const now = new Date()
  const onSale =
    item.salePrice != null &&
    (!item.saleStartsAt || new Date(item.saleStartsAt) <= now) &&
    (!item.saleEndsAt || new Date(item.saleEndsAt) >= now)

  const baseUrl = process.env.BACKOFFICE_API_URL ?? ''
  const toAbsolute = (url: string) => (url.startsWith('http') ? url : `${baseUrl}${url}`)

  const images = (item.images ?? []).filter(Boolean).map(toAbsolute)
  const image = item.imageUrl
    ? toAbsolute(item.imageUrl)
    : images[0] ?? '/placeholder-product.svg'

  const tags = [
    item.ebtEligible && 'ebt-eligible',
    item.ageRestricted && 'age-restricted',
    item.isWeighed && 'sold-by-weight',
  ].filter((t): t is string => Boolean(t))

  return {
    id: item.sku,
    name: item.name,
    slug: slugify(item.sku),
    description: '',
    price: onSale ? item.salePrice! : item.price,
    comparePrice: onSale ? item.price : undefined,
    unit: item.unit,
    category: item.department || 'uncategorized',
    image,
    images: images.length > 0 ? images : undefined,
    imageOptimizable: isOptimizableImage(image),
    inStock: item.quantityOnHand > 0,
    rating: 0,
    reviewCount: 0,
    tags,
    isSale: onSale,
    brand: item.brand || undefined,
    sku: item.sku,
    barcode: item.barcode || undefined,
    plu: item.plu || undefined,
    department: item.department || undefined,
    depositAmount: item.depositAmount ?? undefined,
    taxable: item.taxable,
    ebtEligible: item.ebtEligible,
    ageRestricted: item.ageRestricted,
    isWeighed: item.isWeighed,
  }
}

export async function getBackofficeProducts(): Promise<Product[]> {
  const items = await getBackofficeInventory()
  return items.map(toProduct)
}
