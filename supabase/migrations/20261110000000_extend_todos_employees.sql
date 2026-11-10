-- ============================================================
-- Employee roster + task assignment/accountability
-- Same trust model as todos: gated at the app layer by
-- ADMIN_PASSWORD, RLS just lets the anon key through.
-- ============================================================
create table employees (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  pin        text,                       -- optional 4-digit PIN, a light identity check not real auth
  active     boolean not null default true,
  created_at timestamptz default now()
);

comment on table employees is 'Store staff roster shown on /bm-admin. Not real auth -- same shared-password trust model as the rest of /bm-admin, this just replaces free-typed names with a fixed list so task credit cannot be typo''d or faked under someone else''s name.';

alter table employees enable row level security;

create policy "Anyone can read employees"
  on employees for select to anon, authenticated using (true);
create policy "Anyone can add employees"
  on employees for insert to anon, authenticated with check (true);
create policy "Anyone can update employees"
  on employees for update to anon, authenticated using (true);

grant select, insert, update on employees to anon, authenticated;

-- ============================================================
-- Extend todos: assignment, priority, due date
-- assigned_to replaces claimed_by going forward (kept for history,
-- no longer written to by the app) -- same column now works for
-- both self-claim (employee sets it on themselves) and admin
-- assignment (assigned_by records who assigned it).
-- ============================================================
alter table todos
  add column assigned_to uuid references employees(id) on delete set null,
  add column assigned_by text,
  add column priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  add column due_date date;

comment on column todos.assigned_to is 'Employee working this task -- set by the employee themselves (self-claim) or by an admin (assignment, see assigned_by).';
comment on column todos.assigned_by is 'Name of whoever assigned this task to someone else. Null if self-claimed.';

create index idx_todos_assigned_to on todos(assigned_to);
create index idx_todos_due_date on todos(due_date) where due_date is not null;
