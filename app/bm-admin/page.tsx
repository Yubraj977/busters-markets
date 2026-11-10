'use client'

import { useState, useEffect, useRef } from 'react'
import {
  LogOut, Plus, Trash2, Pencil, Check, X,
  ChevronUp, ChevronDown, Clock, UtensilsCrossed, ExternalLink,
  ListChecks, UserRound, Undo2, Receipt, RotateCcw,
  DollarSign, ShoppingBag, Hourglass, Users,
} from 'lucide-react'
import { mapOrderRow, statusLabel, statusColor, itemCount } from '@/lib/orders'
import type { Order, OrderStatus } from '@/lib/types'

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

type TodoStatus = 'open' | 'claimed' | 'done'
type TaskPriority = 'low' | 'normal' | 'high' | 'urgent'
interface Todo {
  id: string
  title: string
  notes: string | null
  status: TodoStatus
  claimed_by: string | null
  assigned_to: string | null
  assigned_by: string | null
  priority: TaskPriority
  due_date: string | null
  created_at: string
  completed_at: string | null
}
interface Employee {
  id: string
  name: string
  pin: string | null
  active: boolean
  created_at: string
}

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  low: 'bg-gray-100 text-gray-600',
  normal: 'bg-blue-50 text-blue-700',
  high: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
}

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
  const [tab,    setTab]    = useState<'tasks' | 'deli' | 'hours' | 'orders' | 'team'>('tasks')

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
            className="w-full px-4 py-3 rounded-xl text-white text-[0.9375rem]
                       focus:outline-none focus:ring-2 focus:ring-[#2d6a30]"
            style={{ background: '#162019', border: '1px solid #1e3022' }}
          />
          {pwErr && <p className="text-red-400 text-sm text-center">{pwErr}</p>}
          <button type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white text-[0.9375rem] transition-colors active:scale-[0.98]"
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
          <div className="flex items-center gap-1 bg-[#f0f0ee] rounded-xl p-1 flex-1 max-w-xs sm:max-w-md mx-auto">
            <button onClick={() => setTab('tasks')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'tasks' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <ListChecks size={14} />
              <span className="hidden sm:inline">Tasks</span>
            </button>
            <button onClick={() => setTab('deli')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'deli' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <UtensilsCrossed size={14} />
              <span className="hidden sm:inline">Deli</span>
            </button>
            <button onClick={() => setTab('hours')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'hours' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <Clock size={14} />
              <span className="hidden sm:inline">Hours</span>
            </button>
            <button onClick={() => setTab('orders')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'orders' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <Receipt size={14} />
              <span className="hidden sm:inline">Orders</span>
            </button>
            <button onClick={() => setTab('team')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-semibold transition-all ${
                tab === 'team' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[var(--secondary)]'
              }`}>
              <Users size={14} />
              <span className="hidden sm:inline">Team</span>
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
        {tab === 'tasks'  && <TasksSection />}
        {tab === 'deli'   && <DeliSection />}
        {tab === 'hours'  && <HoursSection />}
        {tab === 'orders' && <OrdersSection />}
        {tab === 'team'   && <TeamSection />}
      </div>
    </div>
  )
}

// ─── TASKS SECTION ────────────────────────────────────────────────────────
const EMPLOYEE_ID_KEY = 'bmEmployeeId'
const ADD_NEW_VALUE = '__add_new__'

async function patchTodo(id: string, body: Record<string, unknown>) {
  const res = await fetch('/api/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...body }),
  })
  return res.json()
}

function isOverdue(todo: Todo) {
  return !!todo.due_date && todo.status !== 'done' && todo.due_date < new Date().toISOString().slice(0, 10)
}

function useMe() {
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [myId, setMyId] = useState('')
  const [pinPrompt, setPinPrompt] = useState<{ id: string; pinDraft: string; error: string } | null>(null)

  const loadEmployees = () => {
    fetch('/api/employees').then(r => r.json()).then(setEmployees).catch(() => setEmployees([]))
  }

  useEffect(() => {
    loadEmployees()
    setMyId(localStorage.getItem(EMPLOYEE_ID_KEY) ?? '')
  }, [])

  const me = employees?.find(e => e.id === myId) ?? null

  const selectMe = (id: string, employeesList: Employee[]) => {
    const emp = employeesList.find(e => e.id === id)
    if (!emp) return
    if (emp.pin && sessionStorage.getItem(`pinOk:${id}`) !== '1') {
      setPinPrompt({ id, pinDraft: '', error: '' })
      return
    }
    localStorage.setItem(EMPLOYEE_ID_KEY, id)
    setMyId(id)
  }

  const confirmPin = () => {
    if (!pinPrompt || !employees) return
    const emp = employees.find(e => e.id === pinPrompt.id)
    if (!emp) return
    if (pinPrompt.pinDraft === emp.pin) {
      sessionStorage.setItem(`pinOk:${emp.id}`, '1')
      localStorage.setItem(EMPLOYEE_ID_KEY, emp.id)
      setMyId(emp.id)
      setPinPrompt(null)
    } else {
      setPinPrompt({ ...pinPrompt, error: 'Wrong PIN', pinDraft: '' })
    }
  }

  const addEmployee = async (name: string, pin: string) => {
    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pin: pin || undefined }),
    })
    const data = await res.json()
    if (!res.ok) return { error: data.error ?? 'Could not add employee' }
    const next = [...(employees ?? []), data]
    setEmployees(next)
    localStorage.setItem(EMPLOYEE_ID_KEY, data.id)
    setMyId(data.id)
    return {}
  }

  return { employees, me, myId, selectMe, pinPrompt, setPinPrompt, confirmPin, addEmployee }
}

function MePicker({ meState }: { meState: ReturnType<typeof useMe> }) {
  const { employees, me, myId, selectMe, pinPrompt, setPinPrompt, confirmPin, addEmployee } = meState
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPin, setNewPin] = useState('')
  const [addErr, setAddErr] = useState('')

  if (employees === null) return <div className="h-7 w-32 bg-[#f0f0ee] rounded-full animate-pulse" />

  if (adding) {
    return (
      <form
        onSubmit={async e => {
          e.preventDefault()
          const result = await addEmployee(newName.trim(), newPin.trim())
          if (result.error) { setAddErr(result.error); return }
          setAdding(false); setNewName(''); setNewPin(''); setAddErr('')
        }}
        className="flex items-center gap-1.5 flex-wrap"
      >
        <input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="Your name" required
          className="w-28 px-2.5 py-1 rounded-full border border-[var(--divider)] text-[0.75rem] bg-white focus:outline-none focus:border-forest-400" />
        <input value={newPin} onChange={e => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="PIN (optional)"
          className="w-24 px-2.5 py-1 rounded-full border border-[var(--divider)] text-[0.75rem] bg-white focus:outline-none focus:border-forest-400" />
        <button type="submit" className="p-1.5 text-forest-700 bg-forest-50 rounded-full"><Check size={12} /></button>
        <button type="button" onClick={() => { setAdding(false); setAddErr('') }} className="p-1.5 text-[var(--secondary)] bg-[#f5f5f7] rounded-full"><X size={12} /></button>
        {addErr && <span className="text-[0.6875rem] text-red-500 w-full">{addErr}</span>}
      </form>
    )
  }

  if (pinPrompt) {
    const emp = employees.find(e => e.id === pinPrompt.id)
    return (
      <form
        onSubmit={e => { e.preventDefault(); confirmPin() }}
        className="flex items-center gap-1.5"
      >
        <span className="text-[0.75rem] text-[var(--secondary)]">PIN for {emp?.name}:</span>
        <input autoFocus type="password" inputMode="numeric" value={pinPrompt.pinDraft}
          onChange={e => setPinPrompt({ ...pinPrompt, pinDraft: e.target.value.replace(/\D/g, '').slice(0, 4), error: '' })}
          className="w-16 px-2.5 py-1 rounded-full border border-[var(--divider)] text-[0.75rem] bg-white focus:outline-none focus:border-forest-400" />
        <button type="submit" className="p-1.5 text-forest-700 bg-forest-50 rounded-full"><Check size={12} /></button>
        <button type="button" onClick={() => setPinPrompt(null)} className="p-1.5 text-[var(--secondary)] bg-[#f5f5f7] rounded-full"><X size={12} /></button>
        {pinPrompt.error && <span className="text-[0.6875rem] text-red-500">{pinPrompt.error}</span>}
      </form>
    )
  }

  return (
    <select
      value={myId}
      onChange={e => e.target.value === ADD_NEW_VALUE ? setAdding(true) : selectMe(e.target.value, employees)}
      className="px-2.5 py-1 rounded-full bg-[#f0f0ee] text-[0.75rem] font-medium text-[var(--secondary)] border-none focus:outline-none cursor-pointer"
    >
      <option value="" disabled>{me ? me.name : 'Who are you?'}</option>
      {employees.filter(e => e.active).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      <option value={ADD_NEW_VALUE}>+ Add myself</option>
    </select>
  )
}

function TasksSection() {
  const meState = useMe()
  const { me, employees } = meState
  const [todos,    setTodos]    = useState<Todo[] | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [newPriority, setNewPriority] = useState<TaskPriority>('normal')
  const [newDueDate, setNewDueDate] = useState('')
  const [newAssignTo, setNewAssignTo] = useState('')
  const [adding,   setAdding]   = useState(false)
  const [toast,    setToast]    = useState<string | null>(null)
  const [loadErr,  setLoadErr]  = useState<string | null>(null)

  const load = () => {
    setLoadErr(null)
    fetch('/api/todos')
      .then(r => r.json())
      .then(setTodos)
      .catch(() => setLoadErr('Could not load tasks. Check your connection and try again.'))
  }

  useEffect(load, [])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const employeeName = (id: string | null) => employees?.find(e => e.id === id)?.name ?? null

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.trim(),
        notes: newNotes.trim() || undefined,
        priority: newPriority,
        dueDate: newDueDate || undefined,
        assignedTo: newAssignTo || undefined,
        assignedBy: newAssignTo ? (me?.name ?? 'Admin') : undefined,
      }),
    })
    const created = await res.json()
    setTodos(t => [...(t ?? []), created])
    setNewTitle(''); setNewNotes(''); setNewPriority('normal'); setNewDueDate(''); setNewAssignTo(''); setAdding(false)
    flash('Task added')
  }

  const pickUp = async (todo: Todo) => {
    if (!me) { flash('Pick yourself from the list above first'); return }
    const updated = await patchTodo(todo.id, { assignedTo: me.id })
    setTodos(t => t!.map(x => x.id === todo.id ? updated : x))
  }

  const release = async (todo: Todo) => {
    const updated = await patchTodo(todo.id, { status: 'open' })
    setTodos(t => t!.map(x => x.id === todo.id ? updated : x))
  }

  const markDone = async (todo: Todo) => {
    const updated = await patchTodo(todo.id, { status: 'done' })
    setTodos(t => t!.map(x => x.id === todo.id ? updated : x))
    flash('Nice work!')
  }

  const reopen = async (todo: Todo) => {
    const updated = await patchTodo(todo.id, { status: 'open' })
    setTodos(t => t!.map(x => x.id === todo.id ? updated : x))
  }

  const removeTask = async (todo: Todo) => {
    if (!confirm(`Delete "${todo.title}"?`)) return
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: todo.id }),
    })
    setTodos(t => t!.filter(x => x.id !== todo.id))
    flash('Deleted')
  }

  if (loadErr) return (
    <div className="text-center py-16">
      <p className="text-[var(--secondary)] mb-3">{loadErr}</p>
      <button onClick={load} className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#1a2e1c' }}>
        Retry
      </button>
    </div>
  )

  if (todos === null) return <div className="text-center py-16 text-[var(--secondary)]">Loading tasks…</div>

  const open    = todos.filter(t => t.status === 'open')
  const claimed = todos.filter(t => t.status === 'claimed')
  const done    = todos.filter(t => t.status === 'done')

  return (
    <div>
      {/* Header: who's working + add task */}
      <div className="flex items-center justify-between mb-5 gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Tasks</h2>
          <MePicker meState={meState} />
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-[0.8125rem] font-medium active:scale-95 transition-transform flex-shrink-0"
            style={{ background: '#1a2e1c' }}>
            <Plus size={13} /> Add Task
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-4 p-3.5 bg-white rounded-xl border border-[var(--divider)] shadow-sm">
          <form onSubmit={addTask} className="flex flex-col gap-2">
            <input autoFocus value={newTitle} onChange={e => setNewTitle(e.target.value)}
              placeholder="What needs to be done? (e.g. Restock dairy cooler)" required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400" />
            <input value={newNotes} onChange={e => setNewNotes(e.target.value)}
              placeholder="Notes (optional)"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <select value={newPriority} onChange={e => setNewPriority(e.target.value as TaskPriority)}
                className="px-3 py-2 rounded-lg border border-[var(--divider)] text-[0.8125rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400">
                <option value="low">Low priority</option>
                <option value="normal">Normal priority</option>
                <option value="high">High priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <input type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--divider)] text-[0.8125rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400" />
              <select value={newAssignTo} onChange={e => setNewAssignTo(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--divider)] text-[0.8125rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400">
                <option value="">Leave open</option>
                {employees?.filter(e => e.active).map(e => <option key={e.id} value={e.id}>Assign to {e.name}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-white text-[0.8125rem] font-medium" style={{ background: '#1a2e1c' }}>
                Add
              </button>
              <button type="button" onClick={() => { setAdding(false); setNewTitle(''); setNewNotes('') }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-[0.8125rem] text-[var(--secondary)] bg-[#f5f5f7]">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Open */}
      <TaskGroup label="To Do" count={open.length}>
        {open.map(todo => (
          <TaskRow key={todo.id} todo={todo} employeeName={employeeName}
            onDelete={() => removeTask(todo)}
            actions={
              <button onClick={() => pickUp(todo)}
                className="w-full py-2.5 rounded-lg text-[0.8125rem] font-medium text-white active:scale-95 transition-all"
                style={{ background: '#1e4023' }}>
                Pick this up
              </button>
            } />
        ))}
        {open.length === 0 && <EmptyRow text="Nothing waiting — add a task above." />}
      </TaskGroup>

      {/* Claimed / in progress */}
      <TaskGroup label="In Progress" count={claimed.length}>
        {claimed.map(todo => (
          <TaskRow key={todo.id} todo={todo} employeeName={employeeName}
            onDelete={() => removeTask(todo)}
            actions={
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => release(todo)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[0.8125rem] font-medium border border-[var(--divider)] text-[var(--secondary)] bg-white active:scale-95 transition-all">
                  <Undo2 size={13} /> Release
                </button>
                <button onClick={() => markDone(todo)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[0.8125rem] font-medium text-white active:scale-95 transition-all"
                  style={{ background: '#1e4023' }}>
                  <Check size={13} /> Mark done
                </button>
              </div>
            } />
        ))}
        {claimed.length === 0 && <EmptyRow text="No one's working on anything right now." />}
      </TaskGroup>

      {/* Done */}
      {done.length > 0 && (
        <TaskGroup label="Done" count={done.length}>
          {done.map(todo => (
            <TaskRow key={todo.id} todo={todo} employeeName={employeeName} dimmed
              onDelete={() => removeTask(todo)}
              actions={
                <button onClick={() => reopen(todo)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.8125rem] font-medium text-[var(--secondary)] bg-[#f5f5f7] active:scale-95 transition-all">
                  <Undo2 size={13} /> Reopen
                </button>
              } />
          ))}
        </TaskGroup>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white
                        text-sm font-medium px-5 py-3 rounded-full shadow-xl z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  )
}

function TaskGroup({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-[0.8125rem] font-bold uppercase tracking-wider text-[var(--tertiary)] mb-2 px-1">
        {label} <span className="font-normal">({count})</span>
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="text-center py-8 text-[0.875rem] text-[var(--tertiary)] bg-white rounded-xl border border-dashed border-[var(--divider)]">
      {text}
    </div>
  )
}

function TaskRow({ todo, actions, onDelete, dimmed, employeeName }: {
  todo: Todo; actions: React.ReactNode; onDelete: () => void; dimmed?: boolean
  employeeName: (id: string | null) => string | null
}) {
  const assignee = employeeName(todo.assigned_to)
  const overdue = isOverdue(todo)
  return (
    <div className={`bg-white rounded-xl border shadow-sm px-3.5 py-3.5 ${dimmed ? 'opacity-60' : ''} ${overdue ? 'border-red-200' : 'border-[var(--divider)]'}`}>
      <div className="flex items-start gap-3 mb-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <p className={`font-medium text-[0.9375rem] leading-snug text-[#1d1d1f] ${todo.status === 'done' ? 'line-through' : ''}`}>
              {todo.title}
            </p>
            {todo.priority !== 'normal' && (
              <span className={`text-[0.625rem] font-bold px-1.5 py-0.5 rounded-full capitalize ${PRIORITY_STYLE[todo.priority]}`}>
                {todo.priority}
              </span>
            )}
          </div>
          {todo.notes && (
            <p className="text-[0.8125rem] text-[var(--secondary)] mt-0.5">{todo.notes}</p>
          )}
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {assignee && (
              <p className="text-[0.75rem] text-forest-700 flex items-center gap-1">
                <UserRound size={11} />
                {todo.status === 'done' ? `Done by ${assignee}` : `${todo.assigned_by ? 'Assigned to' : 'Claimed by'} ${assignee}`}
              </p>
            )}
            {todo.due_date && (
              <p className={`text-[0.75rem] flex items-center gap-1 ${overdue ? 'text-red-600 font-semibold' : 'text-[var(--tertiary)]'}`}>
                <Clock size={11} />
                {overdue ? 'Overdue — ' : 'Due '}{new Date(todo.due_date + 'T00:00').toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <button onClick={onDelete}
          className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0">
          <Trash2 size={14} />
        </button>
      </div>
      {actions}
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
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-[0.8125rem] font-medium active:scale-95 transition-transform"
            style={{ background: '#1a2e1c' }}>
            <Plus size={13} /> Add Category
          </button>
        )}
      </div>

      {/* New category form */}
      {addingCat && (
        <div className="mb-4 p-3.5 bg-white rounded-xl border border-[var(--divider)] shadow-sm">
          <form onSubmit={addCat} className="flex flex-col gap-2 sm:flex-row">
            <input autoFocus value={newCatName} onChange={e => setNewCatName(e.target.value)}
              placeholder="Category name (e.g. Hot Foods)" required
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-[#f9f9f6] focus:outline-none focus:border-forest-400" />
            <div className="flex gap-2">
              <button type="submit"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-white text-[0.8125rem] font-medium" style={{ background: '#1a2e1c' }}>
                Add
              </button>
              <button type="button" onClick={() => { setAddingCat(false); setNewCatName('') }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-[0.8125rem] text-[var(--secondary)] bg-[#f5f5f7]">
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
            <div key={cat.id} className="bg-white rounded-xl border border-[var(--divider)] shadow-sm overflow-hidden">

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
                      className="p-1.5 text-[var(--secondary)] hover:bg-[#f0f0ee] rounded-md transition-colors flex-shrink-0">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => deleteCat(cat)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-md transition-colors flex-shrink-0">
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
                              className="p-1.5 text-[var(--secondary)] hover:bg-[#f0f0ee] rounded-md transition-colors">
                              <Pencil size={13} />
                            </button>
                            <button onClick={() => deleteItem(item)}
                              className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Row 2: tap-friendly toggles */}
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => toggleItem(item.id, 'soldOut')}
                            className={`py-2 rounded-lg text-[0.8125rem] font-medium transition-all active:scale-95 border ${
                              item.soldOut
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white text-[var(--secondary)] border-[var(--divider)]'
                            }`}>
                            {item.soldOut ? '✗ Sold Out' : '✓ Available'}
                          </button>
                          <button onClick={() => toggleItem(item.id, 'featured')}
                            className={`py-2 rounded-lg text-[0.8125rem] font-medium transition-all active:scale-95 border ${
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
                <div className="px-4 py-2.5 border-t border-[#f5f5f2]">
                  <button onClick={() => { setAddItem(cat.id); setEditItem(null) }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                               text-[0.8125rem] font-medium text-forest-700 bg-forest-50 hover:bg-forest-100 transition-colors active:scale-95">
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
          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-white focus:outline-none focus:border-forest-400" />
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Description (optional)"
          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-white focus:outline-none focus:border-forest-400" />
        <input type="url" value={image} onChange={e => setImage(e.target.value)}
          placeholder="Photo URL (optional) — paste a link to a food image"
          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-white focus:outline-none focus:border-forest-400" />
        {image && (
          <img src={image} alt="preview" onError={e => (e.currentTarget.style.display='none')}
            className="w-full h-28 object-cover rounded-lg border border-[var(--divider)]" />
        )}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--secondary)]">$</span>
            <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)}
              placeholder="0.00" required
              className="w-full pl-7 pr-3.5 py-2.5 rounded-lg border border-[var(--divider)] text-[0.875rem] bg-white focus:outline-none focus:border-forest-400" />
          </div>
          <button type="submit" disabled={busy}
            className="px-4 py-2.5 rounded-lg text-white font-medium text-[0.8125rem] disabled:opacity-50 active:scale-95 transition-transform"
            style={{ background: '#1a2e1c' }}>
            {mode === 'add' ? 'Add' : 'Save'}
          </button>
          <button type="button" onClick={onCancel}
            className="px-3.5 py-2.5 rounded-lg text-[0.8125rem] text-[var(--secondary)] bg-[#f0f0ee] active:scale-95 transition-transform">
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
    <div className="bg-white rounded-xl border border-[var(--divider)] shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-[#f0f0ee] bg-[#fafaf8]">
        <h3 className="font-semibold text-[0.9375rem] text-[#1d1d1f]">{emoji} {title}</h3>
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
                  className={`px-2.5 py-1 rounded-md text-[0.75rem] font-medium transition-all active:scale-95 border ${
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
                    className="flex-1 px-3 py-2 rounded-lg border border-[var(--divider)] text-[0.875rem]
                               focus:outline-none focus:border-forest-400 bg-[#f9f9f6] text-center" />
                  <span className="text-[var(--tertiary)] text-sm flex-shrink-0">to</span>
                  <input type="time" value={d.close} onChange={e => onChange(day, 'close', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-[var(--divider)] text-[0.875rem]
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

// ─── ORDERS SECTION ───────────────────────────────────────────────────────
const STATUS_OPTIONS: OrderStatus[] = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'payment_failed']

const FILTERS = ['all', 'pending', 'paid', 'processing', 'shipped', 'delivered', 'refunded', 'cancelled'] as const
type Filter = typeof FILTERS[number]

function OrdersSection() {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [loadErr, setLoadErr] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [actionErr, setActionErr] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  const load = () => {
    setLoadErr(null)
    fetch('/api/admin/orders')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(rows => setOrders(rows.map(mapOrderRow)))
      .catch(() => setLoadErr('Could not load orders.'))
  }

  useEffect(load, [])

  const updateStatus = async (id: string, status: OrderStatus) => {
    setBusyId(id)
    setActionErr(null)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      load()
    } catch {
      setActionErr('Could not update that order\'s status.')
    } finally {
      setBusyId(null)
    }
  }

  const refund = async (order: Order) => {
    if (!confirm(`Refund ${order.customerName}'s order for $${(order.totalCents / 100).toFixed(2)}? This charges back to their card immediately and cannot be undone.`)) return
    setBusyId(order.id)
    setActionErr(null)
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/refund`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Refund failed')
      load()
    } catch (err) {
      setActionErr(err instanceof Error ? err.message : 'Refund failed.')
    } finally {
      setBusyId(null)
    }
  }

  if (loadErr) return <p className="text-center text-red-500 py-10">{loadErr}</p>
  if (!orders) return <p className="text-center text-[var(--tertiary)] py-10">Loading orders…</p>

  const revenueCents = orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + o.totalCents, 0)
  const needsActionCount = orders.filter(o => o.status === 'pending' || o.status === 'paid').length
  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => filter === 'refunded' ? o.paymentStatus === 'refunded' : o.status === filter)

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        {[
          { icon: DollarSign, label: 'Revenue', value: `$${(revenueCents / 100).toFixed(2)}` },
          { icon: ShoppingBag, label: 'Orders', value: String(orders.length) },
          { icon: Hourglass, label: 'Needs Action', value: String(needsActionCount) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white border border-[var(--divider)] rounded-2xl p-3 sm:p-4 text-center">
            <Icon size={16} className="mx-auto mb-1.5 text-[#1a2e1c]" />
            <div className="font-bold text-base sm:text-lg text-[#1d1d1f] truncate">{value}</div>
            <div className="text-[0.6875rem] sm:text-xs text-[var(--tertiary)] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              filter === f ? 'bg-[#1a2e1c] text-white' : 'bg-[#f0f0ee] text-[var(--secondary)]'
            }`}
          >
            {f === 'all' ? `All (${orders.length})` : f}
          </button>
        ))}
      </div>

      {actionErr && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-4">
          {actionErr}
        </div>
      )}
      {filteredOrders.length === 0 ? (
        <p className="text-center text-[var(--tertiary)] py-10">No orders{filter !== 'all' ? ` matching "${filter}"` : ' yet'}.</p>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <details key={order.id} className="bg-white border border-[var(--divider)] rounded-2xl p-3 sm:p-4 group">
              <summary className="list-none cursor-pointer flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-sm text-[#1d1d1f]">{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className={`text-[0.625rem] font-bold px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--tertiary)] mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                  <p className="text-sm text-[var(--secondary)] mt-1 truncate">{order.customerName} · {order.customerEmail}</p>
                  <p className="text-xs text-[var(--tertiary)] mt-0.5">{itemCount(order)} items</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start flex-shrink-0 gap-1">
                  <p className="font-bold text-[#1d1d1f]">${(order.totalCents / 100).toFixed(2)}</p>
                  <p className="text-xs text-[var(--tertiary)] capitalize">{order.paymentStatus}</p>
                </div>
              </summary>

              <div className="mt-3 pt-3 border-t border-[var(--divider)] space-y-3">
                <div className="space-y-1">
                  {order.items.map(item => (
                    <div key={item.productSku} className="flex justify-between text-sm">
                      <span className="text-[var(--secondary)]">{item.name} × {item.quantity}</span>
                      <span className="text-[#1d1d1f]">${(item.lineTotalCents / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--tertiary)]">
                  {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zip}
                </p>
                {order.cloverChargeId && (
                  <p className="text-xs text-[var(--tertiary)] font-mono">Charge: {order.cloverChargeId}</p>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={order.status}
                    disabled={busyId === order.id}
                    onChange={e => updateStatus(order.id, e.target.value as OrderStatus)}
                    className="px-3 py-1.5 rounded-lg border border-[var(--divider)] text-xs font-medium bg-[#f9f9f6] disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
                  </select>

                  {order.paymentStatus === 'paid' && (
                    <button
                      onClick={() => refund(order)}
                      disabled={busyId === order.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                                 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <RotateCcw size={12} />
                      {busyId === order.id ? 'Refunding…' : 'Refund'}
                    </button>
                  )}
                  {order.paymentStatus === 'refunded' && (
                    <span className="text-xs font-semibold text-red-600">Refunded</span>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── TEAM SECTION ─────────────────────────────────────────────────────────
interface EmployeeStats {
  employee: Employee
  total: number
  completed: number
  inProgress: number
  overdue: number
  completionRate: number
  avgCompletionHours: number | null
  recent: Todo[]
}

function computeStats(employees: Employee[], todos: Todo[]): EmployeeStats[] {
  return employees.map(employee => {
    const mine = todos.filter(t => t.assigned_to === employee.id)
    const completed = mine.filter(t => t.status === 'done')
    const inProgress = mine.filter(t => t.status === 'claimed')
    const overdue = mine.filter(isOverdue)

    const durations = completed
      .filter(t => t.completed_at)
      .map(t => (new Date(t.completed_at!).getTime() - new Date(t.created_at).getTime()) / 3600000)
    const avgCompletionHours = durations.length > 0
      ? durations.reduce((s, d) => s + d, 0) / durations.length
      : null

    const recent = [...mine].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5)

    return {
      employee,
      total: mine.length,
      completed: completed.length,
      inProgress: inProgress.length,
      overdue: overdue.length,
      completionRate: mine.length > 0 ? Math.round((completed.length / mine.length) * 100) : 0,
      avgCompletionHours,
      recent,
    }
  })
}

function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}m`
  if (hours < 48) return `${hours.toFixed(1)}h`
  return `${(hours / 24).toFixed(1)}d`
}

function TeamSection() {
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/employees').then(r => r.json()),
      fetch('/api/todos').then(r => r.json()),
    ]).then(([e, t]) => { setEmployees(e); setTodos(t) })
  }, [])

  if (employees === null || todos === null) {
    return <p className="text-center text-[var(--tertiary)] py-10">Loading team…</p>
  }

  const stats = computeStats(employees.filter(e => e.active), todos)
    .sort((a, b) => b.total - a.total)

  return (
    <div>
      <h2 className="font-bold text-lg text-[#1d1d1f] mb-4">Team Accountability</h2>
      {stats.length === 0 ? (
        <p className="text-center text-[var(--tertiary)] py-10">No employees yet — add yourself from the Tasks tab.</p>
      ) : (
        <div className="space-y-3">
          {stats.map(s => (
            <div key={s.employee.id} className="bg-white border border-[var(--divider)] rounded-2xl p-4">
              <button
                onClick={() => setExpanded(expanded === s.employee.id ? null : s.employee.id)}
                className="w-full flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-forest-100 text-forest-800 font-bold flex items-center justify-center flex-shrink-0">
                    {s.employee.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="font-semibold text-[#1d1d1f] truncate">{s.employee.name}</p>
                    <p className="text-xs text-[var(--tertiary)]">{s.total} task{s.total === 1 ? '' : 's'} total</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-[var(--tertiary)] flex-shrink-0 transition-transform ${expanded === s.employee.id ? 'rotate-180' : ''}`} />
              </button>

              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { label: 'Completed', value: s.completed, color: 'text-forest-700' },
                  { label: 'In Progress', value: s.inProgress, color: 'text-blue-700' },
                  { label: 'Overdue', value: s.overdue, color: s.overdue > 0 ? 'text-red-600' : 'text-[var(--tertiary)]' },
                  { label: 'Completion', value: `${s.completionRate}%`, color: 'text-[#1d1d1f]' },
                ].map(stat => (
                  <div key={stat.label} className="text-center py-2 rounded-lg bg-[#f9f9f6]">
                    <div className={`font-bold text-sm ${stat.color}`}>{stat.value}</div>
                    <div className="text-[0.625rem] text-[var(--tertiary)] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {expanded === s.employee.id && (
                <div className="mt-3 pt-3 border-t border-[var(--divider)]">
                  {s.avgCompletionHours != null && (
                    <p className="text-xs text-[var(--secondary)] mb-2">
                      Avg. time to complete a task: <strong>{formatDuration(s.avgCompletionHours)}</strong>
                    </p>
                  )}
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--tertiary)] mb-1.5">Recent tasks</p>
                  {s.recent.length === 0 ? (
                    <p className="text-xs text-[var(--tertiary)]">No tasks yet.</p>
                  ) : (
                    <div className="space-y-1">
                      {s.recent.map(t => (
                        <div key={t.id} className="flex items-center justify-between text-xs gap-2">
                          <span className={`truncate ${t.status === 'done' ? 'text-[var(--tertiary)] line-through' : 'text-[#1d1d1f]'}`}>
                            {t.title}
                          </span>
                          <span className={`flex-shrink-0 px-1.5 py-0.5 rounded-full font-medium ${
                            t.status === 'done' ? 'bg-forest-50 text-forest-700'
                            : t.status === 'claimed' ? 'bg-blue-50 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
