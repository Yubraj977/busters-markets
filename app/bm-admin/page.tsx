'use client'

import { useState, useEffect, useRef } from 'react'
import {
  LogOut, Save, Plus, Trash2, Pencil, Check, X,
  ChevronUp, ChevronDown, Clock, UtensilsCrossed, ExternalLink,
} from 'lucide-react'

// ─── types ────────────────────────────────────────────────────────────────
const PASS = process.env.NEXT_PUBLIC_DELI_ADMIN_PASSWORD ?? 'busters2024'

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const
type Day = typeof DAYS[number]
type DayLabel = { [k in Day]: string }
const DAY_LABEL: DayLabel = {
  monday:'Monday', tuesday:'Tuesday', wednesday:'Wednesday',
  thursday:'Thursday', friday:'Friday', saturday:'Saturday', sunday:'Sunday',
}

interface DayHours { open: string; close: string; closed: boolean }
type WeekHours = Record<Day, DayHours>
interface Settings { storeHours: WeekHours; deliHours: WeekHours }

interface MenuItem {
  id: string; categoryId: string; order: number
  name: string; description: string; price: number
  soldOut: boolean; featured: boolean
}
interface Category { id: string; name: string; order: number }
interface Menu { categories: Category[]; items: MenuItem[] }

const uid = () => crypto.randomUUID()

// ─── helpers ─────────────────────────────────────────────────────────────
async function saveMenu(menu: Menu) {
  await fetch('/api/deli-menu', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menu),
  })
}
async function saveSettings(s: Settings) {
  await fetch('/api/store-settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(s),
  })
}

// ─── root ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [ready,  setReady]  = useState(false)
  const [pw,     setPw]     = useState('')
  const [pwErr,  setPwErr]  = useState('')
  const [tab,    setTab]    = useState<'hours' | 'deli'>('deli')

  useEffect(() => {
    setAuthed(sessionStorage.getItem('bmAdmin') === '1')
    setReady(true)
  }, [])

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === PASS) {
      sessionStorage.setItem('bmAdmin', '1')
      setAuthed(true)
    } else {
      setPwErr('Wrong password')
      setPw('')
    }
  }
  const logout = () => { sessionStorage.removeItem('bmAdmin'); setAuthed(false) }

  if (!ready) return null

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1a10' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
               style={{ background: '#1e4023' }}>
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">Buster's Admin</h1>
          <p className="text-sm mt-1" style={{ color: '#4a7a4a' }}>Store management</p>
        </div>
        <form onSubmit={login} className="space-y-3">
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwErr('') }}
            autoFocus
            className="w-full px-4 py-3 rounded-xl text-white placeholder-[#4a7a4a] text-[1rem]
                       focus:outline-none focus:ring-1 focus:ring-[#2d6a30]"
            style={{ background: '#162019', border: '1px solid #1e3022' }}
          />
          {pwErr && <p className="text-red-400 text-sm">{pwErr}</p>}
          <button type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white text-[1rem] transition-colors"
            style={{ background: '#1e4023' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f2]">
      {/* Top bar */}
      <div className="bg-white border-b border-[var(--divider)] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                 style={{ background: '#1a2e1c' }}>
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-[#1d1d1f] tracking-tight">Buster's Admin</span>

            {/* Tabs */}
            <div className="flex items-center gap-1 ml-4 bg-[#f0f0ee] rounded-lg p-1">
              <button onClick={() => setTab('deli')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.8125rem] font-medium transition-all ${
                  tab === 'deli'
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'text-[var(--secondary)] hover:text-[var(--foreground)]'
                }`}>
                <UtensilsCrossed size={13} />
                Deli Menu
              </button>
              <button onClick={() => setTab('hours')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.8125rem] font-medium transition-all ${
                  tab === 'hours'
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'text-[var(--secondary)] hover:text-[var(--foreground)]'
                }`}>
                <Clock size={13} />
                Hours
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a href="/deli/menu" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[0.8125rem]
                          text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors">
              <ExternalLink size={12} /> Menu Board
            </a>
            <a href="/deli" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[0.8125rem]
                          text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors">
              <ExternalLink size={12} /> Deli Page
            </a>
            <button onClick={logout}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[0.8125rem]
                         text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors ml-1">
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        {tab === 'deli'  && <DeliSection />}
        {tab === 'hours' && <HoursSection />}
      </div>
    </div>
  )
}

