import TransactionForm from '../components/TransactionForm'
import { useFinanceActions } from '../state/useFinance'

export function AddTransaction() {
  const { addTransaction } = useFinanceActions()

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Add Transaction</h2>
      <p className="text-sm text-slate-500 dark:text-slate-300">
        Enter details below and the dashboard updates instantly.
      </p>
      <TransactionForm onAdd={addTransaction} />
    </section>
  )
}


