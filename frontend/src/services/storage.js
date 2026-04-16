import {
  CATEGORIES,
  MOCK_GOALS,
  MOCK_TRANSACTIONS,
} from '../utils/helpers'

const STORAGE_KEYS = {
  financeState: 'finance_tracker_state_v2',
  authUser: 'ft_user',
  authToken: 'ft_token',
}

const canUseStorage = () => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

const getItem = (key) => {
  if (!canUseStorage()) {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const setItem = (key, value) => {
  if (!canUseStorage()) {
    return false
  }

  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

const removeItem = (key) => {
  if (!canUseStorage()) {
    return false
  }

  try {
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

const getJSON = (key, fallbackValue) => {
  const raw = getItem(key)
  if (!raw) {
    return fallbackValue
  }

  try {
    const parsed = JSON.parse(raw)
    return parsed ?? fallbackValue
  } catch {
    return fallbackValue
  }
}

const setJSON = (key, value) => setItem(key, JSON.stringify(value))

const defaultFinanceState = {
  transactions: MOCK_TRANSACTIONS,
  budget: 2000,
  currency: 'USD',
  theme: 'light',
  goals: MOCK_GOALS,
  notificationPrefs: {
    budgetAlerts: true,
    goalReminders: true,
  },
}

const normalizeTransactions = (value) => {
  if (!Array.isArray(value)) {
    return MOCK_TRANSACTIONS
  }

  return value
    .filter((item) => item && typeof item === 'object')
    .map((item, index) => ({
      id: item.id || `tx_${Date.now()}_${index}`,
      amount: Number(item.amount) || 0,
      type: item.type === 'Income' ? 'Income' : 'Expense',
      category:
        typeof item.category === 'string' && item.category.trim()
          ? item.category
          : CATEGORIES[0],
      date: typeof item.date === 'string' ? item.date : new Date().toISOString().split('T')[0],
    }))
}

const normalizeGoals = (value) => {
  if (!Array.isArray(value)) {
    return MOCK_GOALS
  }

  return value
    .filter((item) => item && typeof item === 'object')
    .map((item, index) => ({
      id: item.id || `goal_${Date.now()}_${index}`,
      name: typeof item.name === 'string' ? item.name : 'Savings Goal',
      targetAmount: Number(item.targetAmount) || 0,
      savedAmount: Number(item.savedAmount) || 0,
      deadline:
        typeof item.deadline === 'string'
          ? item.deadline
          : new Date().toISOString().split('T')[0],
      note: typeof item.note === 'string' ? item.note : '',
    }))
}

const normalizeTheme = (value) => (value === 'dark' || value === 'light' ? value : 'light')

const normalizeCurrency = (value) =>
  typeof value === 'string' && value.trim() ? value : 'USD'

const normalizeBudget = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 2000
}

const normalizeNotificationPrefs = (value) => ({
  budgetAlerts: Boolean(value?.budgetAlerts),
  goalReminders: Boolean(value?.goalReminders),
})

export const safeStorage = {
  getItem,
  setItem,
  removeItem,
  getJSON,
  setJSON,
}

export const loadFinanceState = () => {
  const saved = getJSON(STORAGE_KEYS.financeState, null)
  if (!saved || typeof saved !== 'object') {
    return defaultFinanceState
  }

  return {
    transactions: normalizeTransactions(saved.transactions),
    budget: normalizeBudget(saved.budget),
    currency: normalizeCurrency(saved.currency),
    theme: normalizeTheme(saved.theme),
    goals: normalizeGoals(saved.goals),
    notificationPrefs: normalizeNotificationPrefs(saved.notificationPrefs),
  }
}

export const saveFinanceState = (state) =>
  setJSON(STORAGE_KEYS.financeState, {
    transactions: state.transactions,
    budget: state.budget,
    currency: state.currency,
    theme: state.theme,
    goals: state.goals,
    notificationPrefs: state.notificationPrefs,
  })

export const loadAuthUser = () => {
  const user = getJSON(STORAGE_KEYS.authUser, null)
  return user && typeof user === 'object' ? user : null
}

export const saveAuthUser = (user) => setJSON(STORAGE_KEYS.authUser, user)

export const clearAuthUser = () => removeItem(STORAGE_KEYS.authUser)

export const loadAuthToken = () => {
  const token = getItem(STORAGE_KEYS.authToken)
  return typeof token === 'string' && token.trim() ? token : null
}

export const saveAuthToken = (token) => setItem(STORAGE_KEYS.authToken, token)

export const clearAuthToken = () => removeItem(STORAGE_KEYS.authToken)

