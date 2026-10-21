# Menú semanal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** PWA móvil en español que muestra el menú del día (desayuno + almuerzo/cena), la semana y la lista de compras, en un ciclo de 4 semanas con platos intercambiables.

**Architecture:** Sitio estático sin build. Lógica pura en módulos ES (`lib/`) probados con `node --test`; datos en `data/menu.js`; UI en `app.js` que renderiza 3 pestañas; estado en `localStorage` vía `lib/store.js`.

**Tech Stack:** HTML, CSS, JavaScript (ES modules), Service Worker, Node 24 `node:test` solo para pruebas.

**Spec:** `docs/superpowers/specs/2026-10-21-menu-semanal-design.md`

## Global Constraints

- Todo el texto de la UI en español.
- Solo ingredientes de la lista de la spec (El Jícaro, Nueva Segovia).
- Sin dependencias en tiempo de ejecución; rutas relativas; `netlify.toml` con `publish = "."` y `Cache-Control: no-cache` para `sw.js` y `manifest.webmanifest`.
- Hogar: 2 porciones gym + 1 porción adulto mayor (0.75); el almuerzo cuenta ×2 (almuerzo + cena).
- Ciclo de 4 semanas que empieza el lunes de la primera apertura.

## Review Focus

- Primera apertura un domingo → semana 1 empieza el lunes anterior (no el siguiente). Test en Task 1.
- Fechas antes del inicio guardado (reloj atrasado) → índice nunca negativo. Test en Task 1.
- `localStorage` bloqueado o con JSON corrupto → la app sigue mostrando el menú. Test en Task 3.
- Cambio de plato con ingrediente nuevo → aparece en compras; marcas previas se mantienen. Test en Task 2.
- Quincena que cruza de semana 4 a semana 1 → suma correcta. Test en Task 2.

---

### Task 1: Ciclo de fechas (`lib/cycle.js`)

**Files:** Create `lib/cycle.js`, `tests/cycle.test.js`, `package.json` (`"type":"module"`, `"test":"node --test tests/"`).

**Interfaces — Produces:**
- `mondayOf(date: Date) -> string` (ISO `YYYY-MM-DD`, hora local)
- `slotFor(date: Date, startISO: string) -> {week: 0..3, day: 0..6}` (day 0 = lunes)
- `rangeDates(kind: 'hoy'|'semana'|'proxima'|'quincena', today: Date) -> Date[]`

- [ ] Tests: domingo 2026-10-25 → `mondayOf` = `2026-10-19`; `slotFor(2026-11-16, '2026-10-19')` = `{week:0, day:0}` (vuelta al ciclo); fecha anterior al inicio da semana ≥ 0; `rangeDates('quincena')` largo 14; `'proxima'` empieza en lunes siguiente y tiene 7.
- [ ] Implementar, correr `npm test`, commit.

### Task 2: Datos y lista de compras (`data/menu.js`, `lib/plan.js`, `lib/shopping.js`)

**Files:** Create `data/menu.js`, `lib/plan.js`, `lib/shopping.js`, `tests/shopping.test.js`, `tests/menu.test.js`.

**Interfaces — Produces:**
- `data/menu.js`: `export const INGREDIENTS = {id: {name, cat, unit:'lb'|'unid'|'docena'|'litro'|'taza', step}}`, `export const DISHES = {id: {type:'desayuno'|'almuerzo', name, sides, gym, protein, items:[{ing, qty}], steps:[]}}` (qty por porción normal, en la unidad base del ingrediente), `export const WEEKS = [[{b, l} ×7] ×4]`.
- `dishFor(week, day, meal, swaps) -> dishId` en `lib/plan.js`; swaps key `"w-d-meal"`.
- `PORTIONS = {desayuno: 2*1.3 + 0.75, almuerzo: (2*1.3 + 0.75) * 2}` (gym = 1.3 de la normal).
- `shoppingList(dates, startISO, swaps) -> [{cat, items:[{ing, name, qty, label}]}]` con `label` redondeado hacia arriba al `step` del ingrediente (p. ej. "1 ½ lb", "2 docenas").

- [ ] Tests de datos: 4 semanas × 7 días; todo id en WEEKS existe en DISHES y todo `ing` existe en INGREDIENTS; ningún almuerzo se repite dentro de una semana; todo almuerzo tiene al menos un ingrediente de cat `verduras`.
- [ ] Tests de compras: un día con plato conocido produce la cantidad esperada × PORTIONS; un swap que agrega un ingrediente lo incluye; quincena desde semana 4 día 0 suma días de semana 4 y semana 1.
- [ ] Implementar, `npm test`, commit.

### Task 3: Estado (`lib/store.js`)

**Interfaces — Produces:** `load() -> {start, swaps, checks}`, `save(state)`, `getStart(today) -> startISO` (lo crea si falta). Todo en try/catch; JSON corrupto → estado por defecto.

- [ ] Test con un `localStorage` falso que lanza excepción y uno con JSON inválido → `load()` devuelve el estado por defecto.
- [ ] Implementar, `npm test`, commit.

### Task 4: UI (`index.html`, `styles.css`, `app.js`)

Pestañas Hoy · Semana · Compras abajo; tarjetas Desayuno / Almuerzo y cena con nota 💪 Gym; detalle con ingredientes y pasos; "Cambiar plato" (alternativas del mismo tipo, misma proteína primero, "volver al original"); Semana con selector de semana 1–4 y "fijar esta como semana actual"; Compras con selector de rango y casillas (checks guardados por `rango+fecha inicio`). Modo oscuro con `prefers-color-scheme`.

- [ ] Verificar en navegador a 390 px: sin scroll horizontal, las 3 pestañas funcionan, cambiar plato actualiza compras.
- [ ] Commit.

### Task 5: PWA y Netlify

**Files:** `manifest.webmanifest`, `sw.js` (cache-first con versión), `icon.svg`, `netlify.toml`, `README.md` (cómo subir a Netlify).

- [ ] Verificar: el service worker se registra y la app recarga sin red.
- [ ] Commit.
