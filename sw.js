// Guarda la app en el teléfono para que funcione sin internet.
// Cambiá VERSION cada vez que subás cambios para que los teléfonos se actualicen.
const VERSION = 'menu-v1';
const FILES = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'data/menu.js',
  'lib/cycle.js',
  'lib/plan.js',
  'lib/shopping.js',
  'lib/store.js',
  'manifest.webmanifest',
  'icon.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Primero la red (para recibir cambios), y si no hay señal, lo guardado.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))),
  );
});
