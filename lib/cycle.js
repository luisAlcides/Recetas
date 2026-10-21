// Fechas del ciclo de 4 semanas. Todo en hora local; los días se cuentan
// por fecha de calendario (no por milisegundos) para evitar líos de horario.

export const WEEKS_IN_CYCLE = 4;

export function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
}

export function addDays(date, n) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n, 12);
}

// Días de calendario entre dos fechas (b - a).
function dayDiff(a, b) {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / 86400000);
}

// 0 = lunes … 6 = domingo
export function weekday(date) {
  return (date.getDay() + 6) % 7;
}

export function mondayOf(date) {
  return toISO(addDays(date, -weekday(date)));
}

export function slotFor(date, startISO) {
  const days = dayDiff(fromISO(startISO), date);
  const week = Math.floor(days / 7);
  return {
    week: ((week % WEEKS_IN_CYCLE) + WEEKS_IN_CYCLE) % WEEKS_IN_CYCLE,
    day: weekday(date),
  };
}

export function rangeDates(kind, today) {
  const span = (start, n) => Array.from({ length: n }, (_, i) => addDays(start, i));
  switch (kind) {
    case 'hoy': return span(today, 1);
    case 'semana': return span(today, 7);
    case 'proxima': return span(addDays(today, 7 - weekday(today)), 7);
    case 'quincena': return span(today, 14);
    default: throw new Error(`Rango desconocido: ${kind}`);
  }
}
