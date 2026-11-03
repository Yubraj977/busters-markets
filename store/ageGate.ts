'use client'

import { create } from 'zustand'

interface AgeGateStore {
  isOpen: boolean
  minAge: number
  productName: string
  resolver: ((confirmed: boolean) => void) | null
  request: (minAge: number, productName: string) => Promise<boolean>
  resolve: (confirmed: boolean) => void
}

function sessionKey(minAge: number) {
  return `ageVerified:${minAge}`
}

export const useAgeGateStore = create<AgeGateStore>((set, get) => ({
  isOpen: false,
  minAge: 21,
  productName: '',
  resolver: null,

  request: (minAge, productName) => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey(minAge)) === '1') {
      return Promise.resolve(true)
    }
    return new Promise<boolean>(resolve => {
      set({ isOpen: true, minAge, productName, resolver: resolve })
    })
  },

  resolve: confirmed => {
    const { minAge, resolver } = get()
    if (confirmed && typeof window !== 'undefined') {
      sessionStorage.setItem(sessionKey(minAge), '1')
    }
    resolver?.(confirmed)
    set({ isOpen: false, resolver: null })
  },
}))
