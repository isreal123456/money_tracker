import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Landing() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg saas-gradient" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">FinanceTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link to="/signup" className="saas-btn-primary">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block">
            <span className="saas-badge">✨ Welcome to FinanceTracker</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            Take control of your finances
          </h1>
          <p className="mb-8 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simple, powerful expense tracking. Visualize your spending patterns, set budgets, and reach your financial goals faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="saas-btn-primary text-base px-8 py-3">
              Start free today
            </Link>
            <Link to="/login" className="saas-btn-secondary text-base px-8 py-3">
              Try demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Powerful features to manage your money
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '📊',
                title: 'Smart Analytics',
                desc: 'Visualize spending patterns with charts and trends',
              },
              {
                icon: '💳',
                title: 'Transaction Tracking',
                desc: 'Organize and categorize every transaction',
              },
              {
                icon: '💰',
                title: 'Budget Planning',
                desc: 'Set goals and monitor your monthly budget',
              },
              {
                icon: '📱',
                title: 'Mobile Ready',
                desc: 'Access your finances on any device',
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                desc: 'Your data is always encrypted and private',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                desc: 'Real-time updates and instant sync',
              },
            ].map((feature, idx) => (
              <div key={idx} className="saas-card text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['Unlimited transactions', 'Basic analytics', 'Category tracking'],
              },
              {
                name: 'Pro',
                price: '$9.99',
                features: ['Advanced charts', 'Budget limits', 'Export reports', 'Priority support'],
                highlighted: true,
              },
              {
                name: 'Business',
                price: '$29.99',
                features: ['Team collaboration', 'API access', 'Custom integrations', 'Dedicated support'],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-8 transition-all duration-200 ${
                  plan.highlighted
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-slate-50 shadow-xl dark:from-blue-900/20 dark:to-slate-900/40 dark:border-blue-700'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center text-slate-600 dark:text-slate-300">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={plan.highlighted ? 'saas-btn-primary w-full' : 'saas-btn-secondary w-full'}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-900 text-white dark:bg-slate-950">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to take control?</h2>
          <p className="mb-8 text-lg text-slate-300">
            Join thousands of users tracking their finances smarter
          </p>
          <Link to="/signup" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-slate-900 hover:bg-slate-100">
            Start free today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded-lg saas-gradient" />
                <span className="font-semibold text-slate-900 dark:text-white">FinanceTracker</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Smart money management for everyone
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Support'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a href="#" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              © 2026 FinanceTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


