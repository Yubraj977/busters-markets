'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, total, count } = useCartStore()
  const cartTotal = total()
  const cartCount = count()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-forest-700" />
            <h2 className="font-display font-bold text-lg text-forest-900">
              Your Cart
            </h2>
            {cartCount > 0 && (
              <span className="bg-forest-100 text-forest-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-forest-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-forest-800 text-lg">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">Add some delicious items to get started!</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 px-6 py-2.5 bg-forest-700 text-white rounded-full text-sm font-semibold
                           hover:bg-forest-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 group">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    unoptimized={product.imageOptimizable === false}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-forest-900 leading-tight line-clamp-2">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 bg-white rounded-full border border-gray-200 px-1">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-forest-700 hover:bg-forest-50 rounded-full transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold text-forest-900 w-5 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-forest-700 hover:bg-forest-50 rounded-full transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-forest-900">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-ember transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal ({cartCount} items)</span>
              <span className="font-semibold text-forest-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Estimated Tax</span>
              <span>${(cartTotal * 0.085).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span className="text-forest-600 font-medium">{cartTotal >= 35 ? 'FREE' : '$4.99'}</span>
            </div>
            <hr />
            <div className="flex items-center justify-between font-bold text-forest-900">
              <span>Estimated Total</span>
              <span className="text-xl">${(cartTotal + cartTotal * 0.085 + (cartTotal >= 35 ? 0 : 4.99)).toFixed(2)}</span>
            </div>
            {cartTotal < 35 && (
              <p className="text-xs text-center text-forest-600 bg-forest-50 rounded-lg py-2 px-3">
                Add ${(35 - cartTotal).toFixed(2)} more for <strong>free delivery</strong> 🎉
              </p>
            )}
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="block w-full py-3.5 bg-forest-700 hover:bg-forest-800 text-white text-center font-bold
                         rounded-xl transition-colors text-sm tracking-wide"
            >
              Proceed to Checkout →
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="block w-full py-2.5 text-forest-700 text-center text-sm font-medium hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
