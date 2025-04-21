const CACHE_NAME = 'jetlag-game-cache-v1';

// List all the files to cache
const urlsToCache = [
  './',
  './app.js',
  './components/base/button-element.js',
  './components/base/local-storage-element.js',
  './components/base/question-element.js',
  './components/common/persistent-checkbox.js',
  './components/common/persistent-input-custom-label.js',
  './components/common/persistent-input.js',
  './components/index.js',
  './components/pages/error.js',
  './components/pages/matching.js',
  './components/pages/measuring.js',
  './components/pages/photographic.js',
  './components/pages/radar.js',
  './components/pages/tentacles.js',
  './components/pages/thermo.js',
  './components/specific/delete-button.js',
  './components/specific/export-button.js',
  './components/specific/game-content.js',
  './components/specific/game-header.js',
  './game-pages.js',
  './utils.js',
  './icons/icon-128x128.png',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response
        ? response
        : event.preloadResponse.then((preloadResponse) => {
            if (preloadResponse) {
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, preloadResponse.clone()));
              return preloadResponse;
            }
            const fetchRequest = event.request.clone();
            return fetch(fetchRequest)
              .then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
                return response;
              })
              .catch(() => caches.match('/index.html'));
          }),
    ),
  );
});
