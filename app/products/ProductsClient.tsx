'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, List } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/lib/types'
import { clsx } from 'clsx'

const priceRanges = [
  { label: 'Under $5',     min: 0,  max: 5  },
  { label: '$5 – $10',     min: 5,  max: 10 },
  { label: '$10 – $20',    min: 10, max: 20 },
  { label: 'Over $20',     min: 20, max: Infinity },
]

const sortOptions = [
  { value: 'relevance',  label: 'Relevance' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'newest',     label: 'Newest' },
]

function ProductsContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const q        = searchParams.get('q')        ?? ''
  const catParam = searchParams.get('category') ?? ''
  const tagParam = searchParams.get('tag')      ?? ''

  const [selectedCategory, setSelectedCategory] = useState(catParam)
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [showOrganic, setShowOrganic]     = useState(false)
  const [showOnSale, setShowOnSale]       = useState(tagParam === 'sale')
  const [sortBy, setSortBy]               = useState('relevance')
  const [filterOpen, setFilterOpen]       = useState(false)
  const [viewMode, setViewMode]           = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let result = [...products]

    if (q) {
      const lower = q.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some(t => t.toLowerCase().includes(lower))
      )
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      result = result.filter(p => p.price >= range.min && p.price < range.max)
    }

    if (showOrganic) result = result.filter(p => p.isOrganic)
    if (showOnSale)  result = result.filter(p => p.isSale)

    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break
    }

    return result
  }, [products, q, selectedCategory, selectedPriceRange, showOrganic, showOnSale, sortBy])

  const liveCategories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))).sort((a, b) => a.localeCompare(b)),
    [products]
  )

  const activeFilterCount = [
    selectedCategory, selectedPriceRange !== null, showOrganic, showOnSale
  ].filter(Boolean).length

  const clearAll = () => {
    setSelectedCategory('')
    setSelectedPriceRange(null)
    setShowOrganic(false)
    setShowOnSale(false)
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-sm font-bold text-forest-900 mb-3">Category</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setSelectedCategory('')}
            className={clsx('w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
              !selectedCategory ? 'bg-forest-700 text-white font-semibold' : 'text-gray-600 hover:bg-forest-50'
            )}
          >
            All Categories
          </button>
          {liveCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              className={clsx('w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors capitalize',
                selectedCategory === cat
                  ? 'bg-forest-700 text-white font-semibold'
                  : 'text-gray-600 hover:bg-forest-50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-bold text-forest-900 mb-3">Price Range</h3>
        <div className="space-y-1.5">
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
              className={clsx('w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
                selectedPriceRange === i
                  ? 'bg-forest-700 text-white font-semibold'
                  : 'text-gray-600 hover:bg-forest-50'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div>
        <h3 className="text-sm font-bold text-forest-900 mb-3">Dietary</h3>
        <div className="space-y-2">
          {[
            { label: '🌿 Organic only', value: showOrganic, setter: setShowOrganic },
            { label: '🔥 On sale',       value: showOnSale,  setter: setShowOnSale  },
          ].map(({ label, value, setter }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setter(!value)}
                className={clsx('w-9 h-5 rounded-full transition-colors relative cursor-pointer',
                  value ? 'bg-forest-600' : 'bg-gray-200'
                )}
              >
                <div className={clsx('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                  value ? 'translate-x-4' : 'translate-x-0.5'
                )} />
              </div>
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full py-2 text-sm text-ember font-semibold hover:text-red-700 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-forest-900">
          {q ? `Results for "${q}"` : selectedCategory
            ? selectedCategory
            : showOnSale ? '🔥 Weekly Deals' : 'All Products'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-forest-900 flex items-center gap-1.5">
                <SlidersHorizontal size={16} />
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <span className="bg-forest-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-5">
            {/* Mobile filter button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-forest-700 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx('p-2 transition-colors', viewMode === 'grid' ? 'bg-forest-700 text-white' : 'hover:bg-gray-50 text-gray-500')}
                >
                  <Grid3X3 size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx('p-2 transition-colors', viewMode === 'list' ? 'bg-forest-700 text-white' : 'hover:bg-gray-50 text-gray-500')}
                >
                  <List size={15} />
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white
                             text-gray-700 focus:outline-none focus:border-forest-400 cursor-pointer"
                >
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="font-display font-bold text-xl text-forest-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search term.</p>
              <button onClick={clearAll} className="px-4 py-2 bg-forest-700 text-white rounded-full text-sm font-semibold hover:bg-forest-800 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={clsx(
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
            )}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} compact={viewMode === 'list'} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setFilterOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 z-50 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-forest-900 text-lg">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full mt-5 py-3 bg-forest-700 text-white rounded-xl font-bold hover:bg-forest-800 transition-colors"
            >
              Show {filtered.length} results
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function ProductsClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-forest-600">Loading products…</div>}>
      <ProductsContent products={products} />
    </Suspense>
  )
}
