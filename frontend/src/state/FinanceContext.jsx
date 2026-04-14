import { useEffect, useMemo, useReducer } from 'react'
import { loadFinanceState, saveFinanceState } from '../services/storage'
import { financeReducer, FINANCE_INITIAL_STATE } from './financeReducer'
import { FinanceActionsContext, FinanceStateContext } from './financeContexts'

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(
    financeReducer,
    FINANCE_INITIAL_STATE,
    () => ({ ...FINANCE_INITIAL_STATE, ...loadFinanceState() }),
  )

  useEffect(() => {
    saveFinanceState(state)
  }, [state])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  const actions = useMemo(
    () => ({
      addTransaction: (transaction) =>
        dispatch({ type: 'transaction/add', payload: transaction }),
      deleteTransaction: (transactionId) =>
        dispatch({ type: 'transaction/delete', payload: transactionId }),
      setBudget: (budget) => dispatch({ type: 'budget/set', payload: budget }),
      addGoal: (goal) => dispatch({ type: 'goal/add', payload: goal }),
      updateGoal: (goalId, updates) =>
        dispatch({ type: 'goal/update', payload: { goalId, updates } }),
      deleteGoal: (goalId) => dispatch({ type: 'goal/delete', payload: goalId }),
      toggleNotificationPreference: (key) =>
        dispatch({ type: 'notifications/togglePreference', payload: key }),
      setCurrency: (currency) => dispatch({ type: 'currency/set', payload: currency }),
      toggleTheme: () => dispatch({ type: 'theme/toggle' }),
    }),
    [],
  )

  return (
    <FinanceStateContext.Provider value={state}>
      <FinanceActionsContext.Provider value={actions}>
        {children}
      </FinanceActionsContext.Provider>
    </FinanceStateContext.Provider>
  )
}



