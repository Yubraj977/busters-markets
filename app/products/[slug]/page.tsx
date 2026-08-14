import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Leaf, ShieldCheck, Truck } from 'lucide-react'
import { getBackofficeProducts } from '@/lib/backoffice'
import AddToCartButton from '@/components/products/AddToCartButton'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const products = await getBackofficeProducts()
  const product = products.find(p => p.slug === slug)

  if (!product) notFound()

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/products" className="flex items-center gap-1.5 text-sm text-forest-700 hover:text-forest-900 mb-8 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mb-14">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-forest-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
            priority
          />
          {product.isSale && product.comparePrice && (
            <div className="absolute top-4 left-4 bg-ember text-white text-sm font-black px-3 py-1.5 rounded-full">
              -{Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
            </div>
          )}
          {product.isOrganic && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-forest-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Leaf size={12} /> Organic
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.brand && (
            <p className="text-sm text-forest-600 font-semibold uppercase tracking-wide mb-2">{product.brand}</p>
          )}
          <h1 className="font-display font-black text-3xl md:text-4xl text-forest-900 leading-tight mb-3">
            {product.name}
          </h1>

          {product.reviewCount > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-forest-900">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">/ {product.unit}</span>
            {product.comparePrice && (
              <span className="text-lg text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="bg-forest-50 text-forest-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}

          <AddToCartButton product={product} />

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
            {[
              { icon: Truck,       text: 'Free delivery over $35' },
              { icon: ShieldCheck, text: 'Quality guaranteed'      },
              { icon: Leaf,        text: 'Locally sourced'         },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center gap-1.5">
                <Icon size={18} className="text-forest-600" />
                <span className="text-xs text-gray-500">{text}</span>
              </div>
            ))}
          </div>

          {/* Product info */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h2 className="text-sm font-bold text-forest-900 mb-3">Product Details</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-500">SKU</dt>
              <dd className="text-forest-900 font-mono text-xs">{product.sku}</dd>

              {product.barcode && (
                <>
                  <dt className="text-gray-500">Barcode</dt>
                  <dd className="text-forest-900 font-mono text-xs">{product.barcode}</dd>
                </>
              )}

              {product.plu && (
                <>
                  <dt className="text-gray-500">PLU</dt>
                  <dd className="text-forest-900 font-mono text-xs">{product.plu}</dd>
                </>
              )}

              {product.department && (
                <>
                  <dt className="text-gray-500">Department</dt>
                  <dd className="text-forest-900">{product.department}</dd>
                </>
              )}

              <dt className="text-gray-500">Unit</dt>
              <dd className="text-forest-900">{product.unit}</dd>

              {typeof product.depositAmount === 'number' && product.depositAmount > 0 && (
                <>
                  <dt className="text-gray-500">Deposit</dt>
                  <dd className="text-forest-900">${product.depositAmount.toFixed(2)}</dd>
                </>
              )}
            </dl>

            {(product.taxable || product.ebtEligible || product.ageRestricted || product.isWeighed) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.taxable && (
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">Taxable</span>
                )}
                {product.ebtEligible && (
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">EBT Eligible</span>
                )}
                {product.ageRestricted && (
                  <span className="bg-red-50 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">21+ Age Restricted</span>
                )}
                {product.isWeighed && (
                  <span className="bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">Sold by Weight</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl text-forest-900 mb-5">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(p => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-forest-200 hover:shadow-md transition-all"
              >
                <div className="relative h-32 bg-forest-50">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-forest-900 line-clamp-2 leading-tight">{p.name}</p>
                  <p className="text-sm font-bold text-forest-700 mt-1">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
