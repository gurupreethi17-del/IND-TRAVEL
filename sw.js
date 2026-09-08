// ==========================================================================
// IND TRAVEL — Service Worker for App Shell & Offline Demonstration
// ==========================================================================

const CACHE_NAME = 'ind-travel-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/i18n.js',
  './js/data.js',
  './js/app.js',
  './js/tripPlanner.js',
  './js/heritageScanner.js',
  './js/aiAssistant.js',
  './js/safetyGuardian.js',
  './js/intelligence.js',
  './js/localNetwork.js',
  './js/internationalHub.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first with cache fallback for resilience
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

