## ADDED Requirements

### Requirement: Source code is organized in four explicit layers
The codebase SHALL be organized into `domain/`, `application/`, `infrastructure/`, and `presentation/` directories under `src/`, each containing only code appropriate to that layer.

#### Scenario: Domain layer has no external imports
- **WHEN** any file under `src/domain/` is inspected
- **THEN** it imports only from other `src/domain/` files or TypeScript built-ins — never from `application/`, `infrastructure/`, `presentation/`, or any npm package

#### Scenario: Application layer depends only on domain
- **WHEN** any file under `src/application/` is inspected
- **THEN** it imports only from `src/domain/` or other `src/application/` files, and never from `src/infrastructure/` or `src/presentation/`

#### Scenario: Presentation layer never imports from infrastructure directly
- **WHEN** any file under `src/presentation/` is inspected
- **THEN** it imports from `src/application/` or `src/domain/`, never directly from `src/infrastructure/`

### Requirement: Session access is abstracted behind a port
The system SHALL define a `SessionPort` interface in `application/` and provide a `SessionStorageAdapter` implementation in `infrastructure/`, so that presentation components never access `sessionStorage` directly.

#### Scenario: PrivateRoute uses the port interface
- **WHEN** `PrivateRoute` checks session validity
- **THEN** it calls a function typed against `SessionPort`, not `sessionStorage` directly

#### Scenario: Adapter can be swapped without touching presentation
- **WHEN** the session implementation changes (e.g., cookie-based)
- **THEN** only the `infrastructure/` adapter needs to be replaced; `presentation/` code is unchanged

### Requirement: Existing tests remain green after the refactor
The system SHALL maintain all previously passing tests after the layer reorganization.

#### Scenario: Test suite passes after migration
- **WHEN** `npm test` is run after completing the layer reorganization
- **THEN** all tests pass with no failures

### Requirement: Build output is unchanged after the refactor
The system SHALL produce a valid Vite PWA build after the layer reorganization.

#### Scenario: Build succeeds with no errors
- **WHEN** `npm run build` is run after completing the layer reorganization
- **THEN** the build completes successfully and produces the same PWA output
