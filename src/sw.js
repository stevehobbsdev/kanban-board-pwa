const cacheName = 'kanban-cache';
const isExcluded = f => /hot-update|sockjs/.test(f);

const filesToCache = [
  ...serviceWorkerOption.assets.filter(file => !isExcluded(file)),
  '/'
];

self.addEventListener('install', event => {
  event.waitUntil(preCache());
});

// Caches known files up-front
const preCache = () =>
  caches.open(cacheName).then(cache => {
    cache.addAll(filesToCache);
  });

self.addEventListener('fetch', event => {
  event.respondWith(
    fetchFromNetwork(event.request).catch(() => fetchFromCache(event.request))
  );
});

const fetchFromNetwork = request => {
  return new Promise((resolve, reject) => {
    fetch(request).then(response => {
      if (!isExcluded(request.url) && response) {
        updateCache(request, response.clone()).then(() => resolve(response));
      } else {
        resolve(response)
      }
    }, reject);
  });
};

const fetchFromCache = request => {
  return caches.match(request).then(response => {
    return response || Promise.reject('failed');
  });
};

const updateCache = (request, response) => {
  return caches.open(cacheName).then(cache => {
    return cache.put(request, response);
  });
};
