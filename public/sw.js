/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * AKHAND BHARAT DARSHAN — Production Service Worker (Security-Hardened)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ARCHITECTURE:
 *   Cache Layer 1: APP_SHELL    — HTML, JS, CSS (cache-first, instant load)
 *   Cache Layer 2: DATA         — JSON, GeoJSON (cache-first with versioning)
 *   Cache Layer 3: ASSETS       — Images, textures, fonts (cache-first + limits)
 *   Cache Layer 4: FONTS        — Google Fonts (cache-first, 1yr expiry)
 * 
 * SECURITY HARDENING:
 *   - Zero-trust cache gatekeeper: only whitelisted URLs are cached
 *   - Origin validation: rejects cross-origin opaque/redirected responses
 *   - Response integrity checks before any cache.put()
 *   - URL pattern matching: only known path prefixes allowed in cache
 *   - Request method validation: only GET requests processed
 *   - Deterministic cache cleanup on version bump
 *   - No wildcard caching, no stale-while-revalidate for unknown URLs
 * 
 * VERSION CONTROL: Bump CACHE_VERSION to invalidate all caches on deploy.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const CACHE_VERSION = 'v1.1.0';

const CACHE_NAMES = {
  shell:  `app-shell-${CACHE_VERSION}`,
  data:   `data-${CACHE_VERSION}`,
  assets: `media-${CACHE_VERSION}`,
  fonts:  `fonts-${CACHE_VERSION}`,
};

// Storage limits per cache layer (bytes)
const CACHE_LIMITS = {
  assets: 80 * 1024 * 1024,  // 80MB — images + textures
  fonts:  5 * 1024 * 1024,   // 5MB  — font files
  data:   20 * 1024 * 1024,  // 20MB — GeoJSON is large
  shell:  15 * 1024 * 1024,  // 15MB — JS/CSS bundles
};

// Max entries per cache (eviction boundary)
const MAX_ENTRIES = {
  assets: 200,
  fonts:  30,
  data:   50,
  shell:  100,
};


// ═══════════════════════════════════════════════════════════════════════════════
// SECURITY: WHITELIST DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

// Trusted URL path prefixes — ONLY these paths are eligible for caching
const TRUSTED_PATH_PREFIXES = [
  '/_next/',        // Next.js static bundles (hashed, immutable)
  '/data/',         // Application data files
  '/place-images/', // Place image assets
  '/textures/',     // Map textures
  '/icons/',        // PWA icons
  '/fonts/',        // Local fonts (if any)
];

// Exact-match trusted paths (root-level assets)
const TRUSTED_EXACT_PATHS = [
  '/',
  '/bharatvarsha',
  '/manifest.json',
  '/favicon.png',
  '/parchment-texture.png',
  '/countries.geojson',
  '/india_states.geojson',
];

// Trusted external domains (ONLY Google Fonts — nothing else)
const TRUSTED_EXTERNAL_DOMAINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];


// ─── Tier 1: Critical Shell (Instantly cached during SW install) ────────────
const APP_SHELL_URLS = [
  '/',
  '/bharatvarsha',
  '/manifest.json',
  '/favicon.png',
  '/parchment-texture.png', // Background texture is critical for shell feel
];

// Tier 2 & 3 lists (Used for progressive & background caching)
const CRITICAL_DATA_URLS = [
  '/countries.geojson',
  '/india_states.geojson',
  '/data/external_borders.json',
  '/data/internal_borders.json',
];

const EXTENDED_DATA_URLS = [
  '/data/mountains.json',
  '/data/rivers.json',
];

