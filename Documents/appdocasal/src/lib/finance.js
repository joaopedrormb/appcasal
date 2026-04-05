import { addMonths, differenceInCalendarDays, format, isSameMonth, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const CATEGORIES = ['Alimentação', 'Saúde', 'Transporte', 'Casa', 'Lazer', 'Outros']

export function getNextRecurringDate(isoDate) {
  return format(addMonths(parseISO(isoDate), 1), 'yyyy-MM-dd')
}

export function getContaStatus(conta, now = new Date()) {
  if (conta.paga) return { tone: 'ok', label: '✓ Paga' }

  const diff = differenceInCalendarDays(parseISO(conta.vencimento), now)
  if (diff < 0) return { tone: 'danger', label: `Vencida ${Math.abs(diff)} dias` }
  if (diff <= 3) return { tone: 'warn', label: `Vence em ${diff} dias` }
  return { tone: 'ok', label: `Vence em ${diff} dias` }
}

export function getPendingTotal(contas) {
  return contas.filter((conta) => !conta.paga).reduce((total, conta) => total + (Number(conta.valor) || 0), 0)
}

export function getUpcomingBills(contas, now = new Date()) {
  return contas.filter((conta) => !conta.paga && differenceInCalendarDays(parseISO(conta.vencimento), now) <= 7)
}

export function getMonthlyExpenseSummary(gastos, now = new Date()) {
  const items = gastos.filter((gasto) => gasto.data && isSameMonth(parseISO(gasto.data), now))
  const total = items.reduce((sum, item) => sum + (Number(item.valor) || 0), 0)
  const categories = CATEGORIES.map((category) => {
    const value = items
      .filter((item) => item.categoria === category)
      .reduce((sum, item) => sum + (Number(item.valor) || 0), 0)

    return {
      category,
      value,
      ratio: total > 0 ? value / total : 0
    }
  })

  return { total, categories, monthLabel: format(now, 'MMMM yyyy', { locale: ptBR }) }
}

export function getMetaProgress(meta) {
  const current = Number(meta.valorAtual) || 0
  const target = Math.max(1, Number(meta.valorAlvo) || 1)
  return {
    ratio: Math.min(1, current / target),
    percent: Math.min(100, Math.round((current / target) * 100))
  }
}
