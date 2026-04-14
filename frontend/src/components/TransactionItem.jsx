import { formatCurrency, formatDate } from '../utils/helpers'

export function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'Income'

  return (
    <li className="glass flex items-center justify-between gap-3 p-3.5">
      <div>
        <p className="font-semibold text-slate-800 dark:text-slate-100">{transaction.category}</p>
        <p className="text-xs text-slate-500 dark:text-slate-300">{formatDate(transaction.date)}</p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isIncome
              ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300'
              : 'bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-300'
          }`}
        >
          {transaction.type}
        </span>

        <p className={`text-sm font-bold ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>

        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(transaction.id)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-red-900/50"
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  )
}


