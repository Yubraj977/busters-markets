'use client'

import { useState } from 'react'
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Product } from '@/lib/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const { items, addItem, updateQty, removeItem } = useCartStore()

  const cartItem = items.find(i => i.product.id === product.id)
  const qty = cartItem?.quantity ?? 0

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (qty === 0) {
    return (
      <button
        onClick={handleAdd}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-forest-700 hover:bg-forest-800
                   text-white font-bold text-base transition-all active:scale-95"
      >
        {added ? (
          <><Check size={18} /> Added to Cart!</>
        ) : (
          <><ShoppingCart size={18} /> Add to Cart</>
        )}
      </button>
    )
  }

  return (
    <div className="flex items-center justify-between bg-forest-50 rounded-2xl border-2 border-forest-200 p-2">
      <button
        onClick={() => qty <= 1 ? removeItem(product.id) : updateQty(product.id, qty - 1)}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm
                   text-forest-700 hover:bg-forest-50 transition-colors border border-gray-100 text-lg"
      >
        <Minus size={16} />
      </button>
      <div className="text-center">
        <div className="font-black text-2xl text-forest-900">{qty}</div>
        <div className="text-xs text-gray-500">in cart</div>
      </div>
      <button
        onClick={() => updateQty(product.id, qty + 1)}
        className="w-12 h-12 flex items-center justify-center bg-forest-700 rounded-xl text-white
                   hover:bg-forest-800 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
