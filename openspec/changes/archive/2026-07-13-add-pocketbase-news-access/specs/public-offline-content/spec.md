## MODIFIED Requirements

### Requirement: Public content remains available offline
The system SHALL provide the public association pages and project news in offline mode after a successful first load, including PocketBase-backed news data once it has been retrieved successfully.

#### Scenario: Public content is served from cache
- **WHEN** a user has previously loaded the public area and then loses network connectivity
- **THEN** the application serves the public pages from Service Worker cache without requiring authentication

#### Scenario: Previously loaded PocketBase news remain visible offline
- **GIVEN** public news were successfully loaded from the public PocketBase `news` collection while online
- **WHEN** the user later opens the public area without network connectivity
- **THEN** the application shows the last successfully loaded public news without requiring authentication

### Requirement: Public cache updates are eventually refreshed
The system SHALL refresh cached public content when network is available and a newer version is detected, including newer public PocketBase news entries.

#### Scenario: Stale public content gets updated
- **WHEN** the user returns online and opens a public page with newer published content
- **THEN** the Service Worker updates cached assets/content and serves the refreshed version on subsequent navigation

#### Scenario: New PocketBase news refresh public content
- **GIVEN** newer public records exist in the PocketBase `news` collection
- **WHEN** the user returns online and the public page refreshes its news source
- **THEN** the application updates the displayed news and keeps the refreshed result available for later offline viewing
