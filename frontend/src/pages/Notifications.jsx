import SummaryCard from '../components/SummaryCard'
import { useFinanceActions, useFinanceState } from '../state/useFinance'
import { selectNotifications, selectTotals } from '../state/selectors'

export function Notifications() {
  const financeState = useFinanceState()
  const { toggleNotificationPreference } = useFinanceActions()
  const totals = selectTotals(financeState)
  const notifications = selectNotifications(financeState)
  const { budget, goals, notificationPrefs } = financeState

  const cardToneStyles = {
    danger: 'border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-900/30 dark:text-red-300',
    warning: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-900/30 dark:text-amber-300',
    success: 'border-green-200 bg-green-50 text-green-600 dark:border-green-900 dark:bg-green-900/30 dark:text-green-300',
  }

  return (
    <section className="space-y-6">
      <div className="glass flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <span className="saas-badge mb-3">Notifications</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Alerts and reminders
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300 md:text-base">
            Stay on top of budget limits and savings goal deadlines with in-app alerts.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Budget" value={budget} tone="balance" />
        <SummaryCard title="Spent" value={totals.totalExpenses} tone="expense" />
        <div className="glass border border-slate-200 p-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Goals
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {goals.length}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">tracked savings goals</p>
        </div>
        <SummaryCard title="Balance" value={totals.balance} tone="balance" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass p-5 md:p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Notification settings</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Turn budget alerts and savings reminders on or off.
          </p>

          <div className="mt-5 space-y-4">
            <label className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Budget alerts</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">Warn when spending nears or exceeds budget.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.budgetAlerts}
                onChange={() => toggleNotificationPreference('budgetAlerts')}
                className="h-5 w-5 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Savings reminders</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">Get reminders for goals due soon.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.goalReminders}
                onChange={() => toggleNotificationPreference('goalReminders')}
                className="h-5 w-5 accent-blue-600"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="glass p-8 text-center">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">No notifications right now</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Enable alerts or create goals to see reminders here.
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <article key={item.id} className={`rounded-2xl border p-4 ${cardToneStyles[item.tone]}`}>
                <h4 className="text-sm font-semibold uppercase tracking-wide">{item.title}</h4>
                <p className="mt-2 text-sm leading-6">{item.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

