import { formatCurrency } from '../utils/helpers'

export function CategoryChart({ data }) {
  if (data.length === 0) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-300">No expense data for chart yet.</p>
      </div>
    )
  }

  const maxAmount = Math.max(...data.map((item) => item.amount), 1)

  return (
    <div className="glass overflow-hidden p-5 md:p-6">
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Spending by Category</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.category} className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="min-w-0 break-words font-medium">{item.category}</span>
              <span className="shrink-0 text-slate-500 dark:text-slate-300">{formatCurrency(item.amount)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(item.amount / maxAmount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


