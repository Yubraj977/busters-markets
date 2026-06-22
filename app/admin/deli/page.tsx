'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Plus, Trash2, Pencil, Check, X, ChevronUp, ChevronDown,
  Star, Ban, ExternalLink, LogOut, Save,
} from 'lucide-react'

// ── types ──────────────────────────────────────────────────────────────────
interface MenuItem {
  id: string
  categoryId: string
  order: number
  name: string
  description: string
  price: number
  soldOut: boolean
  featured: boolean
}
interface Category {
  id: string
  name: string
  order: number
}
interface Menu { categories: Category[]; items: MenuItem[] }

// ── helpers ────────────────────────────────────────────────────────────────
const uid  = () => crypto.randomUUID()
const PASS = process.env.NEXT_PUBLIC_DELI_ADMIN_PASSWORD ?? 'busters2024'

async function saveMenu(menu: Menu) {
  await fetch('/api/deli-menu', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menu),
  })
}

// ── component ──────────────────────────────────────────────────────────────
export default function DeliAdminPage() {
  const [authed,  setAuthed]  = useState(() =>
    typeof window !== 'undefined' && sessionStorage.getItem('deliAdmin') === '1'
  )
  const [pw,      setPw]      = useState('')
  const [pwErr,   setPwErr]   = useState('')
  const [menu,    setMenu]    = useState<Menu>({ categories: [], items: [] })
  const [toast,   setToast]   = useState<string | null>(null)
  const [saving,  setSaving]  = useState(false)

  // category UI state
  const [addingCat,   setAddingCat]   = useState(false)
  const [newCatName,  setNewCatName]  = useState('')
  const [editingCat,  setEditingCat]  = useState<{ id: string; name: string } | null>(null)

  // item modal state
  const [itemModal, setItemModal] = useState<{
    mode: 'add' | 'edit'
    categoryId: string
    item?: MenuItem
  } | null>(null)

  // load menu on auth
  useEffect(() => {
    if (!authed) return
    fetch('/api/deli-menu')
      .then(r => r.json())
      .then((data: Menu) => setMenu({
        categories: [...data.categories].sort((a, b) => a.order - b.order),
        items:      [...data.items].sort((a, b) => a.order - b.order),
      }))
  }, [authed])

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const commit = async (next: Menu) => {
    const sorted: Menu = {
      categories: [...next.categories].sort((a, b) => a.order - b.order),
      items:      [...next.items].sort((a, b) => a.order - b.order),
    }
    setMenu(sorted)
    setSaving(true)
    await saveMenu(sorted)
    setSaving(false)
  }

  // ── auth ──
  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === PASS) {
      sessionStorage.setItem('deliAdmin', '1')
      setAuthed(true)
    } else {
      setPwErr('Wrong password')
      setPw('')
    }
  }
  const logout = () => { sessionStorage.removeItem('deliAdmin'); setAuthed(false) }

  // ── categories ──
  const addCat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    const cat: Category = { id: uid(), name: newCatName.trim(), order: menu.categories.length }
    await commit({ ...menu, categories: [...menu.categories, cat] })
    setNewCatName(''); setAddingCat(false); flash('Category added')
  }

  const renameCat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCat || !editingCat.name.trim()) return
    await commit({
      ...menu,
      categories: menu.categories.map(c =>
        c.id === editingCat.id ? { ...c, name: editingCat.name.trim() } : c
      ),
    })
    setEditingCat(null); flash('Renamed')
  }

  const deleteCat = async (cat: Category) => {
    if (!confirm(`Delete "${cat.name}" and all its items?`)) return
    await commit({
      categories: menu.categories.filter(c => c.id !== cat.id),
      items:      menu.items.filter(i => i.categoryId !== cat.id),
    })
    flash('Category deleted')
  }

  const moveCat = async (id: string, dir: -1 | 1) => {
    const cats = menu.categories
    const idx  = cats.findIndex(c => c.id === id)
    const swap = idx + dir
    if (swap < 0 || swap >= cats.length) return
    await commit({
      ...menu,
      categories: cats.map((c, i) => {
        if (i === idx)  return { ...c, order: swap }
        if (i === swap) return { ...c, order: idx }
        return c
      }),
    })
  }

  // ── items ──
  const saveItem = async (data: Partial<MenuItem>) => {
    if (!itemModal) return
    if (itemModal.mode === 'add') {
      const catItems = menu.items.filter(i => i.categoryId === itemModal.categoryId)
      const newItem: MenuItem = {
        id: uid(), categoryId: itemModal.categoryId,
        order: catItems.length, soldOut: false, featured: false,
        name: '', description: '', price: 0,
        ...data,
      }
      await commit({ ...menu, items: [...menu.items, newItem] })
      flash('Item added')
    } else {
      await commit({
        ...menu,
        items: menu.items.map(i =>
          i.id === itemModal.item!.id ? { ...i, ...data } : i
        ),
      })
      flash('Saved')
    }
    setItemModal(null)
  }

  const deleteItem = async (item: MenuItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    await commit({ ...menu, items: menu.items.filter(i => i.id !== item.id) })
    flash('Item deleted')
  }

  const toggle = async (itemId: string, field: 'soldOut' | 'featured') => {
    const item = menu.items.find(i => i.id === itemId)!
    await commit({
      ...menu,
      items: menu.items.map(i => i.id === itemId ? { ...i, [field]: !item[field] } : i),
    })
  }

  // ── login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f6]">
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--divider)] p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#1a2e1c] rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-[1.375rem] font-bold text-[#1d1d1f] tracking-[-0.025em]">Deli Admin</h1>
            <p className="text-[0.875rem] text-[var(--secondary)] mt-1">Buster's Markets</p>
          </div>
          <form onSubmit={login} className="space-y-3">
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={e => { setPw(e.target.value); setPwErr('') }}
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--divider)] text-[0.9375rem]
                         focus:outline-none focus:border-forest-400 bg-[#f9f9f6] transition-colors"
            />
            {pwErr && <p className="text-[0.8125rem] text-red-500">{pwErr}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a2e1c] text-white font-semibold rounded-xl
                         hover:bg-[#2a4530] transition-colors text-[0.9375rem]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── dashboard ──
  return (
    <div className="min-h-screen bg-[#f5f5f2]">

      {/* Header */}
      <div className="bg-white border-b border-[var(--divider)] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[1.0625rem] text-[#1d1d1f] tracking-[-0.02em]">
              Deli Admin
            </span>
            {saving && (
              <span className="text-[0.75rem] text-[var(--secondary)] animate-pulse">Saving…</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/deli/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.8125rem] font-medium
                         text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors"
            >
              <ExternalLink size={13} />
              Menu Board
            </a>
            <Link
              href="/deli"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.8125rem] font-medium
                         text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors"
            >
              <ExternalLink size={13} />
              Deli Page
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.8125rem] font-medium
                         text-[var(--secondary)] hover:bg-[#f5f5f7] transition-colors"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[1.375rem] font-bold text-[#1d1d1f] tracking-[-0.025em]">Menu</h2>
          {!addingCat && (
            <button
              onClick={() => setAddingCat(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a2e1c] text-white text-[0.875rem]
                         font-semibold rounded-xl hover:bg-[#2a4530] transition-colors"
            >
              <Plus size={14} />
              Add Category
            </button>
          )}
        </div>

        {/* New category form */}
        {addingCat && (
          <form
            onSubmit={addCat}
            className="flex items-center gap-2 mb-5 p-4 bg-white rounded-2xl border border-[var(--divider)] shadow-sm"
          >
            <input
              autoFocus
              placeholder="Category name (e.g. Hot Foods)"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-[var(--divider)] text-[0.9375rem]
                         focus:outline-none focus:border-forest-400 bg-[#f9f9f6] transition-colors"
            />
            <button type="submit"
              className="px-4 py-2 bg-[#1a2e1c] text-white text-[0.875rem] font-semibold rounded-lg hover:bg-[#2a4530] transition-colors">
              Add
            </button>
            <button type="button" onClick={() => { setAddingCat(false); setNewCatName('') }}
              className="px-4 py-2 text-[0.875rem] font-medium text-[var(--secondary)] hover:bg-[#f5f5f7] rounded-lg transition-colors">
              Cancel
            </button>
          </form>
        )}

        {/* Category cards */}
        <div className="space-y-4">
          {menu.categories.map((cat, idx) => {
            const catItems   = menu.items.filter(i => i.categoryId === cat.id)
            const isRenaming = editingCat?.id === cat.id

            return (
              <div key={cat.id} className="bg-white rounded-2xl border border-[var(--divider)] shadow-sm overflow-hidden">

                {/* Cat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f0ee]">

                  {/* Reorder */}
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => moveCat(cat.id, -1)} disabled={idx === 0}
                      className="p-0.5 text-[var(--tertiary)] hover:text-[var(--foreground)] disabled:opacity-20 transition-colors">
                      <ChevronUp size={14} />
                    </button>
                    <button onClick={() => moveCat(cat.id, 1)} disabled={idx === menu.categories.length - 1}
                      className="p-0.5 text-[var(--tertiary)] hover:text-[var(--foreground)] disabled:opacity-20 transition-colors">
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  {/* Name / rename */}
                  {isRenaming ? (
                    <form onSubmit={renameCat} className="flex items-center gap-2 flex-1">
                      <input
                        autoFocus
                        value={editingCat!.name}
                        onChange={e => setEditingCat({ ...editingCat!, name: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--divider)] text-[0.9375rem]
                                   focus:outline-none focus:border-forest-400 bg-[#f9f9f6] transition-colors"
                      />
                      <button type="submit"
                        className="p-1.5 text-forest-700 hover:bg-forest-50 rounded-lg transition-colors">
                        <Check size={15} />
                      </button>
                      <button type="button" onClick={() => setEditingCat(null)}
                        className="p-1.5 text-[var(--secondary)] hover:bg-[#f5f5f7] rounded-lg transition-colors">
                        <X size={15} />
                      </button>
                    </form>
                  ) : (
                    <>
                      <h3 className="flex-1 font-semibold text-[#1d1d1f] text-[1rem] tracking-[-0.01em]">
                        {cat.name}
                        <span className="ml-2 text-[0.75rem] font-normal text-[var(--tertiary)]">
                          {catItems.length} item{catItems.length !== 1 ? 's' : ''}
                        </span>
                      </h3>
                      <button onClick={() => setEditingCat({ id: cat.id, name: cat.name })}
                        className="p-1.5 text-[var(--secondary)] hover:bg-[#f5f5f7] rounded-lg transition-colors" title="Rename">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteCat(cat)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Delete category">
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>

                {/* Items table */}
                {catItems.length > 0 && (
                  <div className="divide-y divide-[#f5f5f2]">
                    {catItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#fafaf8] transition-colors group">

                        {/* Name + desc */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[0.9375rem] font-medium tracking-[-0.01em] ${item.soldOut ? 'line-through text-[var(--tertiary)]' : 'text-[#1d1d1f]'}`}>
                              {item.name}
                            </span>
                            {item.featured && (
                              <span className="text-[0.5625rem] font-bold uppercase tracking-[0.07em] px-1.5 py-0.5
                                               bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                                ★ Featured
                              </span>
                            )}
                            {item.soldOut && (
                              <span className="text-[0.5625rem] font-bold uppercase tracking-[0.07em] px-1.5 py-0.5
                                               bg-red-50 text-red-500 border border-red-200 rounded-full">
                                Sold Out
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[0.8125rem] text-[var(--secondary)] mt-0.5 truncate">{item.description}</p>
                          )}
                        </div>

                        {/* Price */}
                        <span className="text-[0.9375rem] font-semibold text-[#1d1d1f] tabular-nums flex-shrink-0">
                          ${Number(item.price).toFixed(2)}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => toggle(item.id, 'soldOut')}
                            title={item.soldOut ? 'Mark available' : 'Mark sold out'}
                            className={`p-1.5 rounded-lg transition-colors ${item.soldOut ? 'text-red-500 bg-red-50' : 'text-[var(--secondary)] hover:bg-[#f5f5f7]'}`}>
                            <Ban size={14} />
                          </button>
                          <button onClick={() => toggle(item.id, 'featured')}
                            title={item.featured ? 'Remove featured' : 'Mark featured'}
                            className={`p-1.5 rounded-lg transition-colors ${item.featured ? 'text-amber-600 bg-amber-50' : 'text-[var(--secondary)] hover:bg-[#f5f5f7]'}`}>
                            <Star size={14} fill={item.featured ? 'currentColor' : 'none'} />
                          </button>
                          <button onClick={() => setItemModal({ mode: 'edit', categoryId: cat.id, item })}
                            className="p-1.5 text-[var(--secondary)] hover:bg-[#f5f5f7] rounded-lg transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => deleteItem(item)}
                            className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add item button */}
                <div className="px-5 py-3 border-t border-[#f5f5f2]">
                  <button
                    onClick={() => setItemModal({ mode: 'add', categoryId: cat.id })}
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-forest-700
                               hover:text-forest-900 transition-colors"
                  >
                    <Plus size={13} />
                    Add item to {cat.name}
                  </button>
                </div>

              </div>
            )
          })}

          {menu.categories.length === 0 && (
            <div className="text-center py-16 text-[var(--secondary)] text-[0.9375rem]">
              No categories yet — add one above to get started.
            </div>
          )}
        </div>
      </div>

      {/* Item modal */}
      {itemModal && (
        <ItemModal
          mode={itemModal.mode}
          initial={itemModal.item}
          onSave={saveItem}
          onClose={() => setItemModal(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white
                        text-[0.875rem] font-medium px-5 py-2.5 rounded-full shadow-xl z-50
                        animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toast}
        </div>
      )}
    </div>
  )
}

// ── Item modal ─────────────────────────────────────────────────────────────
function ItemModal({
  mode, initial, onSave, onClose,
}: {
  mode: 'add' | 'edit'
  initial?: MenuItem
  onSave: (data: Partial<MenuItem>) => Promise<void>
  onClose: () => void
}) {
  const [name,  setName]  = useState(initial?.name        ?? '')
  const [desc,  setDesc]  = useState(initial?.description ?? '')
  const [price, setPrice] = useState(initial ? String(initial.price) : '')
  const [busy,  setBusy]  = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => { nameRef.current?.focus() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !price) return
    setBusy(true)
    await onSave({ name: name.trim(), description: desc.trim(), price: parseFloat(price) })
    setBusy(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[1.125rem] font-bold text-[#1d1d1f] tracking-[-0.02em]">
            {mode === 'add' ? 'Add Item' : 'Edit Item'}
          </h2>
          <button onClick={onClose} className="p-1.5 text-[var(--secondary)] hover:bg-[#f5f5f7] rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[0.8125rem] font-medium text-[var(--secondary)] mb-1.5">Name *</label>
            <input
              ref={nameRef}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Buster's Signature Burger"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--divider)] text-[0.9375rem]
                         focus:outline-none focus:border-forest-400 bg-[#f9f9f6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[0.8125rem] font-medium text-[var(--secondary)] mb-1.5">Description</label>
            <input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="e.g. Double patty, aged cheddar, house sauce"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--divider)] text-[0.9375rem]
                         focus:outline-none focus:border-forest-400 bg-[#f9f9f6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[0.8125rem] font-medium text-[var(--secondary)] mb-1.5">Price *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--secondary)] text-[0.9375rem]">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="0.00"
                required
                className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-[var(--divider)] text-[0.9375rem]
                           focus:outline-none focus:border-forest-400 bg-[#f9f9f6] transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-[#1a2e1c] text-white
                         font-semibold rounded-xl hover:bg-[#2a4530] transition-colors text-[0.9375rem] disabled:opacity-50"
            >
              <Save size={14} />
              {mode === 'add' ? 'Add Item' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-[0.9375rem] font-medium text-[var(--secondary)]
                         hover:bg-[#f5f5f7] rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
