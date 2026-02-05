const CACHE_NAME = 'glicogabi-v23'; 

const ASSETS = [
  'index.html',
  'HOME.HTML',
  'CONSULTA E EXAMES.HTML',
  'HISTÓRICO.HTML',
  'ESTOQUE.HTML',
  'AJUSTES.HTML',
  'LEMBRETES.HTML',
  'ícone.png',
  'MANIFEST.JSON'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key !== CACHE_NAME) return caches.delete(key);
    }));
  }));
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

