import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mondayOf, slotFor, rangeDates, toISO } from '../lib/cycle.js';

const d = (iso) => new Date(iso + 'T12:00:00');

test('mondayOf: un domingo pertenece al lunes anterior', () => {
  assert.equal(mondayOf(d('2026-10-25')), '2026-10-19');
  assert.equal(mondayOf(d('2026-10-19')), '2026-10-19');
  assert.equal(mondayOf(d('2026-10-21')), '2026-10-19');
});

test('slotFor: semana y día dentro del ciclo de 4', () => {
  assert.deepEqual(slotFor(d('2026-10-19'), '2026-10-19'), { week: 0, day: 0 });
  assert.deepEqual(slotFor(d('2026-10-25'), '2026-10-19'), { week: 0, day: 6 });
  assert.deepEqual(slotFor(d('2026-10-28'), '2026-10-19'), { week: 1, day: 2 });
  assert.deepEqual(slotFor(d('2026-11-16'), '2026-10-19'), { week: 0, day: 0 });
});

test('slotFor: fecha antes del inicio nunca da semana negativa', () => {
  const s = slotFor(d('2026-10-12'), '2026-10-19');
  assert.deepEqual(s, { week: 3, day: 0 });
});

test('slotFor: cruza el cambio de horario sin desfasarse', () => {
  assert.deepEqual(slotFor(d('2027-03-15'), '2027-03-08'), { week: 1, day: 0 });
});

test('rangeDates', () => {
  const today = d('2026-10-21');
  assert.deepEqual(rangeDates('hoy', today).map(toISO), ['2026-10-21']);
  const semana = rangeDates('semana', today).map(toISO);
  assert.equal(semana.length, 7);
  assert.equal(semana[0], '2026-10-21');
  const prox = rangeDates('proxima', today).map(toISO);
  assert.equal(prox.length, 7);
  assert.equal(prox[0], '2026-10-26');
  assert.equal(prox[6], '2026-11-01');
  const q = rangeDates('quincena', today).map(toISO);
  assert.equal(q.length, 14);
  assert.equal(q[13], '2026-11-03');
});
