-- ============================================================
-- Tasks robustness: categories, recurring tasks, activity log
-- ============================================================
alter table todos
  add column category text not null default 'general'
    check (category in ('general', 'deli', 'stocking', 'cleaning', 'register', 'other')),
  add column recurrence text
    check (recurrence in ('daily', 'weekly'));

comment on column todos.category is 'Area of the store this task belongs to, for filtering.';
comment on column todos.recurrence is 'If set, completing this task auto-creates the next occurrence (due_date + 1 day for daily, +7 for weekly).';

create index idx_todos_category on todos(category);

create table todo_comments (
  id         uuid primary key default gen_random_uuid(),
  todo_id    uuid not null references todos(id) on delete cascade,
  author     text not null,
  body       text not null,
  created_at timestamptz default now()
);

comment on table todo_comments is 'Activity/comment log per task. Same app-layer trust model as todos -- gated by /bm-admin access, not per-row auth.';

create index idx_todo_comments_todo_id on todo_comments(todo_id, created_at);

alter table todo_comments enable row level security;

create policy "Anyone can read todo comments"
  on todo_comments for select to anon, authenticated using (true);
create policy "Anyone can add todo comments"
  on todo_comments for insert to anon, authenticated with check (true);

grant select, insert on todo_comments to anon, authenticated;
