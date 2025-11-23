
const CACHE_NAME = 'gemini-runner-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Strategy: Stale-While-Revalidate for non-critical, Cache-First for CDNs
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If found in cache, return it
      if (response) {
        return response;
      }

      // Clone request for fetch
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
          return response;
        }

        // Cache external CDNs (React, Tailwind, Fonts, Images)
        const url = event.request.url;
        const isCdn = url.includes('aistudiocdn.com') ||
                      url.includes('cdn.tailwindcss.com') ||
                      url.includes('fonts.googleapis.com') ||
                      url.includes('gstatic.com') ||
                      url.includes('jsdelivr.net');

        if (isCdn || event.request.destination === 'script' || event.request.destination === 'style' || event.request.destination === 'image') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }

        return response;
      }).catch(() => {
          // Offline Fallback could be added here if needed
          // For now, rely on cache. If not in cache and offline, it will fail gracefully.
      });
    })
  );
});
