console.log('Started', self);

const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/stylesheets/style.css',
  '/stylesheets/cards.css',
  '/stylesheets/header.css',
  '/javascripts/navigator.js',
  '/javascripts/ajax.js'
];

self.addEventListener('install', function(event) {
  console.log('Installed', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
  );
});
