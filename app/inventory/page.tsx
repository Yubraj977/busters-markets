import { getBackofficeInventory } from '@/lib/backoffice'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  let items: Awaited<ReturnType<typeof getBackofficeInventory>> = []
  let error: string | null = null

  try {
    items = await getBackofficeInventory()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load inventory'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-3xl text-forest-900 mb-1">Live Inventory</h1>
      <p className="text-sm text-gray-500 mb-6">
        Pulled directly from the backoffice — {items.length} item{items.length === 1 ? '' : 's'}
      </p>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          Could not load inventory: {error}
        </div>
      )}

      {!error && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-4 py-2 font-semibold">SKU</th>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Category / Dept</th>
                <th className="px-4 py-2 font-semibold text-right">Price</th>
                <th className="px-4 py-2 font-semibold text-right">Qty on Hand</th>
                <th className="px-4 py-2 font-semibold">Unit</th>
                <th className="px-4 py-2 font-semibold">Flags</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const onSale =
                  item.salePrice != null &&
                  (!item.saleStartsAt || new Date(item.saleStartsAt) <= new Date()) &&
                  (!item.saleEndsAt || new Date(item.saleEndsAt) >= new Date())

                const flags = [
                  item.isWeighed && 'Weighed',
                  item.taxable && 'Taxable',
                  item.ebtEligible && 'EBT',
                  item.ageRestricted && '21+',
                ].filter(Boolean) as string[]

                return (
                  <tr key={item.sku} className="border-t border-gray-100">
                    <td className="px-4 py-2 font-mono text-xs text-gray-500">{item.sku}</td>
                    <td className="px-4 py-2 font-medium text-forest-900">{item.name}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {item.category || item.department || '—'}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {onSale ? (
                        <>
                          <span className="text-ember font-semibold">
                            ${item.salePrice!.toFixed(2)}
                          </span>{' '}
                          <span className="text-gray-400 line-through text-xs">
                            ${item.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>${item.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td
                      className={`px-4 py-2 text-right font-semibold ${
                        item.quantityOnHand <= 0 ? 'text-red-600' : 'text-forest-900'
                      }`}
                    >
                      {item.quantityOnHand}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{item.unit}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {flags.map(f => (
                          <span
                            key={f}
                            className="px-1.5 py-0.5 rounded bg-forest-50 text-forest-700 text-xs"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
