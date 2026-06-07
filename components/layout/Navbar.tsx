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
              Store: 1234 Market St, Portland OR
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} />
              (503) 555-0182
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon–Sun: 6am – 11pm</span>
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
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 mr-2">
            <div className="w-9 h-9 bg-forest-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-black text-lg leading-none">B</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-forest-900 text-xl leading-tight tracking-tight">
                BUSTER'S
              </div>
              <div className="text-[9px] font-medium text-forest-600 tracking-widest uppercase -mt-0.5">
                Markets
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
                placeholder="Search for products, brands, or categories…"
                className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-forest-200 bg-forest-50 text-sm
                           placeholder:text-gray-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
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
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-forest-800
                         hover:bg-forest-50 transition-colors"
            >
              <User size={18} />
              <span className="hidden lg:inline font-medium">Account</span>
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-forest-700 hover:bg-forest-800 text-white
                         rounded-lg transition-colors relative"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline text-sm font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold text-forest-950 text-[10px]
                                 font-black rounded-full flex items-center justify-center">
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
              <button className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-forest-700
                                 rounded-b-lg mr-2 whitespace-nowrap hover:bg-forest-800 transition-colors">
                <Menu size={13} />
                All Departments
                <ChevronDown size={11} />
              </button>
              {navCategories.map(cat => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="px-3 py-2.5 text-xs font-medium text-gray-600 hover:text-forest-800 hover:bg-forest-50
                             whitespace-nowrap transition-colors rounded-b-lg"
                >
                  {cat}
                </Link>
              ))}
              <Link
                href="/products?tag=sale"
                className="ml-auto px-3 py-2.5 text-xs font-bold text-ember whitespace-nowrap hover:text-red-700 transition-colors"
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
