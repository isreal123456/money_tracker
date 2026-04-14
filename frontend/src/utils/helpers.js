import { formatDisplayDate, parseLocalDate, toDateKey } from './date'

export const CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Salary',
  'Entertainment',
  'Shopping',
  'Health',
  'Other',
]

export const MOCK_TRANSACTIONS = [
  { id: 't1', amount: 3200, type: 'Income', category: 'Salary', date: '2026-04-01' },
  { id: 't2', amount: 45, type: 'Expense', category: 'Transport', date: '2026-04-06' },
  { id: 't3', amount: 90, type: 'Expense', category: 'Food', date: '2026-04-08' },
  { id: 't4', amount: 110, type: 'Expense', category: 'Bills', date: '2026-04-09' },
  { id: 't5', amount: 120, type: 'Income', category: 'Other', date: '2026-04-11' },
  { id: 't6', amount: 65, type: 'Expense', category: 'Entertainment', date: '2026-04-12' },
]

export const MOCK_GOALS = [
  {
    id: 'g1',
    name: 'Emergency Fund',
    targetAmount: 5000,
    savedAmount: 1800,
    deadline: '2026-09-30',
    note: 'Build a 3-6 month safety net',
  },
  {
    id: 'g2',
    name: 'Vacation Trip',
    targetAmount: 2200,
    savedAmount: 650,
    deadline: '2026-08-15',
    note: 'Save for flight, stay, and food',
  },
]

export const formatCurrency = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)

export const formatDate = (dateString) => formatDisplayDate(dateString)

export const calculateTotals = (transactions) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  }
}

export const getRecentTransactions = (transactions, limit = 5) =>
  [...transactions]
    .sort((a, b) => {
      const dateA = parseLocalDate(a.date)
      const dateB = parseLocalDate(b.date)
      const timeA = dateA ? dateA.getTime() : 0
      const timeB = dateB ? dateB.getTime() : 0
      return timeB - timeA
    })
    .slice(0, limit)

export const getCategorySpendingData = (transactions) => {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'Expense',
  )

  const grouped = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export const getTransactionsByMonth = (transactions, monthDate = new Date()) => {
  const parsedMonth = parseLocalDate(monthDate)
  if (!parsedMonth) {
    return []
  }

  const monthYear = parsedMonth.getFullYear()
  const monthIndex = parsedMonth.getMonth()

  return transactions.filter((transaction) => {
    const transactionDate = parseLocalDate(transaction.date)
    if (!transactionDate) {
      return false
    }
    return (
      transactionDate.getFullYear() === monthYear &&
      transactionDate.getMonth() === monthIndex
    )
  })
}

export function getMonthlyTrendData(transactions, monthDate = new Date()) {
  const parsedMonth = parseLocalDate(monthDate)
  if (!parsedMonth) {
    return []
  }

  const monthStart = new Date(parsedMonth.getFullYear(), parsedMonth.getMonth(), 1)
  const monthEnd = new Date(parsedMonth.getFullYear(), parsedMonth.getMonth() + 1, 0)
  const totalDays = monthEnd.getDate()

  const byDate = transactions.reduce((accumulator, transaction) => {
    const signedAmount = transaction.type === 'Income' ? transaction.amount : -transaction.amount
    accumulator[transaction.date] = (accumulator[transaction.date] || 0) + signedAmount
    return accumulator
  }, {})

  return Array.from({ length: totalDays }, (_, index) => {
    const day = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      monthStart.getDate() + index,
    )
    const key = toDateKey(day)

    return {
      dateKey: key,
      shortLabel: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: byDate[key] || 0,
    }
  })
}

export function getMonthlyAnalytics(transactions, monthDate = new Date()) {
  const monthTransactions = getTransactionsByMonth(transactions, monthDate)
  const totals = calculateTotals(monthTransactions)
  const categoryData = getCategorySpendingData(monthTransactions)
  const expenseTransactions = monthTransactions.filter((transaction) => transaction.type === 'Expense')
  const highestTransaction = [...monthTransactions].sort((a, b) => b.amount - a.amount)[0] || null

  return {
    monthTransactions,
    transactionCount: monthTransactions.length,
    averageTransaction: monthTransactions.length
      ? (totals.totalIncome + totals.totalExpenses) / monthTransactions.length
      : 0,
    averageExpense: expenseTransactions.length
      ? totals.totalExpenses / expenseTransactions.length
      : 0,
    topCategory: categoryData[0] || null,
    highestTransaction,
    categoryData,
    ...totals,
  }
}

export const getTransactionTrendData = (transactions, days = 14) => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - days + 1)

  const byDate = transactions.reduce((accumulator, transaction) => {
    const signedAmount = transaction.type === 'Income' ? transaction.amount : -transaction.amount
    accumulator[transaction.date] = (accumulator[transaction.date] || 0) + signedAmount
    return accumulator
  }, {})

  return Array.from({ length: days }, (_, index) => {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)
    const key = toDateKey(day)

    return {
      dateKey: key,
      shortLabel: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: byDate[key] || 0,
    }
  })
}

export const getCalendarExpenseData = (transactions, monthDate = new Date()) => {
  const parsedMonth = parseLocalDate(monthDate)
  if (!parsedMonth) {
    return {
      days: [],
      maxExpense: 0,
      monthLabel: 'Invalid month',
    }
  }

  const monthStart = new Date(parsedMonth.getFullYear(), parsedMonth.getMonth(), 1)
  const firstWeekday = monthStart.getDay()
  const gridStartDate = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - firstWeekday,
  )

  const expenseByDate = transactions.reduce((accumulator, transaction) => {
    if (transaction.type !== 'Expense') {
      return accumulator
    }

    accumulator[transaction.date] =
      (accumulator[transaction.date] || 0) + transaction.amount
    return accumulator
  }, {})

  const days = Array.from({ length: 42 }, (_, index) => {
    const dateValue = new Date(
      gridStartDate.getFullYear(),
      gridStartDate.getMonth(),
      gridStartDate.getDate() + index,
    )
    const dateKey = toDateKey(dateValue)

    return {
      dateKey,
      dayNumber: dateValue.getDate(),
      isCurrentMonth: dateValue.getMonth() === monthStart.getMonth(),
      expense: expenseByDate[dateKey] || 0,
    }
  })

  const maxExpense = days.reduce((highest, day) => {
    if (!day.isCurrentMonth) {
      return highest
    }
    return Math.max(highest, day.expense)
  }, 0)

  return {
    days,
    maxExpense,
    monthLabel: monthStart.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }
}

export const getUniqueCategories = (transactions) => {
  const categories = transactions.map((transaction) => transaction.category)
  return [...new Set(categories)].sort()
}

export const filterTransactions = (transactions, typeFilter, categoryFilter) =>
  transactions.filter((transaction) => {
    const typeMatch = typeFilter === 'All' || transaction.type === typeFilter
    const categoryMatch =
      categoryFilter === 'All' || transaction.category === categoryFilter
    return typeMatch && categoryMatch
  })

export const createTransaction = ({ amount, type, category, date }) => ({
  id:
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  amount: Number(amount),
  type,
  category,
  date: toDateKey(date) || toDateKey(new Date()),
})

