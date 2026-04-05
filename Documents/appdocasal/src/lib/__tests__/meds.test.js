import test from 'node:test'
import assert from 'node:assert/strict'
import { getMedStatus, getRemainingDays } from '../meds.js'

test('getRemainingDays floors stock coverage to full days', () => {
  assert.equal(getRemainingDays({ qty: 20, dailyUse: 3 }), 6)
})

test('getMedStatus returns danger when quantity is below alert threshold', () => {
  assert.equal(getMedStatus({ qty: 2, alertQty: 5, dailyUse: 1 }), 'danger')
})
