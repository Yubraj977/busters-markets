'use client'

import { useState, useEffect } from 'react'

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
  items: MenuItem[]
}

const POLL_MS = 15_000

// ── colours ────────────────────────────────────────────────────────────────
const BG        = '#181410'
const BG_CARD   = '#1e1a15'
const GOLD      = '#c9a227'
const CREAM     = '#ede8df'
const MUTED     = '#6b6355'
const DIM       = '#3a3428'
const RULE      = '#2e2820'

export default function MenuBoard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading]       = useState(true)
  const [time, setTime]             = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch('/api/deli-menu')
        const data = await res.json()
        const cats: Category[] = data.categories
          .slice()
          .sort((a: Category, b: Category) => a.order - b.order)
          .map((c: Category) => ({
            ...c,
            items: data.items
              .filter((i: MenuItem) => i.categoryId === c.id)
              .sort((a: MenuItem, b: MenuItem) => a.order - b.order),
          }))
          .filter((c: Category) => c.items.length > 0)
        setCategories(cats)
      } catch {
        // keep existing
      } finally {
        setLoading(false)
      }
    }
    load()
    const interval = setInterval(load, POLL_MS)
    return () => clearInterval(interval)
  }, [])

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  // split categories into two columns: even indices left, odd right
  const left  = categories.filter((_, i) => i % 2 === 0)
  const right = categories.filter((_, i) => i % 2 === 1)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: `Georgia, 'Times New Roman', serif`,
        color: CREAM,
      }}
    >

      {/* ── Top clock strip ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '10px 48px',
          borderBottom: `1px solid ${RULE}`,
          gap: '16px',
        }}
      >
        <span style={{ color: MUTED, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit' }}>
          {fmtDate(time)}
        </span>
        <span style={{ color: GOLD, fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.03em' }}>
          {fmtTime(time)}
        </span>
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '48px 48px 40px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: CREAM,
            margin: 0,
            marginBottom: '10px',
          }}
        >
          Buster's Markets Deli
        </h1>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: GOLD,
            fontFamily: `system-ui, sans-serif`,
            margin: 0,
          }}
        >
          Today's Menu
        </p>
      </div>

      {/* ── Menu body ── */}
      <div style={{ flex: 1, padding: '0 48px 40px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: '80px', color: MUTED }}>
            Loading menu…
          </div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '80px', color: MUTED }}>
            Menu coming soon — check back shortly
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: right.length > 0 ? '1fr 1fr' : '1fr',
              gap: '0 80px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {left.map(cat => <CategoryBlock key={cat.id} cat={cat} />)}
            </div>
            {/* Right column */}
            {right.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {right.map(cat => <CategoryBlock key={cat.id} cat={cat} />)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          borderTop: `1px solid ${RULE}`,
          padding: '18px 48px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            fontFamily: `system-ui, sans-serif`,
            margin: 0,
          }}
        >
          Prices updated daily &nbsp;·&nbsp; Ask your server about today's specials &nbsp;·&nbsp; (503) 555-0182
        </p>
      </div>

    </div>
  )
}

// ── Single category section ────────────────────────────────────────────────
function CategoryBlock({ cat }: { cat: Category }) {
  return (
    <section>
      {/* Category name */}
      <h2
        style={{
          fontSize: '1.375rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: GOLD,
          margin: 0,
          marginBottom: '10px',
          letterSpacing: '0.01em',
        }}
      >
        {cat.name}
      </h2>

      {/* Rule */}
      <div style={{ height: '1px', background: RULE, marginBottom: '18px' }} />

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {cat.items.map(item => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

// ── Single menu item ───────────────────────────────────────────────────────
function ItemRow({ item }: { item: MenuItem }) {
  const isFeatured = item.featured && !item.soldOut
  const isSoldOut  = item.soldOut

  return (
    <div
      style={{
        padding: isFeatured ? '12px 14px' : '12px 0',
        marginLeft: isFeatured ? '-14px' : '0',
        marginRight: isFeatured ? '-14px' : '0',
        background: isFeatured ? BG_CARD : 'transparent',
        borderRadius: isFeatured ? '6px' : '0',
        opacity: isSoldOut ? 0.45 : 1,
        marginBottom: '2px',
      }}
    >
      {/* Name row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: item.description ? '4px' : 0,
        }}
      >
        {/* Name + badges */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: isSoldOut ? MUTED : CREAM,
              textDecoration: isSoldOut ? 'line-through' : 'none',
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </span>
          {isFeatured && (
            <span
              style={{
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: GOLD,
                border: `1px solid ${DIM}`,
                padding: '2px 7px',
                borderRadius: '3px',
                fontFamily: `system-ui, sans-serif`,
                flexShrink: 0,
              }}
            >
              Featured
            </span>
          )}
          {isSoldOut && (
            <span
              style={{
                fontSize: '0.75rem',
                color: MUTED,
                fontFamily: `system-ui, sans-serif`,
                fontStyle: 'normal',
                flexShrink: 0,
              }}
            >
              Sold out
            </span>
          )}
        </div>

        {/* Price */}
        <span
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: isSoldOut ? MUTED : GOLD,
            flexShrink: 0,
            letterSpacing: '-0.01em',
          }}
        >
          ${Number(item.price).toFixed(2)}
        </span>
      </div>

      {/* Description */}
      {item.description && (
        <p
          style={{
            fontSize: '0.875rem',
            color: MUTED,
            margin: 0,
            fontFamily: `system-ui, sans-serif`,
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          {item.description}
        </p>
      )}
    </div>
  )
}
