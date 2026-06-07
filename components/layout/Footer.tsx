import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'

const links = {
  Shop: [
    { label: 'Fresh Produce', href: '/products?category=produce' },
    { label: 'Meat & Seafood', href: '/products?category=meat' },
    { label: 'Dairy & Eggs', href: '/products?category=dairy' },
    { label: 'Bakery', href: '/products?category=bakery' },
    { label: 'Weekly Deals', href: '/products?tag=sale' },
  ],
  Account: [
    { label: 'Sign In', href: '/auth/login' },
    { label: 'Create Account', href: '/auth/signup' },
    { label: 'Order History', href: '/account/orders' },
    { label: 'Saved Lists', href: '/account' },
  ],
  Help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Delivery Info', href: '/delivery' },
    { label: 'Store Locations', href: '/locations' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-300">
      {/* Newsletter */}
      <div className="border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-white text-xl mb-1">
              Get weekly deals in your inbox
            </h3>
            <p className="text-sm text-forest-400">
              Join 50,000+ shoppers who save with Buster's weekly specials.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-72 px-4 py-2.5 rounded-full bg-forest-800 border border-forest-700 text-white
                         placeholder:text-forest-500 text-sm focus:outline-none focus:border-forest-500 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gold text-forest-950 font-bold rounded-full text-sm hover:bg-amber-400
                         transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-forest-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-black text-lg">B</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-xl leading-tight">BUSTER'S</div>
                <div className="text-[9px] font-medium text-forest-400 tracking-widest uppercase">Markets</div>
              </div>
            </div>
            <p className="text-sm text-forest-400 leading-relaxed mb-5">
              Bringing you the freshest groceries since 1987. Locally sourced, community focused.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:5035550182" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} />
                (503) 555-0182
              </a>
              <a href="mailto:hello@bustersmarkets.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} />
                hello@bustersmarkets.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                1234 Market St, Portland OR 97201
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-forest-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-forest-500">
            © {new Date().getFullYear()} Buster's Markets Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-forest-500 hover:text-forest-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-forest-500 hover:text-forest-300 transition-colors">Terms</Link>
            <div className="flex items-center gap-3 ml-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-forest-500 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