// All images: moved to background/Interaction caching
const ASSET_URLS = [
  '/textures/noise.png',
  '/textures/paper.png',
  '/textures/mountain-texture.png',
  // Icons
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Mountain images
  '/place-images/mountains/aravalli.webp',
  '/place-images/mountains/himalaya.avif',
  '/place-images/mountains/mahendra.jpg',
  '/place-images/mountains/malaya.jpg',
  '/place-images/mountains/sahyadri.jpg',
  '/place-images/mountains/vindhya.webp',
  // River images
  '/place-images/rivers/brahmaputra.webp',
  '/place-images/rivers/gandaki.webp',
  '/place-images/rivers/ganga.jpg',
  '/place-images/rivers/Godavari.jpg',
  '/place-images/rivers/kaveri.jpg',
  '/place-images/rivers/krishna.jpg',
  '/place-images/rivers/Mahanadi.jpg',
  '/place-images/rivers/Narmada.jpg',
  '/place-images/rivers/saraswati.jpg',
  '/place-images/rivers/sindhu.jpg',
  '/place-images/rivers/yamuna.jpg',
  // Sacred city images
  '/place-images/sacred-cities/amritsar.jpg',
  '/place-images/sacred-cities/ayodhya.jpg',
  '/place-images/sacred-cities/dwarka.jpg',
  '/place-images/sacred-cities/gaya.jpg',
  '/place-images/sacred-cities/indraprastha.jpg',
  '/place-images/sacred-cities/Kanchi.jpg',
  '/place-images/sacred-cities/mathura.jpg',
  '/place-images/sacred-cities/nagpur.jpg',
  '/place-images/sacred-cities/patliputra.jpg',
  '/place-images/sacred-cities/prayag.webp',
  '/place-images/sacred-cities/puri.jpg',
  '/place-images/sacred-cities/somnath.jpg',
  '/place-images/sacred-cities/takshashila.jpg',
  '/place-images/sacred-cities/ujjain.webp',
  '/place-images/sacred-cities/vaishali.jpg',
  '/place-images/sacred-cities/vijaynagar.jpg',
  // Region images
  '/place-images/regions/afghanistan.jpg',
  '/place-images/regions/bangladesh.jpg',
  '/place-images/regions/bhutan.jpg',
  '/place-images/regions/china.jpg',
  '/place-images/regions/myanmar.jpg',
  '/place-images/regions/nepal.jpg',
  '/place-images/regions/pakistan.png',
  '/place-images/regions/srilanka.jpg',
];

// Data files that return arrays when parsed (used for context-aware fallbacks)
const ARRAY_DATA_PATHS = [
  '/data/mountains.json',
  '/data/rivers.json',
];

// Data files that return GeoJSON FeatureCollections
const GEOJSON_PATHS = [
  '/countries.geojson',
  '/india_states.geojson',
  '/data/external_borders.json',
  '/data/internal_borders.json',
];


// ═══════════════════════════════════════════════════════════════════════════════
// SECURITY: URL VALIDATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Checks if a URL is from the same origin as the service worker.
 */
function isSameOrigin(url) {
  return new URL(url).origin === self.location.origin;
}

/**
 * Checks if a URL belongs to a trusted external domain.
 */
function isTrustedExternalDomain(url) {
  const hostname = new URL(url).hostname;
  return TRUSTED_EXTERNAL_DOMAINS.some(domain => hostname === domain);
}

/**
 * Checks if a same-origin URL path is on the whitelist.
 * Returns true ONLY if the path matches a trusted prefix or exact path.
 */
