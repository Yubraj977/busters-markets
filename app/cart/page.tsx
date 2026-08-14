'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCartStore()
  const cartTotal = total()
  const cartCount = count()
  const tax = cartTotal * 0.085
  const delivery = cartTotal >= 35 ? 0 : 4.99
  const orderTotal = cartTotal + tax + delivery

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-forest-400" />
        </div>
        <h1 className="font-display font-bold text-2xl text-forest-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet. Let's fix that!</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-forest-700 text-white rounded-full font-bold
                     hover:bg-forest-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-bold text-3xl text-forest-900 mb-8">
        Shopping Cart <span className="text-forest-500 font-normal text-xl">({cartCount} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => {
            const discount = product.comparePrice
              ? Math.round((1 - product.price / product.comparePrice) * 100)
              : 0
            return (
              <div key={product.id} className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-forest-200 transition-colors">
                <Link href={`/products/${product.slug}`}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-forest-50 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {product.brand && (
                        <p className="text-xs text-forest-600 font-medium mb-0.5">{product.brand}</p>
                      )}
                      <Link href={`/products/${product.slug}`} className="hover:text-forest-700">
                        <h3 className="font-semibold text-forest-900 text-sm leading-tight">{product.name}</h3>
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{product.unit}</p>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-1.5 text-gray-400 hover:text-ember hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 bg-forest-50 rounded-full px-1 py-0.5 border border-forest-100">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm
                                   hover:bg-forest-50 text-forest-700 transition-colors border border-gray-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold text-forest-900 w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-forest-700 rounded-full text-white
                                   hover:bg-forest-800 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-forest-900">
                        ${(product.price * quantity).toFixed(2)}
                      </div>
                      {quantity > 1 && (
                        <div className="text-xs text-gray-400">${product.price.toFixed(2)} each</div>
                      )}
                      {product.isSale && discount > 0 && (
                        <div className="text-xs text-ember font-semibold mt-0.5">{discount}% off</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-forest-700 font-medium hover:text-forest-900 mt-4 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
            <h2 className="font-display font-bold text-lg text-forest-900">Order Summary</h2>

            {/* Promo code */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <Tag size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 text-sm outline-none placeholder:text-gray-400"
                />
              </div>
              <button className="px-3 py-2 bg-forest-100 text-forest-800 text-sm font-semibold rounded-lg hover:bg-forest-200 transition-colors">
                Apply
              </button>
            </div>

            <hr />

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-medium text-forest-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                <span className={delivery === 0 ? 'text-forest-600 font-semibold' : ''}>
                  {delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
                </span>
              </div>
            </div>

            {cartTotal < 35 && (
              <div className="bg-forest-50 rounded-xl p-3 text-xs text-forest-700">
                Add <strong>${(35 - cartTotal).toFixed(2)}</strong> more to unlock free delivery 🎉
              </div>
            )}

            <hr />

            <div className="flex justify-between font-bold text-forest-900">
              <span>Estimated Total</span>
              <span className="text-xl">${orderTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3.5 bg-forest-700 hover:bg-forest-800 text-white text-center font-bold
                         rounded-xl transition-colors text-sm"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
