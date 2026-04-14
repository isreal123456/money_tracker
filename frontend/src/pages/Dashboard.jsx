import { BudgetPanel } from '../components/BudgetPanel'
import CalendarChart from '../components/CalendarChart'
import { CategoryChart } from '../components/CategoryChart'
import LineTrendChart from '../components/LineTrendChart'
import SummaryCard from '../components/SummaryCard'
import { TransactionList } from '../components/TransactionList'
import { useFinanceActions, useFinanceState } from '../state/useFinance'
import { selectDashboardView } from '../state/selectors'

function Dashboard() {
  const financeState = useFinanceState()
  const { setBudget } = useFinanceActions()
  const { transactions, totals, budget, recentTransactions, chartData, trendData } =
    selectDashboardView(financeState)

  return (
    <section className="space-y-6">
      <div className="glass flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Net Worth</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Overview of your income and spending</p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-300">Last update: {new Date().toLocaleDateString('en-US')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard title="Total Income" value={totals.totalIncome} tone="income" />
        <SummaryCard title="Total Expenses" value={totals.totalExpenses} tone="expense" />
        <SummaryCard title="Current Balance" value={totals.balance} tone="balance" />
      </div>

      <BudgetPanel
        budget={budget}
        onBudgetChange={setBudget}
        totalExpenses={totals.totalExpenses}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <LineTrendChart data={trendData} />
        </div>
        <div className="min-w-0">
          <CategoryChart data={chartData} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="min-w-0">
          <h2 className="mb-3 text-xl font-semibold">Recent Transactions</h2>
          <TransactionList transactions={recentTransactions} />
        </div>

        <CalendarChart transactions={transactions} />
      </div>
    </section>
  )
}

export default Dashboard

