## Why

The app needs a minimal PWA foundation so users can install it on their device and relaunch it like an app instead of a browser tab. This is the smallest useful step toward a dependable mobile and desktop experience, and it sets the baseline for later offline and app-shell work.

## What Changes

- Add the web app manifest and install metadata required for browser installation.
- Add or adjust the service worker setup so the app shell can be cached for repeat visits.
- Provide the minimum icon and launch configuration needed for install prompts to appear consistently.
- Ensure the public app surface remains usable as an installed PWA without exposing private data through shared caches.

## Capabilities

### New Capabilities
- `installable-pwa`: browser-installable app shell with manifest, icons, and service-worker-backed caching for the public experience.

### Modified Capabilities
- None.

## Impact

Frontend PWA configuration in the Vite app, web app manifest assets, service worker cache behavior, and icon/launch metadata. No backend API changes are expected.