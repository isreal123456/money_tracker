import { BudgetPanel } from '../components/BudgetPanel'
import { CategoryChart } from '../components/CategoryChart'
import SummaryCard from '../components/SummaryCard'
import { TransactionList } from '../components/TransactionList'
import { useFinanceActions, useFinanceState } from '../state/useFinance'
import { selectBudgetView } from '../state/selectors'
import { formatCurrency } from '../utils/helpers'

export function Budget() {
  const financeState = useFinanceState()
  const { setBudget } = useFinanceActions()
  const { budget } = financeState
  const { monthTotals, categoryData, recentTransactions } =
    selectBudgetView(financeState)

  const remaining = budget - monthTotals.totalExpenses
  const usage = budget > 0 ? (monthTotals.totalExpenses / budget) * 100 : 0
  const isOverBudget = remaining < 0

  return (
    <section className="space-y-6">
      <div className="glass flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <span className="saas-badge mb-3">Budget Page</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Manage your monthly budget
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300 md:text-base">
            Track how much you planned to spend and how close you are to the limit.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Monthly Budget" value={budget} tone="balance" />
        <SummaryCard title="Spent This Month" value={monthTotals.totalExpenses} tone="expense" />
        <SummaryCard title="Remaining" value={remaining} tone={remaining >= 0 ? 'income' : 'expense'} />
        <div className="glass border border-slate-200 p-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Usage
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {Number.isFinite(usage) ? usage.toFixed(1) : '0.0'}%
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">of your monthly limit</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <BudgetPanel
          budget={budget}
          onBudgetChange={setBudget}
          totalExpenses={monthTotals.totalExpenses}
        />

        <div className="glass p-5 md:p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Budget status</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            {isOverBudget
              ? 'You are over budget this month. Consider reducing variable spending.'
              : 'You are within budget. Great job staying on track.'}
          </p>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Budget</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(budget)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Spent</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(monthTotals.totalExpenses)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Remaining</span>
              <span className={`font-semibold ${isOverBudget ? 'text-red-500 dark:text-red-300' : 'text-green-600 dark:text-green-300'}`}>
                {formatCurrency(remaining)}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Usage progress</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{Math.min(usage, 100).toFixed(0)}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  isOverBudget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <CategoryChart data={categoryData} />
        </div>
        <div className="min-w-0">
          <div className="glass p-5 md:p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Spending</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Latest expense transactions for the current month.
            </p>
            <div className="mt-4">
              <TransactionList transactions={recentTransactions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

