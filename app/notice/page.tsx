import { AlertTriangle, Clock, Phone, MapPin, Tv } from 'lucide-react'

const affected = [
  { emoji: '🥛', title: 'Dairy & Eggs', desc: 'Cases are running warm — we\'ve pulled anything that isn\'t holding temperature.' },
  { emoji: '🧊', title: 'Frozen', desc: 'Some frozen sections may be limited while the cooling system is repaired.' },
  { emoji: '🥩', title: 'Meat & Seafood', desc: 'Fresh cases are being monitored closely and restocked as needed.' },
]

const tempCoolers = [
  { emoji: '🧊', title: 'Temporary Coolers', desc: 'We\'ve brought in temporary coolers to keep the most common items cold and available.' },
  { emoji: '🥛', title: 'Everyday Essentials', desc: 'Milk, eggs, and other high-demand items are being prioritized in the temp units.' },
  { emoji: '👋', title: 'Ask In-Store', desc: 'Not sure if something\'s available? Ask a team member — we\'re happy to check.' },
]

export default function NoticePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(140deg, #241207 0%, #3a1c08 45%, #47230a 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(255,140,40,0.14) 0%, transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: 'rgba(245,158,66,0.12)', border: '1px solid rgba(245,158,66,0.3)' }}>
              <AlertTriangle size={13} style={{ color: '#f5a742' }} />
              <span className="type-caption" style={{ color: '#f5a742', letterSpacing: '0.1em' }}>Store Update</span>
            </div>
            <h1
              className="text-white mb-5"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.0,
              }}
            >
              We're Currently<br />Fixing Our Cooling System
            </h1>
            <p className="mb-8 max-w-xl" style={{ color: '#d4b295', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Our entire cooling system is down. A specialist technician is on-site working on the repair —
              it's expected to take up to a week to get everything back up and running.
              We're sorry for any inconvenience — thank you for your patience.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:5858898570"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors text-[0.9375rem] tracking-[-0.01em]"
                style={{ background: '#f5a742', color: '#241207' }}
              >
                <Phone size={16} />
                Call the Store
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors text-[0.9375rem] tracking-[-0.01em]"
                style={{ border: '1px solid rgba(245,167,66,0.3)', color: '#f5a742' }}
              >
                Continue Shopping
              </a>
              <a
                href="/notice/board"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors text-[0.9375rem] tracking-[-0.01em]"
                style={{ border: '1px solid rgba(245,167,66,0.3)', color: '#f5a742' }}
              >
                <Tv size={16} />
                Present Mode
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT'S AFFECTED / WHAT'S OPEN
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="type-caption text-amber-600 mb-3">While we fix things</p>
            <h2 className="type-headline text-[#1d1d1f] mb-6">What's Affected</h2>
            <div className="space-y-3">
              {affected.map(a => (
                <div key={a.title} className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="text-2xl flex-shrink-0">{a.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f] text-[0.9375rem] mb-0.5">{a.title}</h3>
                    <p className="text-[0.8125rem] text-[var(--secondary)] leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="type-caption text-forest-600 mb-3">In the meantime</p>
            <h2 className="type-headline text-[#1d1d1f] mb-6">What We're Doing</h2>
            <div className="space-y-3">
              {tempCoolers.map(s => (
                <div key={s.title} className="flex items-start gap-4 p-4 bg-[#fafaf7] border border-[var(--divider)] rounded-2xl">
                  <div className="text-2xl flex-shrink-0">{s.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f] text-[0.9375rem] mb-0.5">{s.title}</h3>
                    <p className="text-[0.8125rem] text-[var(--secondary)] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f7] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock size={17} className="text-forest-700" />
            </div>
            <h3 className="font-bold text-[1.25rem] text-[#1d1d1f] tracking-[-0.02em]">Questions?</h3>
          </div>
          <p className="text-[0.9375rem] text-[var(--secondary)] mb-5 leading-relaxed max-w-xl">
            Give us a call and we'll be happy to let you know what's back in stock. Thanks again for bearing with us.
          </p>
          <div className="space-y-3">
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
        </div>
      </section>
    </>
  )
}
