import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: { default: "Buster's Markets — Fresh. Local. Delivered.", template: "%s | Buster's Markets" },
  description: "Shop fresh groceries, local produce, and pantry essentials at Buster's Markets. Same-day delivery and curbside pickup available.",
  keywords: ['grocery', 'fresh produce', 'organic', 'delivery', 'local market'],
  openGraph: {
    title: "Buster's Markets",
    description: 'Fresh. Local. Delivered.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-body bg-white text-forest-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
