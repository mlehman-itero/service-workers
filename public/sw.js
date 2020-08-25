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

self.addEventListener('install', function(event) {
    console.log('installing');
    // install sw
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
                // Cache hit - return response
                if (response) {
                    console.log('cache hit');
                    return response;
                }

                return fetch(event.request).then(function(response) {
                    // check for valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // clone response stream so browser can still consume response
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
  });