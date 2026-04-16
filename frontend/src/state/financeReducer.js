import { MOCK_GOALS, MOCK_TRANSACTIONS, createTransaction } from '../utils/helpers'

export const FINANCE_INITIAL_STATE = {
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

const createGoal = (goalData) => ({
  id:
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  ...goalData,
})

export function financeReducer(state, action) {
  switch (action.type) {
    case 'finance/setState':
      return {
        ...state,
        ...action.payload,
      }
    case 'transaction/add':
      return {
        ...state,
        transactions: [createTransaction(action.payload), ...state.transactions],
      }
    case 'transaction/delete':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        ),
      }
    case 'budget/set':
      return {
        ...state,
        budget: Number(action.payload) || 0,
      }
    case 'goal/add':
      return {
        ...state,
        goals: [createGoal(action.payload), ...state.goals],
      }
    case 'goal/update':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.goalId
            ? { ...goal, ...action.payload.updates }
            : goal,
        ),
      }
    case 'goal/delete':
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload),
      }
    case 'notifications/togglePreference':
      return {
        ...state,
        notificationPrefs: {
          ...state.notificationPrefs,
          [action.payload]: !state.notificationPrefs[action.payload],
        },
      }
    case 'currency/set':
      return {
        ...state,
        currency: action.payload,
      }
    case 'theme/toggle':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      }
    case 'theme/set':
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}