function isTrustedPath(url) {
  const pathname = new URL(url).pathname;

  // Check exact matches first
  if (TRUSTED_EXACT_PATHS.includes(pathname)) return true;

  // Check prefix matches
  if (TRUSTED_PATH_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true;

  // Check if it's a known file extension in root (JS/CSS bundles)
  if (/^\/_next\//.test(pathname)) return true;
  if (/\.(js|css)$/i.test(pathname) && !pathname.includes('..')) return true;

  return false;
}

/**
 * Master URL validation: determines if a URL is eligible for caching.
 * This is the ZERO-TRUST GATEKEEPER.
 */
function isUrlCacheable(url) {
  try {
    const parsed = new URL(url);

    // Block non-HTTP(S) protocols
    if (!parsed.protocol.startsWith('http')) return false;

    // Block URLs with query strings (prevents cache poisoning via query manipulation)
    if (parsed.search && parsed.search.length > 0) return false;

    // Same-origin: check against whitelist
    if (isSameOrigin(url)) return isTrustedPath(url);

    // External: only trusted domains
    if (isTrustedExternalDomain(url)) return true;

    // Everything else: REJECT
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Validates a Response object before caching.
 * Rejects opaque, redirected, and non-200 responses.
 */
function isResponseCacheable(response) {
  // Must be a successful response
  if (!response || response.status !== 200) return false;

  // Reject opaque responses (cross-origin no-cors) — cannot verify integrity
  if (response.type === 'opaque') return false;

  // Reject redirected responses — prevents cache poisoning via redirect chains
  if (response.redirected) return false;

  return true;
}

/**
 * Validates a Response for same-origin strict caching.
 * Enforces response.type === 'basic' (same-origin only).
 */
function isResponseStrictCacheable(response) {
  if (!isResponseCacheable(response)) return false;

  // For same-origin resources, response type must be 'basic'
  if (response.type !== 'basic' && response.type !== 'cors') return false;

  return true;
}


// ═══════════════════════════════════════════════════════════════════════════════
// INSTALL — LIGHTWEIGHT Tier 1 only
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // ─── Layer 1: Shell (HARD FAIL if missing) ──────────────────────
      const shellCache = await caches.open(CACHE_NAMES.shell);
      await shellCache.addAll(APP_SHELL_URLS);

      // Force immediate activation
      self.skipWaiting();

      log('INSTALL', `Tier 1 Shell Cached: ${APP_SHELL_URLS.length} assets`);
    })()
  );
});


// ═══════════════════════════════════════════════════════════════════════════════
// ACTIVATE — Clean old caches, claim clients, verify integrity
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('activate', (event) => {
  const currentCacheNames = Object.values(CACHE_NAMES);
  
  event.waitUntil(
    (async () => {
      // Purge ALL caches not matching current version — deterministic cleanup
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !currentCacheNames.includes(key))
          .map((key) => {
            log('PURGE', `Removing outdated cache: ${key}`);
            return caches.delete(key);
          })
      );

      // Immediately take control of all open tabs
      await self.clients.claim();

      log('ACTIVATE', `Active with ${currentCacheNames.length} cache layers (${CACHE_VERSION})`);
    })()
  );
});


// ═══════════════════════════════════════════════════════════════════════════════
// FETCH — Multi-strategy routing with security validation
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ─── SECURITY GATE 1: Only process GET requests ───────────────────
  if (request.method !== 'GET') return;

  // ─── SECURITY GATE 2: Skip non-HTTP protocols ────────────────────
  if (!url.protocol.startsWith('http')) return;

  // ─── Strategy 1: Navigation requests (HTML pages) ─────────────────────
  if (request.mode === 'navigate') {
    event.respondWith(navigationStrategy(request));
    return;
  }

  // ─── Strategy 2: Google Fonts (trusted external, long-lived cache) ────
  if (isTrustedExternalDomain(request.url)) {
    event.respondWith(fontStrategy(request));
    return;
  }

  // ─── SECURITY GATE 3: Block non-same-origin requests from caching ────
  if (!isSameOrigin(request.url)) {
    // Unknown external domain — pass through to network without caching
    return;
  }

  // ─── SECURITY GATE 4: Only cache whitelisted paths ───────────────────
  if (!isTrustedPath(request.url)) {
    // Unknown path — pass through to network without caching
    return;
  }

  // ─── Strategy 3: Data files (JSON, GeoJSON) ───────────────────────────
  if (/\.(json|geojson|csv)$/i.test(url.pathname)) {
    event.respondWith(dataStrategy(request));
    return;
  }

  // ─── Strategy 4: Image/media assets ───────────────────────────────────
  if (/\.(png|jpg|jpeg|svg|gif|webp|avif|ico)$/i.test(url.pathname)) {
    event.respondWith(assetStrategy(request));
    return;
  }

  // ─── Strategy 5: JS/CSS bundles (Next.js static) ──────────────────────
  if (/\.(js|css)$/i.test(url.pathname) || url.pathname.startsWith('/_next/')) {
    event.respondWith(shellStrategy(request));
    return;
  }

  // ─── SECURITY: No fallback for unrecognized file types ────────────────
  // Unknown same-origin asset types pass through to network without caching
});


// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY IMPLEMENTATIONS (WITH SECURITY VALIDATION)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Navigation Strategy: Cache-first with network fallback.
 * On first visit, caches the response after validation. 
 * Falls back to cached root `/` if specific route not cached.
 * 
 * SECURITY: Validates response before caching. Only caches same-origin navigations.
 */
async function navigationStrategy(request) {
  const cache = await caches.open(CACHE_NAMES.shell);
  
  // Try cache first
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) {
    // Background refresh (non-blocking) — with validation
    safeBackgroundUpdate(request, cache);
    return cached;
  }
  
  // Network with cache fallback
  try {
    const response = await fetch(request);
    if (isResponseStrictCacheable(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Ultimate fallback: serve the root page from cache (SPA-style)
    const fallback = await cache.match('/');
    if (fallback) return fallback;
    
    // Nuclear fallback: minimal offline page
    return createOfflineFallbackPage();
  }
}

/**
 * Shell Strategy: Cache-first for JS/CSS bundles.
 * Next.js hashed bundles are immutable — serve from cache immediately.
 * 
 * SECURITY: Validates response type + status before caching.
 */
async function shellStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (isResponseStrictCacheable(response)) {
      const cache = await caches.open(CACHE_NAMES.shell);
      cache.put(request, response.clone());
      // Enforce entry limit
      enforceCacheLimit(CACHE_NAMES.shell, MAX_ENTRIES.shell);
    }
    return response;
  } catch (err) {
    return new Response('', { status: 503 });
  }
}

/**
 * Data Strategy: Cache-first with context-aware offline fallbacks.
 * 
 * SECURITY: Validates response before caching. Returns structurally valid 
 * fallback data (not bare `{}`) so consuming code doesn't crash.
 */
async function dataStrategy(request) {
  const cache = await caches.open(CACHE_NAMES.data);
  const cached = await cache.match(request);
  
  if (cached) {
    // Stale-while-revalidate: serve cached, refresh in background with validation
    safeBackgroundUpdate(request, cache);
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (isResponseStrictCacheable(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Context-aware fallback: return valid structure based on file type
    const pathname = new URL(request.url).pathname;
    const fallbackBody = getDataFallback(pathname);
    
    return new Response(fallbackBody, {
      headers: { 'Content-Type': 'application/json' },
      status: 200, // 200 so .json() doesn't throw
    });
  }
}

/**
 * Returns structurally valid fallback data based on the file path.
 * Prevents crashes when the app calls .json() then accesses .features, .map(), etc.
 */
function getDataFallback(pathname) {
  // GeoJSON files → return valid empty FeatureCollection
  if (GEOJSON_PATHS.some(p => pathname.endsWith(p.split('/').pop()))) {
    return JSON.stringify({ type: 'FeatureCollection', features: [] });
  }
  
  // Array-based data files → return empty array
  if (ARRAY_DATA_PATHS.some(p => pathname.endsWith(p.split('/').pop()))) {
    return '[]';
  }
  
  // Border JSON files → return valid structure
  if (pathname.includes('borders')) {
    return JSON.stringify({ type: 'FeatureCollection', features: [] });
  }
  
  // Default: empty object
  return '{}';
}

/**
 * Asset Strategy: Cache-first for images/textures.
 * Images are immutable content — cache permanently.
 * 
 * SECURITY: Validates response integrity before caching.
 * Returns transparent 1x1 PNG for failed images (no broken icons).
 */
async function assetStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (isResponseStrictCacheable(response)) {
      const cache = await caches.open(CACHE_NAMES.assets);
      cache.put(request, response.clone());
      // Enforce entry limit (evict oldest)
      enforceCacheLimit(CACHE_NAMES.assets, MAX_ENTRIES.assets);
    }
    return response;
  } catch (err) {
    // Return transparent 1x1 PNG for failed images (prevents broken image icons)
    return new Response(
      Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='), c => c.charCodeAt(0)),
      { headers: { 'Content-Type': 'image/png' } }
    );
  }
}

