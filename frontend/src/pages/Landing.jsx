import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

export function Landing() {
  const { user } = useAuth()
  const [expandedFaq, setExpandedFaq] = useState(0)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 rounded-lg saas-gradient animate-pulse" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">FinanceTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link to="/signup" className="saas-btn-primary hover:shadow-lg hover:scale-105 transition-all duration-200">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/5" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/5" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block animate-fade-in">
            <span className="saas-badge">✨ Welcome to FinanceTracker</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
            Take control of your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">finances</span> today
          </h1>
          <p className="mb-8 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simple, powerful expense tracking. Visualize your spending patterns, set budgets, and reach your financial goals faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="saas-btn-primary text-base px-8 py-3 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
              🚀 Start free today
            </Link>
            <Link to="/login" className="saas-btn-secondary text-base px-8 py-3 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
              📊 Try demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { stat: '50K+', label: 'Active Users' },
              { stat: '$2B+', label: 'Money Tracked' },
              { stat: '100%', label: 'Data Secure' },
              { stat: '24/7', label: 'Support' },
            ].map((item, idx) => (
              <div key={idx} className="text-white">
                <div className="text-4xl font-bold mb-2">{item.stat}</div>
                <p className="text-blue-100">{item.label}</p>
              </div>
            ))}
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
              <div key={idx} className="saas-card text-center group hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Trusted by thousands
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: 'FinanceTracker helped me save $5000 in 3 months!',
                author: 'Sarah M.',
                role: 'Small Business Owner',
                rating: 5,
              },
              {
                quote: 'The best money management app I have ever used.',
                author: 'John D.',
                role: 'Software Developer',
                rating: 5,
              },
              {
                quote: 'Finally, a simple way to track my finances!',
                author: 'Emma L.',
                role: 'Freelancer',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="saas-card hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="mb-4 text-slate-600 dark:text-slate-400">"{testimonial.quote}"</p>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                period: '/forever',
                features: ['Unlimited transactions', 'Basic analytics', 'Category tracking'],
              },
              {
                name: 'Pro',
                price: '$9.99',
                period: '/month',
                features: ['Advanced charts', 'Budget limits', 'Export reports', 'Priority support'],
                highlighted: true,
              },
              {
                name: 'Business',
                price: '$29.99',
                period: '/month',
                features: ['Team collaboration', 'API access', 'Custom integrations', 'Dedicated support'],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.highlighted
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-slate-50 shadow-xl dark:from-blue-900/20 dark:to-slate-900/40 dark:border-blue-700 scale-105'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center text-slate-600 dark:text-slate-300">
                      <span className="mr-3 text-lg">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`block text-center rounded-lg font-semibold py-3 transition-all duration-200 ${plan.highlighted ? 'saas-btn-primary hover:shadow-lg hover:scale-105' : 'saas-btn-secondary hover:shadow-lg hover:scale-105'}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'Is my data secure?',
                answer: 'Yes! We use industry-standard encryption and never share your data with third parties. Your financial information is always private and secure.',
              },
              {
                question: 'Can I export my data?',
                answer: 'Absolutely! Pro and Business plans support exporting your data in CSV format. You maintain full control of your information.',
              },
              {
                question: 'Do you offer a free trial?',
                answer: 'Yes, the Free plan is completely unlimited. Upgrade to Pro or Business anytime to unlock advanced features.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers. Flexible billing options are available for Business plans.',
              },
              {
                question: 'Is there a mobile app?',
                answer: 'Our web app is fully responsive and works perfectly on all devices. Native mobile apps for iOS and Android are coming soon!',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors flex items-center justify-between"
                >
                  <span>{item.question}</span>
                  <span className={`transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to take control of your money?</h2>
          <p className="mb-8 text-lg text-slate-300">
            Join over 50,000 users who are already tracking and improving their finances smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get started free
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all duration-200">
              See a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-5 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded-lg saas-gradient" />
                <span className="font-semibold text-slate-900 dark:text-white">FinanceTracker</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Smart money management for everyone. Take control of your finances today.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'Mobile'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Blog', 'Contact', 'Careers'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Support'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Follow Us</h4>
              <ul className="space-y-2">
                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              © 2026 FinanceTracker. All rights reserved. | Built with ❤️ for better financial health
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


