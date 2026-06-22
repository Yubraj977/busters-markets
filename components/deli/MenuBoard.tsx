'use client'

import { useState, useEffect, useRef } from 'react'

interface MenuItem {
  id: string; categoryId: string; order: number
  name: string; description?: string; price: number
  soldOut: boolean; featured: boolean; image?: string
}
interface Category { id: string; name: string; order: number }
interface Menu { categories: Category[]; items: MenuItem[] }

const BG   = '#181410'
const GOLD = '#c9a227'
const CREAM = '#ede8df'
const MUTED = '#6b6355'
const CARD  = '#1e1a15'
const FONT  = "Georgia, 'Times New Roman', serif"
const SANS  = 'system-ui, -apple-system, sans-serif'

const CATS_PER_SLIDE = 2
const SLIDE_MS       = 9_000
const FADE_MS        = 500
const POLL_MS        = 4_000

export default function MenuBoard() {
  const [menu,     setMenu]     = useState<Menu>({ categories: [], items: [] })
  const [page,     setPage]     = useState(0)
  const [visible,  setVisible]  = useState(true)
  const [time,     setTime]     = useState(new Date())
  const [progress, setProgress] = useState(0)

  const pageRef     = useRef(0)
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/deli-menu', { cache: 'no-store' })
        if (res.ok) {
          const d: Menu = await res.json()
          setMenu({
            categories: [...d.categories].sort((a, b) => a.order - b.order),
            items:      [...d.items].sort((a, b) => a.order - b.order),
          })
        }
      } catch {}
    }
    load()
    const id = setInterval(load, POLL_MS)
    return () => clearInterval(id)
  }, [])

  const cats  = menu.categories
  const total = Math.max(Math.ceil(cats.length / CATS_PER_SLIDE), 1)

  const startProgress = () => {
    setProgress(0)
    if (progressRef.current) clearInterval(progressRef.current)
    const start = Date.now()
    progressRef.current = setInterval(() => {
      setProgress(Math.min(100, ((Date.now() - start) / SLIDE_MS) * 100))
    }, 50)
  }

  const goTo = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setVisible(false)
    setTimeout(() => {
      const n = ((next % total) + total) % total
      pageRef.current = n
      setPage(n)
      setVisible(true)
      startProgress()
      timerRef.current = setInterval(() => goTo(pageRef.current + 1), SLIDE_MS)
    }, FADE_MS)
  }

  useEffect(() => {
    if (total === 0) return
    startProgress()
    timerRef.current = setInterval(() => goTo(pageRef.current + 1), SLIDE_MS)
    return () => {
      if (timerRef.current)    clearInterval(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  const safePage   = ((page % total) + total) % total
  const slideStart = safePage * CATS_PER_SLIDE
  const slideCats  = cats.slice(slideStart, slideStart + CATS_PER_SLIDE)

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <div style={{
      background: BG, height: '100vh', color: CREAM, fontFamily: FONT,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>

      {/* Gold progress bar */}
      <div style={{ height: 4, background: '#221e16', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: GOLD, transition: 'width 0.1s linear' }} />
      </div>

      {/* Clock strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '16px 72px 0', flexShrink: 0 }}>
        <div style={{ flex: 1, height: 1, background: '#2a2318' }} />
        <span style={{ color: MUTED, fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: SANS }}>
          {fmtTime(time)}
        </span>
        <div style={{ flex: 1, height: 1, background: '#2a2318' }} />
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '16px 72px 20px', flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 64, fontWeight: 400, letterSpacing: '0.01em', color: CREAM, lineHeight: 1.1 }}>
          Buster's Deli
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: 14, letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTED, fontFamily: SANS }}>
          Today's Menu
        </p>
      </div>

      {/* Two-column content — takes remaining height */}
      <div style={{ flex: 1, padding: '0 72px 0', minHeight: 0 }}>
        {cats.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#2e2820', fontSize: 22 }}>
            Menu loading…
          </div>
        ) : (
          <div style={{
            opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease`,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 64px', height: '100%',
          }}>
            {slideCats.map(cat => (
              <CategoryBlock
                key={cat.id}
                cat={cat}
                items={menu.items.filter(i => i.categoryId === cat.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #2a2318', padding: '14px 72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: 12, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: SANS }}>
          Prices updated daily · Ask your server about today's specials
        </p>
        {total > 1 && (
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: safePage === i ? 26 : 8, height: 8, borderRadius: 4, padding: 0, border: 'none',
                background: safePage === i ? GOLD : '#2a2318', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

function CategoryBlock({ cat, items }: { cat: Category; items: MenuItem[] }) {
  const fillImage = items.find(i => i.image && i.featured && !i.soldOut)?.image
                 ?? items.find(i => i.image && !i.soldOut)?.image

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, height: '100%', paddingBottom: 20 }}>

      {/* Category heading */}
      <h2 style={{ margin: '0 0 10px', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: GOLD, flexShrink: 0 }}>
        {cat.name}
      </h2>
      <div style={{ height: 1, background: '#2e2820', marginBottom: 18, flexShrink: 0 }} />

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flexShrink: 0 }}>
        {items.map(item => <ItemRow key={item.id} item={item} />)}
      </div>

      {/* Food image — fixed size, pushed to bottom, rounded */}
      {fillImage && (
        <div style={{ marginTop: 'auto', paddingTop: 20, flexShrink: 0 }}>
          <div style={{
            height: 165,
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fillImage} alt=""
              onError={e => {
                const wrap = e.currentTarget.closest('.img-wrap') as HTMLElement | null
                if (wrap) wrap.style.display = 'none'
              }}
              className="img-wrap"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <div style={{
      background: item.featured ? CARD : 'transparent',
      borderRadius: item.featured ? 10 : 0,
      padding: item.featured ? '12px 16px' : '2px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <span style={{
          fontSize: 24, fontWeight: 700, lineHeight: 1.2,
          color: item.soldOut ? MUTED : CREAM,
          textDecoration: item.soldOut ? 'line-through' : 'none',
        }}>
          {item.name}
          {item.featured && !item.soldOut && (
            <span style={{
              marginLeft: 10, fontSize: 11, fontFamily: SANS, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: MUTED, background: '#2a2318', padding: '2px 8px',
              borderRadius: 4, verticalAlign: 'middle', textDecoration: 'none',
            }}>
              Featured
            </span>
          )}
        </span>
        <span style={{ flexShrink: 0, fontSize: 24, fontWeight: 700, color: item.soldOut ? MUTED : GOLD }}>
          {item.soldOut ? 'Sold out' : `$${Number(item.price).toFixed(2)}`}
        </span>
      </div>
      {item.description && (
        <p style={{ margin: '4px 0 0', fontSize: 15, color: MUTED, lineHeight: 1.5, fontFamily: SANS }}>
          {item.description}
        </p>
      )}
    </div>
  )
}