/**
 * Font Strategy: Cache-first with very long expiry.
 * Google Fonts are immutable once loaded.
 * 
 * SECURITY: Only processes requests to TRUSTED_EXTERNAL_DOMAINS.
 * Validates response before caching (accepts 'cors' type for cross-origin).
 */
async function fontStrategy(request) {
  const cache = await caches.open(CACHE_NAMES.fonts);
  const cached = await cache.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (isResponseCacheable(response)) {
      const copy = response.clone();
      cache.put(request, copy);
      enforceCacheLimit(CACHE_NAMES.fonts, MAX_ENTRIES.fonts);
    }
    return response;
  } catch (err) {
    return new Response('', { status: 503 });
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECURITY: SAFE BACKGROUND UPDATE (replaces old fetchAndCache)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Non-blocking background fetch + cache update WITH validation.
 * Only caches responses that pass all security checks.
 */
function safeBackgroundUpdate(request, cache) {
  fetch(request)
    .then((response) => {
      if (isResponseStrictCacheable(response)) {
        cache.put(request, response.clone());
      }
    })
    .catch(() => {
      // Silent failure — we already have cached version
    });
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECURITY: OFFLINE FALLBACK PAGE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Creates a controlled, deterministic offline fallback page.
 * No external resources, no dynamic content, no injection surface.
 */
function createOfflineFallbackPage() {
  return new Response(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Akhand Bharat Darshan</title><style>body{background:#080706;color:#D6B96B;display:flex;align-items:center;justify-content:center;height:100vh;font-family:"Cinzel",serif;text-align:center;margin:0}h1{font-size:1.5rem;letter-spacing:0.15em;font-weight:400}p{color:rgba(214,185,107,0.5);font-size:0.85rem;margin-top:1rem;font-style:italic}</style></head><body><div><h1>Akhand Bharat Darshan</h1><p>Awaiting network to complete initial load...</p><p style="margin-top:2rem;font-size:0.7rem;opacity:0.3">Please connect to the internet and reload</p></div></body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// CACHE MANAGEMENT — Entry limits + storage awareness
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Enforces maximum entry count on a cache.
 * When exceeded, evicts the oldest entries (FIFO).
 */
async function enforceCacheLimit(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
      // Evict oldest entries (beginning of array = oldest)
      const excess = keys.length - maxEntries;
      for (let i = 0; i < excess; i++) {
        await cache.delete(keys[i]);
      }
      log('EVICT', `Evicted ${excess} entries from ${cacheName}`);
    }
  } catch (e) {
    // Non-critical — don't crash on eviction failure
  }
}

/**
 * Reports storage usage estimation (for diagnostics).
 */
async function getStorageEstimate() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
        percent: estimate.quota ? Math.round((estimate.usage / estimate.quota) * 100) : 0,
      };
    } catch (e) {
      return null;
    }
  }
  return null;
}


// ═══════════════════════════════════════════════════════════════════════════════
// STRUCTURED LOGGING — Lightweight tracing for diagnostics
// ═══════════════════════════════════════════════════════════════════════════════

function log(tag, message) {
  console.log(`[SW:${tag}] ${message}`);
}


