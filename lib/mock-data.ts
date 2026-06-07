import { Product, Category } from './types'

export const categories: Category[] = [
  {
    "id": "1",
    "name": "Asian Foods",
    "slug": "asian-foods",
    "icon": "🍜",
    "color": "bg-rose-100 text-rose-800",
    "productCount": 5
  },
  {
    "id": "2",
    "name": "Beer & Cider",
    "slug": "beer-cider",
    "icon": "🍺",
    "color": "bg-amber-100 text-amber-800",
    "productCount": 22
  },
  {
    "id": "3",
    "name": "Beverages",
    "slug": "beverages",
    "icon": "🥤",
    "color": "bg-blue-100 text-blue-800",
    "productCount": 10
  },
  {
    "id": "4",
    "name": "Bread & Bakery",
    "slug": "bread-bakery",
    "icon": "🍞",
    "color": "bg-amber-100 text-amber-800",
    "productCount": 2
  },
  {
    "id": "5",
    "name": "Chips & Snacks",
    "slug": "chips-snacks",
    "icon": "🥨",
    "color": "bg-yellow-100 text-yellow-800",
    "productCount": 25
  },
  {
    "id": "6",
    "name": "Coffee & Tea",
    "slug": "coffee-tea",
    "icon": "☕",
    "color": "bg-amber-100 text-amber-800",
    "productCount": 2
  },
  {
    "id": "7",
    "name": "Condiments & Spices",
    "slug": "condiments-spices",
    "icon": "🧂",
    "color": "bg-lime-100 text-lime-800",
    "productCount": 11
  },
  {
    "id": "8",
    "name": "Cookies & Crackers",
    "slug": "cookies-crackers",
    "icon": "🍪",
    "color": "bg-orange-100 text-orange-800",
    "productCount": 2
  },
  {
    "id": "9",
    "name": "Dairy",
    "slug": "dairy",
    "icon": "🧀",
    "color": "bg-sky-100 text-sky-800",
    "productCount": 11
  },
  {
    "id": "10",
    "name": "Frozen Meals & Sides",
    "slug": "frozen-meals-sides",
    "icon": "🧊",
    "color": "bg-cyan-100 text-cyan-800",
    "productCount": 13
  },
  {
    "id": "11",
    "name": "Grocery",
    "slug": "grocery",
    "icon": "🛒",
    "color": "bg-gray-100 text-gray-800",
    "productCount": 55
  },
  {
    "id": "12",
    "name": "Household & Cleaning",
    "slug": "household-cleaning",
    "icon": "🧹",
    "color": "bg-teal-100 text-teal-800",
    "productCount": 3
  },
  {
    "id": "13",
    "name": "Ice Cream & Frozen Desserts",
    "slug": "ice-cream-frozen-desserts",
    "icon": "🍦",
    "color": "bg-purple-100 text-purple-800",
    "productCount": 12
  },
  {
    "id": "14",
    "name": "Indian & South Asian",
    "slug": "indian-south-asian",
    "icon": "🍛",
    "color": "bg-orange-100 text-orange-800",
    "productCount": 25
  },
  {
    "id": "15",
    "name": "Jams, Spreads & Syrups",
    "slug": "jams-spreads-syrups",
    "icon": "🍯",
    "color": "bg-red-100 text-red-800",
    "productCount": 3
  },
  {
    "id": "16",
    "name": "Meat & Seafood",
    "slug": "meat-seafood",
    "icon": "🥩",
    "color": "bg-red-100 text-red-800",
    "productCount": 22
  },
  {
    "id": "17",
    "name": "Noodles & Pasta",
    "slug": "noodles-pasta",
    "icon": "🍝",
    "color": "bg-yellow-100 text-yellow-800",
    "productCount": 4
  },
  {
    "id": "18",
    "name": "Oils & Vinegars",
    "slug": "oils-vinegars",
    "icon": "🫙",
    "color": "bg-yellow-100 text-yellow-800",
    "productCount": 3
  },
  {
    "id": "19",
    "name": "Pantry Staples",
    "slug": "pantry-staples",
    "icon": "🥫",
    "color": "bg-stone-100 text-stone-800",
    "productCount": 2
  },
  {
    "id": "20",
    "name": "Personal Care",
    "slug": "personal-care",
    "icon": "🪥",
    "color": "bg-pink-100 text-pink-800",
    "productCount": 1
  },
  {
    "id": "21",
    "name": "Produce",
    "slug": "produce",
    "icon": "🥦",
    "color": "bg-green-100 text-green-800",
    "productCount": 27
  },
  {
    "id": "22",
    "name": "Soups & Broths",
    "slug": "soups-broths",
    "icon": "🍲",
    "color": "bg-orange-100 text-orange-800",
    "productCount": 1
  },
  {
    "id": "23",
    "name": "Wild Bird Food",
    "slug": "wild-bird-food",
    "icon": "🐦",
    "color": "bg-green-100 text-green-800",
    "productCount": 9
  }
]

