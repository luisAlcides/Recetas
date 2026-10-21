import { CATEGORIES, DISHES, INGREDIENTS } from '../data/menu.js';
import { dishFor, MEAL_TYPE, PORTIONS } from './plan.js';
import { slotFor } from './cycle.js';

const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };
const PLURALS = { litro: 'litros', lata: 'latas', manojo: 'manojos', cabeza: 'cabezas' };

export function formatQty(qty, unit, step) {
  const n = Math.ceil(qty / step - 1e-9) * step;
  const whole = Math.floor(n);
  const frac = FRACTIONS[Math.round((n - whole) * 100) / 100] ?? '';
  const num = [whole || '', frac].filter(Boolean).join(' ');
  const u = n > 1 ? (PLURALS[unit] ?? unit) : unit;
  return `${num} ${u}`;
}

// Lista de compras para las fechas dadas, agrupada por categoría.
export function shoppingList(dates, startISO, swaps) {
  const totals = {};
  for (const date of dates) {
    const { week, day } = slotFor(date, startISO);
    for (const meal of ['b', 'l']) {
      const dish = DISHES[dishFor(week, day, meal, swaps)];
      if (!dish) continue;
      const portions = PORTIONS[MEAL_TYPE[meal]];
      for (const { ing, qty } of dish.items) {
        totals[ing] = (totals[ing] ?? 0) + qty * portions;
      }
    }
  }
  return Object.keys(CATEGORIES)
    .map((cat) => ({
      cat,
      title: CATEGORIES[cat],
      items: Object.entries(totals)
        .filter(([ing]) => INGREDIENTS[ing].cat === cat)
        .map(([ing, qty]) => {
          const { name, unit, step } = INGREDIENTS[ing];
          return { ing, name, qty, label: formatQty(qty, unit, step) };
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'es')),
    }))
    .filter((g) => g.items.length > 0);
}
