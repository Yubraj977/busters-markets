'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { ChevronRight, Check, MapPin, CreditCard, Package, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { createClient } from '@/lib/supabase/client'
import type { CartItem } from '@/lib/types'

const steps = [
  { id: 1, label: 'Delivery',  icon: MapPin      },
  { id: 2, label: 'Payment',   icon: CreditCard  },
  { id: 3, label: 'Review',    icon: Package     },
]

interface CloverElement {
  mount: (selector: string) => void
}
interface CloverElements {
  create: (type: string, options?: Record<string, unknown>) => CloverElement
}
interface CloverTokenResult {
  token?: string
  errors?: Record<string, string>
  card?: { brand?: string; last4?: string }
}
interface CloverInstance {
  elements: () => CloverElements
  createToken: () => Promise<CloverTokenResult>
}
declare global {
  interface Window {
    Clover?: new (appId: string) => CloverInstance
  }
}

const CLOVER_ENV = process.env.NEXT_PUBLIC_CLOVER_ENV === 'production' ? 'production' : 'sandbox'
const CLOVER_SDK_URL = CLOVER_ENV === 'production'
  ? 'https://checkout.clover.com/sdk.js'
  : 'https://checkout.sandbox.dev.clover.com/sdk.js'

// Dev-only: skip real Clover.js tokenization so checkout can be built/tested before
// Clover credentials exist. Must be paired with the server-side MOCK_CHECKOUT_CHARGE flag.
const MOCK_CHECKOUT = process.env.NEXT_PUBLIC_MOCK_CHECKOUT_CHARGE === 'true'

interface OrderSnapshot {
  items: CartItem[]
  subtotal: number
  tax: number
  delivery: number
  total: number
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(false)
  const { items, total, count, clearCart } = useCartStore()

  // The cart store persists to localStorage, so the server-rendered HTML always
  // starts empty — don't trust cart-derived values until after client hydration,
  // or React flags a hydration mismatch once the real cart loads.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const cartTotal = mounted ? total() : 0
  const cartCount = mounted ? count() : 0
  const tax = cartTotal * 0.085
  const delivery = cartTotal >= 35 ? 0 : 4.99
  const orderTotal = cartTotal + tax + delivery

