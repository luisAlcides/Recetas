import { DISHES, INGREDIENTS } from './data/menu.js';
import { WEEKS_IN_CYCLE, addDays, fromISO, mondayOf, rangeDates, slotFor, toISO } from './lib/cycle.js';
import { MEAL_TYPE, PER_MEAL, dishFor, swapKey } from './lib/plan.js';
import { checksKey, recipeQty, shoppingList } from './lib/shopping.js';
import { createStore } from './lib/store.js';

let storage = null;
try { storage = window.localStorage; } catch { /* bloqueado */ }
const store = createStore(storage);

const view = document.getElementById('view');
const sheet = document.getElementById('sheet');
const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const RANGES = [
  ['hoy', 'Hoy'],
  ['semana', '7 días'],
  ['proxima', 'Próxima'],
  ['quincena', 'Quincena'],
];

const ui = { tab: 'hoy', dayISO: null, week: null, range: 'semana' };

const today = () => new Date();
const state = () => store.load();
const start = () => store.getStart(today());
const update = (patch) => store.save({ ...state(), ...patch });

const longDate = (d) => d.toLocaleDateString('es-NI', { day: 'numeric', month: 'long' });
const shortDate = (d) => d.toLocaleDateString('es-NI', { weekday: 'short', day: 'numeric', month: 'short' });

// ───────── Hoy / un día ─────────

function mealBlock(date, meal) {
  const { week, day } = slotFor(date, start());
  const id = dishFor(week, day, meal, state().swaps);
  const dish = DISHES[id];
  const swapped = id !== dishFor(week, day, meal, {});
  const when = meal === 'b' ? '☀️ Desayuno' : '🍲 Almuerzo y cena';
  return `
    <section class="meal ${meal}" aria-label="${when}">
      <p class="when">${when}</p>
      <h2>${dish.name}</h2>
      <p class="sides">${dish.sides}</p>
      <p class="gym">💪 Gym: ${dish.gym}</p>
      ${swapped ? '<p class="swapped">Cambiaste este plato.</p>' : ''}
      <div class="actions">
        <button class="primary" data-act="recipe" data-meal="${meal}" data-date="${toISO(date)}">Ver receta</button>
        <button data-act="swap" data-meal="${meal}" data-date="${toISO(date)}">Cambiar plato</button>
      </div>
    </section>`;
}

function renderDay(date, withBack) {
  const { week, day } = slotFor(date, start());
  const isToday = toISO(date) === toISO(today());
  view.innerHTML = `
    ${withBack ? '<button class="back" data-act="back">‹ Volver a la semana</button>' : ''}
    <header class="day-head">
      <h1>${isToday ? 'Hoy' : DAY_NAMES[day]}</h1>
      <p>${isToday ? DAY_NAMES[day] + ' ' : ''}${longDate(date)} · Semana ${week + 1} de ${WEEKS_IN_CYCLE}</p>
    </header>
    ${mealBlock(date, 'b')}
    ${mealBlock(date, 'l')}
    <p class="household">Cantidades para 3: dos porciones de gym y una ligera.</p>`;
}

// ───────── Semana ─────────

function weekMonday(w) {
  const now = today();
  const current = slotFor(now, start()).week;
  const ahead = (w - current + WEEKS_IN_CYCLE) % WEEKS_IN_CYCLE;
  return addDays(fromISO(mondayOf(now)), ahead * 7);
}

