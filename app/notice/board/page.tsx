import type { Metadata } from 'next'
import NoticeBoard from '@/components/notice/NoticeBoard'

export const metadata: Metadata = {
  title: "Store Update | Buster's Markets",
  description: 'Coolers are currently down — live TV display.',
}

export default function NoticeBoardPage() {
  return <NoticeBoard />
}
