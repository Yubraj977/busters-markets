'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Check, MapPin, CreditCard, Package, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const steps = [
  { id: 1, label: 'Delivery',  icon: MapPin      },
  { id: 2, label: 'Payment',   icon: CreditCard  },
  { id: 3, label: 'Review',    icon: Package     },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(false)
  const { items, total, count, clearCart } = useCartStore()

  const cartTotal = total()
  const cartCount = count()
  const tax = cartTotal * 0.085
  const delivery = cartTotal >= 35 ? 0 : 4.99
  const orderTotal = cartTotal + tax + delivery

  const [delivery_form, setDeliveryForm] = useState({
    name: '', street: '', apt: '', city: '', state: 'OR', zip: '', phone: '',
  })
  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '', saveCard: false,
  })

  const handlePlaceOrder = () => {
    clearCart()
    setPlaced(true)
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-forest-600" />
        </div>
        <h1 className="font-display font-bold text-3xl text-forest-900 mb-3">Order Placed! 🎉</h1>
        <p className="text-gray-600 mb-2">Your order <strong>#BM{Date.now().toString().slice(-6)}</strong> has been confirmed.</p>
        <p className="text-gray-500 text-sm mb-8">Estimated delivery: <strong>Today, 5 – 7 PM</strong></p>
        <div className="flex justify-center gap-3">
          <Link
            href="/account/orders"
            className="px-5 py-2.5 bg-forest-700 text-white rounded-full text-sm font-bold hover:bg-forest-800 transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/products"
            className="px-5 py-2.5 border border-gray-200 text-forest-800 rounded-full text-sm font-bold hover:bg-forest-50 transition-colors"
          >
            Keep Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = step === s.id
          const isDone = step > s.id
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isDone ? 'bg-forest-100 text-forest-700' :
                isActive ? 'bg-forest-700 text-white shadow-md' :
                'text-gray-400'
              }`}>
                {isDone ? <Check size={14} /> : <Icon size={14} />}
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={16} className={`${step > s.id ? 'text-forest-400' : 'text-gray-200'}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Delivery */}
          {step === 1 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl text-forest-900 mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-forest-600" />
                Delivery Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    value={delivery_form.name}
                    onChange={e => setDeliveryForm({ ...delivery_form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Street Address</label>
                  <input
                    type="text"
                    value={delivery_form.street}
                    onChange={e => setDeliveryForm({ ...delivery_form, street: e.target.value })}
                    placeholder="123 Main St"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Apt / Suite (optional)</label>
                  <input
                    type="text"
                    value={delivery_form.apt}
                    onChange={e => setDeliveryForm({ ...delivery_form, apt: e.target.value })}
                    placeholder="Apt 4B"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">City</label>
                  <input
                    type="text"
                    value={delivery_form.city}
                    onChange={e => setDeliveryForm({ ...delivery_form, city: e.target.value })}
                    placeholder="Portland"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">State</label>
                  <select
                    value={delivery_form.state}
                    onChange={e => setDeliveryForm({ ...delivery_form, state: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 bg-white transition-colors"
                  >
                    {['OR','WA','CA','ID','NV'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">ZIP Code</label>
                  <input
                    type="text"
                    value={delivery_form.zip}
                    onChange={e => setDeliveryForm({ ...delivery_form, zip: e.target.value })}
                    placeholder="97201"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    value={delivery_form.phone}
                    onChange={e => setDeliveryForm({ ...delivery_form, phone: e.target.value })}
                    placeholder="(503) 555-0100"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full py-3.5 bg-forest-700 text-white font-bold rounded-xl hover:bg-forest-800 transition-colors"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl text-forest-900 mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-forest-600" />
                Payment Method
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Name on Card</label>
                  <input
                    type="text"
                    value={payment.cardName}
                    onChange={e => setPayment({ ...payment, cardName: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Card Number</label>
                  <input
                    type="text"
                    value={payment.cardNumber}
                    onChange={e => setPayment({ ...payment, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Expiry</label>
                  <input
                    type="text"
                    value={payment.expiry}
                    onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                    placeholder="MM / YY"
                    maxLength={7}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">CVV</label>
                  <input
                    type="text"
                    value={payment.cvv}
                    onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                    placeholder="•••"
                    maxLength={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors font-mono"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
                🔒 Your payment info is encrypted and never stored.
              </p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-forest-700 text-white font-bold rounded-xl hover:bg-forest-800 transition-colors">
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl text-forest-900 mb-5 flex items-center gap-2">
                <Package size={18} className="text-forest-600" />
                Review Your Order
              </h2>

              <div className="space-y-3 mb-5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-forest-50 flex-shrink-0">
                      <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-forest-900 leading-tight">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.unit} × {quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-forest-900">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr className="mb-5" />

              <div className="grid sm:grid-cols-2 gap-4 text-sm mb-5">
                <div className="bg-forest-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-forest-700 uppercase tracking-wide mb-1">Delivering to</p>
                  <p className="text-forest-900">{delivery_form.name || 'Not entered'}</p>
                  <p className="text-gray-600 text-xs">{delivery_form.street}{delivery_form.apt ? `, ${delivery_form.apt}` : ''}</p>
                  <p className="text-gray-600 text-xs">{delivery_form.city}, {delivery_form.state} {delivery_form.zip}</p>
                </div>
                <div className="bg-forest-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-forest-700 uppercase tracking-wide mb-1">Payment</p>
                  <p className="text-forest-900 font-mono">•••• •••• •••• {payment.cardNumber.slice(-4) || '****'}</p>
                  <p className="text-gray-600 text-xs mt-1">{payment.cardName || 'Card holder'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 bg-forest-700 text-white font-bold rounded-xl hover:bg-forest-800 transition-colors"
                >
                  Place Order · ${orderTotal.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-display font-bold text-forest-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-forest-600 font-semibold' : ''}>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between font-bold text-forest-900">
              <span>Total</span>
              <span className="text-xl">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
