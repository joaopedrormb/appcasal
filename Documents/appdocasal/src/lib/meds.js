export function getRemainingDays({ qty = 0, dailyUse = 0 }) {
  if (!dailyUse || dailyUse <= 0) return Infinity
  return Math.max(0, Math.floor(qty / dailyUse))
}

export function getMedStatus(med) {
  const remaining = getRemainingDays(med)
  if (med.qty <= 0 || remaining <= 3) return 'danger'
  if (med.qty <= med.alertQty || remaining <= 7) return 'warn'
  return 'ok'
}
