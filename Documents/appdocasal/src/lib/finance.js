import { addMonths, differenceInCalendarDays, parseISO } from 'date-fns'

export function getNextRecurringDate(isoDate) {
  return addMonths(parseISO(isoDate), 1).toISOString().slice(0, 10)
}

export function getContaStatus(conta, now = new Date()) {
  if (conta.paga) return { tone: 'ok', label: '✓ Paga' }

  const diff = differenceInCalendarDays(parseISO(conta.vencimento), now)
  if (diff < 0) return { tone: 'danger', label: `Vencida ${Math.abs(diff)} dias` }
  if (diff <= 3) return { tone: 'warn', label: `Vence em ${diff} dias` }
  return { tone: 'ok', label: `Vence em ${diff} dias` }
}
