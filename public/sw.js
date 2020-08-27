// globals
var CACHE_NAME = 'service-workers-dev';

var urlsToCache = [
    '/',
    '/index.html',
    '/dist/css/styles.css',
    '/dist/css/bootstrap.css',
    '/dist/js/jquery.js',
    '/dist/js/bootstrap.js',
    '/dist/js/main.js'
];

var apiUrl = '';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(function(response) {
                    var copy = response.clone();

                    if (!response || response.status !== 200) {
                        return response;
                    }

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            console.log('caching the response');
                            cache.put(event.request, copy);
                        });

                    return response;
                });
            })
    );
});