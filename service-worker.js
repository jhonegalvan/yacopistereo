const CACHE_NAME = 'Yacopi';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/main.min.css',
  '/css/custom.css',
  '/js/main.js',
  '/assets/ds_logo.png',
  '/assets/ds.webp',
  '/assets/bg.webp',
  '/assets/cover.webp',
  '/assets/favicon.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap',
  'https://fonts.cdnfonts.com/css/akira-expanded'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
