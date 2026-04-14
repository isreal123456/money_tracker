import { useMemo, useState } from 'react'
import LineTrendChart from '../components/LineTrendChart'
import { CategoryChart } from '../components/CategoryChart'
import { TransactionList } from '../components/TransactionList'
import SummaryCard from '../components/SummaryCard'
import { useFinanceState } from '../state/useFinance'
import { selectReportsView } from '../state/selectors'
import { formatCurrency, formatDate } from '../utils/helpers'

function Reports() {
  const financeState = useFinanceState()
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const monthLabel = useMemo(
    () =>
      selectedMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [selectedMonth],
  )

  const { monthlyAnalytics, trendData, recentTransactions } = useMemo(
    () => selectReportsView(financeState, selectedMonth),
    [financeState, selectedMonth],
  )

  const shiftMonth = (offset) => {
    setSelectedMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1),
    )
  }

  const resetToCurrentMonth = () => {
    const today = new Date()
    setSelectedMonth(new Date(today.getFullYear(), today.getMonth(), 1))
  }

  const topCategoryLabel = monthlyAnalytics.topCategory?.category || 'No category yet'
  const topCategoryValue = monthlyAnalytics.topCategory?.amount || 0
  const highestTransactionLabel = monthlyAnalytics.highestTransaction
    ? `${monthlyAnalytics.highestTransaction.category} · ${monthlyAnalytics.highestTransaction.type}`
    : 'No transactions yet'
  const highestTransactionValue = monthlyAnalytics.highestTransaction?.amount || 0

  const reportMetrics = [
    {
      label: 'Transactions',
      value: monthlyAnalytics.transactionCount.toString(),
      helper: 'Entries in the selected month',
    },
    {
      label: 'Avg Transaction',
      value: formatCurrency(monthlyAnalytics.averageTransaction),
      helper: 'Average value per entry',
    },
    {
      label: 'Avg Expense',
      value: formatCurrency(monthlyAnalytics.averageExpense),
      helper: 'Expense average per purchase',
    },
    {
      label: 'Net Savings',
      value: formatCurrency(monthlyAnalytics.balance),
      helper: 'Income minus expenses',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="glass flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
            Reports / Analytics
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Monthly report for {monthLabel}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300 md:text-base">
            Review income, spending, category trends, and transaction activity for the selected month.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="saas-btn-secondary px-4 py-2"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={resetToCurrentMonth}
            className="saas-btn-secondary px-4 py-2"
          >
            Current
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="saas-btn-secondary px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Income" value={monthlyAnalytics.totalIncome} tone="income" />
        <SummaryCard title="Total Expenses" value={monthlyAnalytics.totalExpenses} tone="expense" />
        <SummaryCard title="Current Balance" value={monthlyAnalytics.balance} tone="balance" />
        <div className="glass border border-slate-200 p-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Transactions
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {monthlyAnalytics.transactionCount}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            In {monthLabel}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportMetrics.map((metric) => (
          <div key={metric.label} className="glass p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {metric.label}
            </p>
            <p className="mt-2 break-words text-xl font-bold text-slate-900 dark:text-slate-100">
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{metric.helper}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="glass p-5 md:p-6">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Top Category</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Highest spending category in the selected month.
          </p>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{topCategoryLabel}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(topCategoryValue)}
            </p>
          </div>
        </div>

        <div className="glass p-5 md:p-6">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Largest Transaction</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Biggest transaction recorded in the selected month.
          </p>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{highestTransactionLabel}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(highestTransactionValue)}
            </p>
            {monthlyAnalytics.highestTransaction ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {formatDate(monthlyAnalytics.highestTransaction.date)}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <LineTrendChart
            data={trendData}
            title="Monthly Cashflow Trend"
            subtitle={`Daily income minus expenses for ${monthLabel}`}
          />
        </div>
        <div className="min-w-0">
          <CategoryChart data={monthlyAnalytics.categoryData} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="min-w-0">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Recent Transactions
          </h2>
          <TransactionList transactions={recentTransactions} />
        </div>

        <div className="glass p-5 md:p-6">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Monthly Snapshot</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Quick summary of how this month is performing.
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <span className="text-sm text-slate-600 dark:text-slate-300">Income vs Expense</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(monthlyAnalytics.totalIncome)} / {formatCurrency(monthlyAnalytics.totalExpenses)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <span className="text-sm text-slate-600 dark:text-slate-300">Net Balance</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(monthlyAnalytics.balance)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <span className="text-sm text-slate-600 dark:text-slate-300">Entries Count</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {monthlyAnalytics.transactionCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reports

