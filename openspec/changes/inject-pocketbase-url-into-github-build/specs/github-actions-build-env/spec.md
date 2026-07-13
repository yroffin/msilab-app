## ADDED Requirements

### Requirement: GitHub build job injects required frontend environment variables
The system SHALL provide required frontend build environment variables in GitHub Actions before executing the production build, including `VITE_POCKETBASE_URL`.

#### Scenario: Build job exports VITE_POCKETBASE_URL before build
- **WHEN** the GitHub Actions build job starts the frontend build step
- **THEN** `VITE_POCKETBASE_URL` is defined in the job/step environment and available to `npm run build`

### Requirement: GitHub build fails explicitly when required variable is missing
The system SHALL fail the CI build with an explicit error when `VITE_POCKETBASE_URL` is not configured in repository/environment settings.

#### Scenario: Missing VITE_POCKETBASE_URL stops pipeline
- **WHEN** the build workflow runs without `VITE_POCKETBASE_URL`
- **THEN** the pipeline fails before or during build with a clear configuration error message
