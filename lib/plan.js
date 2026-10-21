import { WEEKS } from '../data/menu.js';

// Hogar: 2 personas de gym (porción ×1.3) + 1 adulto mayor (porción ×0.75).
// El almuerzo se cocina también para la cena, así que cuenta doble.
const GYM = 1.3;
const MAYOR = 0.75;
const PER_MEAL = Math.round((2 * GYM + MAYOR) * 100) / 100;

export const PORTIONS = {
  desayuno: PER_MEAL,
  almuerzo: PER_MEAL * 2,
};

export const MEAL_TYPE = { b: 'desayuno', l: 'almuerzo' };

export const swapKey = (week, day, meal) => `${week}-${day}-${meal}`;

// meal: 'b' (desayuno) | 'l' (almuerzo y cena)
export function dishFor(week, day, meal, swaps) {
  return swaps?.[swapKey(week, day, meal)] ?? WEEKS[week][day][meal];
}
