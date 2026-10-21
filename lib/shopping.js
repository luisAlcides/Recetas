import { CATEGORIES, DISHES, INGREDIENTS } from '../data/menu.js';
import { dishFor, MEAL_TYPE, PORTIONS } from './plan.js';
import { addDays, fromISO, mondayOf, slotFor, toISO } from './cycle.js';

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

// Clave para guardar las casillas marcadas. Duran toda la semana de calendario
// (no se borran cada día); "hoy" es solo del día.
export function checksKey(kind, today) {
  const monday = mondayOf(today);
  if (kind === 'hoy') return `hoy|${toISO(today)}`;
  if (kind === 'proxima') return `proxima|${toISO(addDays(fromISO(monday), 7))}`;
  return `${kind}|${monday}`;
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
