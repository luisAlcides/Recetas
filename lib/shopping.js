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

// Número con fracciones de cocina: 1.75 → "1 ¾", 0.33 → "⅓".
const KITCHEN_FRACTIONS = [[0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾']];
function kitchenNumber(n) {
  const whole = Math.floor(n + 1e-9);
  const rest = n - whole;
  const frac = KITCHEN_FRACTIONS.find(([v]) => Math.abs(v - rest) < 0.01)?.[1] ?? '';
  return [whole || '', frac].filter(Boolean).join(' ') || '0';
}
const nearest = (q, step) => Math.max(step, Math.round(q / step) * step);
const plural = (n, one, many) => `${kitchenNumber(n)} ${n > 1 ? many : one}`;

// Cantidad para cocinar (no para comprar): onzas, tazas, cucharadas, dientes.
// whole: cosas que no se parten (huevos, tortillas…), se redondean hacia arriba.
export function recipeQty(qty, unit, whole = false) {
  if (whole) return String(Math.ceil(qty - 1e-9));
  switch (unit) {
    case 'lb':
      return qty < 1 ? `${Math.max(1, Math.round(qty * 16))} oz` : `${kitchenNumber(nearest(qty, 0.25))} lb`;
    case 'litro': {
      const tazas = qty / 0.24;
      if (tazas < 0.25) return `${Math.max(1, Math.round(qty / 0.015))} cda`;
      return plural(nearest(tazas, 0.5), 'taza', 'tazas');
    }
    case 'cabeza': {
      const dientes = Math.max(1, Math.round(qty * 10));
      return dientes === 1 ? '1 diente' : `${dientes} dientes`;
    }
    case 'manojo':
      return qty < 0.25 ? 'unas ramitas' : plural(nearest(qty, 0.25), 'manojo', 'manojos');
    case 'lata':
      return plural(qty < 1 ? nearest(qty, 1 / 3) : nearest(qty, 0.25), 'lata', 'latas');
    default:
      return kitchenNumber(nearest(qty, 0.25));
  }
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
