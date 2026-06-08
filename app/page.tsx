import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, ShieldCheck, Leaf, Clock, Star } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import HeroSearch from '@/components/home/HeroSearch'
import { products, categories, weeklyDeals } from '@/lib/mock-data'

const perks = [
  { icon: Truck,       label: 'Free Delivery',    sub: 'On orders over $35'       },
  { icon: ShieldCheck, label: 'Quality Guarantee', sub: 'Or your money back'       },
  { icon: Leaf,        label: 'Local & Organic',   sub: 'Sourced from local farms' },
  { icon: Clock,       label: 'Same-Day Pickup',   sub: 'Ready in 2 hours'         },
]

const quickCategories = [
  { label: 'Produce',    slug: 'produce',   emoji: '🥦' },
  { label: 'Meat',       slug: 'meat',      emoji: '🥩' },
  { label: 'Dairy',      slug: 'dairy',     emoji: '🥛' },
  { label: 'Bakery',     slug: 'bakery',    emoji: '🍞' },
  { label: 'Frozen',     slug: 'frozen',    emoji: '❄️'  },
  { label: 'Beverages',  slug: 'beverages', emoji: '🧃' },
]

const stats = [
  { value: '50k+', label: 'Happy customers' },
  { value: '2 hrs', label: 'Same-day delivery' },
  { value: '500+',  label: 'Local products' },
]

