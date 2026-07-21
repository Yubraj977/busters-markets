'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'

const BOARD_ROUTES = ['/deli/menu', '/notice/board']

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isBoard = BOARD_ROUTES.some(r => path === r)
  const isAdmin = path.startsWith('/bm-admin')

  if (isBoard || isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  )
}
