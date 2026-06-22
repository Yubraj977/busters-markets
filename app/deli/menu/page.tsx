import type { Metadata } from 'next'
import MenuBoard from '@/components/deli/MenuBoard'

export const metadata: Metadata = {
  title: "Deli Menu Board | Buster's Markets",
  description: "Today's full deli menu — live display board.",
}

export default function DeliMenuPage() {
  return <MenuBoard />
}
