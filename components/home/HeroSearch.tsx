'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function HeroSearch() {
  const [q, setQ] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) router.push(`/products?q=${encodeURIComponent(q)}`)
    else router.push('/products')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg">
      <div className="flex-1 flex items-center gap-2.5 bg-white border border-[#d2d2d7]
                      rounded-full px-5 py-3 shadow-sm hover:border-[#aeaeb2]
                      focus-within:border-[#1d1d1f] focus-within:shadow-md transition-all">
        <Search size={16} className="text-[#aeaeb2] flex-shrink-0" />
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search groceries, brands, produce…"
          className="flex-1 bg-transparent outline-none text-[0.9375rem] text-[#1d1d1f]
                     tracking-[-0.01em] placeholder:text-[#aeaeb2]"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-[#1d1d1f] text-white font-semibold rounded-full
                   hover:bg-[#333] transition-colors text-[0.9375rem] tracking-[-0.01em] whitespace-nowrap"
      >
        Search
      </button>
    </form>
  )
}
