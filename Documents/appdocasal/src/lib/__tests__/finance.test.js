import test from 'node:test'
import assert from 'node:assert/strict'
import { getContaStatus, getNextRecurringDate } from '../finance.js'

test('getContaStatus marks overdue unpaid bills as danger', () => {
  const status = getContaStatus({ vencimento: '2026-04-01', paga: false }, new Date('2026-04-05T12:00:00'))
  assert.equal(status.tone, 'danger')
})

test('getNextRecurringDate rolls one month forward', () => {
  assert.equal(getNextRecurringDate('2026-04-10'), '2026-05-10')
})
