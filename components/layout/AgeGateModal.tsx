'use client'

import { useAgeGateStore } from '@/store/ageGate'

export default function AgeGateModal() {
  const { isOpen, minAge, productName, resolve } = useAgeGateStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4" onClick={() => resolve(false)}>
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">🔞</div>
        <h2 className="font-display font-bold text-lg text-forest-900 mb-2">Age verification required</h2>
        <p className="text-sm text-gray-600 mb-6">
          {productName ? `"${productName}" is` : 'This item is'} age-restricted. By continuing, you confirm
          you are {minAge}+ years old.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => resolve(false)}
            className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => resolve(true)}
            className="flex-1 py-3 bg-forest-700 text-white rounded-xl font-bold hover:bg-forest-800 transition-colors"
          >
            I&apos;m {minAge}+
          </button>
        </div>
      </div>
    </div>
  )
}
