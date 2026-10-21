import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INGREDIENTS, DISHES, WEEKS } from '../data/menu.js';

test('4 semanas de 7 días', () => {
  assert.equal(WEEKS.length, 4);
  for (const w of WEEKS) assert.equal(w.length, 7);
});

test('cada plato del calendario existe y es del tipo correcto', () => {
  for (const w of WEEKS) for (const { b, l } of w) {
    assert.equal(DISHES[b]?.type, 'desayuno', `desayuno ${b}`);
    assert.equal(DISHES[l]?.type, 'almuerzo', `almuerzo ${l}`);
  }
});

test('cada ingrediente de cada plato existe', () => {
  for (const [id, dish] of Object.entries(DISHES)) {
    assert.ok(dish.items.length > 0, id);
    assert.ok(dish.steps.length >= 3, `${id} necesita pasos`);
    for (const { ing, qty } of dish.items) {
      assert.ok(INGREDIENTS[ing], `${id}: ${ing}`);
      assert.ok(qty > 0, `${id}: ${ing} qty`);
    }
  }
});

test('ningún plato se repite dentro de una semana', () => {
  for (const w of WEEKS) {
    assert.equal(new Set(w.map((x) => x.l)).size, 7);
    assert.equal(new Set(w.map((x) => x.b)).size, 7);
  }
});

test('todo almuerzo lleva verdura y todo plato lleva proteína', () => {
  for (const [id, dish] of Object.entries(DISHES)) {
    if (dish.type === 'almuerzo') {
      assert.ok(dish.items.some((i) => INGREDIENTS[i.ing].cat === 'verduras'), id);
    }
    assert.ok(dish.items.some((i) => INGREDIENTS[i.ing].cat === 'proteinas' || INGREDIENTS[i.ing].cat === 'lacteos'), id);
  }
});

test('un cambio guardado con un plato que ya no existe vuelve al original', async () => {
  const { dishFor } = await import('../lib/plan.js');
  assert.equal(dishFor(0, 0, 'l', { '0-0-l': 'plato_borrado' }), WEEKS[0][0].l);
  assert.equal(dishFor(0, 0, 'l', { '0-0-l': WEEKS[0][0].b }), WEEKS[0][0].l, 'tipo equivocado');
  assert.equal(dishFor(0, 0, 'l', null), WEEKS[0][0].l);
});
