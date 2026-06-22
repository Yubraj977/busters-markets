'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface MenuItem {
  id: string
  categoryId: string
  order: number
  name: string
  description?: string
  price: number
  soldOut: boolean
  featured: boolean
}

interface Category {
  id: string
  name: string
  order: number
}

interface Menu {
  categories: Category[]
  items: MenuItem[]
}

const POLL_MS = 30_000

export default function DailyMenuDisplay() {
  const [menu, setMenu] = useState<Menu>({ categories: [], items: [] })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/deli-menu')
        const data: Menu = await res.json()
        setMenu({
          categories: [...data.categories].sort((a, b) => a.order - b.order),
          items: [...data.items].sort((a, b) => a.order - b.order),
        })
        setLastUpdated(new Date())
      } catch {
        // keep existing data
      } finally {
        setLoading(false)
      }
    }
    load()
    const interval = setInterval(load, POLL_MS)
    return () => clearInterval(interval)
  }, [])

  const catsWithItems = menu.categories
    .map(c => ({ ...c, items: menu.items.filter(i => i.categoryId === c.id) }))
    .filter(c => c.items.length > 0)

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center gap-2 text-[var(--secondary)] text-[0.875rem]">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
          Loading today's menu…
        </div>
      </div>
    )
  }

  if (catsWithItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-4xl mb-4">🍽️</div>
        <p className="text-[var(--secondary)] text-[0.9375rem]">
          Menu not available right now — check back soon!
        </p>
      </div>
    )
  }

  return (
    <div>
      {lastUpdated && (
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
          <span className="text-[0.75rem] text-[var(--tertiary)]">
            Live menu · refreshes automatically ·{' '}
            {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      )}

      <div className="space-y-14">
        {catsWithItems.map(cat => (
          <section key={cat.id}>
            {/* Category header */}
            <div className="flex items-center gap-4 mb-5">
              <h3 className="text-[1.375rem] font-bold text-[#1d1d1f] tracking-[-0.025em] whitespace-nowrap">
                {cat.name}
              </h3>
              <div className="flex-1 h-px bg-[var(--divider)]" />
            </div>

            {/* Items */}
            <div className="divide-y divide-[#f0f0f0]">
              {cat.items.map(item => (
                <div
                  key={item.id}
                  className={`flex items-start justify-between gap-6 py-4 group ${item.soldOut ? 'opacity-50' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-[1rem] font-semibold tracking-[-0.01em] leading-tight ${
                          item.soldOut ? 'line-through text-[var(--secondary)]' : 'text-[#1d1d1f]'
                        }`}
                      >
                        {item.name}
                      </span>
                      {item.featured && !item.soldOut && (
                        <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.07em] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                          <Star size={7} fill="currentColor" />
                          Today's pick
                        </span>
                      )}
                      {item.soldOut && (
                        <span className="text-[0.6rem] font-bold uppercase tracking-[0.07em] px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[0.875rem] text-[var(--secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="text-[1.0625rem] font-bold text-[#1d1d1f] tracking-[-0.02em] flex-shrink-0 pt-0.5">
                    ${Number(item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
