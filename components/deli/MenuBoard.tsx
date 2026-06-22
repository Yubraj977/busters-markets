'use client'

import { useState, useEffect, useRef } from 'react'

interface MenuItem {
  id: string; categoryId: string; order: number
  name: string; description?: string; price: number
  soldOut: boolean; featured: boolean
}
interface Category {
  id: string; name: string; order: number; items: MenuItem[]
}

const POLL_MS       = 15_000   // re-fetch menu every 15s
const SLIDE_MS      = 9_000    // how long each slide shows
const FADE_MS       = 500      // cross-fade duration
const CATS_PER_SLIDE = 2       // categories per slide

// colours
const BG     = '#181410'
const BG2    = '#1e1a15'
const GOLD   = '#c9a227'
const CREAM  = '#ede8df'
const MUTED  = '#6b6355'
const RULE   = '#2e2820'
const DIM    = '#3a3428'

export default function MenuBoard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading,    setLoading]    = useState(true)
  const [time,       setTime]       = useState(new Date())
  const [page,       setPage]       = useState(0)
  const [visible,    setVisible]    = useState(true)   // drives opacity fade
  const [progress,   setProgress]   = useState(0)      // 0–100 for the bar
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── clock ──
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // ── menu polling ──
  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch('/api/deli-menu')
        const data = await res.json()
        const cats: Category[] = data.categories
          .slice().sort((a: Category, b: Category) => a.order - b.order)
          .map((c: Category) => ({
            ...c,
            items: data.items
              .filter((i: MenuItem) => i.categoryId === c.id)
              .sort((a: MenuItem, b: MenuItem) => a.order - b.order),
          }))
          .filter((c: Category) => c.items.length > 0)
        setCategories(cats)
      } catch { /* keep existing */ }
      finally  { setLoading(false) }
    }
    load()
    const interval = setInterval(load, POLL_MS)
    return () => clearInterval(interval)
  }, [])

  // ── slideshow ──
  const totalPages = Math.ceil(categories.length / CATS_PER_SLIDE)

  const startProgress = () => {
    setProgress(0)
    if (progressRef.current) clearInterval(progressRef.current)
    const tick = 50 // ms
    let elapsed = 0
    progressRef.current = setInterval(() => {
      elapsed += tick
      setProgress(Math.min((elapsed / SLIDE_MS) * 100, 100))
    }, tick)
  }

  const goToPage = (next: number) => {
    // fade out
    setVisible(false)
    setTimeout(() => {
      setPage(next)
      setVisible(true)
      startProgress()
    }, FADE_MS)
  }

  useEffect(() => {
    if (totalPages <= 1) return
    startProgress()
    timerRef.current = setInterval(() => {
      setPage(p => {
        const next = (p + 1) % totalPages
        setVisible(false)
        setTimeout(() => { setPage(next); setVisible(true); startProgress() }, FADE_MS)
        return p // hold until fade completes
      })
    }, SLIDE_MS)
    return () => {
      if (timerRef.current)   clearInterval(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  const slides = Array.from({ length: totalPages }, (_, i) =>
    categories.slice(i * CATS_PER_SLIDE, i * CATS_PER_SLIDE + CATS_PER_SLIDE)
  )
  const currentSlide = slides[page] ?? []

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column',
                  fontFamily: `Georgia, 'Times New Roman', serif`, color: CREAM, overflow: 'hidden' }}>

      {/* ── Progress bar ── */}
      {totalPages > 1 && (
        <div style={{ height: '3px', background: DIM, flexShrink: 0 }}>
          <div style={{ height: '100%', background: GOLD, width: `${progress}%`,
                        transition: progress === 0 ? 'none' : 'width 0.05s linear' }} />
        </div>
      )}

      {/* ── Top clock ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 48px', borderBottom: `1px solid ${RULE}`, flexShrink: 0 }}>
        <span style={{ color: MUTED, fontSize: '0.75rem', letterSpacing: '0.08em',
                       textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          {fmtDate(time)}
        </span>
        <span style={{ color: GOLD, fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.03em' }}>
          {fmtTime(time)}
        </span>
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '36px 48px 28px', flexShrink: 0 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.01em',
                     lineHeight: 1.1, color: CREAM, margin: 0, marginBottom: '8px' }}>
          Buster's Markets Deli
        </h1>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: GOLD, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
          Today's Menu
        </p>
      </div>

      {/* ── Slide content ── */}
      <div style={{ flex: 1, padding: '0 48px', overflow: 'hidden',
                    opacity: visible ? 1 : 0,
                    transition: `opacity ${FADE_MS}ms ease` }}>
        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: '60px', color: MUTED }}>Loading menu…</div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '60px', color: MUTED }}>
            Menu coming soon — check back shortly
          </div>
        ) : (
          <div style={{ display: 'grid',
                        gridTemplateColumns: currentSlide.length > 1 ? '1fr 1fr' : '1fr',
                        gap: '0 72px', maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
            {currentSlide.map(cat => <CategoryBlock key={cat.id} cat={cat} />)}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: `1px solid ${RULE}`, padding: '14px 48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <p style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: MUTED, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
          Prices updated daily &nbsp;·&nbsp; Ask your server about today's specials &nbsp;·&nbsp; (503) 555-0182
        </p>

        {/* Page dots */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                style={{
                  width: i === page ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === page ? GOLD : DIM,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Category section ───────────────────────────────────────────────────────
function CategoryBlock({ cat }: { cat: Category }) {
  return (
    <section style={{ paddingBottom: '24px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 400, fontStyle: 'italic',
                   color: GOLD, margin: 0, marginBottom: '10px', letterSpacing: '0.01em' }}>
        {cat.name}
      </h2>
      <div style={{ height: '1px', background: RULE, marginBottom: '16px' }} />
      <div>
        {cat.items.map(item => <ItemRow key={item.id} item={item} />)}
      </div>
    </section>
  )
}

// ── Item row ───────────────────────────────────────────────────────────────
function ItemRow({ item }: { item: MenuItem }) {
  const isFeatured = item.featured && !item.soldOut
  const isSoldOut  = item.soldOut
  return (
    <div style={{ padding: isFeatured ? '10px 12px' : '10px 0',
                  marginLeft: isFeatured ? '-12px' : 0, marginRight: isFeatured ? '-12px' : 0,
                  background: isFeatured ? BG2 : 'transparent',
                  borderRadius: isFeatured ? '6px' : 0,
                  opacity: isSoldOut ? 0.4 : 1, marginBottom: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: item.description ? '3px' : 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.2,
                         color: isSoldOut ? MUTED : CREAM,
                         textDecoration: isSoldOut ? 'line-through' : 'none' }}>
            {item.name}
          </span>
          {isFeatured && (
            <span style={{ fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.1em',
                           textTransform: 'uppercase', color: GOLD, border: `1px solid ${DIM}`,
                           padding: '2px 6px', borderRadius: '3px',
                           fontFamily: 'system-ui, sans-serif', flexShrink: 0 }}>
              Featured
            </span>
          )}
          {isSoldOut && (
            <span style={{ fontSize: '0.75rem', color: MUTED,
                           fontFamily: 'system-ui, sans-serif', flexShrink: 0 }}>
              Sold out
            </span>
          )}
        </div>
        <span style={{ fontSize: '1.125rem', fontWeight: 700, color: isSoldOut ? MUTED : GOLD,
                       flexShrink: 0, letterSpacing: '-0.01em' }}>
          ${Number(item.price).toFixed(2)}
        </span>
      </div>
      {item.description && (
        <p style={{ fontSize: '0.8125rem', color: MUTED, margin: 0,
                    fontFamily: 'system-ui, sans-serif', lineHeight: 1.4 }}>
          {item.description}
        </p>
      )}
    </div>
  )
}
