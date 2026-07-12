## ADDED Requirements

### Requirement: Installable public app shell
The system MUST provide the metadata and manifest fields required for supported browsers to install the public app shell as a PWA.

#### Scenario: Browser can offer installation
- **WHEN** a supported browser loads the public app shell over a secure origin
- **THEN** the browser can detect the app as installable and offer installation to the user

### Requirement: Public shell cache is offline-capable
The system MUST cache the public app shell assets so the installed app can relaunch and render the public experience without a network connection after an initial successful load.

#### Scenario: Installed app relaunches offline
- **WHEN** the user launches the installed app without network connectivity
- **THEN** the public shell loads from the local cache and shows the public experience

### Requirement: Private data is excluded from shared cache
The system MUST prevent authenticated responses and real-time private streams from being stored in the service worker cache.

#### Scenario: Authenticated request bypasses cache
- **WHEN** the app requests authenticated content or a private real-time stream
- **THEN** the request is not written to the shared cache and is handled outside the public precache strategy
