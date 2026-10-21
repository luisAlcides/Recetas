import { mondayOf } from './cycle.js';

const KEY = 'menu-semanal';
const empty = () => ({ start: null, swaps: {}, checks: {} });

// Estado guardado en el teléfono. Si el almacenamiento falla (modo privado,
// datos borrados), la app sigue funcionando con lo que tenga en memoria.
export function createStore(storage) {
  let cache = null;

  function load() {
    if (cache) return cache;
    try {
      const raw = storage?.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      cache = { ...empty(), ...parsed };
    } catch {
      cache = empty();
    }
    return cache;
  }

  function save(state) {
    cache = state;
    try {
      storage?.setItem(KEY, JSON.stringify(state));
    } catch {
      // sin almacenamiento: queda solo en memoria
    }
  }

  function getStart(today) {
    const state = load();
    if (!state.start) save({ ...state, start: mondayOf(today) });
    return load().start;
  }

  return { load, save, getStart };
}
