const cacheName = 'kanban-cache';
const isExcluded = f => /hot-update|sockjs/.test(f);
const isBootstrapRequest = request => /bootstrapcdn/.test(request.url);

const filesToCache = [
  ...serviceWorkerOption.assets.filter(file => !isExcluded(file)),
  '/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(filesToCache);
    })
  );
});

// Handle the 'fetch' event, raised when a resource is
// being fetched from the network
self.addEventListener('fetch', event => {
  event.respondWith(
    new Promise((resolve, reject) => {

      // If the request should be excluded, bypass the cache entirely
      if (isExcluded(event.request.url)) {
        resolve(fetch(event.request));
      } else {
        resolve(
          caches.match(event.request).then(response => {

            // If we get a cache hit, return the cached response
            if (response) return response;

            // Execute the request
            return fetch(event.request).then(response => {

              // Clone the response, as we want to use it multiple times
              var responseToCache = response.clone();

              // If it's a request to Bootstrap CDN, cache the response
              if (isBootstrapRequest(event.request)) {
                caches.open(cacheName).then(cache => {
                  cache.put(event.request, responseToCache);
                });
              } else {

                // If we don't get a positive response, exit
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                caches.open(cacheName).then(cache => {
                  cache.put(event.request, responseToCache);
                });
              }
              
              return response;
            });
          })
        );
      }
    })
  );
});