export default function HomePage() {
  const featured = products.slice(0, 8)

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO — Warm white / cream, zero green
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_460px] gap-6 xl:gap-10 items-center
                          min-h-[640px] md:min-h-[700px] py-16 md:py-20">

            {/* ── Left: text + search + quick links ── */}
            <div className="relative z-10">

              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 bg-[#f0efe9] border border-[#e5e4de]
                              rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3a39a] flex-shrink-0" />
                <span className="text-[0.6875rem] font-medium text-[#6e6e73] uppercase tracking-[0.06em]">
                  Free delivery on your first order
                </span>
              </div>

              {/* Headline — dark, clean, no green */}
              <h1 className="text-[#1d1d1f] mb-6"
                  style={{
                    fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.045em',
                    lineHeight: 1.0,
                  }}>
                Your Neighborhood<br />
                Grocery Store,<br />
                <span style={{ color: '#3a3a3c' }}>Delivered.</span>
              </h1>

              <p className="mb-8 max-w-[460px]"
                 style={{
                   color: '#6e6e73',
                   fontSize: '1.125rem',
                   lineHeight: 1.6,
                   letterSpacing: '-0.01em',
                 }}>
                Fresh produce, quality meats, and everyday essentials
                from local farms. Same-day delivery or curbside pickup.
              </p>

              {/* Search bar */}
              <div className="mb-6">
                <HeroSearch />
              </div>

              {/* Quick category chips — neutral gray */}
              <div className="flex flex-wrap gap-2 mb-10">
                {quickCategories.map(({ label, slug, emoji }) => (
                  <Link
                    key={slug}
                    href={`/products?category=${slug}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5
                               bg-white hover:bg-[#f5f5f7] border border-[#d2d2d7]
                               text-[#3a3a3c] text-[0.8125rem] font-medium
                               rounded-full transition-all tracking-[-0.005em] shadow-sm"
                  >
                    <span>{emoji}</span>
                    {label}
                  </Link>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 pt-2 border-t border-[#e5e4de]">
                {stats.map(({ value, label }, i) => (
                  <div key={label} className={i > 0 ? 'pl-8 border-l border-[#e5e4de]' : ''}>
                    <div className="font-bold tracking-[-0.03em] text-[#1d1d1f]"
                         style={{ fontSize: '1.5rem' }}>
                      {value}
                    </div>
                    <div className="text-[0.75rem] mt-0.5" style={{ color: '#6e6e73' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: image collage + floating cards ── */}
            <div className="relative hidden lg:block h-[580px]">

              {/* Main center image */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                              w-[280px] h-[380px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=800&fit=crop"
                  fill sizes="280px" className="object-cover" alt="Fresh produce" priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Top-right: sourdough */}
              <div className="absolute top-6 right-2 w-[158px] h-[158px] rounded-2xl overflow-hidden
                              shadow-lg ring-1 ring-black/5 rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=320&h=320&fit=crop"
                  fill sizes="158px" className="object-cover" alt="Sourdough"
                />
              </div>

              {/* Bottom-left: salmon */}
              <div className="absolute bottom-10 left-2 w-[148px] h-[148px] rounded-2xl overflow-hidden
                              shadow-lg ring-1 ring-black/5 -rotate-3">
                <Image
                  src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=300&fit=crop"
                  fill sizes="148px" className="object-cover" alt="Salmon"
                />
              </div>

              {/* Bottom-right: blueberries */}
              <div className="absolute bottom-4 right-0 w-[130px] h-[130px] rounded-2xl overflow-hidden
                              shadow-lg ring-1 ring-black/5 rotate-1">
                <Image
                  src="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=260&h=260&fit=crop"
                  fill sizes="130px" className="object-cover" alt="Blueberries"
                />
              </div>

              {/* Floating product card — top-left */}
              <div className="absolute top-14 -left-4 bg-white rounded-2xl p-3 shadow-xl
                              ring-1 ring-black/5 w-[172px]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#f5f5f7] flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=88&h=88&fit=crop"
                      width={44} height={44} className="object-cover w-full h-full" alt=""
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold text-[#1d1d1f] leading-tight truncate">
                      Organic Blueberries
                    </p>
                    <p className="text-[0.75rem] font-bold text-[#1d1d1f] mt-0.5">$4.99</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[1,2,3,4,5].map(s => <Star key={s} size={9} fill="currentColor" />)}
                  </div>
                  <button className="text-[0.625rem] font-semibold bg-[#1d1d1f] text-white
                                     px-2.5 py-1 rounded-full hover:bg-[#333] transition-colors">
                    + Add
                  </button>
                </div>
              </div>

              {/* Floating delivery badge — middle-right */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 bg-white rounded-2xl px-4 py-3
                              shadow-xl ring-1 ring-black/5 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#f5f5f7] rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck size={16} className="text-[#3a3a3c]" />
                </div>
                <div>
                  <p className="text-[0.6875rem] font-semibold text-[#1d1d1f] leading-tight">Express Delivery</p>
                  <p className="text-[0.625rem] text-[#6e6e73] mt-0.5">Est. 45 min</p>
                </div>
              </div>

              {/* Floating fresh badge — bottom center */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white border border-[#d2d2d7]
                              rounded-full px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3a39a] animate-pulse" />
                <p className="text-[0.6875rem] font-medium text-[#3a3a3c]">
                  Restocked today · 200+ new items
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════ PERKS BAR ══════════════════════════ */}
      <section className="bg-white border-b border-[var(--divider)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--divider)]">
            {perks.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <div className="w-9 h-9 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-forest-700" />
                </div>
                <div>
                  <p className="text-[0.875rem] font-semibold text-[#1d1d1f] tracking-[-0.01em]">{label}</p>
                  <p className="text-[0.75rem] text-[var(--secondary)] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CATEGORIES ══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="type-caption text-forest-600 mb-1">Browse</p>
            <h2 className="type-headline text-[#1d1d1f]">Shop by Category</h2>
          </div>
          <Link
            href="/products"
            className="text-[0.875rem] font-medium text-forest-700 hover:text-forest-900
                       flex items-center gap-1 transition-colors tracking-[-0.01em]"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl
                         hover:bg-forest-50 transition-colors text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm border border-[var(--divider)]
                              flex items-center justify-center text-2xl md:text-3xl
                              group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                {cat.icon}
              </div>
              <span className="text-[0.6875rem] md:text-[0.75rem] font-medium text-[var(--secondary)]
                               leading-tight group-hover:text-[#1d1d1f] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ WEEKLY DEALS ══════════════════════════ */}
      {weeklyDeals.length > 0 && (
        <section className="bg-[#f5f5f7] py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="type-caption mb-1" style={{ color: '#6e6e73' }}>Limited Time</p>
                <h2 className="type-headline text-[#1d1d1f]">This Week's Deals</h2>
              </div>
              <Link
                href="/products?tag=sale"
                className="text-[0.875rem] font-medium text-forest-700 hover:text-forest-900
                           flex items-center gap-1 transition-colors"
              >
                All deals <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {weeklyDeals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════ FEATURED PRODUCTS ══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="type-caption text-forest-600 mb-1">Hand-picked for you</p>
            <h2 className="type-headline text-[#1d1d1f]">Featured Products</h2>
          </div>
          <Link
            href="/products"
            className="text-[0.875rem] font-medium text-forest-700 hover:text-forest-900
                       flex items-center gap-1 transition-colors"
          >
            Browse all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════ BOTTOM BANNER ══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-[#1d1d1f] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row
                        items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"
               style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%, #52B788 0%, transparent 60%)' }} />
          <div className="relative">
            <h2 className="type-headline text-white mb-3">
              Fresh groceries,<br />delivered today.
            </h2>
            <p className="text-[0.9375rem] max-w-md leading-relaxed tracking-[-0.01em]"
               style={{ color: '#aeaeb2' }}>
              Order by 2 PM for same-day delivery. Free on orders over $35.
              Curbside pickup ready in 2 hours.
            </p>
          </div>
          <div className="relative flex gap-3 flex-shrink-0">
            <Link
              href="/products"
              className="px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full
                         transition-colors text-[0.9375rem] tracking-[-0.01em] whitespace-nowrap"
            >
              Start Shopping
            </Link>
            <Link
              href="/auth/signup"
              className="px-7 py-3.5 bg-transparent text-white font-semibold rounded-full
                         hover:bg-white/10 transition-colors text-[0.9375rem] tracking-[-0.01em]
                         border border-white/20 whitespace-nowrap"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
