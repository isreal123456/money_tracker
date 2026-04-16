import { apiRequest } from './api'

const toUiTransaction = (item) => ({
  id: item.id,
  amount: Number(item.amount) || 0,
  type: item.type === 'income' ? 'Income' : 'Expense',
  category: item.category,
  date: item.date,
  note: item.note || '',
})

const toApiTransaction = (item) => ({
  amount: Number(item.amount) || 0,
  type: item.type === 'Income' ? 'income' : 'expense',
  category: item.category,
  date: item.date,
  note: item.note || null,
})

const toUiGoal = (item) => ({
  id: item.id,
  name: item.title,
  targetAmount: Number(item.targetAmount) || 0,
  savedAmount: Number(item.savedAmount) || 0,
  deadline: item.deadline || new Date().toISOString().split('T')[0],
  note: '',
})

const toApiGoal = (item) => ({
  title: item.name,
  targetAmount: Number(item.targetAmount) || 0,
  savedAmount: Number(item.savedAmount) || 0,
  deadline: item.deadline || null,
})

export const listTransactionsRequest = async (token) => {
  const data = await apiRequest('/api/transactions', { token })
  return Array.isArray(data) ? data.map(toUiTransaction) : []
}

export const createTransactionRequest = async (token, transaction) => {
  const data = await apiRequest('/api/transactions', {
    method: 'POST',
    token,
    body: toApiTransaction(transaction),
  })
  return toUiTransaction(data)
}

export const deleteTransactionRequest = (token, id) =>
  apiRequest(`/api/transactions/${id}`, {
    method: 'DELETE',
    token,
  })

export const getBudgetRequest = (token) =>
  apiRequest('/api/budget', {
    token,
  })

export const updateBudgetRequest = (token, monthlyLimit, currency) =>
  apiRequest('/api/budget', {
    method: 'PUT',
    token,
    body: {
      monthlyLimit,
      currency,
    },
  })

export const listGoalsRequest = async (token) => {
  const data = await apiRequest('/api/goals', { token })
  return Array.isArray(data) ? data.map(toUiGoal) : []
}

export const createGoalRequest = async (token, goal) => {
  const data = await apiRequest('/api/goals', {
    method: 'POST',
    token,
    body: toApiGoal(goal),
  })
  return toUiGoal(data)
}

export const updateGoalRequest = async (token, goalId, updates) => {
  const data = await apiRequest(`/api/goals/${goalId}`, {
    method: 'PUT',
    token,
    body: {
      ...(updates.name ? { title: updates.name } : {}),
      ...(updates.targetAmount ? { targetAmount: Number(updates.targetAmount) } : {}),
      ...(updates.savedAmount !== undefined ? { savedAmount: Number(updates.savedAmount) || 0 } : {}),
      ...(updates.deadline ? { deadline: updates.deadline } : {}),
    },
  })
  return toUiGoal(data)
}

export const deleteGoalRequest = (token, goalId) =>
  apiRequest(`/api/goals/${goalId}`, {
    method: 'DELETE',
    token,
  })

export const getSettingsRequest = (token) =>
  apiRequest('/api/settings', {
    token,
  })

export const updateSettingsRequest = (token, payload) =>
  apiRequest('/api/settings', {
    method: 'PUT',
    token,
    body: payload,
  })

