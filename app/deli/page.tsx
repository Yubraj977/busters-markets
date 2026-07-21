'use client'

import { Clock, MapPin, Phone, Tv } from 'lucide-react'
import DailyMenuDisplay from '@/components/deli/DailyMenuDisplay'

const deliHours = [
  { day: 'Mon – Fri', hours: '7:00 AM – 8:00 PM' },
  { day: 'Saturday',  hours: '8:00 AM – 7:00 PM' },
  { day: 'Sunday',    hours: '9:00 AM – 6:00 PM' },
]

const highlights = [
  { emoji: '🥪', title: 'Fresh Sandwiches',   desc: 'Made-to-order with premium meats and house-baked bread' },
  { emoji: '🔥', title: 'Hot Foods Daily',     desc: 'Rotating selection of hot entrées and sides, ready to go' },
  { emoji: '🥗', title: 'Salad Bar',           desc: 'Over 40 fresh ingredients — build your own bowl or salad' },
  { emoji: '🍽️', title: 'Catering Available',  desc: 'Let us handle your next event — call ahead to order trays' },
]

export default function DeliPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(140deg, #1c1408 0%, #2e1e06 45%, #3a2508 100%)' }}
      >
        {/* Warm amber glow — feels like an oven light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(255,175,40,0.12) 0%, transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <p className="type-caption mb-4" style={{ color: '#c9a25a', letterSpacing: '0.1em' }}>Buster's Markets</p>
            <h1
              className="text-white mb-5"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.0,
              }}
            >
              The Deli
            </h1>
            <p className="mb-8 max-w-xl" style={{ color: '#c4a97a', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Fresh sandwiches, hot entrées, and daily specials — made by hand every morning.
              See exactly what's on the counter today.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#daily-menu"
                className="px-6 py-3 font-semibold rounded-full transition-colors text-[0.9375rem] tracking-[-0.01em]"
                style={{ background: '#f5c842', color: '#1c1408' }}
              >
                See Today's Menu ↓
              </a>
              <a
                href="/deli/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors text-[0.9375rem] tracking-[-0.01em]"
                style={{ border: '1px solid rgba(245,200,66,0.3)', color: '#f5c842' }}
              >
                <Tv size={16} />
                Present Mode
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HIGHLIGHTS GRID
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(h => (
            <div
              key={h.title}
              className="bg-[#fafaf7] rounded-2xl p-5 border border-[var(--divider)] hover:border-forest-200 transition-colors"
            >
              <div className="text-3xl mb-3">{h.emoji}</div>
              <h3 className="font-semibold text-[#1d1d1f] text-[0.9375rem] tracking-[-0.01em] mb-1">
                {h.title}
              </h3>
              <p className="text-[0.8125rem] text-[var(--secondary)] leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DAILY MENU
      ══════════════════════════════════════════════ */}
      <section id="daily-menu" className="max-w-4xl mx-auto px-6 pb-16 scroll-mt-24">
        <div className="border-t border-[var(--divider)] pt-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="type-caption text-forest-600 mb-2">Live from the counter</p>
              <h2 className="type-headline text-[#1d1d1f]">Today's Menu</h2>
            </div>
            <a
              href="/deli/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#1a2e1c] text-white text-[0.8125rem] font-semibold rounded-full hover:bg-[#2a4530] transition-colors"
            >
              <Tv size={13} />
              Present Mode
            </a>
          </div>
          <DailyMenuDisplay />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOURS + INFO
      ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f7] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={17} className="text-forest-700" />
                </div>
                <h3 className="font-bold text-[1.25rem] text-[#1d1d1f] tracking-[-0.02em]">Deli Hours</h3>
              </div>
              <div>
                {deliHours.map(({ day, hours }, i) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-3.5 ${i < deliHours.length - 1 ? 'border-b border-[var(--divider)]' : ''}`}
                  >
                    <span className="text-[0.9375rem] font-medium text-[#1d1d1f]">{day}</span>
                    <span className="text-[0.9375rem] text-[var(--secondary)]">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={17} className="text-forest-700" />
                </div>
                <h3 className="font-bold text-[1.25rem] text-[#1d1d1f] tracking-[-0.02em]">Find the Deli</h3>
              </div>
              <p className="text-[0.9375rem] text-[var(--secondary)] mb-5 leading-relaxed">
                Located at the back of the store, past the meat department. Look for the warm case and our chalkboard specials.
              </p>
              <div className="space-y-3 mb-6">
                <a
                  href="tel:5858898570"
                  className="flex items-center gap-3 text-[0.9375rem] text-forest-700 hover:text-forest-900 transition-colors font-medium"
                >
                  <Phone size={16} />
                  (585) 889-8570
                </a>
                <div className="flex items-start gap-3 text-[0.9375rem] text-[var(--secondary)]">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5 text-[var(--tertiary)]" />
                  3892 Scottsville Rd, Scottsville, NY 14546
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <p className="text-[0.875rem] font-semibold text-amber-900 mb-1">Catering orders</p>
                <p className="text-[0.8125rem] text-amber-800 leading-relaxed">
                  Call at least 24 hours in advance. Ask about our party trays, deli platters, and event packages.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
