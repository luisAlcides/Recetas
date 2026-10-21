import { DISHES, WEEKS } from '../data/menu.js';

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
// Si el cambio guardado apunta a un plato que ya no existe (o de otro tipo),
// se usa el original.
export function dishFor(week, day, meal, swaps) {
  const swapped = swaps?.[swapKey(week, day, meal)];
  if (DISHES[swapped]?.type === MEAL_TYPE[meal]) return swapped;
  return WEEKS[week][day][meal];
}
