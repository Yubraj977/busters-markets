'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, User, Menu, X, MapPin, Phone, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const navCategories = [
  'Fresh Produce', 'Meat & Seafood', 'Dairy & Eggs',
  'Bakery', 'Frozen', 'Pantry', 'Beverages', 'Snacks', 'Household',
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { count, setOpen } = useCartStore()
  const cartCount = count()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/products?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top utility bar ── */}
      <div className="bg-forest-900 text-forest-300 text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              Store: 3892 Scottsville Rd, Scottsville, NY
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} />
              (585) 889-8570
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon–Sun: 8am – 8pm</span>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
            <span className="opacity-40">|</span>
            <Link href="/auth/signup" className="hover:text-white transition-colors">Create Account</Link>
          </div>
        </div>
      </div>

      {/* ── Deals ticker ── */}
      <div className="bg-gold/90 backdrop-blur-sm text-forest-950 text-xs font-medium py-1.5 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...Array(4)].flatMap(() => [
              '🥦 Organic Spinach 5oz — $3.99',
              '🫐 Blueberries BOGO 50% off',
              '🥚 Free-Range Eggs — $5.49/doz',
              '🍞 Fresh-Baked Sourdough Daily',
              '🐟 Wild-Caught Salmon — $12.99/lb',
              '🥑 Avocados — 3 for $4',
              '🥛 Organic Milk — Buy 2 Save $2',
            ]).map((deal, i) => (
              <span key={i} className="inline-block px-8">✦ {deal}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav className={`bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 mr-2">
            <div className="w-8 h-8 bg-forest-800 rounded-[10px] flex items-center justify-center">
              <span className="text-white font-bold text-base leading-none tracking-[-0.03em]">B</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-[1.0625rem] font-semibold text-forest-900 leading-tight tracking-[-0.03em]">
                Buster's Markets
              </div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories…"
                className="w-full h-[38px] pl-4 pr-11 rounded-full border border-[var(--divider)] bg-[#f5f5f7] text-[0.9375rem]
                           tracking-[-0.01em] placeholder:text-[var(--tertiary)] focus:outline-none focus:border-forest-400
                           focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 w-8 h-8 bg-forest-700 text-white rounded-full flex items-center
                           justify-center hover:bg-forest-800 transition-colors"
              >
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Link
              href="/account"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[0.875rem] font-medium
                         text-[var(--foreground)] hover:bg-[#f5f5f7] transition-colors tracking-[-0.01em]"
            >
              <User size={17} />
              <span className="hidden lg:inline">Account</span>
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white
                         rounded-full transition-colors relative text-[0.875rem] font-medium tracking-[-0.01em]"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-gold text-forest-950 text-[10px]
                                 font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-forest-50 text-forest-700 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Category nav ── */}
        <div className="hidden md:block border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
              <button className="flex items-center gap-1.5 px-3 py-2.5 text-[0.75rem] font-medium text-white bg-forest-700
                                 rounded-b-lg mr-2 whitespace-nowrap hover:bg-forest-800 transition-colors tracking-[-0.01em]">
                <Menu size={12} />
                All Departments
                <ChevronDown size={11} />
              </button>
              {navCategories.map(cat => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="px-3 py-2.5 text-[0.75rem] font-normal text-[var(--secondary)] hover:text-[var(--foreground)]
                             whitespace-nowrap transition-colors rounded-b-lg tracking-[-0.005em]"
                >
                  {cat}
                </Link>
              ))}
              <Link
                href="/deli"
                className="px-3 py-2.5 text-[0.75rem] font-semibold text-forest-700 hover:text-forest-900 whitespace-nowrap transition-colors tracking-[-0.005em]"
              >
                🥪 Deli
              </Link>
              <Link
                href="/products?tag=sale"
                className="ml-auto px-3 py-2.5 text-[0.75rem] font-medium text-ember whitespace-nowrap hover:text-red-700 transition-colors tracking-[-0.005em]"
              >
                🔥 Weekly Deals
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navCategories.map(cat => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-forest-50 hover:text-forest-800 transition-colors"
              >
                {cat}
              </Link>
            ))}
            <hr className="my-2" />
            <Link href="/deli" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-forest-700 hover:bg-forest-50">
              🥪 Deli &amp; Daily Menu
            </Link>
            <hr className="my-2" />
            <Link href="/account" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-forest-800 hover:bg-forest-50">
              My Account
            </Link>
            <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-forest-800 hover:bg-forest-50">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