function renderWeek() {
  const current = slotFor(today(), start()).week;
  const w = ui.week ?? current;
  const monday = weekMonday(w);
  const todayISO = toISO(today());
  const rows = DAY_NAMES.map((name, i) => {
    const date = addDays(monday, i);
    const b = DISHES[dishFor(w, i, 'b', state().swaps)].name;
    const l = DISHES[dishFor(w, i, 'l', state().swaps)].name;
    const isToday = toISO(date) === todayISO;
    return `<li><button class="${isToday ? 'today' : ''}" data-act="open-day" data-date="${toISO(date)}">
      <span class="dname">${name.slice(0, 3)}</span>
      <span class="dl">☀️ <b>${b}</b></span>
      <span class="dl">🍲 <b>${l}</b></span>
    </button></li>`;
  }).join('');
  view.innerHTML = `
    <h1 class="screen-title">Semana ${w + 1}</h1>
    <p class="screen-sub">${w === current ? 'Esta semana' : 'Empieza el ' + longDate(monday)}</p>
    <div class="seg" role="group" aria-label="Semana del ciclo">
      ${[0, 1, 2, 3].map((i) => `<button data-act="week" data-week="${i}" aria-pressed="${i === w}">Sem ${i + 1}${i === current ? ' •' : ''}</button>`).join('')}
    </div>
    <ul class="days">${rows}</ul>
    ${w !== current ? `<button class="link" data-act="set-current" data-week="${w}">Usar la semana ${w + 1} como esta semana</button>` : ''}`;
}

// ───────── Compras ─────────

function pruneChecks() {
  const live = new Set(RANGES.map(([k]) => checksKey(k, today())));
  const checks = Object.fromEntries(Object.entries(state().checks).filter(([k]) => live.has(k)));
  update({ checks });
}

function renderShopping() {
  const dates = rangeDates(ui.range, today());
  const key = checksKey(ui.range, today());
  const checked = new Set(state().checks[key] ?? []);
  const list = shoppingList(dates, start(), state().swaps);
  const total = list.reduce((n, g) => n + g.items.length, 0);
  const done = list.reduce((n, g) => n + g.items.filter((i) => checked.has(i.ing)).length, 0);
  const span = dates.length === 1 ? shortDate(dates[0]) : `Del ${shortDate(dates[0])} al ${shortDate(dates.at(-1))}`;
  view.innerHTML = `
    <h1 class="screen-title">Compras</h1>
    <p class="screen-sub">${span} · para 3 personas</p>
    <div class="seg" role="group" aria-label="Para cuántos días">
      ${RANGES.map(([k, label]) => `<button data-act="range" data-range="${k}" aria-pressed="${k === ui.range}">${label}</button>`).join('')}
    </div>
    <p class="progress" aria-live="polite">${done} de ${total} comprados</p>
    ${list.map((g) => `
      <div class="group">
        <h3>${g.title}</h3>
        ${g.items.map((i) => `
          <label class="check">
            <input type="checkbox" data-act="check" data-ing="${i.ing}" ${checked.has(i.ing) ? 'checked' : ''}>
            <span class="name">${i.name}</span>
            <span class="qty">${i.label}</span>
          </label>`).join('')}
      </div>`).join('')}
    ${done ? '<button class="link" data-act="uncheck-all">Desmarcar todo</button>' : ''}`;
}

// ───────── Hojas: receta y cambiar plato ─────────

function openSheet(html) {
  sheet.innerHTML = `<div class="sheet">${html}</div>`;
  if (!sheet.open) sheet.showModal();
}

function sheetTop(title) {
  return `<div class="sheet-top"><h2 id="sheet-title">${title}</h2><button class="close" data-act="close" aria-label="Cerrar">✕</button></div>`;
}

function showRecipe(date, meal) {
  const { week, day } = slotFor(date, start());
  const dish = DISHES[dishFor(week, day, meal, state().swaps)];
  const rows = dish.items.map(({ ing, qty }) => {
    const { name, unit, whole } = INGREDIENTS[ing];
    return `<tr><th scope="row">${name}</th><td>${recipeQty(qty, unit, whole)}</td><td>${recipeQty(qty * PER_MEAL, unit, whole)}</td></tr>`;
  }).join('');
  openSheet(`
    ${sheetTop(dish.name)}
    <p>${dish.sides}</p>
    <h3>Ingredientes</h3>
    <table class="ing">
      <thead><tr><th scope="col"></th><th scope="col">Para 1</th><th scope="col">Para 3</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="note">"Para 3" ya incluye la porción más grande de los dos del gym y la más pequeña del adulto mayor.${meal === 'l' ? ' Si cocinás también para la cena, hacé el doble.' : ''} Sal y especias al gusto.</p>
    <h3>Preparación</h3>
    <ol>${dish.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
    <h3>💪 Para los del gym</h3>
    <p>${dish.gym}</p>`);
}

