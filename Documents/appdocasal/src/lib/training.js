import { differenceInCalendarDays, parseISO } from 'date-fns'

const emojiMap = { seg: '💪', ter: '🦵', qua: '🥊', qui: '🏋️', sex: '⚡', sab: '🚴', dom: '🧘' }

export function getDayEmoji(day) {
  return emojiMap[day] || '🏋️'
}

export function getStreakDays(history, now = new Date()) {
  const uniqueDays = [...new Set(history.map((item) => item.realizadoEm.slice(0, 10)))].sort().reverse()
  let streak = 0

  for (const day of uniqueDays) {
    const diff = differenceInCalendarDays(now, parseISO(`${day}T00:00:00`))
    if (diff === streak) streak += 1
    else break
  }

  return streak
}
