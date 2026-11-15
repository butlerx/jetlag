const cacheName = 'jetlag-game-cache-v1.2';

const filesToCache = [
  './',
  './index.css',
  './jetlag.js',
  './jetlag_bg.wasm',
  './static/icon-128x128.png',
  './static/manifest.json',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

/* Drop caches from older versions so stale builds aren't served */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

/* Network first so new builds show up; fall back to the cache when offline */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response.ok && new URL(e.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(cacheName).then((cache) => cache.put(e.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(e.request)),
  );
});
