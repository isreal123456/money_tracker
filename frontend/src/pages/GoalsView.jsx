import { useMemo, useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import { useFinanceActions, useFinanceState } from '../state/useFinance'
import { formatDisplayDate } from '../utils/date'
import { formatCurrency } from '../utils/helpers'

const createDefaultForm = () => {
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 90)

  return {
    name: '',
    targetAmount: '',
    savedAmount: '',
    deadline: deadline.toISOString().split('T')[0],
    note: '',
  }
}

export function Goals() {
  const { goals } = useFinanceState()
  const { addGoal, updateGoal, deleteGoal } = useFinanceActions()
  const [form, setForm] = useState(createDefaultForm)
  const [error, setError] = useState('')

  const totals = useMemo(() => {
    const targetTotal = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
    const savedTotal = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)
    const completedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length

    return {
      targetTotal,
      savedTotal,
      remaining: Math.max(targetTotal - savedTotal, 0),
      completedGoals,
    }
  }, [goals])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const targetAmount = Number(form.targetAmount)
    const savedAmount = Number(form.savedAmount) || 0

    if (!form.name.trim()) {
      setError('Please enter a goal name.')
      return
    }

    if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
      setError('Target amount must be greater than 0.')
      return
    }

    if (!Number.isFinite(savedAmount) || savedAmount < 0) {
      setError('Saved amount must be 0 or more.')
      return
    }

    setError('')
    addGoal({
      name: form.name.trim(),
      targetAmount,
      savedAmount,
      deadline: form.deadline,
      note: form.note.trim(),
    })
    setForm(createDefaultForm())
  }

  const updateSavedAmount = (goalId, value) => {
    updateGoal(goalId, { savedAmount: Number(value) || 0 })
  }

  return (
    <section className="space-y-6">
      <div className="glass flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <span className="saas-badge mb-3">Goals / Savings</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Set and track your savings goals
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300 md:text-base">
            Create savings goals, update progress, and monitor how close you are to each milestone.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Goal Target" value={totals.targetTotal} tone="balance" />
        <SummaryCard title="Total Saved" value={totals.savedTotal} tone="income" />
        <SummaryCard title="Still Needed" value={totals.remaining} tone="expense" />
        <div className="glass border border-slate-200 p-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Completed Goals
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totals.completedGoals}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">goal(s) reached</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form className="glass space-y-4 p-5 md:p-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create goal</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Add a new savings target and start tracking progress.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              Goal name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="New car, emergency fund..."
                className="saas-input"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Target amount
              <input
                type="number"
                name="targetAmount"
                min="1"
                step="0.01"
                value={form.targetAmount}
                onChange={handleChange}
                className="saas-input"
                placeholder="5000"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Saved so far
              <input
                type="number"
                name="savedAmount"
                min="0"
                step="0.01"
                value={form.savedAmount}
                onChange={handleChange}
                className="saas-input"
                placeholder="1000"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Deadline
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="saas-input"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              Note
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows="3"
                placeholder="Optional note or purpose"
                className="saas-input resize-none"
              />
            </label>
          </div>

          {error ? (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 dark:bg-red-900/40 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <button type="submit" className="saas-btn-primary">
            Add Savings Goal
          </button>
        </form>

        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="glass p-8 text-center">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">No goals yet</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Create your first savings goal to start tracking progress.
              </p>
            </div>
          ) : (
            goals.map((goal) => {
              const progress = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0
              const remaining = goal.targetAmount - goal.savedAmount
              const isCompleted = goal.savedAmount >= goal.targetAmount

              return (
                <article key={goal.id} className="glass space-y-4 p-5 md:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{goal.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-300">Due {formatDisplayDate(goal.deadline)}</p>
                      {goal.note ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{goal.note}</p> : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteGoal(goal.id)}
                      className="self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-red-900/40"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-300">Progress</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {Math.min(progress, 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Target
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Saved
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {formatCurrency(goal.savedAmount)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Remaining
                      </p>
                      <p className={`mt-1 text-sm font-semibold ${remaining <= 0 ? 'text-green-600 dark:text-green-300' : 'text-slate-900 dark:text-slate-100'}`}>
                        {remaining <= 0 ? 'Goal reached' : formatCurrency(remaining)}
                      </p>
                    </div>
                  </div>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Update saved amount
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={goal.savedAmount}
                      onChange={(event) => updateSavedAmount(goal.id, event.target.value)}
                      className="saas-input mt-2"
                    />
                  </label>
                </article>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

