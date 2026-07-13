## MODIFIED Requirements

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
