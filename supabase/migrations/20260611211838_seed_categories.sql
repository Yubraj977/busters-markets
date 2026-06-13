-- ============================================================
-- Seed: All 23 categories from Buster's Markets catalog
-- Fixed UUIDs so they can be referenced by products later
-- ============================================================
insert into categories (id, name, slug, icon, color, sort_order) values
  ('a1000000-0000-0000-0000-000000000001', 'Asian Foods',                 'asian-foods',               '🍜', 'bg-rose-100 text-rose-800',    1),
  ('a1000000-0000-0000-0000-000000000002', 'Beer & Cider',                'beer-cider',                '🍺', 'bg-amber-100 text-amber-800',   2),
  ('a1000000-0000-0000-0000-000000000003', 'Beverages',                   'beverages',                 '🥤', 'bg-blue-100 text-blue-800',     3),
  ('a1000000-0000-0000-0000-000000000004', 'Bread & Bakery',              'bread-bakery',              '🍞', 'bg-amber-100 text-amber-800',   4),
  ('a1000000-0000-0000-0000-000000000005', 'Chips & Snacks',              'chips-snacks',              '🥨', 'bg-yellow-100 text-yellow-800', 5),
  ('a1000000-0000-0000-0000-000000000006', 'Coffee & Tea',                'coffee-tea',                '☕', 'bg-amber-100 text-amber-800',   6),
  ('a1000000-0000-0000-0000-000000000007', 'Condiments & Spices',         'condiments-spices',         '🧂', 'bg-lime-100 text-lime-800',     7),
  ('a1000000-0000-0000-0000-000000000008', 'Cookies & Crackers',          'cookies-crackers',          '🍪', 'bg-orange-100 text-orange-800', 8),
  ('a1000000-0000-0000-0000-000000000009', 'Dairy',                       'dairy',                     '🧀', 'bg-sky-100 text-sky-800',       9),
  ('a1000000-0000-0000-0000-000000000010', 'Frozen Meals & Sides',        'frozen-meals-sides',        '🧊', 'bg-cyan-100 text-cyan-800',     10),
  ('a1000000-0000-0000-0000-000000000011', 'Grocery',                     'grocery',                   '🛒', 'bg-gray-100 text-gray-800',     11),
  ('a1000000-0000-0000-0000-000000000012', 'Household & Cleaning',        'household-cleaning',        '🧹', 'bg-teal-100 text-teal-800',     12),
  ('a1000000-0000-0000-0000-000000000013', 'Ice Cream & Frozen Desserts', 'ice-cream-frozen-desserts', '🍦', 'bg-purple-100 text-purple-800', 13),
  ('a1000000-0000-0000-0000-000000000014', 'Indian & South Asian',        'indian-south-asian',        '🍛', 'bg-orange-100 text-orange-800', 14),
  ('a1000000-0000-0000-0000-000000000015', 'Jams, Spreads & Syrups',      'jams-spreads-syrups',       '🍯', 'bg-red-100 text-red-800',       15),
  ('a1000000-0000-0000-0000-000000000016', 'Meat & Seafood',              'meat-seafood',              '🥩', 'bg-red-100 text-red-800',       16),
  ('a1000000-0000-0000-0000-000000000017', 'Noodles & Pasta',             'noodles-pasta',             '🍝', 'bg-yellow-100 text-yellow-800', 17),
  ('a1000000-0000-0000-0000-000000000018', 'Oils & Vinegars',             'oils-vinegars',             '🫙', 'bg-yellow-100 text-yellow-800', 18),
  ('a1000000-0000-0000-0000-000000000019', 'Pantry Staples',              'pantry-staples',            '🥫', 'bg-stone-100 text-stone-800',   19),
  ('a1000000-0000-0000-0000-000000000020', 'Personal Care',               'personal-care',             '🪥', 'bg-pink-100 text-pink-800',     20),
  ('a1000000-0000-0000-0000-000000000021', 'Produce',                     'produce',                   '🥦', 'bg-green-100 text-green-800',   21),
  ('a1000000-0000-0000-0000-000000000022', 'Soups & Broths',              'soups-broths',              '🍲', 'bg-orange-100 text-orange-800', 22),
  ('a1000000-0000-0000-0000-000000000023', 'Wild Bird Food',              'wild-bird-food',            '🐦', 'bg-green-100 text-green-800',   23)
on conflict (id) do nothing;
