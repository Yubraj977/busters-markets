'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  setOpen: (v: boolean) => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, qty = 1) =>
        set(state => {
          const existing = state.items.find(i => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity: qty }] }
        }),

      removeItem: (id) =>
        set(state => ({ items: state.items.filter(i => i.product.id !== id) })),

      updateQty: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return }
        set(state => ({
          items: state.items.map(i => (i.product.id === id ? { ...i, quantity: qty } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),
      setOpen:   (v) => set({ isOpen: v }),
      total:     () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      count:     () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'busters-cart' }
  )
)
