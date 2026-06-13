-- ============================================================
-- Buster's Markets — Phase 1 Schema (Product Catalog)
-- ============================================================

-- ============================================================
-- AISLES
-- ============================================================
create table aisles (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  floor       int default 1,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

comment on table aisles is 'Physical store aisles. Products link here once the store layout is finalized.';

-- ============================================================
-- CATEGORIES
-- ============================================================
create table categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique not null,
  icon       text,           -- emoji icon
  color      text,           -- tailwind classes e.g. "bg-rose-100 text-rose-800"
  sort_order int default 0,
  created_at timestamptz default now()
);

comment on table categories is 'Product categories shown in navigation and filter chips.';

-- ============================================================
-- PRODUCTS
-- ============================================================
create table products (
  id            text primary key,             -- slug-based e.g. "bigelow-earl-grey-6-20ct"
  name          text not null,
  slug          text unique not null,
  description   text,
  price         numeric(10,2) not null check (price >= 0),
  compare_price numeric(10,2) check (compare_price > price), -- set = on sale, null = regular price
  unit          text,                          -- "12/0.35oz", "each", "6/20ct"
  category_id   uuid references categories(id) on delete set null,
  aisle_id      uuid references aisles(id) on delete set null,  -- nullable until layout decided
  image_url     text,
  in_stock      boolean not null default true,
  is_new        boolean not null default false,
  is_featured   boolean not null default false, -- pinned to homepage / category top
  tags          text[] default '{}',            -- ["organic", "gluten-free", "sugar-free"]
  rating        numeric(3,1) check (rating between 0 and 5),
  review_count  int default 0,
  sort_order    int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

comment on table products is 'Full product catalog. compare_price being set signals a sale item.';
comment on column products.aisle_id is 'Nullable — assign once store layout is finalized.';
comment on column products.compare_price is 'Original price before sale. If set, product is on sale.';

-- auto-update updated_at on any row change
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ============================================================
-- PROMOTIONS  (weekly specials, banners, deal of the day)
-- ============================================================
create table promotions (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  image_url   text,
  type        text not null check (type in ('banner', 'weekly_special', 'deal_of_day', 'seasonal')),
  starts_at   date,
  ends_at     date,
  is_active   boolean not null default true,
  sort_order  int default 0,
  created_at  timestamptz default now(),
  constraint valid_date_range check (ends_at is null or ends_at >= starts_at)
);

comment on table promotions is 'Homepage banners, weekly specials, and promotional campaigns.';

-- ============================================================
-- PROMOTION PRODUCTS  (which products belong to a promotion)
-- ============================================================
create table promotion_products (
  promotion_id uuid references promotions(id) on delete cascade,
  product_id   text references products(id) on delete cascade,
  primary key (promotion_id, product_id)
);

comment on table promotion_products is 'Junction table linking promotions to their featured products.';

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_products_category    on products(category_id);
create index idx_products_aisle       on products(aisle_id);
create index idx_products_in_stock    on products(in_stock);
create index idx_products_is_new      on products(is_new) where is_new = true;
create index idx_products_is_featured on products(is_featured) where is_featured = true;
create index idx_products_tags        on products using gin(tags);
create index idx_products_price       on products(price);
create index idx_products_search      on products using gin(to_tsvector('english', name));
create index idx_promotions_active    on promotions(is_active, starts_at, ends_at);

-- ============================================================
-- ROW LEVEL SECURITY
-- Phase 1: everything is public read-only.
-- Writes happen via Supabase dashboard / service role only.
-- ============================================================
alter table aisles             enable row level security;
alter table categories         enable row level security;
alter table products           enable row level security;
alter table promotions         enable row level security;
alter table promotion_products enable row level security;

-- Public read policies
create policy "Public can read aisles"
  on aisles for select to anon, authenticated using (true);

create policy "Public can read categories"
  on categories for select to anon, authenticated using (true);

create policy "Public can read products"
  on products for select to anon, authenticated using (true);

create policy "Public can read active promotions"
  on promotions for select to anon, authenticated
  using (
    is_active = true
    and (starts_at is null or starts_at <= current_date)
    and (ends_at   is null or ends_at   >= current_date)
  );

create policy "Public can read promotion products"
  on promotion_products for select to anon, authenticated using (true);

-- ============================================================
-- GRANT DATA API ACCESS
-- (needed for Supabase REST/PostgREST to expose these tables)
-- ============================================================
grant select on aisles, categories, products, promotions, promotion_products
  to anon, authenticated;
