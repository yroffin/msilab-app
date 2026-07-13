## MODIFIED Requirements

### Requirement: Authenticated endpoints are excluded from shared cache
The system SHALL prevent Service Worker cache storage of authenticated API responses, session tokens, private member content, and authenticated PocketBase endpoints.

#### Scenario: Private API response bypasses cache
- **WHEN** a request targets an authenticated member API endpoint
- **THEN** the Service Worker forwards the request without writing response data to shared cache storage

#### Scenario: Authenticated PocketBase endpoint bypasses cache
- **GIVEN** a PocketBase request carries authentication or targets a protected endpoint
- **WHEN** the Service Worker evaluates the request
- **THEN** it bypasses shared cache storage and forwards the request directly to the network

### Requirement: Public and private cache policies are explicitly partitioned
The system SHALL apply explicit route-level cache policies that allow offline caching only for designated public resources, including public PocketBase `news` reads, while keeping private/member routes no-store.

#### Scenario: Public route cache allowed, private route blocked
- **WHEN** the Service Worker evaluates a fetch request
- **THEN** it applies public caching rules only to whitelisted public routes and applies no-store behavior to private/member routes

#### Scenario: Public PocketBase news endpoint uses public cache strategy
- **GIVEN** the application requests public news from PocketBase without authentication
- **WHEN** the Service Worker evaluates the request
- **THEN** it applies a public runtime cache strategy such as `StaleWhileRevalidate` or `NetworkFirst` and never treats the endpoint as a private route
