import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

export function ProtectedRoute({ children }) {
  const { user, authReady } = useAuth()

  if (!authReady) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
