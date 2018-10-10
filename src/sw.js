/* global serviceWorkerOption: false */

const cacheName = 'kanban-cache';
const isExcluded = f => /hot-update|sockjs|manifest/.test(f);

const filesToCache = [
  ...serviceWorkerOption.assets.filter(file => !isExcluded(file)),
  '/',
  'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.2/superhero/bootstrap.min.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
];

const updateCache = (request, response) =>
  caches.open(cacheName).then(cache => cache.put(request, response));

const fetchFromNetwork = request =>
  new Promise((resolve, reject) => {
    fetch(request).then(response => {
      if (!isExcluded(request.url) && response) {
        updateCache(request, response.clone()).then(() => resolve(response));
      } else {
        resolve(response);
      }
    }, reject);
  });

const fetchFromCache = request =>
  caches.match(request).then(response => response || Promise.reject('failed'));

// Caches known files up-front
const preCache = () =>
  caches.open(cacheName).then(cache => {
    cache.addAll(filesToCache);
  });

self.addEventListener('install', event => {
  event.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetchFromNetwork(event.request).catch(() => fetchFromCache(event.request))
  );
});
