## 1. PWA foundation

- [x] 1.1 Add the web app manifest and minimal icon assets required for installation.
- [x] 1.2 Configure the Vite PWA plugin and service worker for the public app shell.
- [x] 1.3 Register the service worker from the frontend entry point.

## 2. Cache safety

- [x] 2.1 Define the cache strategy so only public shell assets are precached.
- [x] 2.2 Ensure authenticated requests and private real-time traffic are excluded from the shared cache.

## 3. Verification

- [x] 3.1 Verify the app is installable in a supported browser on a secure origin.
- [x] 3.2 Verify the installed app relaunches offline after an initial successful load.
- [x] 3.3 Verify private requests and streams do not appear in service worker cache storage.