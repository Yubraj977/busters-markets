'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const perks = [
  'Free delivery on first order',
  'Exclusive member deals',
  'Order history & easy reorder',
  'Saved lists & preferences',
]

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    })
    setLoading(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }
    // If email confirmation is required, Supabase returns a user with no active session.
    setNeedsEmailConfirm(!data.session)
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-forest-700" />
          </div>
          <h2 className="font-display font-bold text-2xl text-forest-900 mb-2">
            {needsEmailConfirm ? 'Check your inbox' : "You're in!"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {needsEmailConfirm
              ? "We've sent a confirmation link to your email. Click it to activate your account."
              : 'Your account is ready — start shopping!'}
          </p>
          <Link
            href={needsEmailConfirm ? '/products' : '/account'}
            className="inline-block px-6 py-3 bg-forest-700 text-white rounded-full font-bold text-sm hover:bg-forest-800 transition-colors"
          >
            {needsEmailConfirm ? 'Start Shopping' : 'Go to Account'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left — perks */}
        <div className="hidden md:block">
          <div className="w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center mb-6">
            <span className="text-white font-display font-black text-xl">B</span>
          </div>
          <h2 className="font-display font-black text-4xl text-forest-900 leading-tight mb-4">
            Join Buster's.<br />
            <span className="text-forest-600 italic">Shop better.</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Create a free account and unlock the freshest deals in town.
          </p>
          <div className="space-y-3">
            {perks.map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-forest-700" />
                </div>
                <span className="text-sm text-gray-700">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
          <h1 className="font-display font-bold text-2xl text-forest-900 mb-1">Create account</h1>
          <p className="text-sm text-gray-500 mb-7">
            Already have one?{' '}
            <Link href="/auth/login" className="text-forest-700 font-semibold hover:text-forest-900">Sign in</Link>
          </p>

          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-forest-700 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-forest-700 hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-700 text-white font-bold rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-60 text-sm"
            >
              {loading ? 'Creating account…' : 'Create Free Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
