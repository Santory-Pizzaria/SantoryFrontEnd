const CACHE_VERSION = 'v1';
const CACHE_NAME = `santory-pwa-${CACHE_VERSION}`;
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/logo.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isAssetRequest(request) {
  try {
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return false;
    return /\.(?:js|css|png|jpg|jpeg|svg|ico|webp|gif|woff2?|ttf|otf)$/.test(url.pathname);
  } catch { return false; }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Apenas GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Estratégia para navegação SPA: network-first com fallback para index.html do cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match('/index.html');
        return cached || Response.error();
      })
    );
    return;
  }

  // Cache-first para assets estáticos do mesmo domínio
  if (isAssetRequest(request)) {
    event.respondWith(
      caches.match(request).then(resp => {
        if (resp) return resp;
        return fetch(request).then(networkResp => {
          const copy = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return networkResp;
        }).catch(() => caches.match('/logo.ico'));
      })
    );
    return;
  }

  // Para demais requisições do mesmo domínio: stale-while-revalidate simples
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cacheResp => {
        const fetchPromise = fetch(request).then(networkResp => {
          const copy = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return networkResp;
        }).catch(() => cacheResp || Response.error());
        return cacheResp || fetchPromise;
      })
    );
  }
});
