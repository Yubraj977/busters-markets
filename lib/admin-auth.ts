import { getMyStaffRole } from '@/lib/staff-roles'

// Orders/refunds require the real "admin" role (not just any logged-in staff
// member) -- same bar as the Orders tab itself being hidden from plain staff.
export async function isAdminRequest(): Promise<boolean> {
  const me = await getMyStaffRole()
  return me?.role === 'admin'
}
