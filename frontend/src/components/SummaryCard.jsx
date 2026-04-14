import { formatCurrency } from '../utils/helpers'

function SummaryCard({ title, value, tone }) {
  const toneStyles = {
    income: 'border-green-200 text-green-600 dark:border-green-900 dark:text-green-400',
    expense: 'border-red-200 text-red-500 dark:border-red-900 dark:text-red-400',
    balance: 'border-blue-200 text-blue-600 dark:border-blue-900 dark:text-blue-300',
  }

  return (
    <div className={`glass border p-5 ${toneStyles[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{title}</p>
      <p className="mt-2 text-2xl font-bold md:text-[28px]">{formatCurrency(value)}</p>
    </div>
  )
}

export default SummaryCard

