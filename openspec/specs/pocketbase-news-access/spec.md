## Purpose

Definir les exigences d'acces lecture public a PocketBase pour la collection `news`, en respectant la Clean Architecture, l'utilisation d'un client singleton, et l'absence d'acces SDK direct depuis la presentation.

## Requirements

### Requirement: Public news are loaded through a PocketBase repository port
The system SHALL load public news through a domain repository port implemented by a PocketBase infrastructure repository bound to the `news` collection.

#### Scenario: Public news query uses domain port and infrastructure repository
- **GIVEN** the public news screen needs data
- **WHEN** the application requests news items
- **THEN** the request flows through a domain port, an application use-case, and a PocketBase repository implementation for the `news` collection

### Requirement: PocketBase client is a singleton configured by environment
The system SHALL instantiate the PocketBase client only once in `infrastructure/pocketbase/client.ts` and SHALL require its base URL from a build-time environment variable with no hardcoded default fallback.

#### Scenario: Build-time URL is required
- **GIVEN** no `VITE_POCKETBASE_URL` is provided at build/runtime initialization
- **WHEN** the PocketBase client module is initialized
- **THEN** initialization fails with an explicit configuration error

#### Scenario: Provided URL is used as-is
- **GIVEN** `VITE_POCKETBASE_URL` is provided
- **WHEN** the PocketBase client is created
- **THEN** it targets exactly the provided URL and does not fall back to any hardcoded default

#### Scenario: Invalid provided URL is rejected
- **GIVEN** `VITE_POCKETBASE_URL` is present but malformed
- **WHEN** the PocketBase client is initialized
- **THEN** initialization fails with an explicit invalid URL error

### Requirement: Public presentation code never accesses PocketBase directly
The system SHALL prevent hooks and presentation components from calling `pb.collection(...)` or any PocketBase SDK API directly.

#### Scenario: Public hook consumes a use-case only
- **GIVEN** a React hook loads news for the public page
- **WHEN** the hook fetches data
- **THEN** it calls an application use-case and never imports the PocketBase repository or SDK directly
