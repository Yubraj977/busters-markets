'use client'

import { useState, useEffect, useRef } from 'react'
import {
  LogOut, Plus, Trash2, Pencil, Check, X,
  ChevronUp, ChevronDown, Clock, UtensilsCrossed, ExternalLink,
} from 'lucide-react'

// ─── types ───────────────────────────────────────────────────────────────
const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const
type Day = typeof DAYS[number]
const DAY_LABEL: Record<Day, string> = {
  monday:'Monday', tuesday:'Tuesday', wednesday:'Wednesday',
  thursday:'Thursday', friday:'Friday', saturday:'Saturday', sunday:'Sunday',
}
const DAY_SHORT: Record<Day, string> = {
  monday:'Mon', tuesday:'Tue', wednesday:'Wed',
  thursday:'Thu', friday:'Fri', saturday:'Sat', sunday:'Sun',
}

interface DayHours { open: string; close: string; closed: boolean }
type WeekHours  = Record<Day, DayHours>
interface Settings { storeHours: WeekHours; deliHours: WeekHours }
interface MenuItem {
  id: string; categoryId: string; order: number
  name: string; description: string; price: number
  soldOut: boolean; featured: boolean; image?: string
}
interface Category { id: string; name: string; order: number }
interface Menu { categories: Category[]; items: MenuItem[] }

const uid = () => crypto.randomUUID()

