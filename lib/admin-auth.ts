import { cookies } from 'next/headers'

export async function isAdminRequest(): Promise<boolean> {
  const correct = process.env.ADMIN_PASSWORD
  if (!correct) return false
  const cookieStore = await cookies()
  return cookieStore.get('bm_admin')?.value === correct
}
