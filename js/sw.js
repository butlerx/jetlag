const CACHE_NAME = 'jetlag-game-cache-v1';

async function addToCache(urlsToCache) {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
}

async function putInCache(request, response) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
}

async function cacheFirst(event) {
  const responseFromCache = await caches.match(event.request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const preloadResponse = await event.preloadResponse;
  if (preloadResponse) {
    event.waitUntil(putInCache(event.request, preloadResponse.clone()));
    return preloadResponse;
  }

  try {
    const responseFromNetwork = await fetch(event.request);
    if (!responseFromNetwork.ok()) {
      return responseFromNetwork;
    }
    event.waitUntil(putInCache(event.request, responseFromNetwork.clone()));
    return responseFromNetwork;
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

async function enableNavigationPreload() {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
}

async function deleteOldCaches() {
  const cacheKeepList = ['v2'];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => key !== CACHE_NAME);
  await Promise.all(cachesToDelete.map((key) => caches.delete(key)));
}

self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(async () => {
    await enableNavigationPreload();
    await deleteOldCaches();
  });
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      './',
      './index.html',
      './css/main.css',
      './css/contents.css',
      './js/app.js',
      './manifest.json',
      './icons/icon-128x128.png',
      './templates/matching.html',
      './templates/measuring.html',
      './templates/photographic.html',
      './templates/radar.html',
      './templates/tabs.html',
      './templates/tentacles.html',
      './templates/thermo.html',
    ]),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event));
});
