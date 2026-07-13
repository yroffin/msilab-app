## Why

Le projet dispose d'une base PWA minimale, sans encore de separation claire entre zone publique hors-ligne et zone membres, ni de politique de cache Service Worker formalisee. Cette change pose ce socle frontend.

## What Changes

- Definir une zone publique offline-first avec contenu de presentation/news et une politique de cache Service Worker stricte.
- Etablir la structure de routes separant zone publique et zone membres dans le frontend React.
- Encadrer les limites de securite/cache: aucun token de session dans le cache partage, exclusion explicite des endpoints prives.
- Reporter le backend Go, le chat interne (SSE/POST), l'authentification federée (OIDC/OAuth2) a des changes ulterieures.

## Capabilities

### New Capabilities
- `public-offline-content`: Experience publique non authentifiee disponible hors-ligne apres premier chargement.
- `service-worker-boundaries`: Regles explicites de cache pour separer contenu public et donnees membres/sensibles.

### Modified Capabilities
- Aucun (pas de capability existante dans openspec/specs/).

## Impact

- Frontend: migration vers React 18+ sur Vite, structure de routes publique/membres, points d'extension pour auth et chat futurs.
- Service Worker: strategie de cache differenciee, exclusion stricte des chemins membres et contenus prives.
- Qualite: tests de non-regression offline et de politique de cache.
