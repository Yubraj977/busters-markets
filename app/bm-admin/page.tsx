import { getMyStaffRole } from '@/lib/staff-roles'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function BmAdminPage() {
  const me = await getMyStaffRole()

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center" style={{ background: '#0f1a10' }}>
        <div className="max-w-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
               style={{ background: '#1e4023' }}>
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight mb-2">No staff access</h1>
          <p className="text-sm" style={{ color: '#4a7a4a' }}>
            Your account isn&apos;t set up for the staff dashboard yet. Ask an admin to invite you from the Team tab.
          </p>
        </div>
      </div>
    )
  }

  return <AdminDashboardClient me={me} />
}
