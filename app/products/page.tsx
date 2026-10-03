import { getBackofficeProducts } from '@/lib/backoffice'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getBackofficeProducts>> = []
  try {
    products = await getBackofficeProducts()
  } catch {
    // Backoffice tunnel unreachable — show the page with no products instead of crashing.
  }
  return <ProductsClient products={products} />
}
