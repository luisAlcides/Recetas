import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DISHES } from '../data/menu.js';
import { dishFor, PORTIONS } from '../lib/plan.js';
import { shoppingList, formatQty } from '../lib/shopping.js';
import { fromISO, addDays, slotFor } from '../lib/cycle.js';

const START = '2026-10-19';
const flat = (list) => Object.fromEntries(list.flatMap((g) => g.items.map((i) => [i.ing, i])));

test('porciones: 2 gym (×1.3) + adulto mayor (×0.75); almuerzo cuenta para la cena', () => {
  assert.equal(PORTIONS.desayuno, 3.35);
  assert.equal(PORTIONS.almuerzo, 6.7);
});

test('dishFor respeta el calendario y los cambios', () => {
  const orig = dishFor(0, 0, 'l', {});
  assert.equal(DISHES[orig].type, 'almuerzo');
  assert.equal(dishFor(0, 0, 'l', { '0-0-l': 'sardina_tomate' }), 'sardina_tomate');
  assert.equal(dishFor(1, 0, 'l', { '0-0-l': 'sardina_tomate' }), dishFor(1, 0, 'l', {}));
});

test('un día suma desayuno y almuerzo con sus porciones', () => {
  const day = [fromISO(START)];
  const b = DISHES[dishFor(0, 0, 'b', {})];
  const l = DISHES[dishFor(0, 0, 'l', {})];
  const expected = {};
  for (const i of b.items) expected[i.ing] = (expected[i.ing] ?? 0) + i.qty * PORTIONS.desayuno;
  for (const i of l.items) expected[i.ing] = (expected[i.ing] ?? 0) + i.qty * PORTIONS.almuerzo;
  const got = flat(shoppingList(day, START, {}));
  assert.deepEqual(Object.keys(got).sort(), Object.keys(expected).sort());
  for (const k of Object.keys(expected)) assert.ok(Math.abs(got[k].qty - expected[k]) < 1e-9, k);
});

test('un cambio de plato agrega sus ingredientes', () => {
  const day = [fromISO(START)];
  const got = flat(shoppingList(day, START, { '0-0-l': 'sardina_tomate' }));
  assert.ok(got.sardina);
});

test('quincena que cruza de semana 4 a semana 1 suma ambas semanas', () => {
  const s4 = Array.from({ length: 7 }, (_, i) => addDays(fromISO('2026-11-09'), i));
  const s1 = Array.from({ length: 7 }, (_, i) => addDays(fromISO('2026-11-16'), i));
  assert.equal(slotFor(s4[0], START).week, 3);
  assert.equal(slotFor(s1[0], START).week, 0);
  const a = flat(shoppingList(s4, START, {}));
  const b = flat(shoppingList(s1, START, {}));
  const both = flat(shoppingList([...s4, ...s1], START, {}));
  for (const k of Object.keys(both)) {
    assert.ok(Math.abs(both[k].qty - ((a[k]?.qty ?? 0) + (b[k]?.qty ?? 0))) < 1e-9, k);
  }
});

test('la lista sale agrupada por categoría en orden fijo', () => {
  const list = shoppingList([fromISO(START)], START, {});
  const order = ['proteinas', 'lacteos', 'granos', 'verduras', 'frutas', 'otros'];
  const cats = list.map((g) => g.cat);
  assert.deepEqual(cats, order.filter((c) => cats.includes(c)));
});

test('formatQty redondea hacia arriba a lo que se puede pedir', () => {
  assert.equal(formatQty(1.2, 'lb', 0.5), '1 ½ lb');
  assert.equal(formatQty(0.3, 'lb', 0.5), '½ lb');
  assert.equal(formatQty(2.01, 'lb', 0.5), '2 ½ lb');
  assert.equal(formatQty(2, 'lb', 0.5), '2 lb');
  assert.equal(formatQty(0.2, 'lb', 0.25), '¼ lb');
  assert.equal(formatQty(12.4, 'unid', 1), '13 unid');
  assert.equal(formatQty(0.7, 'litro', 0.5), '1 litro');
  assert.equal(formatQty(2.6, 'litro', 0.5), '3 litros');
});

test('checksKey: las casillas duran toda la semana (no se borran cada día)', async () => {
  const { checksKey } = await import('../lib/shopping.js');
  const lun = fromISO('2026-10-19');
  const mar = fromISO('2026-10-20');
  const dom = fromISO('2026-10-25');
  for (const k of ['semana', 'proxima', 'quincena']) {
    assert.equal(checksKey(k, lun), checksKey(k, mar), k);
    assert.equal(checksKey(k, lun), checksKey(k, dom), k);
    assert.notEqual(checksKey(k, lun), checksKey(k, fromISO('2026-10-26')), k);
  }
  assert.notEqual(checksKey('hoy', lun), checksKey('hoy', mar));
  assert.notEqual(checksKey('semana', lun), checksKey('proxima', lun));
});