// ═══════════════════════════════════════════════════════════════════════════════
// MESSAGE HANDLER — Background pre-cache + cache verification + diagnostics
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('message', (event) => {
  if (!event.data || !event.data.type) return;

  switch (event.data.type) {
    
    // ─── Background precaching with validation ────────────────────────
    case 'PRECACHE_ASSETS': {
      const urls = event.data.urls || [];
      if (urls.length === 0) return;

      (async () => {
        const assetCache = await caches.open(CACHE_NAMES.assets);
        const dataCache = await caches.open(CACHE_NAMES.data);
        let cached = 0;
        let failed = 0;

        for (const url of urls) {
          try {
            // SECURITY: Validate URL before precaching
            const fullUrl = new URL(url, self.location.origin).href;
            if (!isUrlCacheable(fullUrl)) {
              log('PRECACHE:REJECT', `Blocked untrusted URL: ${url}`);
              failed++;
              continue;
            }

            // Route to correct cache based on file type
            const isData = /\.(json|geojson)$/i.test(url);
            const targetCache = isData ? dataCache : assetCache;
            
            const existing = await targetCache.match(url);
            if (existing) {
              cached++;
              continue;
            }

            const response = await fetch(url, { priority: 'low' });
            
            // SECURITY: Validate response before caching
            if (isResponseStrictCacheable(response)) {
              await targetCache.put(url, response);
              cached++;
            } else {
              log('PRECACHE:REJECT', `Invalid response for: ${url} (status=${response.status}, type=${response.type})`);
              failed++;
            }
          } catch (e) {
            failed++;
          }
        }

        log('PRECACHE', `Complete: ${cached} cached, ${failed} failed of ${urls.length}`);
        
        // Report back to main thread
        const allClients = await self.clients.matchAll();
        allClients.forEach((client) => {
          client.postMessage({
            type: 'PRECACHE_COMPLETE',
            total: urls.length,
            cached,
            failed,
          });
        });
      })();
      break;
    }

    // ─── Cache integrity verification ─────────────────────────────────
    case 'VERIFY_CACHE': {
      (async () => {
        // Combine all data URLs for verification
        const dataUrls = [...CRITICAL_DATA_URLS, ...EXTENDED_DATA_URLS];
        
        const results = {
          shell: { total: APP_SHELL_URLS.length, cached: 0, missing: [] },
          data: { total: dataUrls.length, cached: 0, missing: [] },
          assets: { total: ASSET_URLS.length, cached: 0, missing: [] },
        };

        const shellCache = await caches.open(CACHE_NAMES.shell);
        for (const url of APP_SHELL_URLS) {
          if (await shellCache.match(url)) {
            results.shell.cached++;
          } else {
            results.shell.missing.push(url);
          }
        }

        const dataCache = await caches.open(CACHE_NAMES.data);
        for (const url of dataUrls) {
          if (await dataCache.match(url)) {
            results.data.cached++;
          } else {
            results.data.missing.push(url);
          }
        }

        const assetCache = await caches.open(CACHE_NAMES.assets);
        for (const url of ASSET_URLS) {
          if (await assetCache.match(url)) {
            results.assets.cached++;
          } else {
            results.assets.missing.push(url);
          }
        }

        const isComplete = 
          results.shell.missing.length === 0 &&
          results.data.missing.length === 0 &&
          results.assets.missing.length === 0;

        log('VERIFY', `Complete: ${isComplete} | Shell: ${results.shell.cached}/${results.shell.total}, Data: ${results.data.cached}/${results.data.total}, Assets: ${results.assets.cached}/${results.assets.total}`);

        if (event.source) {
          event.source.postMessage({
            type: 'CACHE_VERIFIED',
            isComplete,
            results,
          });
        }
      })();
      break;
    }

    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    // ─── Cache status report ──────────────────────────────────────────
    case 'GET_CACHE_STATUS': {
      (async () => {
        const status = await Promise.all(
          Object.entries(CACHE_NAMES).map(async ([key, name]) => {
            const cache = await caches.open(name);
            const keys = await cache.keys();
            return { layer: key, name, count: keys.length };
          })
        );

        const storage = await getStorageEstimate();

        if (event.source) {
          event.source.postMessage({ type: 'CACHE_STATUS', status, storage });
        }
      })();
      break;
    }
  }
});
