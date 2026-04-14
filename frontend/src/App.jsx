import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AddTransaction } from './pages/AddTransaction'
import { Budget } from './pages/Budget'
import { Categories } from './pages/Categories'
import Dashboard from './pages/Dashboard'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Goals } from './pages/Goals'
import { Notifications } from './pages/Notifications'
import Settings from './pages/Settings'
import Reports from './pages/Reports'
import { Signup } from './pages/Signup'
import { Transactions } from './pages/Transactions'
import { DashboardLayout } from './layouts/DashboardLayout'
import { FinanceProvider } from './state/FinanceContext'

function App() {
  return (
    <FinanceProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddTransaction />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="goals" element={<Goals />} />
          <Route path="reports" element={<Reports />} />
          <Route path="categories" element={<Categories />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FinanceProvider>
  )
}

export default App