  const [delivery_form, setDeliveryForm] = useState({
    name: '', street: '', apt: '', city: '', state: 'OR', zip: '', phone: '',
  })
  const [payment, setPayment] = useState({ cardName: '' })
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setCustomerEmail(data.user?.email ?? ''))
  }, [])

  // ── Clover.js tokenization ──
  const [cloverReady, setCloverReady] = useState(false)
  const cloverRef = useRef<CloverInstance | null>(null)
  const fieldsMountedRef = useRef(false)
  const [tokenizing, setTokenizing] = useState(false)
  const [tokenizeError, setTokenizeError] = useState('')
  const [cardToken, setCardToken] = useState<string | null>(null)
  const [cardSummary, setCardSummary] = useState<{ brand?: string; last4?: string } | null>(null)

  useEffect(() => {
    if (MOCK_CHECKOUT || step !== 2 || !cloverReady || fieldsMountedRef.current) return
    const appId = process.env.NEXT_PUBLIC_CLOVER_APP_ID
    if (!window.Clover || !appId) return

    const clover = new window.Clover(appId)
    cloverRef.current = clover
    const elements = clover.elements()
    elements.create('CARD_NUMBER').mount('#card-number')
    elements.create('CARD_DATE').mount('#card-date')
    elements.create('CARD_CVV').mount('#card-cvv')
    fieldsMountedRef.current = true
  }, [step, cloverReady])

  const handleContinueToReview = async () => {
    if (MOCK_CHECKOUT) {
      setCardToken(`mock-token-${Date.now()}`)
      setCardSummary({ brand: 'Test', last4: '4242' })
      setStep(3)
      return
    }
    if (!cloverRef.current) {
      setTokenizeError('Payment form is still loading — try again in a moment.')
      return
    }
    setTokenizing(true)
    setTokenizeError('')
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 15000)
      )
      const result = await Promise.race([cloverRef.current.createToken(), timeout])
      if (result.errors && Object.keys(result.errors).length > 0) {
        setTokenizeError(Object.values(result.errors)[0])
        return
      }
      if (!result.token) {
        setTokenizeError('Could not process card details — please check and try again.')
        return
      }
      setCardToken(result.token)
      setCardSummary(result.card ?? null)
      setStep(3)
    } catch (err) {
      setTokenizeError(
        err instanceof Error && err.message === 'timeout'
          ? 'Card validation timed out — please check your card details and try again.'
          : 'Something went wrong validating your card.'
      )
    } finally {
      setTokenizing(false)
    }
  }

  // ── Order submission ──
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null)
  const [completedOrder, setCompletedOrder] = useState<OrderSnapshot | null>(null)

  const handlePlaceOrder = async () => {
    if (!cardToken) {
      setSubmitError('Payment info is missing — go back to Payment.')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ sku: i.product.id, quantity: i.quantity })),
          cardToken,
          customer: { name: delivery_form.name, email: customerEmail, phone: delivery_form.phone },
          deliveryAddress: {
            name: delivery_form.name,
            street: delivery_form.street,
            apt: delivery_form.apt || undefined,
            city: delivery_form.city,
            state: delivery_form.state,
            zip: delivery_form.zip,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setSubmitError(data.message ?? 'Something went wrong placing your order.')
        return
      }
      setCompletedOrder({ items, subtotal: cartTotal, tax, delivery, total: orderTotal })
      setConfirmedOrderId(data.orderId)
      clearCart()
      setPlaced(true)
    } catch {
      setSubmitError('Network error — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-forest-600" />
        </div>
        <h1 className="font-display font-bold text-3xl text-forest-900 mb-3">Order Placed! 🎉</h1>
        <p className="text-gray-600 mb-2">
          Your order <strong>#{confirmedOrderId?.slice(0, 8).toUpperCase()}</strong> has been confirmed.
        </p>
        <p className="text-gray-500 text-sm mb-8">Estimated delivery: <strong>Today, 5 – 7 PM</strong></p>

        {completedOrder && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 text-left mb-8">
            <div className="space-y-2 mb-4">
              {completedOrder.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{product.name} × {quantity}</span>
                  <span className="text-forest-900 font-medium">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="mb-3" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${completedOrder.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>${completedOrder.tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{completedOrder.delivery === 0 ? 'FREE' : `$${completedOrder.delivery.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-forest-900 pt-1"><span>Total</span><span>${completedOrder.total.toFixed(2)}</span></div>
            </div>
          </div>
        )}

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
      {!MOCK_CHECKOUT && (
        <Script src={CLOVER_SDK_URL} strategy="afterInteractive" onReady={() => setCloverReady(true)} />
      )}

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
                    placeholder="Scottsville"
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
                    {['NY'].map(s => <option key={s} value={s}>{s}</option>)}
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
                {MOCK_CHECKOUT ? (
                  <div className="sm:col-span-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                    Test mode — card entry is skipped. Checkout will use a mock payment token.
                  </div>
                ) : (
                  <>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Card Number</label>
                      <div id="card-number" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-forest-400 transition-colors" style={{ height: 42 }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Expiry</label>
                      <div id="card-date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-forest-400 transition-colors" style={{ height: 42 }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">CVV</label>
                      <div id="card-cvv" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-forest-400 transition-colors" style={{ height: 42 }} />
                    </div>
                  </>
                )}
              </div>
              {tokenizeError && (
                <p className="text-xs text-ember mt-3">{tokenizeError}</p>
              )}
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
                🔒 Your card details are entered directly into Clover's secure fields — they never pass through our servers.
              </p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={handleContinueToReview}
                  disabled={tokenizing}
                  className="flex-1 py-3 bg-forest-700 text-white font-bold rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-60"
                >
                  {tokenizing ? 'Validating…' : 'Review Order →'}
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
                      <Image src={product.image} alt={product.name} width={48} height={48} unoptimized={product.imageOptimizable === false} className="object-contain w-full h-full p-1" />
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
                  <p className="text-forest-900 font-mono">
                    {cardSummary?.brand ?? 'Card'} •••• {cardSummary?.last4 ?? '····'}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">{payment.cardName || 'Card holder'}</p>
                </div>
              </div>

              {submitError && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-5">
                  {submitError}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="flex-1 py-3 bg-forest-700 text-white font-bold rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Placing order…' : `Place Order · $${orderTotal.toFixed(2)}`}
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
