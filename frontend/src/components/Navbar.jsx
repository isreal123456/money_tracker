import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFinanceState } from '../state/useFinance'
import { selectAlertCount } from '../state/selectors'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const financeState = useFinanceState()
  const alertCount = selectAlertCount(financeState)
  const [search, setSearch] = useState('')
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const userInitial = useMemo(() => {
    const name = user?.name || user?.email || 'U'
    return name.charAt(0).toUpperCase()
  }, [user])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const value = search.trim()
    navigate(value ? `/dashboard/transactions?q=${encodeURIComponent(value)}` : '/dashboard/transactions')
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-3 z-20 mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:px-6">
      <div className="flex flex-wrap items-center gap-3 md:justify-between">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            FT
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100 md:text-base">Finance Tracker</span>
            <span className="block text-xs text-slate-500 dark:text-slate-300">Personal dashboard</span>
          </span>
        </button>

        <form onSubmit={handleSearchSubmit} className="order-3 w-full md:order-none md:max-w-xl md:flex-1 md:px-6">
          <label className="sr-only" htmlFor="navbar-search">Search transactions or categories</label>
          <div className="relative">
            <input
              id="navbar-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transactions or categories"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" />
              </svg>
            </span>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard/notifications')}
            className="relative rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            aria-label="Open notifications"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 17H5l2-2v-4a5 5 0 0 1 10 0v4l2 2h-4" />
              <path d="M9 17a3 3 0 0 0 6 0" />
            </svg>
            {alertCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {alertCount > 9 ? '9+' : alertCount}
              </span>
            ) : null}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((previous) => !previous)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="Open profile menu"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                {userInitial}
              </span>
              <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 lg:block">
                {user?.name || 'Profile'}
              </span>
            </button>

            {isProfileMenuOpen ? (
              <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-md dark:border-slate-700 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false)
                    navigate('/dashboard/settings')
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false)
                    navigate('/dashboard/settings')
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/30"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

