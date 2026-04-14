import { useMemo, useState } from 'react'
import { formatCurrency, getCalendarExpenseData } from '../utils/helpers'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function CalendarChart({ transactions }) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const { days, monthLabel, maxExpense } = useMemo(
    () => getCalendarExpenseData(transactions, visibleMonth),
    [transactions, visibleMonth],
  )

  const goToPreviousMonth = () => {
    setVisibleMonth(
      (previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1),
    )
  }

  const goToNextMonth = () => {
    setVisibleMonth(
      (previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1),
    )
  }

  return (
    <div className="glass p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Expense Calendar</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            Prev
          </button>
          <p className="min-w-32 text-center text-sm font-medium">{monthLabel}</p>
          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-slate-500 dark:text-slate-300">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-1.5">
        {days.map((day) => {
          const intensity = maxExpense > 0 ? day.expense / maxExpense : 0
          const background =
            day.expense > 0
              ? `rgba(79, 70, 229, ${Math.max(0.2, intensity)})`
              : undefined

          return (
            <div
              key={day.dateKey}
              className={`h-14 rounded-lg border p-1 text-xs transition hover:scale-[1.02] md:h-16 md:p-1.5 ${
                day.isCurrentMonth
                  ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                  : 'border-transparent bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
              }`}
              style={background ? { backgroundColor: background } : undefined}
              title={
                day.expense > 0
                  ? `${day.dateKey}: ${formatCurrency(day.expense)}`
                  : `${day.dateKey}: No expense`
              }
            >
              <p>{day.dayNumber}</p>
              {day.expense > 0 ? (
                <p className="mt-1 truncate text-[10px] font-semibold text-slate-800 dark:text-white md:text-[11px]">
                  {formatCurrency(day.expense)}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarChart

