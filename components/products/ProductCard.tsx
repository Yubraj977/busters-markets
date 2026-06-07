'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, ShoppingCart, Star, Leaf } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Product } from '@/lib/types'
import { clsx } from 'clsx'

interface Props {
  product: Product
  compact?: boolean
}

export default function ProductCard({ product, compact = false }: Props) {
  const [qty, setQty] = useState(0)
  const { addItem, items, updateQty, removeItem } = useCartStore()

  const cartItem = items.find(i => i.product.id === product.id)
  const cartQty = cartItem?.quantity ?? 0

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setQty(1)
  }

  const handleQtyChange = (e: React.MouseEvent, delta: number) => {
    e.preventDefault()
    const next = cartQty + delta
    if (next <= 0) { removeItem(product.id); setQty(0) }
    else updateQty(product.id, next)
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className={clsx(
        'group relative bg-white rounded-2xl border border-gray-100 overflow-hidden',
        'hover:shadow-lg hover:border-forest-200 hover:-translate-y-0.5',
        'transition-all duration-200 flex flex-col',
        compact ? 'p-3' : 'p-4'
      )}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {product.isSale && discount > 0 && (
          <span className="bg-ember text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-forest-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
        {product.isOrganic && (
          <span className="bg-white/90 backdrop-blur text-forest-700 text-[10px] font-bold px-2 py-0.5
                           rounded-full flex items-center gap-0.5">
            <Leaf size={9} />
            Organic
          </span>
        )}
      </div>

      {/* Image */}
      <div className={clsx(
        'relative rounded-xl overflow-hidden bg-forest-50 mb-3',
        compact ? 'h-32' : 'h-44'
      )}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1">
        {product.brand && (
          <p className="text-[11px] text-forest-600 font-medium uppercase tracking-wide">
            {product.brand}
          </p>
        )}

        <h3 className={clsx('font-semibold text-forest-900 leading-tight line-clamp-2',
          compact ? 'text-sm' : 'text-sm md:text-base'
        )}>
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 mt-0.5">{product.unit}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-amber-400">
            {[1,2,3,4,5].map(s => (
              <Star
                key={s}
                size={11}
                fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                className={s <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-end justify-between mt-auto pt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className={clsx('font-bold text-forest-900', compact ? 'text-base' : 'text-lg')}>
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div onClick={e => e.preventDefault()}>
            {cartQty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-700 hover:bg-forest-800 text-white
                           text-xs font-bold rounded-full transition-colors"
              >
                <ShoppingCart size={12} />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-forest-50 border border-forest-200 rounded-full px-1 py-0.5">
                <button
                  onClick={e => handleQtyChange(e, -1)}
                  className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm
                             hover:bg-forest-50 text-forest-700 transition-colors border border-gray-100"
                >
                  <Minus size={10} />
                </button>
                <span className="text-sm font-bold text-forest-900 w-5 text-center">{cartQty}</span>
                <button
                  onClick={e => handleQtyChange(e, 1)}
                  className="w-6 h-6 flex items-center justify-center bg-forest-700 rounded-full text-white
                             hover:bg-forest-800 transition-colors"
                >
                  <Plus size={10} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
