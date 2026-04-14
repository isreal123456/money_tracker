import { useState } from 'react'
import { CATEGORIES } from '../utils/helpers'

const initialForm = {
  amount: '',
  type: 'Expense',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
}

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const amount = Number(form.amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be a number greater than 0.')
      return
    }

    if (!form.category || !form.date || !form.type) {
      setError('Please complete all fields.')
      return
    }

    setError('')
    onAdd({ ...form, amount })
    setForm({ ...initialForm, type: form.type })
  }

  return (
    <form className="glass space-y-4 p-5" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold">Add New Transaction</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Amount
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={onChange}
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900"
            placeholder="e.g. 120.00"
          />
        </label>

        <label className="space-y-2 text-sm font-medium">
          Type
          <select
            name="type"
            value={form.type}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium">
          Category
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium">
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900"
          />
        </label>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-[#1E40AF]"
      >
        Save Transaction
      </button>
    </form>
  )
}

export default TransactionForm

