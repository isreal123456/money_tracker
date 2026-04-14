import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export function DashboardLayout() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const pageTitleByPath = {
    '/dashboard': 'Dashboard',
    '/dashboard/add': 'Add Transaction',
    '/dashboard/transactions': 'Transactions',
    '/dashboard/reports': 'Reports',
    '/dashboard/categories': 'Categories',
    '/dashboard/budget': 'Budget',
    '/dashboard/goals': 'Goals',
    '/dashboard/notifications': 'Notifications',
    '/dashboard/settings': 'Settings',
  }

  const currentPageTitle = pageTitleByPath[location.pathname] || 'Dashboard'

  return (
    <div className="min-h-screen bg-[#F8FAFC] transition-colors duration-300 dark:bg-slate-950">
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:block md:w-72 md:p-3">
        <Sidebar />
      </div>

        {isSidebarOpen ? (
          <>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-20 bg-slate-950/50 md:hidden"
              aria-label="Close menu"
            />
            <div className="fixed inset-y-0 left-0 z-30 w-72 p-3 md:hidden">
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
          </>
        ) : null}

        <main className="min-w-0 w-full md:pl-72">
          <div className="px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="glass mb-4 flex items-center justify-between px-4 py-3 md:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Open menu"
            >
              Menu
            </button>
            <p className="text-sm font-semibold">{currentPageTitle}</p>
          </div>

          <nav className="glass mb-4 flex gap-2 overflow-x-auto px-2 py-2 md:hidden">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/add"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Add
            </NavLink>
            <NavLink
              to="/dashboard/budget"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Budget
            </NavLink>
            <NavLink
              to="/dashboard/categories"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/dashboard/goals"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Goals
            </NavLink>
            <NavLink
              to="/dashboard/transactions"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/dashboard/notifications"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Notifications
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              Settings
            </NavLink>
          </nav>

          <Outlet />
          </div>
        </main>
    </div>
  )
}


