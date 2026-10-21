import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../lib/store.js';

const memory = (init = {}) => {
  const data = { ...init };
  return { getItem: (k) => data[k] ?? null, setItem: (k, v) => { data[k] = String(v); }, data };
};
const broken = { getItem() { throw new Error('bloqueado'); }, setItem() { throw new Error('bloqueado'); } };
const today = new Date(2026, 9, 21, 12);

test('sin almacenamiento disponible, devuelve estado por defecto y no revienta', () => {
  const s = createStore(broken);
  assert.deepEqual(s.load(), { start: null, swaps: {}, checks: {} });
  assert.doesNotThrow(() => s.save({ start: '2026-10-19', swaps: {}, checks: {} }));
  assert.equal(s.getStart(today), '2026-10-19');
});

test('JSON corrupto → estado por defecto', () => {
  const s = createStore(memory({ 'menu-semanal': '{nope' }));
  assert.deepEqual(s.load(), { start: null, swaps: {}, checks: {} });
});

test('getStart crea y guarda el lunes de la primera apertura', () => {
  const mem = memory();
  const s = createStore(mem);
  assert.equal(s.getStart(today), '2026-10-19');
  assert.equal(createStore(mem).load().start, '2026-10-19');
  assert.equal(createStore(mem).getStart(new Date(2026, 11, 1, 12)), '2026-10-19');
});

test('guarda y lee cambios y casillas', () => {
  const mem = memory();
  const s = createStore(mem);
  s.save({ start: '2026-10-19', swaps: { '0-0-l': 'salpicon' }, checks: { 'semana|2026-10-21': ['pollo'] } });
  assert.deepEqual(createStore(mem).load().swaps, { '0-0-l': 'salpicon' });
});
