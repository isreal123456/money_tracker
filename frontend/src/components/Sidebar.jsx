import {NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'


const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',

    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13h8V3H3v10Z" />
        <path d="M13 21h8v-6h-8v6Z" />
        <path d="M13 3h8v8h-8V3Z" />
        <path d="M3 21h8v-6H3v6Z" />
      </svg>
    ),
  },
  {
    to: '/dashboard/transactions',
    label: 'Transactions',

    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h10" />
      </svg>
    ),
  },
  {
    to: '/dashboard/add',
    label: 'Add Transaction',

    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
    isPrimary: true,
  },
  {
    to: '/dashboard/reports',
    label: 'Reports',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20v-4" />
      </svg>
    ),
  },
  {
    to: '/dashboard/categories',
    label: 'Categories',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16" />
        <path d="M4 12h10" />
        <path d="M4 18h7" />
      </svg>
    ),
  },
  {
    to: '/dashboard/budget',
    label: 'Budget',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M16 12h.01" />
      </svg>
    ),
  },
  {
    to: '/dashboard/goals',
    label: 'Goals',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    to: '/dashboard/notifications',
    label: 'Notifications',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 17H5l2-2v-4a5 5 0 0 1 10 0v4l2 2h-4" />
        <path d="M9 17a3 3 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    to: '/dashboard/settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    ),
  },
]


// const socialLinks = [
//   { name: 'GitHub', href: '#', short: 'GH' },
//   { name: 'LinkedIn', href: '#', short: 'IN' },
//   { name: 'X', href: '#', short: 'X' },
// ]

export function Sidebar({ onClose }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    onClose?.()
    logout()
    navigate('/login', { replace: true })
  }

  const logoutIcon = (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 3v18" />
    </svg>
  )
  return (
    <aside className="flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:sticky md:top-3">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
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
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `block w-full rounded-lg px-3 py-2 text-left transition ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : item.isPrimary
                      ? 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <p className="text-sm font-medium">{item.label}</p>
              </div>

            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-900/30 dark:hover:text-red-200"
        >
          <span className="shrink-0">{logoutIcon}</span>
          Logout
        </button>
      </div>

    </aside>
  )
}


