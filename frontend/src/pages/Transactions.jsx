import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TransactionList } from '../components/TransactionList'
import { useFinanceActions, useFinanceState } from '../state/useFinance'
import {
  CATEGORIES,
  filterTransactions,
  getUniqueCategories,
} from '../utils/helpers'

export function Transactions() {
  const financeState = useFinanceState()
  const { deleteTransaction } = useFinanceActions()
  const { transactions } = financeState
  const [searchParams] = useSearchParams()
  const [typeFilter, setTypeFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const searchQuery = searchParams.get('q')?.trim().toLowerCase() || ''

  const categories = useMemo(() => {
    const dynamicCategories = getUniqueCategories(transactions)
    const combined = new Set([...CATEGORIES, ...dynamicCategories])
    return ['All', ...combined]
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    const bySelection = filterTransactions(transactions, typeFilter, categoryFilter)

    if (!searchQuery) {
      return bySelection
    }

    return bySelection.filter((transaction) => {
      const haystack = [
        transaction.category,
        transaction.type,
        String(transaction.amount),
        transaction.date,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(searchQuery)
    })
  }, [transactions, typeFilter, categoryFilter, searchQuery])

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">All Transactions</h2>

      {searchQuery ? (
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Search results for <span className="font-semibold text-slate-700 dark:text-slate-100">"{searchQuery}"</span>
        </p>
      ) : null}

      <div className="glass grid gap-4 p-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Filter by type
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>

        <label className="text-sm font-medium">
          Filter by category
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
      />
    </section>
  )
}


