import { format, isValid, parseISO } from 'date-fns'

export function toDate(value) {
  if (value instanceof Date) return value
  if (typeof value === 'string') return parseISO(value)
  return new Date(value)
}

export function formatDate(value, pattern = 'dd/MM/yyyy') {
  const date = toDate(value)
  if (!isValid(date)) return ''
  return format(date, pattern)
}
