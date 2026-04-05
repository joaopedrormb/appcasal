import test from 'node:test'
import assert from 'node:assert/strict'
import { getStreakDays, getDayEmoji } from '../training.js'

test('getDayEmoji maps Wednesday to the martial arts emoji', () => {
  assert.equal(getDayEmoji('qua'), '🥊')
})

test('getStreakDays counts consecutive distinct days with workout history', () => {
  const streak = getStreakDays([
    { realizadoEm: '2026-04-05T08:00:00.000Z' },
    { realizadoEm: '2026-04-04T08:00:00.000Z' },
    { realizadoEm: '2026-04-03T08:00:00.000Z' }
  ], new Date('2026-04-05T10:00:00.000Z'))

  assert.equal(streak, 3)
})
