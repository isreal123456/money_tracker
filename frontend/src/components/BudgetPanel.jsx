import { formatCurrency } from '../utils/helpers'

export function BudgetPanel({ budget, onBudgetChange, totalExpenses }) {
  const usage = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0
  const isOverBudget = totalExpenses > budget

  return (
    <div className="glass p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Monthly Budget</h3>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Used {formatCurrency(totalExpenses)} of {formatCurrency(budget)}
          </p>
        </div>

        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Set budget
          <input
            type="number"
            min="1"
            value={budget}
            onChange={(event) => onBudgetChange(Number(event.target.value) || 0)}
            className="ml-2 w-36 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800"
          />
        </label>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isOverBudget ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${usage}%` }}
        />
      </div>

      {isOverBudget ? (
        <p className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 dark:bg-red-900/50 dark:text-red-300">
          Warning: You are over budget.
        </p>
      ) : null}
    </div>
  )
}