async function saveMenu(menu: Menu) {
  await fetch('/api/deli-menu', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(menu) })
}
async function saveSettings(s: Settings) {
  await fetch('/api/store-settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
}

// ─── root ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [ready,  setReady]  = useState(false)
  const [pw,     setPw]     = useState('')
  const [pwErr,  setPwErr]  = useState('')
  const [tab,    setTab]    = useState<'deli' | 'hours'>('deli')

  useEffect(() => {
    setAuthed(sessionStorage.getItem('bmAdmin') === '1')
    setReady(true)
  }, [])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      sessionStorage.setItem('bmAdmin', '1')
      setAuthed(true)
    } else {
      const data = await res.json()
      setPwErr(data.error ?? 'Wrong password')
      setPw('')
    }
  }
  const logout = () => { sessionStorage.removeItem('bmAdmin'); setAuthed(false) }

  if (!ready) return null

  // ── Login ──
  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0f1a10' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
               style={{ background: '#1e4023' }}>
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">Buster's Admin</h1>
          <p className="text-sm mt-1" style={{ color: '#4a7a4a' }}>Store management</p>
        </div>
        <form onSubmit={login} className="space-y-3">
          <input
            type="password" placeholder="Password" value={pw} autoFocus
            onChange={e => { setPw(e.target.value); setPwErr('') }}
            className="w-full px-4 py-4 rounded-2xl text-white text-[1.0625rem]
                       focus:outline-none focus:ring-2 focus:ring-[#2d6a30]"
            style={{ background: '#162019', border: '1px solid #1e3022' }}
          />
          {pwErr && <p className="text-red-400 text-sm text-center">{pwErr}</p>}
          <button type="submit"
            className="w-full py-4 rounded-2xl font-bold text-white text-[1.0625rem] transition-colors active:scale-[0.98]"
            style={{ background: '#1e4023' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#f5f5f2]">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-[var(--divider)] sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">

          {/* Brand */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1a2e1c' }}>
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-[#1d1d1f] tracking-tight hidden sm:block">Buster's Admin</span>
          </div>

          {/* Tabs — centered */}
          <div className="flex items-center gap-1 bg-[#f0f0ee] rounded-xl p-1 flex-1 max-w-xs mx-auto">
            <button onClick={() => setTab('deli')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'deli' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <UtensilsCrossed size={14} />
              <span>Deli</span>
            </button>
            <button onClick={() => setTab('hours')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'hours' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <Clock size={14} />
              <span>Hours</span>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <a href="/deli/menu" target="_blank" rel="noopener noreferrer"
               className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[0.8125rem]
                          text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors">
              <ExternalLink size={13} /> Board
            </a>
            <button onClick={logout}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[0.8125rem]
                         text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors">
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'deli'  && <DeliSection />}
        {tab === 'hours' && <HoursSection />}
      </div>
    </div>
  )
}

// ─── DELI SECTION ─────────────────────────────────────────────────────────
function DeliSection() {
  const [menu,       setMenu]       = useState<Menu>({ categories: [], items: [] })
  const [toast,      setToast]      = useState<string | null>(null)
  const [saving,     setSaving]     = useState(false)
  const [addingCat,  setAddingCat]  = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [editCatId,  setEditCatId]  = useState<string | null>(null)
  const [editCatVal, setEditCatVal] = useState('')
  const [addItem,    setAddItem]    = useState<string | null>(null)
  const [editItem,   setEditItem]   = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/deli-menu').then(r => r.json()).then((d: Menu) =>
      setMenu({
        categories: [...d.categories].sort((a,b) => a.order - b.order),
        items:      [...d.items].sort((a,b) => a.order - b.order),
      })
    )
  }, [])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const commit = async (next: Menu) => {
    const s: Menu = {
      categories: [...next.categories].sort((a,b) => a.order - b.order),
      items:      [...next.items].sort((a,b) => a.order - b.order),
    }
    setMenu(s); setSaving(true); await saveMenu(s); setSaving(false)
  }

  const addCat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    await commit({ ...menu, categories: [...menu.categories, { id: uid(), name: newCatName.trim(), order: menu.categories.length }] })
    setNewCatName(''); setAddingCat(false); flash('Category added')
  }
  const renameCat = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    if (!editCatVal.trim()) return
    await commit({ ...menu, categories: menu.categories.map(c => c.id === id ? { ...c, name: editCatVal.trim() } : c) })
    setEditCatId(null); flash('Renamed')
  }
  const deleteCat = async (cat: Category) => {
    if (!confirm(`Delete "${cat.name}" and all its items?`)) return
    await commit({ categories: menu.categories.filter(c => c.id !== cat.id), items: menu.items.filter(i => i.categoryId !== cat.id) })
    flash('Deleted')
  }
  const moveCat = async (id: string, dir: -1|1) => {
    const cats = menu.categories, idx = cats.findIndex(c => c.id === id), swap = idx + dir
    if (swap < 0 || swap >= cats.length) return
    await commit({ ...menu, categories: cats.map((c,i) => i===idx ? {...c,order:swap} : i===swap ? {...c,order:idx} : c) })
  }
  const toggleItem = async (itemId: string, field: 'soldOut'|'featured') => {
    const item = menu.items.find(i => i.id === itemId)!
    await commit({ ...menu, items: menu.items.map(i => i.id === itemId ? { ...i, [field]: !item[field] } : i) })
  }
  const deleteItem = async (item: MenuItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    await commit({ ...menu, items: menu.items.filter(i => i.id !== item.id) }); flash('Deleted')
  }
  const saveNewItem = async (catId: string, data: { name: string; description: string; price: number; image?: string }) => {
    const n = menu.items.filter(i => i.categoryId === catId).length
    await commit({ ...menu, items: [...menu.items, { id: uid(), categoryId: catId, order: n, soldOut: false, featured: false, ...data }] })
    setAddItem(null); flash('Item added')
  }
  const saveEditItem = async (itemId: string, data: { name: string; description: string; price: number; image?: string }) => {
    await commit({ ...menu, items: menu.items.map(i => i.id === itemId ? { ...i, ...data } : i) })
    setEditItem(null); flash('Saved')
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Deli Menu</h2>
          {saving && <span className="text-xs text-[var(--secondary)] animate-pulse">Saving…</span>}
        </div>
        {!addingCat && (
          <button onClick={() => setAddingCat(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: '#1a2e1c' }}>
            <Plus size={15} /> Add Category
          </button>
        )}
      </div>

      {/* New category form */}
      {addingCat && (
        <div className="mb-4 p-4 bg-white rounded-2xl border border-[var(--divider)] shadow-sm">
          <form onSubmit={addCat} className="flex flex-col gap-2 sm:flex-row">
            <input autoFocus value={newCatName} onChange={e => setNewCatName(e.target.value)}
              placeholder="Category name (e.g. Hot Foods)" required
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--divider)] text-[0.9375rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400" />
            <div className="flex gap-2">
              <button type="submit"
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-white text-sm font-semibold" style={{ background: '#1a2e1c' }}>
                Add
              </button>
              <button type="button" onClick={() => { setAddingCat(false); setNewCatName('') }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm text-[var(--secondary)] bg-[#f5f5f7]">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-4">
        {menu.categories.map((cat, idx) => {
          const catItems = menu.items.filter(i => i.categoryId === cat.id)
          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-[var(--divider)] shadow-sm overflow-hidden">

              {/* Category header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#f0f0ee] bg-[#fafaf8]">
                {/* Reorder */}
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => moveCat(cat.id, -1)} disabled={idx===0}
                    className="p-0.5 text-[var(--tertiary)] disabled:opacity-20 active:scale-90 transition-all">
                    <ChevronUp size={15} />
                  </button>
                  <button onClick={() => moveCat(cat.id, 1)} disabled={idx===menu.categories.length-1}
                    className="p-0.5 text-[var(--tertiary)] disabled:opacity-20 active:scale-90 transition-all">
                    <ChevronDown size={15} />
                  </button>
                </div>

                {editCatId === cat.id ? (
                  <form onSubmit={e => renameCat(e, cat.id)} className="flex items-center gap-2 flex-1 min-w-0">
                    <input autoFocus value={editCatVal} onChange={e => setEditCatVal(e.target.value)}
                      className="flex-1 min-w-0 px-3 py-1.5 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
                    <button type="submit" className="p-2 text-forest-700 bg-forest-50 rounded-lg flex-shrink-0"><Check size={15} /></button>
                    <button type="button" onClick={() => setEditCatId(null)} className="p-2 text-[var(--secondary)] bg-[#f5f5f7] rounded-lg flex-shrink-0"><X size={15} /></button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1 font-semibold text-[#1d1d1f] text-[0.9375rem] min-w-0 truncate">
                      {cat.name}
                      <span className="font-normal text-[var(--tertiary)] text-xs ml-1.5">{catItems.length} items</span>
                    </span>
                    <button onClick={() => { setEditCatId(cat.id); setEditCatVal(cat.name) }}
                      className="p-2 text-[var(--secondary)] hover:bg-[#f0f0ee] rounded-lg transition-colors flex-shrink-0">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => deleteCat(cat)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>

              {/* Items */}
              <div className="divide-y divide-[#f5f5f2]">
                {catItems.map(item => (
                  <div key={item.id}>
                    {editItem === item.id ? (
                      <ItemForm
                        initial={item}
                        onSave={data => saveEditItem(item.id, data)}
                        onCancel={() => setEditItem(null)}
                        mode="edit"
                      />
                    ) : (
                      <div className={`px-4 py-4 ${item.soldOut ? 'bg-red-50/50' : ''}`}>
                        {/* Row 1: name + price + icons */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold text-[1rem] leading-snug ${item.soldOut ? 'line-through text-[var(--tertiary)]' : 'text-[#1d1d1f]'}`}>
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-[0.8125rem] text-[var(--secondary)] mt-0.5 line-clamp-2">{item.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="font-bold text-[#1d1d1f] text-[0.9375rem] tabular-nums mr-1">
                              ${Number(item.price).toFixed(2)}
                            </span>
                            <button onClick={() => { setEditItem(item.id); setAddItem(null) }}
                              className="p-2 text-[var(--secondary)] hover:bg-[#f0f0ee] rounded-lg transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => deleteItem(item)}
                              className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Row 2: big tap-friendly toggles */}
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => toggleItem(item.id, 'soldOut')}
                            className={`py-3 rounded-xl text-[0.875rem] font-bold transition-all active:scale-95 border ${
                              item.soldOut
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white text-[var(--secondary)] border-[var(--divider)]'
                            }`}>
                            {item.soldOut ? '✗ Sold Out' : '✓ Available'}
                          </button>
                          <button onClick={() => toggleItem(item.id, 'featured')}
                            className={`py-3 rounded-xl text-[0.875rem] font-bold transition-all active:scale-95 border ${
                              item.featured
                                ? 'bg-amber-400 text-amber-900 border-amber-400'
                                : 'bg-white text-[var(--secondary)] border-[var(--divider)]'
                            }`}>
                            {item.featured ? '★ Featured' : '☆ Feature'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add item */}
              {addItem === cat.id ? (
                <ItemForm
                  onSave={data => saveNewItem(cat.id, data)}
                  onCancel={() => setAddItem(null)}
                  mode="add"
                />
              ) : (
                <div className="px-4 py-3 border-t border-[#f5f5f2]">
                  <button onClick={() => { setAddItem(cat.id); setEditItem(null) }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl
                               text-[0.875rem] font-medium text-forest-700 bg-forest-50 hover:bg-forest-100 transition-colors active:scale-95">
                    <Plus size={14} /> Add item to {cat.name}
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {menu.categories.length === 0 && (
          <div className="text-center py-16 text-[var(--secondary)]">
            No categories yet — add one above.
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white
                        text-sm font-medium px-5 py-3 rounded-full shadow-xl z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  )
}

// ─── Shared item form (add + edit) ────────────────────────────────────────
function ItemForm({ initial, onSave, onCancel, mode }: {
  initial?: MenuItem
  mode: 'add' | 'edit'
  onSave: (data: { name: string; description: string; price: number; image?: string }) => Promise<void>
  onCancel: () => void
}) {
  const [name,  setName]  = useState(initial?.name        ?? '')
  const [desc,  setDesc]  = useState(initial?.description ?? '')
  const [price, setPrice] = useState(initial ? String(initial.price) : '')
  const [image, setImage] = useState(initial?.image ?? '')
  const [busy,  setBusy]  = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { ref.current?.focus() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !price) return
    setBusy(true)
    await onSave({ name: name.trim(), description: desc.trim(), price: parseFloat(price), image: image.trim() || undefined })
    setBusy(false)
  }

  return (
    <form onSubmit={submit}
      className={`px-4 py-4 border-t border-[#f0f0ee] ${mode === 'edit' ? 'bg-[#f5f9f5] border-l-2 border-l-forest-400' : 'bg-[#fafaf8]'}`}>
      {mode === 'edit' && (
        <p className="text-[0.7rem] font-bold text-forest-700 uppercase tracking-widest mb-3">Editing item</p>
      )}
      <div className="flex flex-col gap-2">
        <input ref={ref} value={name} onChange={e => setName(e.target.value)}
          placeholder="Item name *" required
          className="w-full px-4 py-3 rounded-xl border border-[var(--divider)] text-[0.9375rem] bg-white focus:outline-none focus:border-forest-400" />
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Description (optional)"
          className="w-full px-4 py-3 rounded-xl border border-[var(--divider)] text-[0.9375rem] bg-white focus:outline-none focus:border-forest-400" />
        <input type="url" value={image} onChange={e => setImage(e.target.value)}
          placeholder="Photo URL (optional) — paste a link to a food image"
          className="w-full px-4 py-3 rounded-xl border border-[var(--divider)] text-[0.9375rem] bg-white focus:outline-none focus:border-forest-400" />
        {image && (
          <img src={image} alt="preview" onError={e => (e.currentTarget.style.display='none')}
            className="w-full h-28 object-cover rounded-xl border border-[var(--divider)]" />
        )}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary)]">$</span>
            <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)}
              placeholder="0.00" required
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-[var(--divider)] text-[0.9375rem] bg-white focus:outline-none focus:border-forest-400" />
          </div>
          <button type="submit" disabled={busy}
            className="px-5 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50 active:scale-95 transition-transform"
            style={{ background: '#1a2e1c' }}>
            {mode === 'add' ? 'Add' : 'Save'}
          </button>
          <button type="button" onClick={onCancel}
            className="px-4 py-3 rounded-xl text-sm text-[var(--secondary)] bg-[#f0f0ee] active:scale-95 transition-transform">
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

// ─── HOURS SECTION ────────────────────────────────────────────────────────
function HoursSection() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [saving,   setSaving]   = useState(false)
  const [toast,    setToast]    = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/store-settings').then(r => r.json()).then(setSettings)
  }, [])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const updateDay = async (section: 'storeHours'|'deliHours', day: Day, field: keyof DayHours, value: string|boolean) => {
    if (!settings) return
    const next: Settings = { ...settings, [section]: { ...settings[section], [day]: { ...settings[section][day], [field]: value } } }
    setSettings(next); setSaving(true); await saveSettings(next); setSaving(false); flash('Saved')
  }

  if (!settings) return <div className="text-center py-16 text-[var(--secondary)]">Loading hours…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Store Hours</h2>
        {saving && <span className="text-xs text-[var(--secondary)] animate-pulse">Saving…</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <HoursTable title="Main Store" emoji="🏪" hours={settings.storeHours}
          onChange={(day, field, val) => updateDay('storeHours', day, field, val)} />
        <HoursTable title="Deli Counter" emoji="🥪" hours={settings.deliHours}
          onChange={(day, field, val) => updateDay('deliHours', day, field, val)} />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white
                        text-sm font-medium px-5 py-3 rounded-full shadow-xl z-50">
          {toast}
        </div>
      )}
    </div>
  )
}

function HoursTable({ title, emoji, hours, onChange }: {
  title: string; emoji: string; hours: WeekHours
  onChange: (day: Day, field: keyof DayHours, value: string|boolean) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--divider)] shadow-sm overflow-hidden">
      <div className="px-4 py-3.5 border-b border-[#f0f0ee] bg-[#fafaf8]">
        <h3 className="font-bold text-[#1d1d1f]">{emoji} {title}</h3>
      </div>
      <div className="divide-y divide-[#f5f5f2]">
        {DAYS.map(day => {
          const d = hours[day]
          return (
            <div key={day} className={`px-4 py-3 ${d.closed ? 'opacity-50' : ''}`}>
              {/* Day name + Open/Closed toggle */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[0.9375rem] text-[#1d1d1f]">
                  <span className="sm:hidden">{DAY_SHORT[day]}</span>
                  <span className="hidden sm:inline">{DAY_LABEL[day]}</span>
                </span>
                <button
                  onClick={() => onChange(day, 'closed', !d.closed)}
                  className={`px-3 py-1 rounded-lg text-[0.75rem] font-bold transition-all active:scale-95 border ${
                    d.closed
                      ? 'bg-red-100 text-red-600 border-red-200'
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}>
                  {d.closed ? 'Closed' : 'Open'}
                </button>
              </div>
              {/* Time pickers */}
              {!d.closed && (
                <div className="flex items-center gap-2">
                  <input type="time" value={d.open} onChange={e => onChange(day, 'open', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[var(--divider)] text-[0.875rem]
                               focus:outline-none focus:border-forest-400 bg-[#f9f9f6] text-center" />
                  <span className="text-[var(--tertiary)] text-sm flex-shrink-0">to</span>
                  <input type="time" value={d.close} onChange={e => onChange(day, 'close', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[var(--divider)] text-[0.875rem]
                               focus:outline-none focus:border-forest-400 bg-[#f9f9f6] text-center" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
