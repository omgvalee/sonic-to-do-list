const CACHE_NAME = 'todo-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/sonic-sonic-running.gif',
  '/images/thumb-1920-420338.jpg',
  '/images/Todolist.png',
  '/images/Todolist.creado.png',
  '/images/Todolist.hecho.png',
  'images/Simbolo-Sonic.png'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS))
        .catch((err) => console.log('Failed to cache assets:', err))
    );
  });

// Fetch cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});