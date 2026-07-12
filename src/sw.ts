/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

const PRIVATE_PATHS = ['/api/private/', '/api/chat/', '/api/auth/', '/auth/'];

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
