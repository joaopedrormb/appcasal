export function formatCurrency(value, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(Number(value) || 0)
}

export function formatPercent(value, locale = 'pt-BR') {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0
  }).format((Number(value) || 0) / 100)
}
