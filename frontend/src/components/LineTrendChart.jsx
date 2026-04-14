import { formatCurrency } from '../utils/helpers'

function LineTrendChart({
  data,
  title = 'Cashflow Trend (14 Days)',
  subtitle = 'Income minus expenses per day',
}) {
  if (!data.length) {
    return (
      <div className="glass p-5 md:p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">No trend data available yet.</p>
      </div>
    )
  }

  const width = 680
  const height = 220
  const padding = 24
  const values = data.map((item) => item.value)
  const min = Math.min(...values, 0)
  const max = Math.max(...values, 0)
  const range = max - min || 1

  const mapX = (index) =>
    padding + (index / Math.max(data.length - 1, 1)) * (width - padding * 2)

  const mapY = (value) =>
    height - padding - ((value - min) / range) * (height - padding * 2)

  const points = data
    .map((item, index) => `${mapX(index)},${mapY(item.value)}`)
    .join(' ')

  const zeroY = mapY(0)
  const horizontalGrid = 4
  const verticalGrid = Math.min(data.length - 1, 6)

  return (
    <div className="glass overflow-hidden p-5 md:p-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-300">{subtitle}</p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-48 w-full max-w-full sm:h-56"
        role="img"
        aria-label="14 day cashflow line chart"
        preserveAspectRatio="none"
      >
        {Array.from({ length: horizontalGrid + 1 }, (_, index) => {
          const y = padding + (index / horizontalGrid) * (height - padding * 2)
          return (
              <line
              key={`h-${index}`}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="1"
            />
          )
        })}

        {Array.from({ length: verticalGrid + 1 }, (_, index) => {
          const x = padding + (index / Math.max(verticalGrid, 1)) * (width - padding * 2)
          return (
              <line
              key={`v-${index}`}
              x1={x}
              y1={padding}
              x2={x}
              y2={height - padding}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="1"
            />
          )
        })}

        <line
          x1={padding}
          y1={zeroY}
          x2={width - padding}
          y2={zeroY}
          className="stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        <polyline
          fill="none"
          points={points}
            className="stroke-blue-600"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((item, index) => {
          const x = mapX(index)
          const y = mapY(item.value)
          return (
            <g key={item.dateKey}>
              <circle cx={x} cy={y} r="3.5" className="fill-blue-600" />
              <title>{`${item.shortLabel}: ${formatCurrency(item.value)}`}</title>
            </g>
          )
        })}
      </svg>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
        <span>{data[0].shortLabel}</span>
        <span>{data[data.length - 1].shortLabel}</span>
      </div>
    </div>
  )
}

export default LineTrendChart

