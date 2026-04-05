import { format, formatDistanceToNow, isToday, isValid, isYesterday, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function toDate(value) {
  if (value instanceof Date) return value
  if (value?.toDate) return value.toDate()
  if (typeof value === 'string') return parseISO(value)
  return new Date(value)
}

export function formatDate(value, pattern = 'dd/MM/yyyy') {
  const date = toDate(value)
  if (!isValid(date)) return ''
  return format(date, pattern, { locale: ptBR })
}

export function formatDateTime(value) {
  return formatDate(value, "dd/MM/yyyy 'às' HH:mm")
}

export function formatRelativeDateLabel(value) {
  const date = toDate(value)
  if (!isValid(date)) return ''
  if (isToday(date)) return 'hoje'
  if (isYesterday(date)) return 'ontem'
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
}

export function getGreeting(now = new Date()) {
  const hour = now.getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function getWeekdayKey(now = new Date()) {
  return ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][now.getDay()]
}
