const cacheName = 'jetlag-game-cache-v1.1';

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
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