// ─── DELI MENU SECTION ────────────────────────────────────────────────────
function DeliSection() {
  const [menu,       setMenu]       = useState<Menu>({ categories: [], items: [] })
  const [toast,      setToast]      = useState<string | null>(null)
  const [saving,     setSaving]     = useState(false)
  const [addingCat,  setAddingCat]  = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [editCatId,  setEditCatId]  = useState<string | null>(null)
  const [editCatVal, setEditCatVal] = useState('')
  const [addItem,    setAddItem]    = useState<string | null>(null) // categoryId
  const [editItem,   setEditItem]   = useState<string | null>(null) // item id being edited

  useEffect(() => {
    fetch('/api/deli-menu').then(r => r.json()).then((data: Menu) => {
      setMenu({
        categories: [...data.categories].sort((a, b) => a.order - b.order),
        items:      [...data.items].sort((a, b) => a.order - b.order),
      })
    })
  }, [])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const commit = async (next: Menu) => {
    const s: Menu = {
      categories: [...next.categories].sort((a,b) => a.order - b.order),
      items:      [...next.items].sort((a,b) => a.order - b.order),
    }
    setMenu(s); setSaving(true)
    await saveMenu(s); setSaving(false)
  }

  // categories
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
    const cats = menu.categories; const idx = cats.findIndex(c => c.id === id); const swap = idx + dir
    if (swap < 0 || swap >= cats.length) return
    await commit({ ...menu, categories: cats.map((c,i) => i===idx ? {...c,order:swap} : i===swap ? {...c,order:idx} : c) })
  }

  // items
  const toggleItem = async (itemId: string, field: 'soldOut'|'featured') => {
    const item = menu.items.find(i => i.id === itemId)!
    await commit({ ...menu, items: menu.items.map(i => i.id === itemId ? { ...i, [field]: !item[field] } : i) })
  }
  const deleteItem = async (item: MenuItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    await commit({ ...menu, items: menu.items.filter(i => i.id !== item.id) })
    flash('Item deleted')
  }
  const saveNewItem = async (catId: string, data: { name: string; description: string; price: number }) => {
    const catItems = menu.items.filter(i => i.categoryId === catId)
    await commit({ ...menu, items: [...menu.items, { id: uid(), categoryId: catId, order: catItems.length, soldOut: false, featured: false, ...data }] })
    setAddItem(null); flash('Item added')
  }
  const saveEditItem = async (itemId: string, data: { name: string; description: string; price: number }) => {
    await commit({ ...menu, items: menu.items.map(i => i.id === itemId ? { ...i, ...data } : i) })
    setEditItem(null); flash('Saved')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[1.375rem] font-bold text-[#1d1d1f] tracking-tight">Deli Menu</h2>
          {saving && <span className="text-xs text-[var(--secondary)] animate-pulse">Saving…</span>}
        </div>
        {!addingCat && (
          <button onClick={() => setAddingCat(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-colors"
            style={{ background: '#1a2e1c' }}>
            <Plus size={14} /> Add Category
          </button>
        )}
      </div>

      {addingCat && (
        <form onSubmit={addCat} className="flex gap-2 mb-5 p-4 bg-white rounded-2xl border border-[var(--divider)] shadow-sm">
          <input autoFocus value={newCatName} onChange={e => setNewCatName(e.target.value)}
            placeholder="Category name (e.g. Hot Foods)"
            className="flex-1 px-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-[#f9f9f6] focus:outline-none focus:border-forest-400" />
          <button type="submit" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ background: '#1a2e1c' }}>Add</button>
          <button type="button" onClick={() => { setAddingCat(false); setNewCatName('') }}
            className="px-4 py-2 rounded-lg text-sm text-[var(--secondary)] hover:bg-[#f5f5f7]">Cancel</button>
        </form>
      )}

      <div className="space-y-6">
        {menu.categories.map((cat, idx) => {
          const catItems = menu.items.filter(i => i.categoryId === cat.id)
          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-[var(--divider)] shadow-sm overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#f0f0ee] bg-[#fafaf8]">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveCat(cat.id, -1)} disabled={idx===0}
                    className="text-[var(--tertiary)] hover:text-[var(--foreground)] disabled:opacity-20 transition-colors">
                    <ChevronUp size={13} />
                  </button>
                  <button onClick={() => moveCat(cat.id, 1)} disabled={idx===menu.categories.length-1}
                    className="text-[var(--tertiary)] hover:text-[var(--foreground)] disabled:opacity-20 transition-colors">
                    <ChevronDown size={13} />
                  </button>
                </div>

                {editCatId === cat.id ? (
                  <form onSubmit={e => renameCat(e, cat.id)} className="flex items-center gap-2 flex-1">
                    <input autoFocus value={editCatVal} onChange={e => setEditCatVal(e.target.value)}
                      className="flex-1 px-3 py-1 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
                    <button type="submit" className="p-1 text-forest-700"><Check size={14} /></button>
                    <button type="button" onClick={() => setEditCatId(null)} className="p-1 text-[var(--secondary)]"><X size={14} /></button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1 font-semibold text-[#1d1d1f] text-[0.9375rem]">
                      {cat.name} <span className="font-normal text-[var(--tertiary)] text-sm ml-1">{catItems.length} items</span>
                    </span>
                    <button onClick={() => { setEditCatId(cat.id); setEditCatVal(cat.name) }}
                      className="p-1.5 text-[var(--secondary)] hover:bg-[#f0f0ee] rounded-lg transition-colors">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => deleteCat(cat)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </>
                )}
              </div>

              {/* Items — simple big cards for deli staff */}
              <div className="divide-y divide-[#f5f5f2]">
                {catItems.map(item => (
                  <div key={item.id}>
                    {editItem === item.id ? (
                      <EditItemForm
                        item={item}
                        onSave={data => saveEditItem(item.id, data)}
                        onCancel={() => setEditItem(null)}
                      />
                    ) : (
                      <div className={`flex items-center gap-3 px-5 py-4 ${item.soldOut ? 'bg-red-50/40' : ''}`}>
                        {/* Name + desc */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-[1rem] leading-tight ${item.soldOut ? 'line-through text-[var(--tertiary)]' : 'text-[#1d1d1f]'}`}>
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-[0.8125rem] text-[var(--secondary)] mt-0.5 truncate">{item.description}</p>
                          )}
                        </div>

                        {/* Price */}
                        <span className="text-[1rem] font-bold text-[#1d1d1f] tabular-nums flex-shrink-0">
                          ${Number(item.price).toFixed(2)}
                        </span>

                        {/* BIG toggles — easy for deli staff */}
                        <button
                          onClick={() => toggleItem(item.id, 'soldOut')}
                          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-[0.8125rem] font-bold transition-all border ${
                            item.soldOut
                              ? 'bg-red-500 text-white border-red-500'
                              : 'bg-white text-[var(--secondary)] border-[var(--divider)] hover:border-red-300'
                          }`}
                        >
                          {item.soldOut ? '✗ Sold Out' : '✓ Available'}
                        </button>

                        <button
                          onClick={() => toggleItem(item.id, 'featured')}
                          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-[0.8125rem] font-bold transition-all border ${
                            item.featured
                              ? 'bg-amber-400 text-amber-900 border-amber-400'
                              : 'bg-white text-[var(--secondary)] border-[var(--divider)] hover:border-amber-300'
                          }`}
                        >
                          {item.featured ? '★ Featured' : '☆ Feature'}
                        </button>

                        {/* Edit + delete */}
                        <button
                          onClick={() => { setEditItem(item.id); setAddItem(null) }}
                          className="flex-shrink-0 p-2 text-[var(--secondary)] hover:bg-[#f0f0ee] rounded-lg transition-colors"
                          title="Edit item"
                        >
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => deleteItem(item)}
                          className="flex-shrink-0 p-2 text-[var(--tertiary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add item */}
              {addItem === cat.id ? (
                <AddItemForm catId={cat.id} onSave={saveNewItem} onCancel={() => setAddItem(null)} />
              ) : (
                <div className="px-5 py-3 border-t border-[#f5f5f2]">
                  <button onClick={() => setAddItem(cat.id)}
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-forest-700 hover:text-forest-900 transition-colors">
                    <Plus size={13} /> Add item to {cat.name}
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-sm
                        font-medium px-5 py-2.5 rounded-full shadow-xl z-50">
          {toast}
        </div>
      )}
    </div>
  )
}

// ─── Add item inline form ─────────────────────────────────────────────────
function AddItemForm({ catId, onSave, onCancel }: {
  catId: string
  onSave: (catId: string, data: { name: string; description: string; price: number }) => Promise<void>
  onCancel: () => void
}) {
  const [name,  setName]  = useState('')
  const [desc,  setDesc]  = useState('')
  const [price, setPrice] = useState('')
  const [busy,  setBusy]  = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { ref.current?.focus() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !price) return
    setBusy(true)
    await onSave(catId, { name: name.trim(), description: desc.trim(), price: parseFloat(price) })
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="px-5 py-4 border-t border-[#f0f0ee] bg-[#fafaf8]">
      <div className="flex gap-2 flex-wrap">
        <input ref={ref} value={name} onChange={e => setName(e.target.value)}
          placeholder="Item name *" required
          className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Description (optional)"
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)] text-sm">$</span>
          <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)}
            placeholder="0.00" required
            className="w-24 pl-6 pr-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
        </div>
        <button type="submit" disabled={busy}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-50 transition-colors"
          style={{ background: '#1a2e1c' }}>
          Add
        </button>
        <button type="button" onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm text-[var(--secondary)] hover:bg-[#f0f0ee] transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ─── Edit item inline form ────────────────────────────────────────────────
function EditItemForm({ item, onSave, onCancel }: {
  item: MenuItem
  onSave: (data: { name: string; description: string; price: number }) => Promise<void>
  onCancel: () => void
}) {
  const [name,  setName]  = useState(item.name)
  const [desc,  setDesc]  = useState(item.description)
  const [price, setPrice] = useState(String(item.price))
  const [busy,  setBusy]  = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { ref.current?.focus() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !price) return
    setBusy(true)
    await onSave({ name: name.trim(), description: desc.trim(), price: parseFloat(price) })
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="px-5 py-4 bg-[#f5f9f5] border-l-2 border-forest-400">
      <p className="text-[0.75rem] font-semibold text-forest-700 uppercase tracking-wide mb-2">Editing item</p>
      <div className="flex gap-2 flex-wrap">
        <input ref={ref} value={name} onChange={e => setName(e.target.value)}
          placeholder="Item name *" required
          className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Description (optional)"
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)] text-sm">$</span>
          <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)}
            placeholder="0.00" required
            className="w-24 pl-6 pr-3 py-2 rounded-lg border border-[var(--divider)] text-sm bg-white focus:outline-none focus:border-forest-400" />
        </div>
        <button type="submit" disabled={busy}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-50 transition-colors"
          style={{ background: '#1a2e1c' }}>
          Save
        </button>
        <button type="button" onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm text-[var(--secondary)] hover:bg-[#f0f0ee] transition-colors">
          Cancel
        </button>
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
    const next: Settings = {
      ...settings,
      [section]: {
        ...settings[section],
        [day]: { ...settings[section][day], [field]: value },
      },
    }
    setSettings(next)
    setSaving(true)
    await saveSettings(next)
    setSaving(false)
    flash('Saved')
  }

  if (!settings) return (
    <div className="text-center py-16 text-[var(--secondary)]">Loading hours…</div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <h2 className="text-[1.375rem] font-bold text-[#1d1d1f] tracking-tight">Store Hours</h2>
        {saving && <span className="text-xs text-[var(--secondary)] animate-pulse">Saving…</span>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <HoursTable
          title="Main Store"
          emoji="🏪"
          hours={settings.storeHours}
          onChange={(day, field, val) => updateDay('storeHours', day, field, val)}
        />
        <HoursTable
          title="Deli Counter"
          emoji="🥪"
          hours={settings.deliHours}
          onChange={(day, field, val) => updateDay('deliHours', day, field, val)}
        />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-sm
                        font-medium px-5 py-2.5 rounded-full shadow-xl z-50">
          {toast}
        </div>
      )}
    </div>
  )
}

function HoursTable({ title, emoji, hours, onChange }: {
  title: string
  emoji: string
  hours: WeekHours
  onChange: (day: Day, field: keyof DayHours, value: string|boolean) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--divider)] shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-[#f0f0ee] bg-[#fafaf8]">
        <h3 className="font-bold text-[#1d1d1f] text-[0.9375rem]">{emoji} {title}</h3>
      </div>
      <div className="divide-y divide-[#f5f5f2]">
        {DAYS.map(day => {
          const d = hours[day]
          return (
            <div key={day} className={`flex items-center gap-3 px-5 py-3 ${d.closed ? 'bg-[#fafaf8] opacity-60' : ''}`}>
              <span className="w-24 text-[0.875rem] font-medium text-[#1d1d1f] flex-shrink-0">
                {DAY_LABEL[day]}
              </span>

              {d.closed ? (
                <span className="flex-1 text-[0.875rem] text-[var(--secondary)] italic">Closed</span>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <input type="time" value={d.open}
                    onChange={e => onChange(day, 'open', e.target.value)}
                    className="px-2 py-1 rounded-lg border border-[var(--divider)] text-[0.875rem]
                               focus:outline-none focus:border-forest-400 bg-[#f9f9f6]" />
                  <span className="text-[var(--tertiary)] text-sm">–</span>
                  <input type="time" value={d.close}
                    onChange={e => onChange(day, 'close', e.target.value)}
                    className="px-2 py-1 rounded-lg border border-[var(--divider)] text-[0.875rem]
                               focus:outline-none focus:border-forest-400 bg-[#f9f9f6]" />
                </div>
              )}

              {/* Closed toggle */}
              <button
                onClick={() => onChange(day, 'closed', !d.closed)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[0.75rem] font-semibold transition-all border ${
                  d.closed
                    ? 'bg-red-100 text-red-600 border-red-200'
                    : 'bg-white text-[var(--tertiary)] border-[var(--divider)] hover:border-red-200'
                }`}
              >
                {d.closed ? 'Closed' : 'Open'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
