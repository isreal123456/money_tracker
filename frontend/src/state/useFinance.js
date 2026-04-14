import { useContext } from 'react'
import { FinanceActionsContext, FinanceStateContext } from './financeContexts'

export function useFinanceState() {
  const context = useContext(FinanceStateContext)
  if (!context) {
    throw new Error('useFinanceState must be used within FinanceProvider')
  }
  return context
}

export function useFinanceActions() {
  const context = useContext(FinanceActionsContext)
  if (!context) {
    throw new Error('useFinanceActions must be used within FinanceProvider')
  }
  return context
}

