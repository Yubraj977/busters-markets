import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Service-role client -- bypasses RLS entirely. Server-only, admin-route-only.
// Never import this from client code or anything reachable without isAdminRequest().
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured')
  }
  return createSupabaseClient(url, key)
}
