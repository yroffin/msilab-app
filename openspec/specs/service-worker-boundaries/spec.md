## Purpose

Définir les règles de partitionnement de cache du Service Worker : le contenu public statique peut être mis en cache offline, les endpoints membres/authentifiés et les données de session ne doivent jamais transiter par le cache partagé.

## Requirements

### Requirement: Authenticated endpoints are excluded from shared cache
The system SHALL prevent Service Worker cache storage of authenticated API responses, session tokens, and private member content.

#### Scenario: Private API response bypasses cache
- **WHEN** a request targets an authenticated member API endpoint
- **THEN** the Service Worker forwards the request without writing response data to shared cache storage

### Requirement: Public and private cache policies are explicitly partitioned
The system SHALL apply explicit route-level cache policies that allow offline caching only for designated public resources.

#### Scenario: Public route cache allowed, private route blocked
- **WHEN** the Service Worker evaluates a fetch request
- **THEN** it applies public caching rules only to whitelisted public routes and applies no-store behavior to private/member routes
