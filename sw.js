// Service worker: guarda o app no aparelho para funcionar sem internet.
// Ao alterar qualquer arquivo do app, aumente a versão abaixo.
const VERSAO = 'm3e-relatorio-v8';
const ARQUIVOS = [
  './',
  './index.html',
  './jspdf.umd.min.js',
  './xlsx.mini.min.js',
  './manifest.webmanifest',
  './logo-m3e.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request))
  );
});