export const products: Product[] = [
  {
    "id": "bibigo-organic-sesame-seaweed-snack-12-0-35oz",
    "name": "Bibigo Organic Sesame Seaweed Snack",
    "slug": "bibigo-organic-sesame-seaweed-snack-12-0-35oz",
    "description": "Bibigo Organic Sesame Seaweed Snack (12/0.35oz). Authentic Asian flavors at your fingertips.",
    "price": 2.53,
    "unit": "12/0.35oz",
    "category": "asian-foods",
    "image": "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 167,
    "tags": [
      "asian-foods",
      "organic",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "annie-chun-s-pad-thai-noodle-bowl-6-8-52oz",
    "name": "Annie Chun's Pad Thai Noodle Bowl",
    "slug": "annie-chun-s-pad-thai-noodle-bowl-6-8-52oz",
    "description": "Annie Chun's Pad Thai Noodle Bowl (6/8.52oz). A satisfying and flavorful meal.",
    "price": 4.63,
    "unit": "6/8.52oz",
    "category": "noodles-pasta",
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 103,
    "tags": [
      "noodles-pasta",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "annie-chun-s-sweet-chili-noodle-bowl-6-8-38oz",
    "name": "Annie Chun's Sweet Chili Noodle Bowl",
    "slug": "annie-chun-s-sweet-chili-noodle-bowl-6-8-38oz",
    "description": "Annie Chun's Sweet Chili Noodle Bowl (6/8.38oz). A satisfying and flavorful meal.",
    "price": 4.63,
    "unit": "6/8.38oz",
    "category": "noodles-pasta",
    "image": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 16,
    "tags": [
      "noodles-pasta",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "annie-chun-s-peanut-satay-noodle-bowl-6-8-71oz",
    "name": "Annie Chun's Peanut Satay Noodle Bowl",
    "slug": "annie-chun-s-peanut-satay-noodle-bowl-6-8-71oz",
    "description": "Annie Chun's Peanut Satay Noodle Bowl (6/8.71oz). A satisfying and flavorful meal.",
    "price": 4.63,
    "unit": "6/8.71oz",
    "category": "noodles-pasta",
    "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 120,
    "tags": [
      "noodles-pasta",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "annie-chun-s-miso-soup-bowl-6-5-52oz",
    "name": "Annie Chun's Miso Soup Bowl",
    "slug": "annie-chun-s-miso-soup-bowl-6-5-52oz",
    "description": "Annie Chun's Miso Soup Bowl (6/5.52oz). Authentic Asian flavors at your fingertips.",
    "price": 4.63,
    "unit": "6/5.52oz",
    "category": "asian-foods",
    "image": "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 80,
    "tags": [
      "asian-foods",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "annie-chun-s-pho-soup-bowl-6-5-4oz",
    "name": "Annie Chun's Pho Soup Bowl",
    "slug": "annie-chun-s-pho-soup-bowl-6-5-4oz",
    "description": "Annie Chun's Pho Soup Bowl (6/5.4oz). A satisfying and flavorful meal.",
    "price": 4.63,
    "unit": "6/5.4oz",
    "category": "noodles-pasta",
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 94,
    "tags": [
      "noodles-pasta",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "bikaji-tana-tan-aloo-bhujia-10-14-1oz",
    "name": "Bikaji Tana Tan Aloo Bhujia",
    "slug": "bikaji-tana-tan-aloo-bhujia-10-14-1oz",
    "description": "Bikaji Tana Tan Aloo Bhujia (10/14.1oz). Authentic flavors from South Asia.",
    "price": 8.11,
    "unit": "10/14.1oz",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 135,
    "tags": [
      "indian-south-asian",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "beano-s-submarine-dressing-12-8floz",
    "name": "Beano's Submarine Dressing",
    "slug": "beano-s-submarine-dressing-12-8floz",
    "description": "Beano's Submarine Dressing (12/8floz). Enhance any dish with bold flavors.",
    "price": 3.42,
    "unit": "12/8floz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 54,
    "tags": [
      "condiments-spices",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "bigelow-earl-grey-6-20ct",
    "name": "Bigelow Earl Grey",
    "slug": "bigelow-earl-grey-6-20ct",
    "description": "Bigelow Earl Grey (6/20ct). Quality product from Buster's Markets.",
    "price": 4.35,
    "comparePrice": 5.22,
    "unit": "6/20ct",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 28,
    "tags": [
      "grocery",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "bigelow-green-tea-6-20ct",
    "name": "Bigelow Green Tea",
    "slug": "bigelow-green-tea-6-20ct",
    "description": "Bigelow Green Tea (6/20ct). Rich flavor to start your morning right.",
    "price": 4.35,
    "unit": "6/20ct",
    "category": "coffee-tea",
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 179,
    "tags": [
      "coffee-tea",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "biscoff-cookies-10-8-87oz",
    "name": "Biscoff Cookies",
    "slug": "biscoff-cookies-10-8-87oz",
    "description": "Biscoff Cookies (10/8.87oz). Crunchy and delicious, great for snacking.",
    "price": 5.57,
    "unit": "10/8.87oz",
    "category": "cookies-crackers",
    "image": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 131,
    "tags": [
      "cookies-crackers",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "bonne-maman-cherry-preserves-6-13oz",
    "name": "Bonne Maman Cherry Preserves",
    "slug": "bonne-maman-cherry-preserves-6-13oz",
    "description": "Bonne Maman Cherry Preserves (6/13oz). Sweet and delicious on anything.",
    "price": 9.21,
    "comparePrice": 11.05,
    "unit": "6/13oz",
    "category": "jams-spreads-syrups",
    "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 48,
    "tags": [
      "jams-spreads-syrups",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "blue-diamond-nut-thins-gf-hint-of-salt-12-4-25oz",
    "name": "Blue Diamond Nut Thins GF Hint of Salt",
    "slug": "blue-diamond-nut-thins-gf-hint-of-salt-12-4-25oz",
    "description": "Blue Diamond Nut Thins GF Hint of Salt (12/4.25oz). Quality product from Buster's Markets.",
    "price": 5.59,
    "unit": "12/4.25oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 170,
    "tags": [
      "grocery",
      "gluten-free",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "country-sweet-mild-sauce-6-21oz",
    "name": "Country Sweet Mild Sauce",
    "slug": "country-sweet-mild-sauce-6-21oz",
    "description": "Country Sweet Mild Sauce (6/21oz). Quality product from Buster's Markets.",
    "price": 4.89,
    "unit": "6/21oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 160,
    "tags": [
      "grocery",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "delallo-quartered-marinated-artichoke-hearts-12",
    "name": "Delallo Quartered & Marinated Artichoke Hearts 12",
    "slug": "delallo-quartered-marinated-artichoke-hearts-12",
    "description": "Delallo Quartered & Marinated Artichoke Hearts 12. Quality product from Buster's Markets.",
    "price": 33.93,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 8,
    "tags": [
      "grocery",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "dinosaur-bbq-roasted-garlic-honey-sauce-6-19oz",
    "name": "Dinosaur BBQ Roasted Garlic Honey Sauce",
    "slug": "dinosaur-bbq-roasted-garlic-honey-sauce-6-19oz",
    "description": "Dinosaur BBQ Roasted Garlic Honey Sauce (6/19oz). Enhance any dish with bold flavors.",
    "price": 3.8,
    "unit": "6/19oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 97,
    "tags": [
      "condiments-spices",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "dot-s-snack-mix-original-16-14oz",
    "name": "Dot's Snack Mix Original",
    "slug": "dot-s-snack-mix-original-16-14oz",
    "description": "Dot's Snack Mix Original (16/14oz). A delicious snack perfect for any time of day.",
    "price": 8.11,
    "unit": "16/14oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 154,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "fresh-gourmet-tri-color-tortilla-strips-9-3-5oz",
    "name": "Fresh Gourmet Tri-Color Tortilla Strips",
    "slug": "fresh-gourmet-tri-color-tortilla-strips-9-3-5oz",
    "description": "Fresh Gourmet Tri-Color Tortilla Strips (9/3.5oz). A delicious snack perfect for any time of day.",
    "price": 2.83,
    "unit": "9/3.5oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 100,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "g-hughes-sf-italian-dressing-6-12floz",
    "name": "G Hughes SF Italian Dressing",
    "slug": "g-hughes-sf-italian-dressing-6-12floz",
    "description": "G Hughes SF Italian Dressing (6/12floz). Enhance any dish with bold flavors.",
    "price": 5.07,
    "unit": "6/12floz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1604935067269-27b2faabf0af?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 41,
    "tags": [
      "condiments-spices",
      "sugar-free",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "g-hughes-sf-coleslaw-dressing-6-12oz",
    "name": "G Hughes SF Coleslaw Dressing",
    "slug": "g-hughes-sf-coleslaw-dressing-6-12oz",
    "description": "G Hughes SF Coleslaw Dressing (6/12oz). Fresh produce, locally sourced when available.",
    "price": 5.07,
    "unit": "6/12oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 149,
    "tags": [
      "produce",
      "sugar-free",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "g-hughes-sf-ranch-dressing-6-12oz",
    "name": "G Hughes SF Ranch Dressing",
    "slug": "g-hughes-sf-ranch-dressing-6-12oz",
    "description": "G Hughes SF Ranch Dressing (6/12oz). Enhance any dish with bold flavors.",
    "price": 5.07,
    "unit": "6/12oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 90,
    "tags": [
      "condiments-spices",
      "sugar-free",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "flavortown-money-honey-bbq-sauce-6-14-5oz",
    "name": "Flavortown Money Honey BBQ Sauce",
    "slug": "flavortown-money-honey-bbq-sauce-6-14-5oz",
    "description": "Flavortown Money Honey BBQ Sauce (6/14.5oz). Enhance any dish with bold flavors.",
    "price": 6.08,
    "unit": "6/14.5oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 156,
    "tags": [
      "condiments-spices",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "western-premium-bbq-products-cherry-smoking",
    "name": "Western Premium BBQ Products Cherry Smoking",
    "slug": "western-premium-bbq-products-cherry-smoking",
    "description": "Western Premium BBQ Products Cherry Smoking. Quality product from Buster's Markets.",
    "price": 35.59,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 119,
    "tags": [
      "grocery",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "martin-s-bar-b-q-waffle-potato-chips-9-8-5oz",
    "name": "Martin's Bar-B-Q Waffle Potato Chips",
    "slug": "martin-s-bar-b-q-waffle-potato-chips-9-8-5oz",
    "description": "Martin's Bar-B-Q Waffle Potato Chips (9/8.5oz). A delicious snack perfect for any time of day.",
    "price": 3.25,
    "comparePrice": 3.9,
    "unit": "9/8.5oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 34,
    "tags": [
      "chips-snacks",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "martin-s-kettle-cooked-potato-chips-bbq-9-8oz",
    "name": "Martin's Kettle Cooked Potato Chips BBQ",
    "slug": "martin-s-kettle-cooked-potato-chips-bbq-9-8oz",
    "description": "Martin's Kettle Cooked Potato Chips BBQ (9/8oz). A delicious snack perfect for any time of day.",
    "price": 3.25,
    "unit": "9/8oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 37,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "mighty-sesame-co-organic-tahini-8-10-9oz",
    "name": "Mighty Sesame Co. Organic Tahini",
    "slug": "mighty-sesame-co-organic-tahini-8-10-9oz",
    "description": "Mighty Sesame Co. Organic Tahini (8/10.9oz). Authentic Asian flavors at your fingertips.",
    "price": 9.13,
    "comparePrice": 10.96,
    "unit": "8/10.9oz",
    "category": "asian-foods",
    "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 177,
    "tags": [
      "asian-foods",
      "organic",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "jarritos-soda-mandarin-24-12-5floz",
    "name": "Jarritos Soda Mandarin",
    "slug": "jarritos-soda-mandarin-24-12-5floz",
    "description": "Jarritos Soda Mandarin (24/12.5floz). Refreshing and satisfying to quench your thirst.",
    "price": 1.82,
    "unit": "24/12.5floz",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 58,
    "tags": [
      "beverages",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "grace-cock-flavored-soup-mix-12-1-76oz",
    "name": "Grace Cock Flavored Soup Mix",
    "slug": "grace-cock-flavored-soup-mix-12-1-76oz",
    "description": "Grace Cock Flavored Soup Mix (12/1.76oz). Warm and comforting any time of year.",
    "price": 1.12,
    "unit": "12/1.76oz",
    "category": "soups-broths",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 110,
    "tags": [
      "soups-broths",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "nongshim-spicy-chicken-noodle-soup-bowl-12-3-03oz",
    "name": "Nongshim Spicy Chicken Noodle Soup Bowl",
    "slug": "nongshim-spicy-chicken-noodle-soup-bowl-12-3-03oz",
    "description": "Nongshim Spicy Chicken Noodle Soup Bowl (12/3.03oz). Premium quality, fresh and flavorful.",
    "price": 2.32,
    "unit": "12/3.03oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 148,
    "tags": [
      "meat-seafood",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "sapporo-ichiban-original-flavored-soup-24-3-5oz",
    "name": "Sapporo Ichiban Original Flavored Soup",
    "slug": "sapporo-ichiban-original-flavored-soup-24-3-5oz",
    "description": "Sapporo Ichiban Original Flavored Soup (24/3.5oz). Authentic Asian flavors at your fingertips.",
    "price": 1.51,
    "comparePrice": 1.81,
    "unit": "24/3.5oz",
    "category": "asian-foods",
    "image": "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 110,
    "tags": [
      "asian-foods",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "sapporo-ichiban-beef-flavored-soup-24-3-5oz",
    "name": "Sapporo Ichiban Beef Flavored Soup",
    "slug": "sapporo-ichiban-beef-flavored-soup-24-3-5oz",
    "description": "Sapporo Ichiban Beef Flavored Soup (24/3.5oz). Premium quality, fresh and flavorful.",
    "price": 1.51,
    "unit": "24/3.5oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 145,
    "tags": [
      "meat-seafood",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "nonni-s-originali-biscotti-6-5-52oz",
    "name": "Nonni's Originali Biscotti",
    "slug": "nonni-s-originali-biscotti-6-5-52oz",
    "description": "Nonni's Originali Biscotti (6/5.52oz). Crunchy and delicious, great for snacking.",
    "price": 7.1,
    "unit": "6/5.52oz",
    "category": "cookies-crackers",
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 68,
    "tags": [
      "cookies-crackers",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "laxmi-parched-rice-10-14oz",
    "name": "Laxmi Parched Rice",
    "slug": "laxmi-parched-rice-10-14oz",
    "description": "Laxmi Parched Rice (10/14oz). A kitchen essential.",
    "price": 2.53,
    "unit": "10/14oz",
    "category": "pantry-staples",
    "image": "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 96,
    "tags": [
      "pantry-staples",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "polar-baby-corn-nuggets-12-15oz",
    "name": "Polar Baby Corn Nuggets",
    "slug": "polar-baby-corn-nuggets-12-15oz",
    "description": "Polar Baby Corn Nuggets (12/15oz). Quality product from Buster's Markets.",
    "price": 3.57,
    "comparePrice": 4.28,
    "unit": "12/15oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 85,
    "tags": [
      "grocery",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "la-banderita-soft-taco-large-flour-tortillas-12-16",
    "name": "La Banderita Soft Taco Large Flour Tortillas",
    "slug": "la-banderita-soft-taco-large-flour-tortillas-12-16",
    "description": "La Banderita Soft Taco Large Flour Tortillas. A delicious snack perfect for any time of day.",
    "price": 39.27,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 118,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "ole-xtreme-wellness-tomato-basil-tortilla-wraps-6",
    "name": "OLE Xtreme Wellness Tomato Basil Tortilla Wraps 6",
    "slug": "ole-xtreme-wellness-tomato-basil-tortilla-wraps-6",
    "description": "OLE Xtreme Wellness Tomato Basil Tortilla Wraps 6. Fresh produce, locally sourced when available.",
    "price": 30.54,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 132,
    "tags": [
      "produce",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "la-banderita-burrito-10-8ct-12-20oz",
    "name": "La Banderita Burrito 10\"",
    "slug": "la-banderita-burrito-10-8ct-12-20oz",
    "description": "La Banderita Burrito 10\" (12/20oz). Quick and convenient, ready in minutes.",
    "price": 3.5,
    "comparePrice": 4.2,
    "unit": "12/20oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 166,
    "tags": [
      "frozen-meals-sides",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "la-banderita-corn-tortillas-wic-12-16oz",
    "name": "La Banderita Corn Tortillas WIC",
    "slug": "la-banderita-corn-tortillas-wic-12-16oz",
    "description": "La Banderita Corn Tortillas WIC (12/16oz). A delicious snack perfect for any time of day.",
    "price": 2.53,
    "unit": "12/16oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 154,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "patak-s-simmer-sauce-tikka-masala-curry-6-15oz",
    "name": "Patak's Simmer Sauce Tikka Masala Curry",
    "slug": "patak-s-simmer-sauce-tikka-masala-curry-6-15oz",
    "description": "Patak's Simmer Sauce Tikka Masala Curry (6/15oz). Authentic flavors from South Asia.",
    "price": 5.57,
    "unit": "6/15oz",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 55,
    "tags": [
      "indian-south-asian",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "mac-s-original-pork-skins-12-3oz",
    "name": "Mac's Original Pork Skins",
    "slug": "mac-s-original-pork-skins-12-3oz",
    "description": "Mac's Original Pork Skins (12/3oz). Premium quality, fresh and flavorful.",
    "price": 2.83,
    "comparePrice": 3.4,
    "unit": "12/3oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 51,
    "tags": [
      "meat-seafood",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "q-tonic-ginger-beer-4pk-6-30floz",
    "name": "Q Tonic Ginger Beer",
    "slug": "q-tonic-ginger-beer-4pk-6-30floz",
    "description": "Q Tonic Ginger Beer (6/30floz). Refreshing brewed beverage, best served cold.",
    "price": 4.34,
    "unit": "6/30floz",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 64,
    "tags": [
      "beer-cider",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "mrs-renfro-s-mango-habanero-salsa-6-16oz",
    "name": "Mrs. Renfro's Mango Habanero Salsa",
    "slug": "mrs-renfro-s-mango-habanero-salsa-6-16oz",
    "description": "Mrs. Renfro's Mango Habanero Salsa (6/16oz). Fresh produce, locally sourced when available.",
    "price": 5.69,
    "unit": "6/16oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 36,
    "tags": [
      "produce",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "regina-red-wine-vinegar-12-12floz",
    "name": "Regina Red Wine Vinegar",
    "slug": "regina-red-wine-vinegar-12-12floz",
    "description": "Regina Red Wine Vinegar (12/12floz). Enhance any dish with bold flavors.",
    "price": 3.34,
    "unit": "12/12floz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1604935067269-27b2faabf0af?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 115,
    "tags": [
      "condiments-spices",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "spice-supreme-ground-cumin-12-2oz",
    "name": "Spice Supreme Ground Cumin",
    "slug": "spice-supreme-ground-cumin-12-2oz",
    "description": "Spice Supreme Ground Cumin (12/2oz). Enhance any dish with bold flavors.",
    "price": 2.02,
    "comparePrice": 2.42,
    "unit": "12/2oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 44,
    "tags": [
      "condiments-spices",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "terry-ho-s-yum-yum-sauce-original-6-16oz",
    "name": "Terry Ho's Yum Yum Sauce Original",
    "slug": "terry-ho-s-yum-yum-sauce-original-6-16oz",
    "description": "Terry Ho's Yum Yum Sauce Original (6/16oz). Quality product from Buster's Markets.",
    "price": 6.62,
    "unit": "6/16oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 70,
    "tags": [
      "grocery",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "terrell-s-syracuse-style-potato-chips-12-5oz",
    "name": "Terrell's Syracuse Style Potato Chips",
    "slug": "terrell-s-syracuse-style-potato-chips-12-5oz",
    "description": "Terrell's Syracuse Style Potato Chips (12/5oz). A delicious snack perfect for any time of day.",
    "price": 2.54,
    "unit": "12/5oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 147,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "unique-snacks-pretzel-splits-12-11oz",
    "name": "Unique Snacks Pretzel Splits",
    "slug": "unique-snacks-pretzel-splits-12-11oz",
    "description": "Unique Snacks Pretzel Splits (12/11oz). A delicious snack perfect for any time of day.",
    "price": 4.35,
    "unit": "12/11oz",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 100,
    "tags": [
      "chips-snacks",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "unique-snacks-sourdough-craft-beer-pretzel-rings",
    "name": "Unique Snacks Sourdough Craft Beer Pretzel Rings",
    "slug": "unique-snacks-sourdough-craft-beer-pretzel-rings",
    "description": "Unique Snacks Sourdough Craft Beer Pretzel Rings. Refreshing brewed beverage, best served cold.",
    "price": 52.2,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 175,
    "tags": [
      "beer-cider",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "weber-roasted-garlic-herb-seasoning-6-2-75oz",
    "name": "Weber Roasted Garlic & Herb Seasoning",
    "slug": "weber-roasted-garlic-herb-seasoning-6-2-75oz",
    "description": "Weber Roasted Garlic & Herb Seasoning (6/2.75oz). Enhance any dish with bold flavors.",
    "price": 3.85,
    "comparePrice": 4.62,
    "unit": "6/2.75oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 133,
    "tags": [
      "condiments-spices",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "wickles-original-pickle-6-16oz",
    "name": "Wickles Original Pickle",
    "slug": "wickles-original-pickle-6-16oz",
    "description": "Wickles Original Pickle (6/16oz). Quality product from Buster's Markets.",
    "price": 5.88,
    "unit": "6/16oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 168,
    "tags": [
      "grocery",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "pc-cocktail-essentials-sweet-lime-juice-1-12-7floz",
    "name": "PC Cocktail Essentials Sweet Lime Juice",
    "slug": "pc-cocktail-essentials-sweet-lime-juice-1-12-7floz",
    "description": "PC Cocktail Essentials Sweet Lime Juice (1/12.7floz). Fresh produce, locally sourced when available.",
    "price": 13.92,
    "comparePrice": 16.7,
    "unit": "1/12.7floz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 82,
    "tags": [
      "produce",
      "sale",
      "new"
    ],
    "isSale": true,
    "isNew": true
  },
  {
    "id": "pc-mom-strawberry-daiquiri-margarita-1-1ltr",
    "name": "PC MOM Strawberry Daiquiri/Margarita",
    "slug": "pc-mom-strawberry-daiquiri-margarita-1-1ltr",
    "description": "PC MOM Strawberry Daiquiri/Margarita (1/1ltr). Fresh produce, locally sourced when available.",
    "price": 17.81,
    "unit": "1/1ltr",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 13,
    "tags": [
      "produce",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "pc-cocktail-essentials-simple-syrup-1-12-7floz",
    "name": "PC Cocktail Essentials Simple Syrup",
    "slug": "pc-cocktail-essentials-simple-syrup-1-12-7floz",
    "description": "PC Cocktail Essentials Simple Syrup (1/12.7floz). Sweet and delicious on anything.",
    "price": 13.92,
    "unit": "1/12.7floz",
    "category": "jams-spreads-syrups",
    "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 175,
    "tags": [
      "jams-spreads-syrups",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "pc-karma-sauce-ghost-island-1-5oz",
    "name": "PC Karma Sauce Ghost Island",
    "slug": "pc-karma-sauce-ghost-island-1-5oz",
    "description": "PC Karma Sauce Ghost Island (1/5oz). Quality product from Buster's Markets.",
    "price": 27.73,
    "unit": "1/5oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 179,
    "tags": [
      "grocery",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "pc-sun-luck-hoisin-sauce-1-8oz",
    "name": "PC Sun Luck Hoisin Sauce",
    "slug": "pc-sun-luck-hoisin-sauce-1-8oz",
    "description": "PC Sun Luck Hoisin Sauce (1/8oz). Authentic Asian flavors at your fingertips.",
    "price": 27.32,
    "unit": "1/8oz",
    "category": "asian-foods",
    "image": "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 116,
    "tags": [
      "asian-foods",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "codino-s-cheese-tortellini-12-16oz",
    "name": "Codino's Cheese Tortellini",
    "slug": "codino-s-cheese-tortellini-12-16oz",
    "description": "Codino's Cheese Tortellini (12/16oz). Quick and convenient, ready in minutes.",
    "price": 4.05,
    "unit": "12/16oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 69,
    "tags": [
      "frozen-meals-sides",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "ben-jerry-s-cherry-garcia-ice-cream-pint-8-16floz",
    "name": "Ben & Jerry's Cherry Garcia Ice Cream Pint",
    "slug": "ben-jerry-s-cherry-garcia-ice-cream-pint-8-16floz",
    "description": "Ben & Jerry's Cherry Garcia Ice Cream Pint (8/16floz). Creamy, indulgent frozen treat.",
    "price": 7.1,
    "unit": "8/16floz",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 10,
    "tags": [
      "ice-cream-frozen-desserts",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "ben-jerry-s-peanut-butter-cup-ice-cream-pint-8-1",
    "name": "Ben & Jerry's Peanut Butter Cup Ice Cream Pint",
    "slug": "ben-jerry-s-peanut-butter-cup-ice-cream-pint-8-1",
    "description": "Ben & Jerry's Peanut Butter Cup Ice Cream Pint. Creamy, indulgent frozen treat.",
    "price": 56.73,
    "unit": "each",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 56,
    "tags": [
      "ice-cream-frozen-desserts",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "friendly-s-peanut-butter-candy-pieces-sundae-cup-32",
    "name": "Friendly's Peanut Butter Candy Pieces Sundae Cup 32",
    "slug": "friendly-s-peanut-butter-candy-pieces-sundae-cup-32",
    "description": "Friendly's Peanut Butter Candy Pieces Sundae Cup 32. Creamy, indulgent frozen treat.",
    "price": 18.1,
    "unit": "each",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 76,
    "tags": [
      "ice-cream-frozen-desserts",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "friendly-s-original-fudge-sundae-cup-12-6floz",
    "name": "Friendly's Original Fudge Sundae Cup",
    "slug": "friendly-s-original-fudge-sundae-cup-12-6floz",
    "description": "Friendly's Original Fudge Sundae Cup (12/6floz). Creamy, indulgent frozen treat.",
    "price": 1.51,
    "unit": "12/6floz",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 87,
    "tags": [
      "ice-cream-frozen-desserts",
      "new"
    ],
    "isNew": true
  },
  {
    "id": "friendly-s-chocolate-chip-cookie-dough-sundae-c",
    "name": "Friendly's Chocolate Chip Cookie Dough Sundae C",
    "slug": "friendly-s-chocolate-chip-cookie-dough-sundae-c",
    "description": "Friendly's Chocolate Chip Cookie Dough Sundae C. Creamy, indulgent frozen treat.",
    "price": 18.1,
    "comparePrice": 21.72,
    "unit": "each",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 111,
    "tags": [
      "ice-cream-frozen-desserts",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "friendly-s-cake-singles-strawberry-krunch-12-8-5fl",
    "name": "Friendly's Cake Singles Strawberry Krunch.5fl",
    "slug": "friendly-s-cake-singles-strawberry-krunch-12-8-5fl",
    "description": "Friendly's Cake Singles Strawberry Krunch.5fl. Fresh produce, locally sourced when available.",
    "price": 30.45,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 110,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "friendly-s-cake-singles-birthday-cake-12-8-5floz",
    "name": "Friendly's Cake Singles Birthday Cake",
    "slug": "friendly-s-cake-singles-birthday-cake-12-8-5floz",
    "description": "Friendly's Cake Singles Birthday Cake (12/8.5floz). Quality product from Buster's Markets.",
    "price": 2.54,
    "unit": "12/8.5floz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 104,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "ben-jerry-s-non-dairy-cherry-garcia-ice-cream-8",
    "name": "Ben & Jerry's Non Dairy Cherry Garcia Ice Cream 8",
    "slug": "ben-jerry-s-non-dairy-cherry-garcia-ice-cream-8",
    "description": "Ben & Jerry's Non Dairy Cherry Garcia Ice Cream 8. Creamy, indulgent frozen treat.",
    "price": 56.73,
    "unit": "each",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 155,
    "tags": [
      "ice-cream-frozen-desserts"
    ]
  },
  {
    "id": "chipwich-birthday-cake-12-12-75oz",
    "name": "Chipwich Birthday Cake",
    "slug": "chipwich-birthday-cake-12-12-75oz",
    "description": "Chipwich Birthday Cake (12/12.75oz). Quality product from Buster's Markets.",
    "price": 5.98,
    "unit": "12/12.75oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 77,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "tillamook-ice-cream-old-fashioned-vanilla-6-48floz",
    "name": "Tillamook Ice Cream Old Fashioned Vanilla",
    "slug": "tillamook-ice-cream-old-fashioned-vanilla-6-48floz",
    "description": "Tillamook Ice Cream Old Fashioned Vanilla (6/48floz). Creamy, indulgent frozen treat.",
    "price": 8.11,
    "unit": "6/48floz",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 60,
    "tags": [
      "ice-cream-frozen-desserts"
    ]
  },
  {
    "id": "tillamook-ice-cream-mudslide-6-48floz",
    "name": "Tillamook Ice Cream Mudslide",
    "slug": "tillamook-ice-cream-mudslide-6-48floz",
    "description": "Tillamook Ice Cream Mudslide (6/48floz). Creamy, indulgent frozen treat.",
    "price": 8.11,
    "comparePrice": 9.73,
    "unit": "6/48floz",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 166,
    "tags": [
      "ice-cream-frozen-desserts",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "tillamook-ice-cream-mint-chocolate-chip-6-48floz",
    "name": "Tillamook Ice Cream Mint Chocolate Chip",
    "slug": "tillamook-ice-cream-mint-chocolate-chip-6-48floz",
    "description": "Tillamook Ice Cream Mint Chocolate Chip (6/48floz). Creamy, indulgent frozen treat.",
    "price": 8.11,
    "unit": "6/48floz",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 39,
    "tags": [
      "ice-cream-frozen-desserts"
    ]
  },
  {
    "id": "tillamook-ice-cream-peaches-and-cream-6-48floz",
    "name": "Tillamook Ice Cream Peaches and Cream",
    "slug": "tillamook-ice-cream-peaches-and-cream-6-48floz",
    "description": "Tillamook Ice Cream Peaches and Cream (6/48floz). Creamy, indulgent frozen treat.",
    "price": 8.11,
    "unit": "6/48floz",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 153,
    "tags": [
      "ice-cream-frozen-desserts"
    ]
  },
  {
    "id": "motor-city-pizza-co-detroit-style-deep-dish-pepper",
    "name": "Motor City Pizza Co. Detroit Style Deep Dish Pepper",
    "slug": "motor-city-pizza-co-detroit-style-deep-dish-pepper",
    "description": "Motor City Pizza Co. Detroit Style Deep Dish Pepper. Quick and convenient, ready in minutes.",
    "price": 63.86,
    "unit": "each",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 35,
    "tags": [
      "frozen-meals-sides"
    ]
  },
  {
    "id": "motor-city-pizza-co-detroit-style-deep-dish-pizza-s",
    "name": "Motor City Pizza Co. Detroit Style Deep Dish Pizza S",
    "slug": "motor-city-pizza-co-detroit-style-deep-dish-pizza-s",
    "description": "Motor City Pizza Co. Detroit Style Deep Dish Pizza S. Quick and convenient, ready in minutes.",
    "price": 63.86,
    "comparePrice": 76.63,
    "unit": "each",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 20,
    "tags": [
      "frozen-meals-sides",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "motor-city-pizza-co-detroit-style-deep-dish-pizza-3",
    "name": "Motor City Pizza Co. Detroit Style Deep Dish Pizza 3",
    "slug": "motor-city-pizza-co-detroit-style-deep-dish-pizza-3",
    "description": "Motor City Pizza Co. Detroit Style Deep Dish Pizza 3. Quick and convenient, ready in minutes.",
    "price": 63.86,
    "comparePrice": 76.63,
    "unit": "each",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 154,
    "tags": [
      "frozen-meals-sides",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "ben-jerry-s-topped-dirt-cake-ice-cream-pint-8-1",
    "name": "Ben & Jerry's Topped Dirt Cake Ice Cream Pint",
    "slug": "ben-jerry-s-topped-dirt-cake-ice-cream-pint-8-1",
    "description": "Ben & Jerry's Topped Dirt Cake Ice Cream Pint. Creamy, indulgent frozen treat.",
    "price": 56.73,
    "unit": "each",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 8,
    "tags": [
      "ice-cream-frozen-desserts"
    ]
  },
  {
    "id": "ben-jerry-s-lights-caramel-action-ice-cream-pin",
    "name": "Ben & Jerry's Lights Caramel Action Ice Cream Pin",
    "slug": "ben-jerry-s-lights-caramel-action-ice-cream-pin",
    "description": "Ben & Jerry's Lights Caramel Action Ice Cream Pin. Creamy, indulgent frozen treat.",
    "price": 56.73,
    "unit": "each",
    "category": "ice-cream-frozen-desserts",
    "image": "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 64,
    "tags": [
      "ice-cream-frozen-desserts"
    ]
  },
  {
    "id": "hot-pockets-pepperoni-pizza-8-9oz",
    "name": "Hot Pockets Pepperoni Pizza",
    "slug": "hot-pockets-pepperoni-pizza-8-9oz",
    "description": "Hot Pockets Pepperoni Pizza (8/9oz). Quick and convenient, ready in minutes.",
    "price": 4.86,
    "unit": "8/9oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 184,
    "tags": [
      "frozen-meals-sides"
    ]
  },
  {
    "id": "hot-pockets-ham-and-cheese-8-9oz",
    "name": "Hot Pockets Ham and Cheese",
    "slug": "hot-pockets-ham-and-cheese-8-9oz",
    "description": "Hot Pockets Ham and Cheese (8/9oz). Quick and convenient, ready in minutes.",
    "price": 4.86,
    "unit": "8/9oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 154,
    "tags": [
      "frozen-meals-sides"
    ]
  },
  {
    "id": "hot-pockets-bacon-egg-cheese-4-17oz",
    "name": "Hot Pockets Bacon Egg Cheese",
    "slug": "hot-pockets-bacon-egg-cheese-4-17oz",
    "description": "Hot Pockets Bacon Egg Cheese (4/17oz). Quick and convenient, ready in minutes.",
    "price": 10.14,
    "unit": "4/17oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 118,
    "tags": [
      "frozen-meals-sides"
    ]
  },
  {
    "id": "hot-pockets-sausage-egg-and-cheese-4-17oz",
    "name": "Hot Pockets Sausage Egg and Cheese",
    "slug": "hot-pockets-sausage-egg-and-cheese-4-17oz",
    "description": "Hot Pockets Sausage Egg and Cheese (4/17oz). Quick and convenient, ready in minutes.",
    "price": 10.14,
    "unit": "4/17oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 153,
    "tags": [
      "frozen-meals-sides"
    ]
  },
  {
    "id": "bhujia-haldiram-24x400gms",
    "name": "Bhujia Haldiram 24x400gms",
    "slug": "bhujia-haldiram-24x400gms",
    "description": "Bhujia Haldiram 24x400gms. Authentic flavors from South Asia.",
    "price": 97.44,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 129,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "coconut-grated-haldiram-24x312gms",
    "name": "Coconut Grated Haldiram 24x312gms",
    "slug": "coconut-grated-haldiram-24x312gms",
    "description": "Coconut Grated Haldiram 24x312gms. Authentic flavors from South Asia.",
    "price": 165.59,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 70,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "garlic-naan-16pcs-haldiram-8x1-28kg",
    "name": "Garlic Naan 16pcs Haldiram 8x1.28kg",
    "slug": "garlic-naan-16pcs-haldiram-8x1-28kg",
    "description": "Garlic Naan 16pcs Haldiram 8x1.28kg. Authentic flavors from South Asia.",
    "price": 555.06,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 127,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "tandoori-naan-16pcs-haldiram-8x1-28kg",
    "name": "Tandoori Naan 16pcs Haldiram 8x1.28kg",
    "slug": "tandoori-naan-16pcs-haldiram-8x1-28kg",
    "description": "Tandoori Naan 16pcs Haldiram 8x1.28kg. Authentic flavors from South Asia.",
    "price": 488.94,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 16,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "lachha-paratha-haldiram-8x1-2kg",
    "name": "Lachha Paratha Haldiram 8x1.2kg",
    "slug": "lachha-paratha-haldiram-8x1-2kg",
    "description": "Lachha Paratha Haldiram 8x1.2kg. Authentic flavors from South Asia.",
    "price": 494.16,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 49,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "gulab-jamun-frozen-haldiram-10x1kg",
    "name": "Gulab Jamun Frozen Haldiram 10x1kg",
    "slug": "gulab-jamun-frozen-haldiram-10x1kg",
    "description": "Gulab Jamun Frozen Haldiram 10x1kg. Authentic flavors from South Asia.",
    "price": 497.47,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 184,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "rasmalai-frozen-haldiram-10x1kg",
    "name": "Rasmalai Frozen Haldiram 10x1kg",
    "slug": "rasmalai-frozen-haldiram-10x1kg",
    "description": "Rasmalai Frozen Haldiram 10x1kg. Authentic flavors from South Asia.",
    "price": 689.91,
    "comparePrice": 827.89,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 139,
    "tags": [
      "indian-south-asian",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "gajar-halwa-haldiram-12x283gms",
    "name": "Gajar Halwa Haldiram 12x283gms",
    "slug": "gajar-halwa-haldiram-12x283gms",
    "description": "Gajar Halwa Haldiram 12x283gms. Authentic flavors from South Asia.",
    "price": 267.97,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 103,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "chocintense-pet",
    "name": "CHOCINTENSE PET",
    "slug": "chocintense-pet",
    "description": "CHOCINTENSE PET. Fresh, high-quality dairy product.",
    "price": 25.39,
    "unit": "each",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 74,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "fresh-jumbo-chicken-legs-mountaire-40",
    "name": "Fresh Jumbo Chicken Legs (Mountaire) 40#",
    "slug": "fresh-jumbo-chicken-legs-mountaire-40",
    "description": "Fresh Jumbo Chicken Legs (Mountaire) 40#. Premium quality, fresh and flavorful.",
    "price": 129.92,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 152,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "fresh-medium-wings-120pc-mountaire-40",
    "name": "Fresh Medium Wings 120pc (Mountaire) 40#",
    "slug": "fresh-medium-wings-120pc-mountaire-40",
    "description": "Fresh Medium Wings 120pc (Mountaire) 40#. Quality product from Buster's Markets.",
    "price": 133.4,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 114,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "fresh-leg-meat-wing-y-40",
    "name": "Fresh Leg Meat / Wing Y 40#",
    "slug": "fresh-leg-meat-wing-y-40",
    "description": "Fresh Leg Meat / Wing Y 40#. Quality product from Buster's Markets.",
    "price": 1003.4,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 68,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "broccoli-chui-ho-20",
    "name": "Broccoli (Chui Ho) 20#",
    "slug": "broccoli-chui-ho-20",
    "description": "Broccoli (Chui Ho) 20#. Fresh produce, locally sourced when available.",
    "price": 42.78,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 161,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "green-scallion-medium-4doz",
    "name": "Green Scallion Medium 4doz",
    "slug": "green-scallion-medium-4doz",
    "description": "Green Scallion Medium 4doz. Fresh produce, locally sourced when available.",
    "price": 40.6,
    "comparePrice": 48.72,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 65,
    "tags": [
      "produce",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "green-squash-big-40",
    "name": "Green Squash Big 40#",
    "slug": "green-squash-big-40",
    "description": "Green Squash Big 40#. Fresh produce, locally sourced when available.",
    "price": 75.4,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 94,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "chinese-cauliflower-case-15",
    "name": "Chinese Cauliflower/Case 15#",
    "slug": "chinese-cauliflower-case-15",
    "description": "Chinese Cauliflower/Case 15#. Fresh produce, locally sourced when available.",
    "price": 60.9,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 103,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "orange-56-88ct",
    "name": "Orange",
    "slug": "orange-56-88ct",
    "description": "Orange (56/88ct). Fresh produce, locally sourced when available.",
    "price": 0.86,
    "unit": "56/88ct",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 51,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "cantaloupe-6-9ct",
    "name": "Cantaloupe",
    "slug": "cantaloupe-6-9ct",
    "description": "Cantaloupe (6/9ct). Fresh produce, locally sourced when available.",
    "price": 4.35,
    "unit": "6/9ct",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 154,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "honeydew-4-6ct",
    "name": "Honeydew",
    "slug": "honeydew-4-6ct",
    "description": "Honeydew (4/6ct). Fresh produce, locally sourced when available.",
    "price": 5.44,
    "unit": "4/6ct",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 161,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "avocado-40ct",
    "name": "Avocado",
    "slug": "avocado-40ct",
    "description": "Avocado. Fresh produce, locally sourced when available.",
    "price": 14.5,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 181,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "white-peach-25",
    "name": "White Peach 25#",
    "slug": "white-peach-25",
    "description": "White Peach 25#. Fresh produce, locally sourced when available.",
    "price": 44.95,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 8,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "natural-casing-pic-pac-6-lb",
    "name": "Natural Casing Pic Pac 6/lb",
    "slug": "natural-casing-pic-pac-6-lb",
    "description": "Natural Casing Pic Pac 6/lb. Premium quality, fresh and flavorful.",
    "price": 90.14,
    "comparePrice": 108.17,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 47,
    "tags": [
      "meat-seafood",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "skinless-texas-hots-8-lb",
    "name": "Skinless Texas Hots 8/lb",
    "slug": "skinless-texas-hots-8-lb",
    "description": "Skinless Texas Hots 8/lb. Premium quality, fresh and flavorful.",
    "price": 79,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 16,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "italian-sausage-11oz",
    "name": "Italian Sausage",
    "slug": "italian-sausage-11oz",
    "description": "Italian Sausage. Premium quality, fresh and flavorful.",
    "price": 58.74,
    "comparePrice": 70.49,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 98,
    "tags": [
      "meat-seafood",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "smoked-jalapeno-cheddar-sausage-8-lb",
    "name": "Smoked Jalapeno & Cheddar Sausage 8/lb",
    "slug": "smoked-jalapeno-cheddar-sausage-8-lb",
    "description": "Smoked Jalapeno & Cheddar Sausage 8/lb. Premium quality, fresh and flavorful.",
    "price": 58.74,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 58,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "haldiram-aloo-tikki-x2",
    "name": "Haldiram Aloo Tikki",
    "slug": "haldiram-aloo-tikki-x2",
    "description": "Haldiram Aloo Tikki. Authentic flavors from South Asia.",
    "price": 275.5,
    "comparePrice": 330.6,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 167,
    "tags": [
      "indian-south-asian",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "haldiram-aloo-paratha-8x1-6kg-x2",
    "name": "Haldiram Aloo Paratha 8x1.6kg",
    "slug": "haldiram-aloo-paratha-8x1-6kg-x2",
    "description": "Haldiram Aloo Paratha 8x1.6kg. Authentic flavors from South Asia.",
    "price": 261,
    "comparePrice": 313.2,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 125,
    "tags": [
      "indian-south-asian",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "haldiram-paneer-paratha-8x1-6kg-x2",
    "name": "Haldiram Paneer Paratha 8x1.6kg",
    "slug": "haldiram-paneer-paratha-8x1-6kg-x2",
    "description": "Haldiram Paneer Paratha 8x1.6kg. Authentic flavors from South Asia.",
    "price": 217.5,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 137,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "eoc-regular-frac-pak-w-filter-42-2oz",
    "name": "EOC Regular Frac Pak w/ Filter",
    "slug": "eoc-regular-frac-pak-w-filter-42-2oz",
    "description": "EOC Regular Frac Pak w/ Filter (42/2oz). Quality product from Buster's Markets.",
    "price": 3.01,
    "unit": "42/2oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 29,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "eoc-colombian-ground-coffee-72-2-5oz",
    "name": "EOC Colombian Ground Coffee",
    "slug": "eoc-colombian-ground-coffee-72-2-5oz",
    "description": "EOC Colombian Ground Coffee (72/2.5oz). Rich flavor to start your morning right.",
    "price": 4.29,
    "unit": "72/2.5oz",
    "category": "coffee-tea",
    "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 94,
    "tags": [
      "coffee-tea"
    ]
  },
  {
    "id": "eoc-premium-dark-roast-42-2-5oz",
    "name": "EOC Premium Dark Roast",
    "slug": "eoc-premium-dark-roast-42-2-5oz",
    "description": "EOC Premium Dark Roast (42/2.5oz). Quality product from Buster's Markets.",
    "price": 3.75,
    "unit": "42/2.5oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 133,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "domino-sugar-packets-2000ct",
    "name": "Domino Sugar Packets",
    "slug": "domino-sugar-packets-2000ct",
    "description": "Domino Sugar Packets. Quality product from Buster's Markets.",
    "price": 39.76,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 138,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "budweiser-2-12-nr",
    "name": "Budweiser NR",
    "slug": "budweiser-2-12-nr",
    "description": "Budweiser NR. Refreshing brewed beverage, best served cold.",
    "price": 33.86,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 183,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "bud-light-3-8-can-16oz",
    "name": "Bud Light CAN",
    "slug": "bud-light-3-8-can-16oz",
    "description": "Bud Light CAN. Refreshing brewed beverage, best served cold.",
    "price": 36.04,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 149,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "bud-light-rita-straw-24-7-5-2-12c",
    "name": "Bud Light Rita Straw.5",
    "slug": "bud-light-rita-straw-24-7-5-2-12c",
    "description": "Bud Light Rita Straw.5. Refreshing brewed beverage, best served cold.",
    "price": 26.09,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 147,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "ultra-4-6-nr",
    "name": "Ultra NR",
    "slug": "ultra-4-6-nr",
    "description": "Ultra NR. Refreshing brewed beverage, best served cold.",
    "price": 40.68,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 164,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "ultra-15-25-big-can",
    "name": "Ultra Big Can",
    "slug": "ultra-15-25-big-can",
    "description": "Ultra Big Can. Refreshing brewed beverage, best served cold.",
    "price": 43.5,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 95,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "ultra-zero-tt-2-12c",
    "name": "Ultra Zero TT",
    "slug": "ultra-zero-tt-2-12c",
    "description": "Ultra Zero TT. Refreshing brewed beverage, best served cold.",
    "price": 39.08,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 55,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "busch-light-2-12-nr",
    "name": "Busch Light NR",
    "slug": "busch-light-2-12-nr",
    "description": "Busch Light NR. Refreshing brewed beverage, best served cold.",
    "price": 24.51,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 74,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "busch-light-2-12-can-tt",
    "name": "Busch Light CAN TT",
    "slug": "busch-light-2-12-can-tt",
    "description": "Busch Light CAN TT. Refreshing brewed beverage, best served cold.",
    "price": 24.51,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 161,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "r-rock-2-12-nr",
    "name": "R Rock NR",
    "slug": "r-rock-2-12-nr",
    "description": "R Rock NR. Quality product from Buster's Markets.",
    "price": 24.51,
    "comparePrice": 29.41,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 171,
    "tags": [
      "grocery",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "n-belg-2-12c-vr-hoppy",
    "name": "N Belg VR Hoppy",
    "slug": "n-belg-2-12c-vr-hoppy",
    "description": "N Belg VR Hoppy. Quality product from Buster's Markets.",
    "price": 47.42,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 48,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "blake-s-4-6c-trip-jam",
    "name": "Blake's Trip Jam",
    "slug": "blake-s-4-6c-trip-jam",
    "description": "Blake's Trip Jam. Refreshing brewed beverage, best served cold.",
    "price": 52.13,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 169,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "j-daniels-12-23-peach-8",
    "name": "J. Daniels Peach 8%",
    "slug": "j-daniels-12-23-peach-8",
    "description": "J. Daniels Peach 8%. Fresh produce, locally sourced when available.",
    "price": 34.51,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 127,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "rohrbach-6-4c-space-kit",
    "name": "Rohrbach Space Kit",
    "slug": "rohrbach-6-4c-space-kit",
    "description": "Rohrbach Space Kit. Refreshing brewed beverage, best served cold.",
    "price": 103.24,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 39,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "42-north-6-4c-border-ip",
    "name": "42 North Border IP",
    "slug": "42-north-6-4c-border-ip",
    "description": "42 North Border IP. Refreshing brewed beverage, best served cold.",
    "price": 84.39,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 140,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "msb-spcy-pep-jack-mac-cheese-6-20oz",
    "name": "MSB Spcy Pep Jack MAC&Cheese",
    "slug": "msb-spcy-pep-jack-mac-cheese-6-20oz",
    "description": "MSB Spcy Pep Jack MAC&Cheese (6/20oz). Fresh, high-quality dairy product.",
    "price": 4.49,
    "unit": "6/20oz",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 77,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "bevan-macaroni-cheese-6-20oz",
    "name": "Bevan Macaroni & Cheese",
    "slug": "bevan-macaroni-cheese-6-20oz",
    "description": "Bevan Macaroni & Cheese (6/20oz). Fresh, high-quality dairy product.",
    "price": 5.48,
    "unit": "6/20oz",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1588348847735-2bd0ddb16e2a?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 102,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "bevan-m-c-famsz-6-28oz",
    "name": "Bevan M&C FAMSZ",
    "slug": "bevan-m-c-famsz-6-28oz",
    "description": "Bevan M&C FAMSZ (6/28oz). Quality product from Buster's Markets.",
    "price": 6.71,
    "unit": "6/28oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 48,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "otsh-frt-strnb-lm-rasp-12ct-6-18oz",
    "name": "OTSH FRT STRNB LM RASP",
    "slug": "otsh-frt-strnb-lm-rasp-12ct-6-18oz",
    "description": "OTSH FRT STRNB LM RASP (6/18oz). Quality product from Buster's Markets.",
    "price": 4.76,
    "unit": "6/18oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 43,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "belg-wedge-parmesan-12-8oz",
    "name": "Belg Wedge Parmesan",
    "slug": "belg-wedge-parmesan-12-8oz",
    "description": "Belg Wedge Parmesan (12/8oz). Quality product from Buster's Markets.",
    "price": 4.65,
    "comparePrice": 5.58,
    "unit": "12/8oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 45,
    "tags": [
      "grocery",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "f-exp-fe-american-salad-mix-6-11oz",
    "name": "F Exp FE American Salad Mix",
    "slug": "f-exp-fe-american-salad-mix-6-11oz",
    "description": "F Exp FE American Salad Mix (6/11oz). Fresh produce, locally sourced when available.",
    "price": 3.76,
    "unit": "6/11oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 92,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "f-exp-baby-spinach-6-5oz",
    "name": "F Exp Baby Spinach",
    "slug": "f-exp-baby-spinach-6-5oz",
    "description": "F Exp Baby Spinach (6/5oz). Fresh produce, locally sourced when available.",
    "price": 3.69,
    "unit": "6/5oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 131,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "f-exp-fe-hrts-of-romaine-6-9oz",
    "name": "F Exp FE HRTS of Romaine",
    "slug": "f-exp-fe-hrts-of-romaine-6-9oz",
    "description": "F Exp FE HRTS of Romaine (6/9oz). Fresh produce, locally sourced when available.",
    "price": 3.95,
    "unit": "6/9oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 57,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "f-exp-fe-italian-salad-mix-6-9oz",
    "name": "F Exp FE Italian Salad Mix",
    "slug": "f-exp-fe-italian-salad-mix-6-9oz",
    "description": "F Exp FE Italian Salad Mix (6/9oz). Fresh produce, locally sourced when available.",
    "price": 3.76,
    "comparePrice": 4.51,
    "unit": "6/9oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 46,
    "tags": [
      "produce",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "f-exp-old-fashioned-coleslaw-12-14oz",
    "name": "F Exp Old Fashioned Coleslaw",
    "slug": "f-exp-old-fashioned-coleslaw-12-14oz",
    "description": "F Exp Old Fashioned Coleslaw (12/14oz). Fresh produce, locally sourced when available.",
    "price": 1.8,
    "comparePrice": 2.16,
    "unit": "12/14oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 140,
    "tags": [
      "produce",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "f-exp-org-50-50-mx-clamshell-6-5oz",
    "name": "F Exp Org MX Clamshell",
    "slug": "f-exp-org-50-50-mx-clamshell-6-5oz",
    "description": "F Exp Org MX Clamshell (6/5oz). Quality product from Buster's Markets.",
    "price": 3.87,
    "unit": "6/5oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 46,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "f-exp-fx-caesar-salad-4901-6-9-85oz",
    "name": "F Exp FX Caesar Salad 4901",
    "slug": "f-exp-fx-caesar-salad-4901-6-9-85oz",
    "description": "F Exp FX Caesar Salad 4901 (6/9.85oz). Quality product from Buster's Markets.",
    "price": 4.33,
    "unit": "6/9.85oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 135,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "f-exp-fx-shred-lettuce-6-8oz",
    "name": "F Exp FX Shred Lettuce",
    "slug": "f-exp-fx-shred-lettuce-6-8oz",
    "description": "F Exp FX Shred Lettuce (6/8oz). Fresh produce, locally sourced when available.",
    "price": 2.24,
    "unit": "6/8oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 178,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "llf-baby-spring-mix-8-4oz",
    "name": "LLF Baby Spring Mix",
    "slug": "llf-baby-spring-mix-8-4oz",
    "description": "LLF Baby Spring Mix (8/4oz). Quality product from Buster's Markets.",
    "price": 2.9,
    "unit": "8/4oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 133,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "f-exp-iceberg-garden-salad-12-12oz",
    "name": "F Exp Iceberg Garden Salad",
    "slug": "f-exp-iceberg-garden-salad-12-12oz",
    "description": "F Exp Iceberg Garden Salad (12/12oz). Quality product from Buster's Markets.",
    "price": 2.01,
    "unit": "12/12oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 122,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "realime-100-sqz-lime-juice-12-15oz",
    "name": "Realime 100% SQZ Lime Juice",
    "slug": "realime-100-sqz-lime-juice-12-15oz",
    "description": "Realime 100% SQZ Lime Juice (12/15oz). Fresh produce, locally sourced when available.",
    "price": 2.83,
    "unit": "12/15oz",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 172,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "chex-mix-swt-snk-mx-hny-nt-12-8oz",
    "name": "Chex Mix SWT SNK MX HNY NT",
    "slug": "chex-mix-swt-snk-mx-hny-nt-12-8oz",
    "description": "Chex Mix SWT SNK MX HNY NT (12/8oz). Quality product from Buster's Markets.",
    "price": 3.95,
    "unit": "12/8oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 8,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "frpet-chkny-bf-veg-ric-8-1-5lb",
    "name": "FRPET CHKNY BF/VEG/RIC",
    "slug": "frpet-chkny-bf-veg-ric-8-1-5lb",
    "description": "FRPET CHKNY BF/VEG/RIC (8/1.5LB). Quality product from Buster's Markets.",
    "price": 7.65,
    "unit": "8/1.5LB",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 72,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "old-tmr-ccktal-sauce-12-8oz",
    "name": "OLD TMR CCKTAL SAUCE",
    "slug": "old-tmr-ccktal-sauce-12-8oz",
    "description": "OLD TMR CCKTAL SAUCE (12/8oz). Quality product from Buster's Markets.",
    "price": 2.08,
    "unit": "12/8oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 107,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "choice-bnls-beef-chuck-roast-8-2-53lb",
    "name": "Choice BNLS Beef Chuck Roast",
    "slug": "choice-bnls-beef-chuck-roast-8-2-53lb",
    "description": "Choice BNLS Beef Chuck Roast (8/2.53LB). Premium quality, fresh and flavorful.",
    "price": 30.38,
    "comparePrice": 36.46,
    "unit": "8/2.53LB",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 143,
    "tags": [
      "meat-seafood",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "pork-bnls-cc-chops-reg-16-1-27lb",
    "name": "Pork BNLS CC Chops REG",
    "slug": "pork-bnls-cc-chops-reg-16-1-27lb",
    "description": "Pork BNLS CC Chops REG (16/1.27LB). Premium quality, fresh and flavorful.",
    "price": 4.98,
    "unit": "16/1.27LB",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 147,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "pork-bi-cc-chops-reg-15-1-49lb",
    "name": "Pork BI CC Chops REG",
    "slug": "pork-bi-cc-chops-reg-15-1-49lb",
    "description": "Pork BI CC Chops REG (15/1.49LB). Premium quality, fresh and flavorful.",
    "price": 6.06,
    "unit": "15/1.49LB",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 23,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "80-ground-beef-1-24-16oz",
    "name": "80% Ground Beef 1#",
    "slug": "80-ground-beef-1-24-16oz",
    "description": "80% Ground Beef 1# (24/16oz). Premium quality, fresh and flavorful.",
    "price": 7.61,
    "unit": "24/16oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 55,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "80-gr-beef-patty-1lb-12pk-12-16oz",
    "name": "80% GR Beef Patty 1LB",
    "slug": "80-gr-beef-patty-1lb-12pk-12-16oz",
    "description": "80% GR Beef Patty 1LB (12/16oz). Premium quality, fresh and flavorful.",
    "price": 8.45,
    "unit": "12/16oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 76,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "93-ground-beef-1-00-net-24-16oz",
    "name": "93% Ground Beef 1.00# NET",
    "slug": "93-ground-beef-1-00-net-24-16oz",
    "description": "93% Ground Beef 1.00# NET (24/16oz). Premium quality, fresh and flavorful.",
    "price": 9.95,
    "unit": "24/16oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 176,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "cider-bk-skf-1-2gl-d-12-64oz",
    "name": "Cider BK+SKF",
    "slug": "cider-bk-skf-1-2gl-d-12-64oz",
    "description": "Cider BK+SKF (1/2GL-D). Refreshing brewed beverage, best served cold.",
    "price": 51.52,
    "comparePrice": 61.82,
    "unit": "1/2GL-D",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 67,
    "tags": [
      "beer-cider",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "gwalt-great-ckn-franks-12-1lb",
    "name": "Gwalt Great CKN Franks",
    "slug": "gwalt-great-ckn-franks-12-1lb",
    "description": "Gwalt Great CKN Franks (12/1lb). Premium quality, fresh and flavorful.",
    "price": 3.36,
    "unit": "12/1lb",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 166,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "b-evans-garlic-mash-potatoes-6-24oz",
    "name": "B Evans Garlic Mash Potatoes",
    "slug": "b-evans-garlic-mash-potatoes-6-24oz",
    "description": "B Evans Garlic Mash Potatoes (6/24oz). Enhance any dish with bold flavors.",
    "price": 5.05,
    "unit": "6/24oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1604935067269-27b2faabf0af?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 22,
    "tags": [
      "condiments-spices"
    ]
  },
  {
    "id": "b-evans-sr-crm-chv-mash-pot-6-24oz",
    "name": "B Evans SR CRM&CHV Mash POT",
    "slug": "b-evans-sr-crm-chv-mash-pot-6-24oz",
    "description": "B Evans SR CRM&CHV Mash POT (6/24oz). Quality product from Buster's Markets.",
    "price": 5.05,
    "unit": "6/24oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 152,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "philly-kr-phila-orig-crm-chs-36-8oz",
    "name": "Philly KR Phila Orig CRM CHS",
    "slug": "philly-kr-phila-orig-crm-chs-36-8oz",
    "description": "Philly KR Phila Orig CRM CHS (36/8oz). Quality product from Buster's Markets.",
    "price": 4.98,
    "unit": "36/8oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 107,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "cider-bk-skf-gal-d-6-128oz",
    "name": "Cider BK+SKF Gal-D",
    "slug": "cider-bk-skf-gal-d-6-128oz",
    "description": "Cider BK+SKF Gal-D (6/128oz). Refreshing brewed beverage, best served cold.",
    "price": 8.3,
    "unit": "6/128oz",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 47,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "c-r-minced-garlic-d-12-4-5oz",
    "name": "C.R. Minced Garlic-D",
    "slug": "c-r-minced-garlic-d-12-4-5oz",
    "description": "C.R. Minced Garlic-D (12/4.5oz). Enhance any dish with bold flavors.",
    "price": 2.86,
    "comparePrice": 3.43,
    "unit": "12/4.5oz",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 20,
    "tags": [
      "condiments-spices",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "whly-guac-unbrnded-classic-8-16oz",
    "name": "WHLY GUAC Unbrnded Classic",
    "slug": "whly-guac-unbrnded-classic-8-16oz",
    "description": "WHLY GUAC Unbrnded Classic (8/16oz). Quality product from Buster's Markets.",
    "price": 6.16,
    "unit": "8/16oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 170,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "marie-s-blue-cheese-6-12oz",
    "name": "Marie's Blue Cheese",
    "slug": "marie-s-blue-cheese-6-12oz",
    "description": "Marie's Blue Cheese (6/12oz). Fresh, high-quality dairy product.",
    "price": 5.25,
    "unit": "6/12oz",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 36,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "ithca-classic-hummus-6-10oz",
    "name": "Ithca Classic Hummus",
    "slug": "ithca-classic-hummus-6-10oz",
    "description": "Ithca Classic Hummus (6/10oz). Quality product from Buster's Markets.",
    "price": 4.82,
    "unit": "6/10oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 157,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "arby-s-seasoned-curly-fries-12-22oz",
    "name": "Arby's Seasoned Curly Fries",
    "slug": "arby-s-seasoned-curly-fries-12-22oz",
    "description": "Arby's Seasoned Curly Fries (12/22oz). Quick and convenient, ready in minutes.",
    "price": 5.83,
    "comparePrice": 7,
    "unit": "12/22oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 50,
    "tags": [
      "frozen-meals-sides",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "heritage-ribeye-steak-9-12oz",
    "name": "Heritage Ribeye Steak",
    "slug": "heritage-ribeye-steak-9-12oz",
    "description": "Heritage Ribeye Steak (9/12oz). Premium quality, fresh and flavorful.",
    "price": 11.69,
    "unit": "9/12oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 148,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "12-inch-white-sub-roll-4pk-8-4ct",
    "name": "12 Inch White Sub Roll",
    "slug": "12-inch-white-sub-roll-4pk-8-4ct",
    "description": "12 Inch White Sub Roll (8/4ct). Freshly baked, soft and delicious.",
    "price": 5.34,
    "unit": "8/4ct",
    "category": "bread-bakery",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 94,
    "tags": [
      "bread-bakery"
    ]
  },
  {
    "id": "tot-sprm-pza-rolls-50ct-9-24-8oz",
    "name": "Tot SPRM PZA Rolls",
    "slug": "tot-sprm-pza-rolls-50ct-9-24-8oz",
    "description": "Tot SPRM PZA Rolls (9/24.8oz). Freshly baked, soft and delicious.",
    "price": 7.85,
    "unit": "9/24.8oz",
    "category": "bread-bakery",
    "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 17,
    "tags": [
      "bread-bakery"
    ]
  },
  {
    "id": "mrs-butterworth-syrup-12-24oz",
    "name": "Mrs Butterworth Syrup",
    "slug": "mrs-butterworth-syrup-12-24oz",
    "description": "Mrs Butterworth Syrup (12/24oz). Fresh, high-quality dairy product.",
    "price": 4.97,
    "comparePrice": 5.96,
    "unit": "12/24oz",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 150,
    "tags": [
      "dairy",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "sunnter-farm-fixins-5-3lb",
    "name": "Sunnter Farm Fixins",
    "slug": "sunnter-farm-fixins-5-3lb",
    "description": "Sunnter Farm Fixins (5/3lb). Quality product from Buster's Markets.",
    "price": 5.13,
    "comparePrice": 6.16,
    "unit": "5/3lb",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 99,
    "tags": [
      "grocery",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "canola-oil-9-40oz",
    "name": "Canola Oil",
    "slug": "canola-oil-9-40oz",
    "description": "Canola Oil (9/40oz). Quality cooking essential.",
    "price": 3.9,
    "unit": "9/40oz",
    "category": "oils-vinegars",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 95,
    "tags": [
      "oils-vinegars"
    ]
  },
  {
    "id": "rosina-italian-meatballs-12-12oz",
    "name": "Rosina Italian Meatballs",
    "slug": "rosina-italian-meatballs-12-12oz",
    "description": "Rosina Italian Meatballs (12/12oz). Quick and convenient, ready in minutes.",
    "price": 5.14,
    "comparePrice": 6.17,
    "unit": "12/12oz",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 99,
    "tags": [
      "frozen-meals-sides",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "sanderson-tp-b-s-breasts-12-1-58lb",
    "name": "Sanderson TP B/S Breasts",
    "slug": "sanderson-tp-b-s-breasts-12-1-58lb",
    "description": "Sanderson TP B/S Breasts (12/1.58lb). Quality product from Buster's Markets.",
    "price": 7.16,
    "unit": "12/1.58lb",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 120,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "pork-bi-cc-chops-reg-16-1-27lb",
    "name": "Pork BI CC Chops Reg",
    "slug": "pork-bi-cc-chops-reg-16-1-27lb",
    "description": "Pork BI CC Chops Reg (16/1.27lb). Premium quality, fresh and flavorful.",
    "price": 5.36,
    "unit": "16/1.27lb",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 46,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "belg-mozzarella-ball-12-8oz",
    "name": "Belg Mozzarella Ball",
    "slug": "belg-mozzarella-ball-12-8oz",
    "description": "Belg Mozzarella Ball (12/8oz). Quality product from Buster's Markets.",
    "price": 3.44,
    "unit": "12/8oz",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 76,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "bevan-six-cheese-pasta-6-20oz",
    "name": "Bevan Six Cheese Pasta",
    "slug": "bevan-six-cheese-pasta-6-20oz",
    "description": "Bevan Six Cheese Pasta (6/20oz). Fresh, high-quality dairy product.",
    "price": 5.05,
    "comparePrice": 6.06,
    "unit": "6/20oz",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 168,
    "tags": [
      "dairy",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "tostitos-medium-salsa-15-5oz-7-each",
    "name": "Tostitos Medium Salsa 15.5oz (7 each)",
    "slug": "tostitos-medium-salsa-15-5oz-7-each",
    "description": "Tostitos Medium Salsa 15.5oz (7 each). Enhance any dish with bold flavors.",
    "price": 28.02,
    "comparePrice": 33.62,
    "unit": "each",
    "category": "condiments-spices",
    "image": "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 85,
    "tags": [
      "condiments-spices",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "cheetos-crunchy-2-69oz-ct-cry",
    "name": "Cheetos Crunchy 2.69oz (CT CRY)",
    "slug": "cheetos-crunchy-2-69oz-ct-cry",
    "description": "Cheetos Crunchy 2.69oz (CT CRY). A delicious snack perfect for any time of day.",
    "price": 10.91,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 117,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "cheetos-jalapeno-2-69oz-ct-juh",
    "name": "Cheetos Jalapeno 2.69oz (CT JUH)",
    "slug": "cheetos-jalapeno-2-69oz-ct-juh",
    "description": "Cheetos Jalapeno 2.69oz (CT JUH). A delicious snack perfect for any time of day.",
    "price": 10.91,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 174,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "cheetos-hot-2-69oz-ct-hot",
    "name": "Cheetos Hot 2.69oz (CT HOT)",
    "slug": "cheetos-hot-2-69oz-ct-hot",
    "description": "Cheetos Hot 2.69oz (CT HOT). A delicious snack perfect for any time of day.",
    "price": 10.91,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 59,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "cheetos-hot-jalapeno-2-69oz-ct-hot-juh",
    "name": "Cheetos Hot Jalapeno 2.69oz (CT HOT JUH)",
    "slug": "cheetos-hot-jalapeno-2-69oz-ct-hot-juh",
    "description": "Cheetos Hot Jalapeno 2.69oz (CT HOT JUH). A delicious snack perfect for any time of day.",
    "price": 10.91,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 139,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "munchies-regular-2-99oz-mu-reg",
    "name": "Munchies Regular 2.99oz (MU REG)",
    "slug": "munchies-regular-2-99oz-mu-reg",
    "description": "Munchies Regular 2.99oz (MU REG). A delicious snack perfect for any time of day.",
    "price": 19.14,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 8,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "lay-s-baked-wv-lts-4-29oz",
    "name": "Lay's Baked WV LTS 4.29oz",
    "slug": "lay-s-baked-wv-lts-4-29oz",
    "description": "Lay's Baked WV LTS 4.29oz. A delicious snack perfect for any time of day.",
    "price": 15.49,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 76,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "sun-chips-harvest-cheddar-4-99oz-sc-har-chd",
    "name": "Sun Chips Harvest Cheddar 4.99oz (SC HAR CHD)",
    "slug": "sun-chips-harvest-cheddar-4-99oz-sc-har-chd",
    "description": "Sun Chips Harvest Cheddar 4.99oz (SC HAR CHD). A delicious snack perfect for any time of day.",
    "price": 21.29,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 164,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "cheetos-butter-puffs-2-99oz-cs-btr-puff",
    "name": "Cheetos Butter Puffs 2.99oz (CS BTR PUFF)",
    "slug": "cheetos-butter-puffs-2-99oz-cs-btr-puff",
    "description": "Cheetos Butter Puffs 2.99oz (CS BTR PUFF). Fresh, high-quality dairy product.",
    "price": 19.14,
    "unit": "each",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1588348847735-2bd0ddb16e2a?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 78,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "fritos-honey-bbq-twists-5-49oz-fr-hbq-twst",
    "name": "Fritos Honey BBQ Twists 5.49oz (FR HBQ TWST)",
    "slug": "fritos-honey-bbq-twists-5-49oz-fr-hbq-twst",
    "description": "Fritos Honey BBQ Twists 5.49oz (FR HBQ TWST). Sweet and delicious on anything.",
    "price": 35.15,
    "unit": "each",
    "category": "jams-spreads-syrups",
    "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 116,
    "tags": [
      "jams-spreads-syrups"
    ]
  },
  {
    "id": "cheetos-jalapeno-cheddar-5-49oz-ct-jal-chd",
    "name": "Cheetos Jalapeno Cheddar 5.49oz (CT JAL CHD)",
    "slug": "cheetos-jalapeno-cheddar-5-49oz-ct-jal-chd",
    "description": "Cheetos Jalapeno Cheddar 5.49oz (CT JAL CHD). A delicious snack perfect for any time of day.",
    "price": 35.15,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 169,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "cheetos-hot-5-49oz-ct-hot",
    "name": "Cheetos Hot 5.49oz (CT HOT)",
    "slug": "cheetos-hot-5-49oz-ct-hot",
    "description": "Cheetos Hot 5.49oz (CT HOT). A delicious snack perfect for any time of day.",
    "price": 35.15,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 120,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "kettle-regular-4-29oz-ket-reg",
    "name": "Kettle Regular 4.29oz (KET REG)",
    "slug": "kettle-regular-4-29oz-ket-reg",
    "description": "Kettle Regular 4.29oz (KET REG). A delicious snack perfect for any time of day.",
    "price": 30.98,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 104,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "fritos-scoops-5-49oz-10-regular-fr-scp",
    "name": "Fritos Scoops 5.49oz 10-Regular (FR SCP)",
    "slug": "fritos-scoops-5-49oz-10-regular-fr-scp",
    "description": "Fritos Scoops 5.49oz 10-Regular (FR SCP). A delicious snack perfect for any time of day.",
    "price": 58.58,
    "comparePrice": 70.3,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 175,
    "tags": [
      "chips-snacks",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "sabritas-whc-2-99oz-10-regular-sa-whc",
    "name": "Sabritas WHC 2.99oz 10-Regular (SA WHC)",
    "slug": "sabritas-whc-2-99oz-10-regular-sa-whc",
    "description": "Sabritas WHC 2.99oz 10-Regular (SA WHC). A delicious snack perfect for any time of day.",
    "price": 31.9,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 60,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "lay-s-baked-regular-5-99oz-8-regular-lb-reg",
    "name": "Lay's Baked Regular 5.99oz 8-Regular (LB REG)",
    "slug": "lay-s-baked-regular-5-99oz-8-regular-lb-reg",
    "description": "Lay's Baked Regular 5.99oz 8-Regular (LB REG). A delicious snack perfect for any time of day.",
    "price": 51.16,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 176,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "doritos-dinamita-swc-7-29oz-6-regular-dr-swc",
    "name": "Doritos Dinamita SWC 7.29oz 6-Regular (DR SWC)",
    "slug": "doritos-dinamita-swc-7-29oz-6-regular-dr-swc",
    "description": "Doritos Dinamita SWC 7.29oz 6-Regular (DR SWC). A delicious snack perfect for any time of day.",
    "price": 41.5,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 141,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "doritos-cool-ranch-7-29oz-6-regular-dr-cra",
    "name": "Doritos Cool Ranch 7.29oz 6-Regular (DR CRA)",
    "slug": "doritos-cool-ranch-7-29oz-6-regular-dr-cra",
    "description": "Doritos Cool Ranch 7.29oz 6-Regular (DR CRA). A delicious snack perfect for any time of day.",
    "price": 41.5,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 127,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "5-wild-bird-mix",
    "name": "5# Wild Bird Mix",
    "slug": "5-wild-bird-mix",
    "description": "5# Wild Bird Mix. Premium feed to attract beautiful birds.",
    "price": 130.24,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 99,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "10-wild-bird-mix",
    "name": "10# Wild Bird Mix",
    "slug": "10-wild-bird-mix",
    "description": "10# Wild Bird Mix. Premium feed to attract beautiful birds.",
    "price": 162.17,
    "comparePrice": 194.6,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 132,
    "tags": [
      "wild-bird-food",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "3-sunflower-black-oil",
    "name": "3# Sunflower (Black Oil)",
    "slug": "3-sunflower-black-oil",
    "description": "3# Sunflower (Black Oil). Quality cooking essential.",
    "price": 131.9,
    "unit": "each",
    "category": "oils-vinegars",
    "image": "https://images.unsplash.com/photo-1601000938259-5bef7b82bde5?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 128,
    "tags": [
      "oils-vinegars"
    ]
  },
  {
    "id": "10-sunflower-black-oil",
    "name": "10# Sunflower (Black Oil)",
    "slug": "10-sunflower-black-oil",
    "description": "10# Sunflower (Black Oil). Quality cooking essential.",
    "price": 149.47,
    "unit": "each",
    "category": "oils-vinegars",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 8,
    "tags": [
      "oils-vinegars"
    ]
  },
  {
    "id": "4-nyjer-seed-thistle-seeds",
    "name": "4# Nyjer Seed / Thistle Seeds",
    "slug": "4-nyjer-seed-thistle-seeds",
    "description": "4# Nyjer Seed / Thistle Seeds. Premium feed to attract beautiful birds.",
    "price": 121.63,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 72,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "5-cracked-corn",
    "name": "5# Cracked Corn",
    "slug": "5-cracked-corn",
    "description": "5# Cracked Corn. Premium feed to attract beautiful birds.",
    "price": 57.86,
    "comparePrice": 69.43,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 108,
    "tags": [
      "wild-bird-food",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "4-finch-mix",
    "name": "4# Finch Mix",
    "slug": "4-finch-mix",
    "description": "4# Finch Mix. Premium feed to attract beautiful birds.",
    "price": 121.63,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 88,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "5-pigeon-mix",
    "name": "5# Pigeon Mix",
    "slug": "5-pigeon-mix",
    "description": "5# Pigeon Mix. Premium feed to attract beautiful birds.",
    "price": 57.89,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 29,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "5-squirrel-mix",
    "name": "5# Squirrel Mix",
    "slug": "5-squirrel-mix",
    "description": "5# Squirrel Mix. Premium feed to attract beautiful birds.",
    "price": 65.12,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 73,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "4-cardinal-mix",
    "name": "4# Cardinal Mix",
    "slug": "4-cardinal-mix",
    "description": "4# Cardinal Mix. Premium feed to attract beautiful birds.",
    "price": 86.86,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 125,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "2-shell-peanuts",
    "name": "2# Shell Peanuts",
    "slug": "2-shell-peanuts",
    "description": "2# Shell Peanuts. A delicious snack perfect for any time of day.",
    "price": 69.43,
    "comparePrice": 83.32,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 112,
    "tags": [
      "chips-snacks",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "4-peanut-pieces",
    "name": "4# Peanut Pieces",
    "slug": "4-peanut-pieces",
    "description": "4# Peanut Pieces. A delicious snack perfect for any time of day.",
    "price": 115.86,
    "unit": "each",
    "category": "chips-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 141,
    "tags": [
      "chips-snacks"
    ]
  },
  {
    "id": "4-safflower",
    "name": "4# Safflower",
    "slug": "4-safflower",
    "description": "4# Safflower. Premium feed to attract beautiful birds.",
    "price": 111.51,
    "unit": "each",
    "category": "wild-bird-food",
    "image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 129,
    "tags": [
      "wild-bird-food"
    ]
  },
  {
    "id": "spinach-cheese-samosa-8pkts-cs",
    "name": "Spinach & Cheese Samosa 8pkts/cs",
    "slug": "spinach-cheese-samosa-8pkts-cs",
    "description": "Spinach & Cheese Samosa 8pkts/cs. Fresh, high-quality dairy product.",
    "price": 36.57,
    "unit": "each",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 157,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "mexican-samosa-8pkt-cs",
    "name": "Mexican Samosa 8pkt/cs",
    "slug": "mexican-samosa-8pkt-cs",
    "description": "Mexican Samosa 8pkt/cs. Authentic flavors from South Asia.",
    "price": 31.79,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 124,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "chicken-kabab-biryani-halal-8-case",
    "name": "Chicken Kabab Biryani-Halal 8/case",
    "slug": "chicken-kabab-biryani-halal-8-case",
    "description": "Chicken Kabab Biryani-Halal 8/case. Premium quality, fresh and flavorful.",
    "price": 51.94,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 102,
    "tags": [
      "meat-seafood",
      "halal"
    ]
  },
  {
    "id": "mini-samosa-chicken-keema-10-cs",
    "name": "Mini Samosa Chicken Keema 10/cs",
    "slug": "mini-samosa-chicken-keema-10-cs",
    "description": "Mini Samosa Chicken Keema 10/cs. Premium quality, fresh and flavorful.",
    "price": 77.87,
    "comparePrice": 93.44,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 62,
    "tags": [
      "meat-seafood",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "matter-panner-w-cumin-rice-6-10oz",
    "name": "Matter Panner w/ Cumin Rice",
    "slug": "matter-panner-w-cumin-rice-6-10oz",
    "description": "Matter Panner w/ Cumin Rice (6/10oz). A kitchen essential.",
    "price": 4.73,
    "unit": "6/10oz",
    "category": "pantry-staples",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 41,
    "tags": [
      "pantry-staples"
    ]
  },
  {
    "id": "butter-chicken-w-peas-pulav-6-10oz",
    "name": "Butter Chicken w/ Peas Pulav",
    "slug": "butter-chicken-w-peas-pulav-6-10oz",
    "description": "Butter Chicken w/ Peas Pulav (6/10oz). Premium quality, fresh and flavorful.",
    "price": 5.8,
    "unit": "6/10oz",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 107,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "desi-yogurt-wm-21lb-8-cs",
    "name": "Desi Yogurt WM 21lb/8 CS",
    "slug": "desi-yogurt-wm-21lb-8-cs",
    "description": "Desi Yogurt WM 21lb/8 CS. Fresh, high-quality dairy product.",
    "price": 73.26,
    "unit": "each",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 102,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "yellow-banana-chips-dd-6oz-25pkt",
    "name": "Yellow Banana Chips DD 6oz 25pkt",
    "slug": "yellow-banana-chips-dd-6oz-25pkt",
    "description": "Yellow Banana Chips DD 6oz 25pkt. Fresh produce, locally sourced when available.",
    "price": 66.07,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 6,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "spicy-banana-chips-dd-6oz-22pkt",
    "name": "Spicy Banana Chips DD 6oz 22pkt",
    "slug": "spicy-banana-chips-dd-6oz-22pkt",
    "description": "Spicy Banana Chips DD 6oz 22pkt. Fresh produce, locally sourced when available.",
    "price": 58.24,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 52,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "sandwich-dhokla-breakfast-8-cs",
    "name": "Sandwich Dhokla - Breakfast 8/cs",
    "slug": "sandwich-dhokla-breakfast-8-cs",
    "description": "Sandwich Dhokla - Breakfast 8/cs. Authentic flavors from South Asia.",
    "price": 29.77,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 25,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "palak-paneer-pizza-21-5oz-6",
    "name": "Palak Paneer Pizza 21.5oz/6",
    "slug": "palak-paneer-pizza-21-5oz-6",
    "description": "Palak Paneer Pizza 21.5oz/6. Quick and convenient, ready in minutes.",
    "price": 55.37,
    "comparePrice": 66.44,
    "unit": "each",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 102,
    "tags": [
      "frozen-meals-sides",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "bombay-veggie-pizza-24oz-6",
    "name": "Bombay Veggie Pizza 24oz/6",
    "slug": "bombay-veggie-pizza-24oz-6",
    "description": "Bombay Veggie Pizza 24oz/6. Quick and convenient, ready in minutes.",
    "price": 55.37,
    "unit": "each",
    "category": "frozen-meals-sides",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 38,
    "tags": [
      "frozen-meals-sides"
    ]
  },
  {
    "id": "paneer-tikka-wrap-9pcs",
    "name": "Paneer Tikka Wrap 9pcs",
    "slug": "paneer-tikka-wrap-9pcs",
    "description": "Paneer Tikka Wrap 9pcs. Authentic flavors from South Asia.",
    "price": 41.39,
    "comparePrice": 49.67,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 114,
    "tags": [
      "indian-south-asian",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "jalebi-14oz-orange-6pkt",
    "name": "Jalebi 14oz Orange 6pkt",
    "slug": "jalebi-14oz-orange-6pkt",
    "description": "Jalebi 14oz Orange 6pkt. Fresh produce, locally sourced when available.",
    "price": 48.72,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 74,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "gajar-halwa-8-7oz-r-12pkt",
    "name": "Gajar Halwa 8.7oz (R) 12pkt",
    "slug": "gajar-halwa-8-7oz-r-12pkt",
    "description": "Gajar Halwa 8.7oz (R) 12pkt. Authentic flavors from South Asia.",
    "price": 97.1,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 99,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "besan-ladoo-9-20oz-6pkt",
    "name": "Besan Ladoo 9.20oz 6pkt",
    "slug": "besan-ladoo-9-20oz-6pkt",
    "description": "Besan Ladoo 9.20oz 6pkt. Authentic flavors from South Asia.",
    "price": 48.64,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 36,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "kesar-kalaknd-8-7oz-r-6pkt",
    "name": "Kesar Kalaknd 8.7oz (R) 6pkt",
    "slug": "kesar-kalaknd-8-7oz-r-6pkt",
    "description": "Kesar Kalaknd 8.7oz (R) 6pkt. Authentic flavors from South Asia.",
    "price": 50.12,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 134,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "gulab-jamun-9-20oz-r-6pkt",
    "name": "Gulab Jamun 9.20oz (R) 6pkt",
    "slug": "gulab-jamun-9-20oz-r-6pkt",
    "description": "Gulab Jamun 9.20oz (R) 6pkt. Authentic flavors from South Asia.",
    "price": 48.64,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 106,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "dry-mix-8oz-6pkt",
    "name": "Dry Mix 8oz 6pkt",
    "slug": "dry-mix-8oz-6pkt",
    "description": "Dry Mix 8oz 6pkt. Authentic flavors from South Asia.",
    "price": 48.55,
    "comparePrice": 58.26,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 121,
    "tags": [
      "indian-south-asian",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "rasmalai-6pcs-6pkt",
    "name": "Rasmalai 6pcs 6pkt",
    "slug": "rasmalai-6pcs-6pkt",
    "description": "Rasmalai 6pcs 6pkt. Authentic flavors from South Asia.",
    "price": 43.85,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 97,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "kaju-katli-7-0oz-6pkt",
    "name": "Kaju Katli 7.0oz 6pkt",
    "slug": "kaju-katli-7-0oz-6pkt",
    "description": "Kaju Katli 7.0oz 6pkt. Authentic flavors from South Asia.",
    "price": 52.03,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 13,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "gulab-jamun-catering-size-300pc",
    "name": "Gulab Jamun Catering Size 300pc",
    "slug": "gulab-jamun-catering-size-300pc",
    "description": "Gulab Jamun Catering Size 300pc. Authentic flavors from South Asia.",
    "price": 115.99,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 161,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "rasmalai-signature-70pc-x-2pkt",
    "name": "Rasmalai Signature 70pc x 2pkt",
    "slug": "rasmalai-signature-70pc-x-2pkt",
    "description": "Rasmalai Signature 70pc x 2pkt. Authentic flavors from South Asia.",
    "price": 152.21,
    "unit": "each",
    "category": "indian-south-asian",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 128,
    "tags": [
      "indian-south-asian"
    ]
  },
  {
    "id": "bud-light-3-8-can-16-oz",
    "name": "Bud Light CAN 16 OZ",
    "slug": "bud-light-3-8-can-16-oz",
    "description": "Bud Light CAN 16 OZ. Refreshing brewed beverage, best served cold.",
    "price": 36.04,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 182,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "bud-light-seltzer-straw-24-7-5-2-12c",
    "name": "Bud Light Seltzer Straw.5",
    "slug": "bud-light-seltzer-straw-24-7-5-2-12c",
    "description": "Bud Light Seltzer Straw.5. Refreshing brewed beverage, best served cold.",
    "price": 26.09,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 162,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "n-belg-2-12c-vr-hoppy-voodoo-ranger-hoppy-variety-pk",
    "name": "N Belg VR Hoppy Voodoo Ranger Hoppy Variety PK",
    "slug": "n-belg-2-12c-vr-hoppy-voodoo-ranger-hoppy-variety-pk",
    "description": "N Belg VR Hoppy Voodoo Ranger Hoppy Variety PK. Quality product from Buster's Markets.",
    "price": 94.83,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 93,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "blake-s-4-6c-trip-jam-triple-jam",
    "name": "Blake's Trip Jam Triple Jam",
    "slug": "blake-s-4-6c-trip-jam-triple-jam",
    "description": "Blake's Trip Jam Triple Jam. Refreshing brewed beverage, best served cold.",
    "price": 52.13,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 60,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "j-daniels-12-23-peach-bz-bolder-peach",
    "name": "J. Daniels Peach BZ Bolder Peach",
    "slug": "j-daniels-12-23-peach-bz-bolder-peach",
    "description": "J. Daniels Peach BZ Bolder Peach. Fresh produce, locally sourced when available.",
    "price": 34.51,
    "unit": "each",
    "category": "produce",
    "image": "https://images.unsplash.com/photo-1467348733814-f4c9e7dc7f8b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 26,
    "tags": [
      "produce"
    ]
  },
  {
    "id": "42-north-6-4c-border-ip-borderland-ipa",
    "name": "42 North Border IP Borderland IPA",
    "slug": "42-north-6-4c-border-ip-borderland-ipa",
    "description": "42 North Border IP Borderland IPA. Refreshing brewed beverage, best served cold.",
    "price": 84.39,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 69,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "12-oz-12-pk-24-packaged-coke-varieties",
    "name": "12 OZ 12-Pk 24 Packaged (Coke varieties)",
    "slug": "12-oz-12-pk-24-packaged-coke-varieties",
    "description": "12 OZ 12-Pk 24 Packaged (Coke varieties). Quality product from Buster's Markets.",
    "price": 50.03,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 67,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "12-oz-12-pk-24-sparkling-coke-diet-coke-sprite-etc",
    "name": "12 OZ 12-Pk 24 Sparkling (Coke, Diet Coke, Sprite, etc.)",
    "slug": "12-oz-12-pk-24-sparkling-coke-diet-coke-sprite-etc",
    "description": "12 OZ 12-Pk 24 Sparkling (Coke, Diet Coke, Sprite, etc.). Refreshing and satisfying to quench your thirst.",
    "price": 442.18,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 182,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "14-oz-1-ls-12-dairy-beverage",
    "name": "14 OZ 1-Ls 12 Dairy Beverage",
    "slug": "14-oz-1-ls-12-dairy-beverage",
    "description": "14 OZ 1-Ls 12 Dairy Beverage. Quality product from Buster's Markets.",
    "price": 119.77,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 25,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "2-ltr-1-ls-8-sparkling-coke-diet-coke-sprite-dr-pepper-etc",
    "name": "2 LTR 1-Ls 8 Sparkling (Coke, Diet Coke, Sprite, Dr Pepper, etc.)",
    "slug": "2-ltr-1-ls-8-sparkling-coke-diet-coke-sprite-dr-pepper-etc",
    "description": "2 LTR 1-Ls 8 Sparkling (Coke, Diet Coke, Sprite, Dr Pepper, etc.). Refreshing and satisfying to quench your thirst.",
    "price": 206.56,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 99,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "16-oz-1-ls-24-energy-dr",
    "name": "16 OZ 1-Ls 24 Energy DR",
    "slug": "16-oz-1-ls-24-energy-dr",
    "description": "16 OZ 1-Ls 24 Energy DR. Refreshing and satisfying to quench your thirst.",
    "price": 69.6,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.3,
    "reviewCount": 149,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "15-oz-1-ls-12-energy-dr",
    "name": "15 OZ 1-Ls 12 Energy DR",
    "slug": "15-oz-1-ls-12-energy-dr",
    "description": "15 OZ 1-Ls 12 Energy DR. Refreshing and satisfying to quench your thirst.",
    "price": 84.1,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 132,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "28-oz-1-ls-15-advanced-powerade",
    "name": "28 OZ 1-Ls 15 Advanced (Powerade)",
    "slug": "28-oz-1-ls-15-advanced-powerade",
    "description": "28 OZ 1-Ls 15 Advanced (Powerade). Refreshing and satisfying to quench your thirst.",
    "price": 91.79,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 71,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "coconut-water-1218891",
    "name": "Coconut Water (1218891)",
    "slug": "coconut-water-1218891",
    "description": "Coconut Water (1218891). Refreshing and satisfying to quench your thirst.",
    "price": 33.34,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 87,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "gatorade-2007-variety-packs-1842951",
    "name": "Gatorade 2007 variety packs (1842951)",
    "slug": "gatorade-2007-variety-packs-1842951",
    "description": "Gatorade 2007 variety packs (1842951). Refreshing and satisfying to quench your thirst.",
    "price": 77.83,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 180,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "down-ultra-ultimat-1800219-16-units-13-99",
    "name": "Down Ultra/Ultimat (1800219) 16 units @ $13.99",
    "slug": "down-ultra-ultimat-1800219-16-units-13-99",
    "description": "Down Ultra/Ultimat (1800219) 16 units @ $13.99. Refreshing brewed beverage, best served cold.",
    "price": 324.57,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 181,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "ks-fresh-boost-1707942",
    "name": "KS Fresh Boost (1707942)",
    "slug": "ks-fresh-boost-1707942",
    "description": "KS Fresh Boost (1707942). Quality product from Buster's Markets.",
    "price": 169.25,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 162,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "izze-variety-1795394",
    "name": "IZZE Variety (1795394)",
    "slug": "izze-variety-1795394",
    "description": "IZZE Variety (1795394). Quality product from Buster's Markets.",
    "price": 27.54,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.9,
    "reviewCount": 101,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "red-bull-242668-711509",
    "name": "Red Bull (242668/711509)",
    "slug": "red-bull-242668-711509",
    "description": "Red Bull (242668/711509). Refreshing and satisfying to quench your thirst.",
    "price": 113.08,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.8,
    "reviewCount": 104,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "heavy-cream-908292-12-units-3-49",
    "name": "Heavy Cream (908292) 12 units @ $3.49",
    "slug": "heavy-cream-908292-12-units-3-49",
    "description": "Heavy Cream (908292) 12 units @ $3.49. Fresh, high-quality dairy product.",
    "price": 60.73,
    "unit": "each",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 103,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "gum-flosser-picks-1968803",
    "name": "Gum Flosser Picks (1968803)",
    "slug": "gum-flosser-picks-1968803",
    "description": "Gum Flosser Picks (1968803). Quality personal care product.",
    "price": 57.95,
    "unit": "each",
    "category": "personal-care",
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 81,
    "tags": [
      "personal-care"
    ]
  },
  {
    "id": "oikos-zero-1271446",
    "name": "Oikos Zero (1271446)",
    "slug": "oikos-zero-1271446",
    "description": "Oikos Zero (1271446). Quality product from Buster's Markets.",
    "price": 20.29,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 102,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "quaker-oat-immunit-2023727",
    "name": "Quaker Oat Immunit (2023727)",
    "slug": "quaker-oat-immunit-2023727",
    "description": "Quaker Oat Immunit (2023727). Quality product from Buster's Markets.",
    "price": 115.95,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 86,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "clorox-wipes-2189436",
    "name": "Clorox Wipes (2189436)",
    "slug": "clorox-wipes-2189436",
    "description": "Clorox Wipes (2189436). Keep your home clean and fresh.",
    "price": 55.08,
    "unit": "each",
    "category": "household-cleaning",
    "image": "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 129,
    "tags": [
      "household-cleaning"
    ]
  },
  {
    "id": "bounce-400-3006152-10-units-11-49",
    "name": "Bounce 400 (3006152) 10 units @ $11.49",
    "slug": "bounce-400-3006152-10-units-11-49",
    "description": "Bounce 400 (3006152) 10 units @ $11.49. Keep your home clean and fresh.",
    "price": 166.61,
    "unit": "each",
    "category": "household-cleaning",
    "image": "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 140,
    "tags": [
      "household-cleaning"
    ]
  },
  {
    "id": "crest-complete-1504495-2-units-149-90",
    "name": "Crest Complete (1504495) 2 units @ $149.90",
    "slug": "crest-complete-1504495-2-units-149-90",
    "description": "Crest Complete (1504495) 2 units @ $149.90. Quality product from Buster's Markets.",
    "price": 217.36,
    "comparePrice": 260.83,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 54,
    "tags": [
      "grocery",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "ks-coconut-water-1518783",
    "name": "KS Coconut Water (1518783)",
    "slug": "ks-coconut-water-1518783",
    "description": "KS Coconut Water (1518783). Refreshing and satisfying to quench your thirst.",
    "price": 35.76,
    "unit": "each",
    "category": "beverages",
    "image": "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 135,
    "tags": [
      "beverages"
    ]
  },
  {
    "id": "carlsberg-beer-1853066",
    "name": "Carlsberg Beer (1853066)",
    "slug": "carlsberg-beer-1853066",
    "description": "Carlsberg Beer (1853066). Refreshing brewed beverage, best served cold.",
    "price": 30.48,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1585579174735-7a0ed07efec8?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 163,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "dove-adv-1800413",
    "name": "Dove ADV (1800413)",
    "slug": "dove-adv-1800413",
    "description": "Dove ADV (1800413). Quality product from Buster's Markets.",
    "price": 49.28,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 5,
    "reviewCount": 57,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "olay-ultra-1257371-6-units-15-99",
    "name": "Olay Ultra (1257371) 6 units @ $15.99",
    "slug": "olay-ultra-1257371-6-units-15-99",
    "description": "Olay Ultra (1257371) 6 units @ $15.99. Refreshing brewed beverage, best served cold.",
    "price": 139.07,
    "unit": "each",
    "category": "beer-cider",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 8,
    "tags": [
      "beer-cider"
    ]
  },
  {
    "id": "cool-plus-729441",
    "name": "Cool Plus (729441)",
    "slug": "cool-plus-729441",
    "description": "Cool Plus (729441). Quality product from Buster's Markets.",
    "price": 12.61,
    "comparePrice": 15.13,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 173,
    "tags": [
      "grocery",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "ks-chicken-wings-1294446-1294242",
    "name": "KS Chicken Wings (1294446/1294242)",
    "slug": "ks-chicken-wings-1294446-1294242",
    "description": "KS Chicken Wings (1294446/1294242). Premium quality, fresh and flavorful.",
    "price": 86.38,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 47,
    "tags": [
      "meat-seafood"
    ]
  },
  {
    "id": "mint-variety-1940173",
    "name": "Mint Variety (1940173)",
    "slug": "mint-variety-1940173",
    "description": "Mint Variety (1940173). Quality product from Buster's Markets.",
    "price": 24.7,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 73,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "cliff-org-zbar-986292",
    "name": "Cliff Org ZBAR (986292)",
    "slug": "cliff-org-zbar-986292",
    "description": "Cliff Org ZBAR (986292). Quality product from Buster's Markets.",
    "price": 65.81,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.4,
    "reviewCount": 29,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "extra-vty-pk-1746847",
    "name": "Extra VTY PK (1746847)",
    "slug": "extra-vty-pk-1746847",
    "description": "Extra VTY PK (1746847). Quality product from Buster's Markets.",
    "price": 52.18,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 126,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "tom-s-tp-1797240-2-units-14-99",
    "name": "Tom's TP (1797240) 2 units @ $14.99",
    "slug": "tom-s-tp-1797240-2-units-14-99",
    "description": "Tom's TP (1797240) 2 units @ $14.99. Quality product from Buster's Markets.",
    "price": 43.48,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 148,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "ks-org-vegs-1215098-5-units-8-79",
    "name": "KS Org Vegs (1215098) 5 units @ $8.79",
    "slug": "ks-org-vegs-1215098-5-units-8-79",
    "description": "KS Org Vegs (1215098) 5 units @ $8.79. Quality product from Buster's Markets.",
    "price": 63.73,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 69,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "crest-mwash-1731104-6-units-11-99",
    "name": "Crest MWASH (1731104) 6 units @ $11.99",
    "slug": "crest-mwash-1731104-6-units-11-99",
    "description": "Crest MWASH (1731104) 6 units @ $11.99. Quality product from Buster's Markets.",
    "price": 104.32,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 3.9,
    "reviewCount": 43,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "tide-w-downy-4160408-5-units-20-99",
    "name": "Tide W/Downy (4160408) 5 units @ $20.99",
    "slug": "tide-w-downy-4160408-5-units-20-99",
    "description": "Tide W/Downy (4160408) 5 units @ $20.99. Keep your home clean and fresh.",
    "price": 152.18,
    "comparePrice": 182.62,
    "unit": "each",
    "category": "household-cleaning",
    "image": "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 52,
    "tags": [
      "household-cleaning",
      "sale"
    ],
    "isSale": true
  },
  {
    "id": "half-half-937010-12-units-2-09",
    "name": "Half & Half (937010) 12 units @ $2.09",
    "slug": "half-half-937010-12-units-2-09",
    "description": "Half & Half (937010) 12 units @ $2.09. Fresh, high-quality dairy product.",
    "price": 36.37,
    "unit": "each",
    "category": "dairy",
    "image": "https://images.unsplash.com/photo-1588348847735-2bd0ddb16e2a?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4,
    "reviewCount": 116,
    "tags": [
      "dairy"
    ]
  },
  {
    "id": "mocha-frap-264266-2-units-20-99",
    "name": "Mocha Frap (264266) 2 units @ $20.99",
    "slug": "mocha-frap-264266-2-units-20-99",
    "description": "Mocha Frap (264266) 2 units @ $20.99. Quality product from Buster's Markets.",
    "price": 60.88,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 74,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "smore-s-kit-1937151-8-units-14-99",
    "name": "Smore's Kit (1937151) 8 units @ $14.99",
    "slug": "smore-s-kit-1937151-8-units-14-99",
    "description": "Smore's Kit (1937151) 8 units @ $14.99. Quality product from Buster's Markets.",
    "price": 173.89,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 102,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "hd-dubai-bar-2023685",
    "name": "HD Dubai Bar (2023685)",
    "slug": "hd-dubai-bar-2023685",
    "description": "HD Dubai Bar (2023685). Quality product from Buster's Markets.",
    "price": 22.47,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.2,
    "reviewCount": 134,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "dubai-choc-1888380-10-units-16-99",
    "name": "Dubai Choc (1888380) 10 units @ $16.99",
    "slug": "dubai-choc-1888380-10-units-16-99",
    "description": "Dubai Choc (1888380) 10 units @ $16.99. Quality product from Buster's Markets.",
    "price": 246.36,
    "unit": "each",
    "category": "grocery",
    "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 111,
    "tags": [
      "grocery"
    ]
  },
  {
    "id": "skinless-franks-965253-10-units-16-99",
    "name": "Skinless Franks (965253) 10 units @ $16.99",
    "slug": "skinless-franks-965253-10-units-16-99",
    "description": "Skinless Franks (965253) 10 units @ $16.99. Premium quality, fresh and flavorful.",
    "price": 246.36,
    "unit": "each",
    "category": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    "inStock": true,
    "rating": 4.1,
    "reviewCount": 154,
    "tags": [
      "meat-seafood"
    ]
  }
]

export const weeklyDeals: Product[] = products.filter(p => p.isSale).slice(0, 12)
export const featuredProducts: Product[] = products.slice(0, 12)
export const newArrivals: Product[] = products.filter(p => p.isNew).slice(0, 12)
