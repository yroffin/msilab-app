## ADDED Requirements

### Requirement: Public content remains available offline
The system SHALL provide the public association pages and project news in offline mode after a successful first load.

#### Scenario: Public content is served from cache
- **WHEN** a user has previously loaded the public area and then loses network connectivity
- **THEN** the application serves the public pages from Service Worker cache without requiring authentication

### Requirement: Public cache updates are eventually refreshed
The system SHALL refresh cached public content when network is available and a newer version is detected.

#### Scenario: Stale public content gets updated
- **WHEN** the user returns online and opens a public page with newer published content
- **THEN** the Service Worker updates cached assets/content and serves the refreshed version on subsequent navigation
