/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

/**
 * Paths that must NEVER be stored in the shared SW cache.
 * Includes current private API prefixes and the members navigation prefix so
 * future auth/chat endpoints added under these paths are protected by default.
 * Session tokens must never appear in cached responses.
 */
export const PRIVATE_PATHS = [
  '/api/private/',
  '/api/chat/',
  '/api/auth/',
  '/api/sse/',
  '/auth/',
  '/members/'
];

/**
 * Public paths explicitly allowed for offline caching.
 * Anything not in this list and not matched by the asset rules below falls
 * through to the private / network-only handler.
 */
export const PUBLIC_PATHS = ['/', '/index.html'];

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request, url }) => request.mode === 'navigate' && url.origin === self.location.origin,
  createHandlerBoundToURL('/index.html')
);

registerRoute(
  ({ request, url }) => {
    if (request.method !== 'GET') {
      return false;
    }

    if (request.headers.has('authorization')) {
      return true;
    }

    return PRIVATE_PATHS.some((path) => url.pathname.startsWith(path));
  },
  // no-store: never write private/member responses to any cache
  new NetworkOnly()
);

registerRoute(
  ({ request, url }) => request.method === 'GET' && url.origin === self.location.origin,
  new StaleWhileRevalidate({
    cacheName: 'public-static'
  })
);

registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    cacheName: 'public-assets'
  })
);
