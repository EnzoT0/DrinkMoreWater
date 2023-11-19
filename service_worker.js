self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('your-cache-name').then((cache) => {
        return cache.addAll([
          '/', // Cache your main page
          '/index.html', // Cache other resources you need
          '/styles.css',
          '/img/watercup.png',
          '/img/clock.png',
          '/popup.js'
        ]);
      })
    );
  });

  // Fetch event - Serve cached resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