function showSwap(date, meal) {
  const { week, day } = slotFor(date, start());
  const key = swapKey(week, day, meal);
  const currentId = dishFor(week, day, meal, state().swaps);
  const current = DISHES[currentId];
  const swapped = currentId !== dishFor(week, day, meal, {});
  const alts = Object.entries(DISHES)
    .filter(([id, d]) => d.type === MEAL_TYPE[meal] && id !== currentId)
    .sort(([, a], [, b]) => (b.protein === current.protein) - (a.protein === current.protein) || a.name.localeCompare(b.name, 'es'));
  openSheet(`
    ${sheetTop('Cambiar plato')}
    <p>Ahora: <b>${current.name}</b>. El cambio queda para este día cada vez que vuelva la semana ${week + 1}.</p>
    ${swapped ? `<button class="link reset" data-act="pick" data-key="${key}" data-dish="">Volver al original: ${DISHES[dishFor(week, day, meal, {})].name}</button>` : ''}
    <h3>Elegí otro</h3>
    <ul class="alts">${alts.map(([id, d]) => `
      <li><button class="${d.protein === current.protein ? 'same' : ''}" data-act="pick" data-key="${key}" data-dish="${id}">
        ${d.name}<small>${d.sides}</small>
      </button></li>`).join('')}
    </ul>`);
}

// ───────── Navegación y eventos ─────────

function render() {
  for (const b of document.querySelectorAll('.tabs button')) {
    if (b.dataset.tab === ui.tab) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  }
  if (ui.tab === 'hoy') renderDay(today(), false);
  else if (ui.tab === 'semana') ui.dayISO ? renderDay(fromISO(ui.dayISO), true) : renderWeek();
  else renderShopping();
}

document.querySelector('.tabs').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-tab]');
  if (!b) return;
  ui.tab = b.dataset.tab;
  ui.dayISO = null;
  render();
  window.scrollTo(0, 0);
});

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.dataset.act === 'check') return;
  const { act } = el.dataset;
  const date = el.dataset.date && fromISO(el.dataset.date);
  if (act === 'recipe') showRecipe(date, el.dataset.meal);
  else if (act === 'swap') showSwap(date, el.dataset.meal);
  else if (act === 'close') sheet.close();
  else if (act === 'pick') {
    const swaps = { ...state().swaps };
    if (el.dataset.dish) swaps[el.dataset.key] = el.dataset.dish;
    else delete swaps[el.dataset.key];
    update({ swaps });
    sheet.close();
    render();
  } else if (act === 'open-day') { ui.dayISO = el.dataset.date; render(); window.scrollTo(0, 0); }
  else if (act === 'back') { ui.dayISO = null; render(); }
  else if (act === 'week') { ui.week = Number(el.dataset.week); render(); }
  else if (act === 'set-current') {
    const w = Number(el.dataset.week);
    if (!confirm(`¿Hacer que esta semana sea la semana ${w + 1}? El ciclo sigue desde ahí.`)) return;
    update({ start: toISO(addDays(fromISO(mondayOf(today())), -7 * w)) });
    ui.week = null;
    render();
  } else if (act === 'range') { ui.range = el.dataset.range; render(); }
  else if (act === 'uncheck-all') {
    const key = checksKey(ui.range, today());
    const checks = { ...state().checks };
    delete checks[key];
    update({ checks });
    render();
  }
});

view.addEventListener('change', (e) => {
  const box = e.target.closest('input[data-act="check"]');
  if (!box) return;
  const key = checksKey(ui.range, today());
  const set = new Set(state().checks[key] ?? []);
  box.checked ? set.add(box.dataset.ing) : set.delete(box.dataset.ing);
  update({ checks: { ...state().checks, [key]: [...set] } });
  renderShopping();
});

// Cerrar la hoja tocando fuera de ella
sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });

// Si la app queda abierta de un día para otro, refrescar al volver
document.addEventListener('visibilitychange', () => { if (!document.hidden && !sheet.open) render(); });

pruneChecks();
render();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
