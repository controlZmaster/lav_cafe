// ===================================
// SERVICE WORKER - Лав Кафе
// Cache Strategy & Offline Support
// ===================================

const CACHE_VERSION = 'lav-cafe-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Ressources à mettre en cache immédiatement (Cache First)
const STATIC_ASSETS = [
  '/',
  '/templates/index.html',
  '/templates/menu.html',
  '/templates/login.html',
  '/templates/register.html',
  '/templates/guest.html',
  '/templates/payment.html',
  '/templates/order-status.html',
  '/templates/qr-scan.html',
  '/templates/404.html',
  '/static/css/base.css',
  '/static/css/landing.css',
  '/static/css/menu.css',
  '/static/css/auth.css',
  '/static/css/payment.css',
  '/static/css/order-status.css',
  '/static/js/main.js',
  '/static/js/menu.js',
  '/static/js/cart.js',
  '/static/js/payment.js',
  '/static/js/order-status.js',
  '/static/js/auth.js',
  '/static/js/qr-scanner.js',
  '/static/js/animations.js'
];

// URLs des données dynamiques (Network First)
const DYNAMIC_URLS = [
  '/api/menu',
  '/api/orders',
  '/api/user'
];

// Durée de vie du cache (en secondes)
const CACHE_LIFETIME = {
  static: 7 * 24 * 60 * 60,    // 7 jours
  dynamic: 1 * 60 * 60,         // 1 heure
  images: 30 * 24 * 60 * 60     // 30 jours
};

// ===================================
// INSTALLATION
// ===================================

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation en cours...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation terminée');
        return self.skipWaiting(); // Activer immédiatement
      })
      .catch((error) => {
        console.error('[Service Worker] Erreur lors de l\'installation:', error);
      })
  );
});

// ===================================
// ACTIVATION
// ===================================

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation en cours...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Supprimer les anciens caches
            if (cacheName.startsWith('lav-cafe-') && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('[Service Worker] Suppression de l\'ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation terminée');
        return self.clients.claim(); // Prendre le contrôle immédiatement
      })
  );
});

// ===================================
// FETCH - STRATÉGIES DE CACHE
// ===================================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes vers d'autres domaines (sauf fonts)
  if (url.origin !== location.origin && !url.hostname.includes('fonts')) {
    return;
  }
  
  // Stratégie pour les images
  if (request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    return;
  }
  
  // Stratégie pour les ressources statiques (CSS, JS)
  if (STATIC_ASSETS.some(asset => url.pathname.includes(asset)) ||
      request.destination === 'style' ||
      request.destination === 'script') {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    return;
  }
  
  // Stratégie pour les données dynamiques (API)
  if (DYNAMIC_URLS.some(apiUrl => url.pathname.includes(apiUrl))) {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    return;
  }
  
  // Stratégie par défaut : Network First
  event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
});

// ===================================
// STRATÉGIE: CACHE FIRST
// ===================================

async function cacheFirstStrategy(request, cacheName) {
  try {
    // 1. Chercher dans le cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[Service Worker] Cache hit:', request.url);
      
      // Vérifier si le cache est expiré
      const cacheTime = await getCacheTime(cacheName, request.url);
      const now = Date.now();
      const maxAge = CACHE_LIFETIME.static * 1000;
      
      if (cacheTime && (now - cacheTime) < maxAge) {
        return cachedResponse;
      }
      
      // Cache expiré, mettre à jour en arrière-plan
      updateCache(request, cacheName);
      return cachedResponse;
    }
    
    // 2. Pas dans le cache, récupérer du réseau
    console.log('[Service Worker] Cache miss, fetching:', request.url);
    const networkResponse = await fetch(request);
    
    // 3. Mettre en cache pour la prochaine fois
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      await setCacheTime(cacheName, request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Erreur Cache First:', error);
    
    // Fallback: retourner la page offline si disponible
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Dernière option: page 404
    return caches.match('/templates/404.html');
  }
}

// ===================================
// STRATÉGIE: NETWORK FIRST
// ===================================

async function networkFirstStrategy(request, cacheName) {
  try {
    // 1. Essayer le réseau d'abord
    console.log('[Service Worker] Network first:', request.url);
    const networkResponse = await fetch(request);
    
    // 2. Mettre en cache si succès
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      await setCacheTime(cacheName, request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', request.url);
    
    // 3. Si le réseau échoue, utiliser le cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[Service Worker] Serving from cache (offline)');
      return cachedResponse;
    }
    
    // 4. Aucune option disponible
    console.error('[Service Worker] No cache available for:', request.url);
    return new Response('Offline - No cached version available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// ===================================
// GESTION DU TEMPS DE CACHE
// ===================================

async function setCacheTime(cacheName, url) {
  const timeCache = await caches.open(`${cacheName}-time`);
  const response = new Response(Date.now().toString());
  await timeCache.put(url, response);
}

async function getCacheTime(cacheName, url) {
  try {
    const timeCache = await caches.open(`${cacheName}-time`);
    const response = await timeCache.match(url);
    if (response) {
      const text = await response.text();
      return parseInt(text, 10);
    }
  } catch (error) {
    console.error('[Service Worker] Error getting cache time:', error);
  }
  return null;
}

// ===================================
// MISE À JOUR DU CACHE EN ARRIÈRE-PLAN
// ===================================

async function updateCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse);
      await setCacheTime(cacheName, request.url);
      console.log('[Service Worker] Cache updated in background:', request.url);
    }
  } catch (error) {
    console.log('[Service Worker] Background update failed:', error);
  }
}

// ===================================
// MESSAGES DU CLIENT
// ===================================

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('lav-cafe-')) {
              return caches.delete(cacheName);
            }
          })
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

// ===================================
// SYNCHRONISATION EN ARRIÈRE-PLAN
// ===================================

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  try {
    const pendingRequests = await getPendingRequests();
    
    for (const request of pendingRequests) {
      try {
        await fetch(request.url, request.options);
        console.log('[Service Worker] Order synced:', request.url);
      } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Sync error:', error);
  }
}

async function getPendingRequests() {
  // Récupérer depuis IndexedDB ou autre stockage
  return [];
}

console.log('[Service Worker] Script chargé, version:', CACHE_VERSION);
