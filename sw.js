const CACHE_NAME = 'jetlag-game-cache-v1';

// List all the files to cache
const urlsToCache = [
  './',
  './app.js',
  './manifest.json',
  './components/index.js',
  './components/base/question.js',
  './components/common/persistent-checkbox.js',
  './components/common/persistent-input-custom-label.js',
  './components/common/persistent-input.js',
  './components/specific/game-content.js',
  './icons/icon-128x128.png',
  './pages/error.js',
  './pages/index.js',
  './pages/matching.js',
  './pages/measuring.js',
  './pages/photographic.js',
  './pages/radar.js',
  './pages/tentacles.js',
  './pages/thermo.js',
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
