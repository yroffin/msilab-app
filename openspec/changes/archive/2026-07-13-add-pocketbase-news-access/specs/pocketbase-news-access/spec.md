## ADDED Requirements

### Requirement: Public news are loaded through a PocketBase repository port
The system SHALL load public news through a domain repository port implemented by a PocketBase infrastructure repository bound to the `news` collection.

#### Scenario: Public news query uses domain port and infrastructure repository
- **GIVEN** the public news screen needs data
- **WHEN** the application requests news items
- **THEN** the request flows through a domain port, an application use-case, and a PocketBase repository implementation for the `news` collection

### Requirement: PocketBase client is a singleton configured by environment
The system SHALL instantiate the PocketBase client only once in `infrastructure/pocketbase/client.ts` and SHALL configure its base URL from an environment variable with the production default `https://foo.bar`.

#### Scenario: Default PocketBase URL is used in production configuration
- **GIVEN** no custom environment override is defined
- **WHEN** the PocketBase client is created
- **THEN** it targets `https://foo.bar`

### Requirement: Public presentation code never accesses PocketBase directly
The system SHALL prevent hooks and presentation components from calling `pb.collection(...)` or any PocketBase SDK API directly.

#### Scenario: Public hook consumes a use-case only
- **GIVEN** a React hook loads news for the public page
- **WHEN** the hook fetches data
- **THEN** it calls an application use-case and never imports the PocketBase repository or SDK directly
