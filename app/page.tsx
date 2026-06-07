import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, ShieldCheck, Leaf, Clock } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { products, categories, weeklyDeals } from '@/lib/mock-data'

const perks = [
  { icon: Truck,       label: 'Free Delivery',    sub: 'On orders over $35' },
  { icon: ShieldCheck, label: 'Quality Guarantee', sub: 'Or your money back' },
  { icon: Leaf,        label: 'Local & Organic',   sub: 'Sourced from local farms' },
  { icon: Clock,       label: 'Same-Day Pickup',   sub: 'Ready in 2 hours' },
]

export default function HomePage() {
  const featured = products.slice(0, 8)

  return (
    <>
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="relative min-h-[580px] md:min-h-[640px] bg-hero-mesh flex items-center overflow-hidden">
        {/* Floating produce emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { emoji: '🥦', top: '10%',  left: '5%',  size: 'text-5xl', delay: '0s'   },
            { emoji: '🍓', top: '20%',  left: '88%', size: 'text-4xl', delay: '-2s'  },
            { emoji: '🥑', top: '65%',  left: '8%',  size: 'text-4xl', delay: '-4s'  },
            { emoji: '🌽', top: '75%',  left: '90%', size: 'text-5xl', delay: '-1s'  },
            { emoji: '🍋', top: '45%',  left: '82%', size: 'text-3xl', delay: '-3s'  },
            { emoji: '🥕', top: '85%',  left: '42%', size: 'text-4xl', delay: '-5s'  },
            { emoji: '🍅', top: '12%',  left: '62%', size: 'text-3xl', delay: '-1.5s'},
          ].map((item, i) => (
            <span
              key={i}
              className={`absolute ${item.size} animate-float opacity-20`}
              style={{ top: item.top, left: item.left, animationDelay: item.delay }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-24 z-10">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20
                            rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-forest-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-forest-200">Now delivering to Portland & surroundings</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-white leading-[1.05] mb-6">
              <span className="block text-5xl md:text-7xl">Fresh From the</span>
              <span className="block text-5xl md:text-7xl text-forest-400 italic">Farm to You.</span>
            </h1>

            <p className="text-forest-200 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Shop thousands of fresh groceries, local produce, and everyday essentials.
              Same-day delivery and curbside pickup available.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-forest-900 font-bold
                           rounded-full hover:bg-forest-50 transition-colors text-sm md:text-base shadow-lg"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/products?tag=sale"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-forest-950 font-bold
                           rounded-full hover:bg-amber-400 transition-colors text-sm md:text-base"
              >
                🔥 Weekly Deals
              </Link>
            </div>

            {/* Trust pill */}
            <div className="mt-8 flex items-center gap-3 text-forest-300 text-sm">
              <div className="flex -space-x-2">
                {['🧑', '👩', '🧔', '👱'].map((e, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-forest-700 border-2 border-forest-600
                                         flex items-center justify-center text-xs">
                    {e}
                  </div>
                ))}
              </div>
              <span><strong className="text-white">50,000+</strong> happy shoppers this week</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ PERKS ══════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {perks.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-forest-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-forest-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CATEGORIES ══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-3xl text-forest-900">
            Shop by <span className="text-forest-600 italic">Category</span>
          </h2>
          <Link href="/products" className="text-sm font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-forest-50
                         transition-colors text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm border border-gray-100
                              flex items-center justify-center text-2xl md:text-3xl
                              group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                {cat.icon}
              </div>
              <span className="text-[11px] md:text-xs font-semibold text-forest-800 leading-tight group-hover:text-forest-900">
                {cat.name.replace(' & ', ' &\n')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ WEEKLY DEALS ══════════════════════════ */}
      {weeklyDeals.length > 0 && (
        <section className="bg-gradient-to-r from-forest-900 to-forest-800 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-forest-400 text-sm font-semibold uppercase tracking-wider mb-1">
                  Limited Time
                </p>
                <h2 className="font-display font-black text-3xl text-white">
                  🔥 This Week's Deals
                </h2>
              </div>
              <Link
                href="/products?tag=sale"
                className="text-sm font-semibold text-forest-300 hover:text-white flex items-center gap-1 transition-colors"
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
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-forest-600 text-sm font-semibold uppercase tracking-wider mb-1">
              Hand-picked for you
            </p>
            <h2 className="font-display font-bold text-3xl text-forest-900">
              Featured <span className="text-forest-600 italic">Products</span>
            </h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1">
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
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="relative bg-forest-100 rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row
                        items-center justify-between gap-6">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-hero-mesh" />
          </div>
          <div className="relative">
            <h2 className="font-display font-black text-3xl md:text-4xl text-forest-900 mb-3">
              Fresh groceries,<br />delivered <span className="text-forest-600 italic">today</span>.
            </h2>
            <p className="text-forest-700 max-w-md">
              Order by 2 PM for same-day delivery. Free delivery on orders over $35.
              Curbside pickup available in 2 hours.
            </p>
          </div>
          <div className="relative flex gap-3">
            <Link
              href="/products"
              className="px-6 py-3.5 bg-forest-800 text-white font-bold rounded-full hover:bg-forest-900
                         transition-colors text-sm whitespace-nowrap"
            >
              Start Shopping
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3.5 bg-white text-forest-800 font-bold rounded-full hover:bg-forest-50
                         transition-colors text-sm border border-forest-200 whitespace-nowrap"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
