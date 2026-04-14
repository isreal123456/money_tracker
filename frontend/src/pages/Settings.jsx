import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFinanceActions, useFinanceState } from '../state/useFinance'
import { formatDisplayDate } from '../utils/date'

const currencyOptions = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'INR', label: 'Indian Rupee (INR)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
]

function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { currency, theme } = useFinanceState()
  const { setCurrency, toggleTheme } = useFinanceActions()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const displayName = user?.name || 'User'
  const displayEmail = user?.email || 'No email found'
  const joinedDate = user?.createdAt ? formatDisplayDate(user.createdAt) : 'Unknown'

  return (
    <section className="space-y-6">
      <div className="glass flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <span className="saas-badge mb-3">Profile / Settings</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Manage your preferences
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300 md:text-base">
            Update your currency, switch theme, and manage your account from one place.
          </p>
        </div>

        <button type="button" onClick={handleLogout} className="saas-btn-primary px-5 py-2.5">
          Logout
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass p-5 md:p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">User info</h3>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <div className="space-y-1">
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{displayName}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">{displayEmail}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">Joined: {joinedDate}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Account status</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Local-only profile stored in your browser. No backend required.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-5 md:p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Currency selection</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Choose the currency used across the app for totals and charts.
            </p>
            <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Default currency
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="saas-input mt-2"
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="glass p-5 md:p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Theme</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Switch between light and dark mode.
            </p>
            <button
              type="button"
              onClick={toggleTheme}
              className="saas-btn-secondary mt-4 w-full"
            >
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings

