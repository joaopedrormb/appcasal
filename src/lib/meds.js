export function getRemainingDays({ qty = 0, dailyUse = 0 }) {
  if (!dailyUse || dailyUse <= 0) return Infinity
  return Math.max(0, Math.floor(qty / dailyUse))
}

export function getMedStatus(med) {
  const remaining = getRemainingDays(med)
  if ((med.qty || 0) <= 0 || remaining <= 3) return 'danger'
  if ((med.qty || 0) <= (med.alertQty || 0) || remaining <= 7) return 'warn'
  return 'ok'
}

export function getMedStatusLabel(status) {
  if (status === 'danger') return 'Crítico'
  if (status === 'warn') return 'Atenção'
  return 'OK'
}

export function getMedProgressValue(med) {
  const qty = Number(med.qty) || 0
  const alertQty = Math.max(1, Number(med.alertQty) || 1)
  return Math.min(100, Math.round((qty / (alertQty * 3)) * 100))
}

export function getMedAlerts(meds) {
  return meds
    .filter((med) => getMedStatus(med) !== 'ok')
    .map((med) => ({
      id: med.id,
      tone: getMedStatus(med),
      title: med.name,
      message:
        getMedStatus(med) === 'danger'
          ? 'Estoque crítico. Vale repor o quanto antes.'
          : 'Estoque entrando em atenção.'
    }))
}

export function getMedsMetrics(meds) {
  return meds.reduce(
    (acc, med) => {
      const status = getMedStatus(med)
      acc.total += 1
      if (status === 'warn') acc.warn += 1
      if (status === 'danger') acc.danger += 1
      if (med.person === 'Ambos') acc.shared += 1
      return acc
    },
    { total: 0, warn: 0, danger: 0, shared: 0 }
  )
}

export function filterMeds(meds, filters) {
  const search = String(filters.search ?? '').trim().toLowerCase()
  return meds.filter((med) => {
    const status = getMedStatus(med)
    const matchesPerson = filters.person === 'Todos' || med.person === filters.person
    const matchesStatus =
      filters.status === 'Todos' ||
      (filters.status === 'Crítico' && status === 'danger') ||
      (filters.status === 'Atenção' && status === 'warn') ||
      (filters.status === 'OK' && status === 'ok')
    const matchesSearch =
      !search ||
      med.name?.toLowerCase().includes(search) ||
      med.notes?.toLowerCase().includes(search) ||
      med.dosage?.toLowerCase().includes(search)

    return matchesPerson && matchesStatus && matchesSearch
  })
}
