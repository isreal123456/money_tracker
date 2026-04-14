import { TransactionItem } from './TransactionItem'

export function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <p className="text-lg font-semibold">No transactions found</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Add a transaction to get started.</p>
      </div>
    )
  }

  return (
    <div className="glass p-3">
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}


