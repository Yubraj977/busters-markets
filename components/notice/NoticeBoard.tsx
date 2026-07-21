'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

const BG    = '#1c0f06'
const AMBER = '#f5a742'
const CREAM = '#ede4d9'
const MUTED = '#8a7563'
const SANS  = 'system-ui, -apple-system, sans-serif'

export default function NoticeBoard() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <div
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #2a1608 0%, ${BG} 65%)`,
        height: '100vh',
        color: CREAM,
        fontFamily: SANS,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Clock strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '40px 80px 0', flexShrink: 0 }}>
        <div style={{ flex: 1, height: 1, background: '#3a281a' }} />
        <span style={{ color: MUTED, fontSize: 17, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {fmtTime(time)}
        </span>
        <div style={{ flex: 1, height: 1, background: '#3a281a' }} />
      </div>

      {/* Centered message */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 100px' }}>
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: '50%',
            background: 'rgba(245,167,66,0.1)',
            border: `2px solid rgba(245,167,66,0.35)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 44,
          }}
        >
          <AlertTriangle size={52} color={AMBER} strokeWidth={1.75} />
        </div>

        <p style={{ margin: '0 0 20px', fontSize: 20, letterSpacing: '0.28em', textTransform: 'uppercase', color: AMBER, fontWeight: 600 }}>
          Store Update
        </p>

        <h1 style={{ margin: '0 0 28px', fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: CREAM }}>
          We're Currently Fixing<br />Our Cooling System
        </h1>

        <p style={{ margin: 0, maxWidth: 780, fontSize: 26, lineHeight: 1.55, color: MUTED }}>
          Our entire cooling system is down. A specialist technician is on-site working
          on the repair — it's expected to take up to a week.
        </p>
        <p style={{ margin: '20px 0 0', fontSize: 26, lineHeight: 1.55, color: CREAM, fontWeight: 600 }}>
          Sorry for any inconvenience — thank you for your patience!
        </p>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #3a281a', padding: '22px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: 14, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          The Deli, Pantry, and Checkout are open as usual
        </p>
        <p style={{ margin: 0, fontSize: 14, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Buster's Markets · (585) 889-8570
        </p>
      </div>
    </div>
  )
}
