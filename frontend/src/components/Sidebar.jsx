import { NavLink } from 'react-router-dom'

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    description: 'Overview and quick stats',
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
    description: 'Full activity history',
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
    description: 'Create income or expense',
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
    description: 'Analytics and trends',
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
    description: 'Manage expense types',
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
    description: 'Track monthly limit',
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
    description: 'Savings milestones',
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
    description: 'Alerts and reminders',
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
    description: 'Preferences and profile',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    ),
  },
]

const socialLinks = [
  { name: 'GitHub', href: '#', short: 'GH' },
  { name: 'LinkedIn', href: '#', short: 'IN' },
  { name: 'X', href: '#', short: 'X' },
]

export function Sidebar({ onClose }) {
  return (
    <aside className="h-full w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:sticky md:top-3">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Navigation</h1>
          <p className="text-xs text-slate-500 dark:text-slate-300">Move across app sections</p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            aria-label="Close sidebar"
          >
            x
          </button>
        ) : null}
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
                      ? 'bg-blue-600 text-white hover:bg-[#1E40AF] dark:bg-blue-600 dark:text-white dark:hover:bg-[#1E40AF]'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
              <p className="mt-0.5 text-xs opacity-80">{item.description}</p>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-8 border-t border-slate-200 pt-4 dark:border-slate-700">

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Social
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                aria-label={link.name}
              >
                {link.short}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}


