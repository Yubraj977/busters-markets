-- ============================================================
-- Centralized staff identity: real Supabase accounts (same
-- login as customers, incl. Google) instead of a separate
-- employees + PIN system. staff_roles is the access-grant: a
-- row here means this auth.users account can get into /bm-admin.
-- ============================================================
create table staff_roles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  name       text not null,
  role       text not null default 'staff' check (role in ('staff', 'admin')),
  active     boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table staff_roles is 'Grants /bm-admin access to a real Supabase account. "staff" can use Tasks/Deli/Hours; "admin" additionally gets Orders (incl. refunds) and can manage other staff. Not a separate login system -- the account itself is the same one used for customer checkout.';

create trigger staff_roles_updated_at
  before update on staff_roles
  for each row execute function set_updated_at();

alter table staff_roles enable row level security;

-- Users can only read their own grant row via the regular client (used by
-- the server-side role check on every /bm-admin page load). Listing ALL
-- staff and granting/revoking roles happens through the service-role admin
-- API routes only -- same split already used for orders.
create policy "Users can read their own staff role"
  on staff_roles for select to authenticated
  using (auth.uid() = user_id);

grant select on staff_roles to authenticated;

-- ============================================================
-- Drop the short-lived employees+PIN system (just added, no real
-- usage yet) and repoint todos.assigned_to at staff_roles instead.
-- ============================================================
alter table todos drop constraint if exists todos_assigned_to_fkey;

update todos set assigned_to = null, assigned_by = null;

alter table todos
  add constraint todos_assigned_to_fkey foreign key (assigned_to) references staff_roles(user_id) on delete set null;

drop table if exists employees;
