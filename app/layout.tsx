import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'

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
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-forest-900 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
