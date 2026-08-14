import { getBackofficeProducts } from '@/lib/backoffice'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getBackofficeProducts()
  return <ProductsClient products={products} />
}
