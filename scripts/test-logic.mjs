import assert from 'node:assert/strict'
import { getRemainingDays, getMedStatus } from '../src/lib/meds.js'
import { getContaStatus, getNextRecurringDate } from '../src/lib/finance.js'
import { getDayEmoji, getStreakDays, getWeeklyDots } from '../src/lib/training.js'

assert.equal(getRemainingDays({ qty: 20, dailyUse: 3 }), 6)
assert.equal(getMedStatus({ qty: 2, alertQty: 5, dailyUse: 1 }), 'danger')

const status = getContaStatus({ vencimento: '2026-04-01', paga: false }, new Date('2026-04-05T12:00:00'))
assert.equal(status.tone, 'danger')
assert.equal(getNextRecurringDate('2026-04-10'), '2026-05-10')

assert.equal(getDayEmoji('qua'), '🥊')
assert.equal(
  getStreakDays(
    [
      { realizadoEm: '2026-04-05T08:00:00.000Z' },
      { realizadoEm: '2026-04-04T08:00:00.000Z' },
      { realizadoEm: '2026-04-03T08:00:00.000Z' }
    ],
    new Date('2026-04-05T10:00:00.000Z')
  ),
  3
)

assert.equal(
  getWeeklyDots(
    [
      { pessoa: 'João Pedro', realizadoEm: '2026-04-07T10:00:00.000Z' },
      { pessoa: 'João Pedro', realizadoEm: '2026-04-09T10:00:00.000Z' }
    ],
    'João Pedro',
    new Date('2026-04-09T10:00:00.000Z')
  ).filter(Boolean).length,
  2
)

console.log('logic tests passed')
