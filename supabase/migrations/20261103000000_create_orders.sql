-- ============================================================
-- Orders — real checkout persistence (Phase 2)
-- Payment is processed directly by this app's server against
-- Clover's Ecommerce API; this table is this website's own
-- record of what was charged, to whom, and for what.
-- ============================================================
create table orders (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  clover_charge_id   text,             -- Clover charge id once payment succeeds; null until confirmed
  status             text not null default 'pending'
                     check (status in ('pending','paid','payment_failed','processing','shipped','delivered','cancelled')),
  payment_status     text not null default 'pending'
                     check (payment_status in ('pending','paid','failed','refunded')),
  subtotal_cents     integer not null check (subtotal_cents >= 0),
  tax_cents          integer not null check (tax_cents >= 0),
  delivery_fee_cents integer not null check (delivery_fee_cents >= 0),
  total_cents        integer not null check (total_cents >= 0),
  currency           text not null default 'usd',
  customer_name      text not null,
  customer_email     text not null,
  customer_phone     text,
  delivery_street    text not null,
  delivery_apt       text,
  delivery_city      text not null,
  delivery_state     text not null,
  delivery_zip       text not null,
  estimated_delivery timestamptz,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

comment on table orders is 'Checkout orders placed through the Clover payment flow. Amounts stored in integer cents to match the Clover charge API and avoid float rounding.';
comment on column orders.clover_charge_id is 'Charge id returned by Clover''s Ecommerce API on a successful charge.';

create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- ============================================================
-- ORDER ITEMS
-- ============================================================
create table order_items (
  id               uuid primary key default gen_random_uuid(),
  order_id         uuid not null references orders(id) on delete cascade,
  product_sku      text not null,   -- CartItem.product.id / backoffice SKU — not an FK, catalog isn't stored locally
  name             text not null,   -- snapshot at purchase time, product may change/disappear later
  unit             text,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity         integer not null check (quantity > 0),
  line_total_cents integer not null check (line_total_cents >= 0)
);

comment on table order_items is 'Line-item snapshot per order. Deliberately denormalized (name/price captured at purchase time) since the product catalog is sourced live from the backoffice, not stored locally.';

create index idx_orders_user_id    on orders(user_id, created_at desc);
create index idx_order_items_order on order_items(order_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- Authenticated users can create and read only their own orders.
-- No anon access, no customer-side update/delete — status changes
-- are an admin/backoffice concern, out of scope here.
-- ============================================================
alter table orders      enable row level security;
alter table order_items enable row level security;

create policy "Users can read their own orders"
  on orders for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on orders for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can read their own order items"
  on order_items for select to authenticated
  using (exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid()));

create policy "Users can insert items for their own orders"
  on order_items for insert to authenticated
  with check (exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid()));

grant select, insert on orders, order_items to authenticated;
