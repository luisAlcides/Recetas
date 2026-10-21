// Guarda la app en el teléfono para que funcione sin internet.
// Cambiá VERSION cada vez que subás cambios para que los teléfonos se actualicen.
const VERSION = 'menu-v4';
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

// Primero la red (para recibir cambios). Si no hay señal o tarda más de
// 3 segundos, se usa lo guardado.
const TIMEOUT_MS = 3000;

function fromNetwork(request) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('lento')), TIMEOUT_MS);
    fetch(request).then((res) => {
      clearTimeout(timer);
      if (!res.ok) return reject(new Error(`HTTP ${res.status}`));
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(request, copy));
      resolve(res);
    }, (err) => { clearTimeout(timer); reject(err); });
  });
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fromNetwork(e.request).catch(async () => {
      const cached = await caches.match(e.request, { ignoreSearch: true });
      return cached || (await caches.match('index.html')) || fetch(e.request);
    }),
  );
});
