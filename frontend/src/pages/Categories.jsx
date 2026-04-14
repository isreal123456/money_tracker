import { useMemo } from 'react'
import { useFinanceState } from '../state/useFinance'
import {
  CATEGORIES,
  formatCurrency,
  getUniqueCategories,
} from '../utils/helpers'

export function Categories() {
  const { transactions } = useFinanceState()

  const categorySummary = useMemo(() => {
    const categories = [...new Set([...CATEGORIES, ...getUniqueCategories(transactions)])]

    return categories
      .map((category) => {
        const items = transactions.filter((transaction) => transaction.category === category)
        const income = items
          .filter((transaction) => transaction.type === 'Income')
          .reduce((sum, transaction) => sum + transaction.amount, 0)
        const expense = items
          .filter((transaction) => transaction.type === 'Expense')
          .reduce((sum, transaction) => sum + transaction.amount, 0)

        return {
          category,
          count: items.length,
          income,
          expense,
          balance: income - expense,
        }
      })
      .sort((a, b) => b.expense - a.expense)
  }, [transactions])

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
          Categories
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          Manage and review how each category contributes to your finance activity.
        </p>
      </div>

      <div className="grid gap-4">
        {categorySummary.map((item) => (
          <article key={item.category} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.category}</h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {item.count} transaction{item.count === 1 ? '' : 's'}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <p className="text-xs text-green-600 dark:text-green-300">Income</p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-300">{formatCurrency(item.income)}</p>
              </div>
              <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                <p className="text-xs text-red-500 dark:text-red-300">Expense</p>
                <p className="text-sm font-semibold text-red-500 dark:text-red-300">{formatCurrency(item.expense)}</p>
              </div>
              <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-xs text-slate-600 dark:text-slate-300">Balance</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(item.balance)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

