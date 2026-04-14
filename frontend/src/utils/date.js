export const isValidDate = (value) => value instanceof Date && !Number.isNaN(value.getTime())

export const parseLocalDate = (value) => {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return isValidDate(value) ? new Date(value.getTime()) : null
  }

  if (typeof value !== 'string') {
    return null
  }

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1])
    const monthIndex = Number(dateOnlyMatch[2]) - 1
    const day = Number(dateOnlyMatch[3])
    const parsed = new Date(year, monthIndex, day)

    if (
      parsed.getFullYear() === year &&
      parsed.getMonth() === monthIndex &&
      parsed.getDate() === day
    ) {
      return parsed
    }

    return null
  }

  const fallback = new Date(value)
  return isValidDate(fallback) ? fallback : null
}

export const toDateKey = (value) => {
  const parsed = parseLocalDate(value)
  if (!parsed) {
    return null
  }

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const startOfLocalDay = (value = new Date()) => {
  const parsed = parseLocalDate(value)
  if (!parsed) {
    return null
  }
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
}

export const differenceInDays = (from, to) => {
  const start = startOfLocalDay(from)
  const end = startOfLocalDay(to)
  if (!start || !end) {
    return null
  }

  const millisecondsInDay = 1000 * 60 * 60 * 24
  return Math.ceil((end - start) / millisecondsInDay)
}

export const formatDisplayDate = (value) => {
  const parsed = parseLocalDate(value)
  if (!parsed) {
    return 'Invalid date'
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

