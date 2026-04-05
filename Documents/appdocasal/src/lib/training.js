import {
  differenceInCalendarDays,
  endOfWeek,
  isSameDay,
  isToday,
  isYesterday,
  parseISO,
  startOfWeek,
  subDays
} from 'date-fns'
import { formatRelativeDateLabel, getWeekdayKey, toDate } from './dates.js'

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

export function getWeeklyDots(history, pessoa, now = new Date()) {
  const start = startOfWeek(now, { weekStartsOn: 1 })
  const end = endOfWeek(now, { weekStartsOn: 1 })

  return Array.from({ length: 7 }, (_, index) => {
    const day = subDays(end, 6 - index)
    if (day < start) return false
    return history.some((item) => item.pessoa === pessoa && isSameDay(parseISO(item.realizadoEm), day))
  })
}

export function getTodayTreinos(treinos, now = new Date()) {
  const dayKey = getWeekdayKey(now)
  return treinos.filter((treino) => treino.diaSemana === dayKey)
}

export function getLastWorkoutLabel(history, pessoa) {
  const latest = history.find((item) => item.pessoa === pessoa)
  if (!latest) return 'Sem registros ainda'
  const date = toDate(latest.realizadoEm)
  if (isToday(date)) return 'Último treino: hoje'
  if (isYesterday(date)) return 'Último treino: ontem'
  return `Último treino: ${formatRelativeDateLabel(date)}`
}
