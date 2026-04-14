import { differenceInDays, parseLocalDate } from '../utils/date'
import {
  calculateTotals,
  formatCurrency,
  formatDate,
  getCategorySpendingData,
  getMonthlyAnalytics,
  getMonthlyTrendData,
  getRecentTransactions,
  getTransactionTrendData,
  getTransactionsByMonth,
} from '../utils/helpers'

export const selectTotals = (state) => calculateTotals(state.transactions)

export const selectAlertCount = (state) => {
  const totals = selectTotals(state)
  let count = 0

  if (state.notificationPrefs.budgetAlerts && state.budget > 0) {
    const usage = (totals.totalExpenses / state.budget) * 100
    if (totals.totalExpenses >= state.budget || usage >= 80) {
      count += 1
    }
  }

  if (state.notificationPrefs.goalReminders) {
    const today = new Date()
    const dueSoonGoals = state.goals.filter((goal) => {
      const parsedDeadline = parseLocalDate(goal.deadline)
      if (!parsedDeadline || goal.savedAmount >= goal.targetAmount) {
        return false
      }

      const daysLeft = differenceInDays(today, parsedDeadline)
      return daysLeft !== null && daysLeft <= 14 && daysLeft >= 0
    })

    count += dueSoonGoals.length
  }

  return count
}

export const selectNotifications = (state) => {
  const totals = selectTotals(state)
  const items = []
  const usage = state.budget > 0 ? (totals.totalExpenses / state.budget) * 100 : 0

  if (state.notificationPrefs.budgetAlerts) {
    if (state.budget > 0 && totals.totalExpenses >= state.budget) {
      items.push({
        id: 'budget-over',
        tone: 'danger',
        title: 'Budget alert',
        message: `You have exceeded your budget by ${formatCurrency(
          totals.totalExpenses - state.budget,
          state.currency,
        )}.`,
      })
    } else if (state.budget > 0 && usage >= 80) {
      items.push({
        id: 'budget-warning',
        tone: 'warning',
        title: 'Budget reminder',
        message: `You have used ${usage.toFixed(0)}% of your budget.`,
      })
    } else {
      items.push({
        id: 'budget-safe',
        tone: 'success',
        title: 'Budget status',
        message: 'Your spending is still within a safe range.',
      })
    }
  }

  if (state.notificationPrefs.goalReminders) {
    const today = new Date()

    state.goals.forEach((goal) => {
      const parsedDeadline = parseLocalDate(goal.deadline)
      const daysLeft = differenceInDays(today, parsedDeadline)

      if (
        parsedDeadline &&
        daysLeft !== null &&
        daysLeft <= 14 &&
        daysLeft >= 0 &&
        goal.savedAmount < goal.targetAmount
      ) {
        items.push({
          id: `goal-${goal.id}`,
          tone: 'warning',
          title: 'Savings reminder',
          message: `${goal.name} is due on ${formatDate(goal.deadline)} and still needs ${formatCurrency(
            goal.targetAmount - goal.savedAmount,
            state.currency,
          )}.`,
        })
      }

      if (goal.savedAmount >= goal.targetAmount) {
        items.push({
          id: `goal-complete-${goal.id}`,
          tone: 'success',
          title: 'Goal achieved',
          message: `${goal.name} has reached its savings target. Great job!`,
        })
      }
    })
  }

  return items
}

export const selectDashboardView = (state) => {
  const totals = selectTotals(state)
  return {
    transactions: state.transactions,
    budget: state.budget,
    totals,
    recentTransactions: getRecentTransactions(state.transactions, 5),
    chartData: getCategorySpendingData(state.transactions),
    trendData: getTransactionTrendData(state.transactions, 14),
  }
}

export const selectBudgetView = (state) => {
  const monthTransactions = getTransactionsByMonth(state.transactions, new Date())
  const monthTotals = calculateTotals(monthTransactions)

  return {
    monthTransactions,
    monthTotals,
    categoryData: getCategorySpendingData(monthTransactions),
    recentTransactions: getRecentTransactions(
      monthTransactions.filter((transaction) => transaction.type === 'Expense'),
      5,
    ),
  }
}

export const selectReportsView = (state, selectedMonth) => {
  const monthlyAnalytics = getMonthlyAnalytics(state.transactions, selectedMonth)

  return {
    monthlyAnalytics,
    trendData: getMonthlyTrendData(monthlyAnalytics.monthTransactions, selectedMonth),
    recentTransactions: getRecentTransactions(monthlyAnalytics.monthTransactions, 5),
  }
}

