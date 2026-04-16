import { useEffect, useMemo, useReducer } from 'react'
import { useAuth } from '../contexts/useAuth'
import {
  createGoalRequest,
  createTransactionRequest,
  deleteGoalRequest,
  deleteTransactionRequest,
  getBudgetRequest,
  getSettingsRequest,
  listGoalsRequest,
  listTransactionsRequest,
  updateBudgetRequest,
  updateGoalRequest,
  updateSettingsRequest,
} from '../services/financeApi'
import { financeReducer, FINANCE_INITIAL_STATE } from './financeReducer'
import { FinanceActionsContext, FinanceStateContext } from './financeContexts'

export function FinanceProvider({ children }) {
  const { token, authReady } = useAuth()
  const [state, dispatch] = useReducer(financeReducer, FINANCE_INITIAL_STATE)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  useEffect(() => {
    if (!authReady) {
      return
    }

    if (!token) {
      dispatch({ type: 'finance/setState', payload: FINANCE_INITIAL_STATE })
      return
    }

    const hydrate = async () => {
      try {
        const [transactions, budget, goals, settings] = await Promise.all([
          listTransactionsRequest(token),
          getBudgetRequest(token),
          listGoalsRequest(token),
          getSettingsRequest(token),
        ])

        dispatch({
          type: 'finance/setState',
          payload: {
            transactions,
            budget: Number(budget?.monthlyLimit) || FINANCE_INITIAL_STATE.budget,
            goals,
            currency: settings?.currency || FINANCE_INITIAL_STATE.currency,
            theme: settings?.theme || FINANCE_INITIAL_STATE.theme,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }

    hydrate()
  }, [token, authReady])

  const withToken = (callback) => {
    if (!token) {
      return
    }

    callback().catch((error) => {
      console.error(error)
    })
  }

  const actions = useMemo(
    () => ({
      addTransaction: (transaction) =>
        withToken(async () => {
          await createTransactionRequest(token, transaction)
          const transactions = await listTransactionsRequest(token)
          dispatch({ type: 'finance/setState', payload: { transactions } })
        }),
      deleteTransaction: (transactionId) =>
        withToken(async () => {
          await deleteTransactionRequest(token, transactionId)
          const transactions = await listTransactionsRequest(token)
          dispatch({ type: 'finance/setState', payload: { transactions } })
        }),
      setBudget: (budget) =>
        withToken(async () => {
          const nextBudget = Number(budget)
          if (!Number.isFinite(nextBudget) || nextBudget <= 0) {
            return
          }

          const updatedBudget = await updateBudgetRequest(token, nextBudget, state.currency)
          dispatch({
            type: 'finance/setState',
            payload: {
              budget: Number(updatedBudget?.monthlyLimit) || state.budget,
              currency: updatedBudget?.currency || state.currency,
            },
          })
        }),
      addGoal: (goal) =>
        withToken(async () => {
          await createGoalRequest(token, goal)
          const goals = await listGoalsRequest(token)
          dispatch({ type: 'finance/setState', payload: { goals } })
        }),
      updateGoal: (goalId, updates) =>
        withToken(async () => {
          await updateGoalRequest(token, goalId, updates)
          const goals = await listGoalsRequest(token)
          dispatch({ type: 'finance/setState', payload: { goals } })
        }),
      deleteGoal: (goalId) =>
        withToken(async () => {
          await deleteGoalRequest(token, goalId)
          const goals = await listGoalsRequest(token)
          dispatch({ type: 'finance/setState', payload: { goals } })
        }),
      toggleNotificationPreference: (key) =>
        dispatch({ type: 'notifications/togglePreference', payload: key }),
      setCurrency: (currency) =>
        withToken(async () => {
          const settings = await updateSettingsRequest(token, { currency })
          dispatch({
            type: 'finance/setState',
            payload: {
              currency: settings.currency,
            },
          })
        }),
      toggleTheme: () =>
        withToken(async () => {
          const nextTheme = state.theme === 'dark' ? 'light' : 'dark'
          const settings = await updateSettingsRequest(token, { theme: nextTheme })
          dispatch({ type: 'theme/set', payload: settings?.theme || nextTheme })
        }),
    }),
    [token, state.currency, state.theme, state.budget],
  )

  return (
    <FinanceStateContext.Provider value={state}>
      <FinanceActionsContext.Provider value={actions}>
        {children}
      </FinanceActionsContext.Provider>
    </FinanceStateContext.Provider>
  )
}
