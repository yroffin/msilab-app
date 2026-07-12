## Context

The change introduces the smallest useful PWA baseline for the public side of the app. The repository is still in a planning state, so the design should stay implementation-oriented enough to guide the first frontend pass without overcommitting to unrelated offline or auth work.

## Goals / Non-Goals

**Goals:**
- Make the public app shell installable in supported browsers.
- Cache the public shell so the installed app can reopen offline after an initial visit.
- Keep authenticated content and private real-time traffic out of the shared service worker cache.

**Non-Goals:**
- Authenticated session handling.
- Chat transport, SSE protocol design, or Matrix integration.
- STL analysis or WASM work.
- Full offline data synchronization for dynamic content.

## Decisions

- Use `vite-plugin-pwa` as the PWA integration layer rather than a custom service worker build. The repo already targets Vite, so this keeps the installable baseline aligned with the existing frontend stack and minimizes bespoke runtime code.
- Limit the initial cache scope to the public app shell and static assets needed for first render. That gives installability and reliable relaunch behavior without creating a broad offline cache surface that could accidentally capture private responses.
- Treat authenticated requests and private streams as explicit cache exclusions. This is safer than trying to infer privacy from URL patterns alone, and it matches the repository constraint that session data must never enter shared cache storage.
- Ship a minimal manifest and icon set now, then expand later if the product needs shortcuts, screenshots, or richer display modes. The install prompt only needs the basics, so delaying extras avoids unnecessary asset churn.

## Risks / Trade-offs

- A narrow precache strategy may leave some public routes unavailable offline until they are explicitly added. Mitigation: start with the shell and expand only after confirming cache behavior.
- Browser-specific install heuristics can make installability look inconsistent during development. Mitigation: verify on a supported secure origin and test in at least one Chromium-based browser.
- Service worker updates can cause stale assets if cache versioning is weak. Mitigation: rely on plugin-managed revisioning and verify update flow before broadening scope.

## Migration Plan

1. Add the manifest, icons, and PWA plugin configuration.
2. Register the service worker from the frontend entry point.
3. Verify that public routes load from cache after the first visit.
4. Verify that authenticated requests and private streams bypass cache storage.
5. If installability or cache behavior regresses, disable the PWA registration and remove the manifest link as a rollback path.

## Open Questions

- Which icon sizes and source artwork should be used for the initial installable package?
- Should the first release include an offline fallback page, or only the cached shell?
- Do we want update prompts exposed to users immediately, or keep update handling automatic for the first pass?
