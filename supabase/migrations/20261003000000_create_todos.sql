-- ============================================================
-- Employee Todo Board
-- Shared task list for /bm-admin — employees pick up open tasks
-- and mark them done. Gated at the app layer by ADMIN_PASSWORD,
-- same as deli_menu / store_settings, so RLS here just needs to
-- allow the anon key through.
-- ============================================================
create table todos (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  notes        text,
  status       text not null default 'open' check (status in ('open', 'claimed', 'done')),
  claimed_by   text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now(),
  completed_at timestamptz
);

comment on table todos is 'Shared employee todo board shown on /bm-admin. Anyone with the store admin password can add, claim, or complete a task.';

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger todos_updated_at
  before update on todos
  for each row execute function set_updated_at();

create index idx_todos_status on todos(status);

alter table todos enable row level security;

create policy "Anyone can read todos"
  on todos for select to anon, authenticated using (true);

create policy "Anyone can add todos"
  on todos for insert to anon, authenticated with check (true);

create policy "Anyone can update todos"
  on todos for update to anon, authenticated using (true);

create policy "Anyone can delete todos"
  on todos for delete to anon, authenticated using (true);

grant select, insert, update, delete on todos to anon, authenticated;
