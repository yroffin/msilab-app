## Purpose

Definir le modele de donnees PocketBase minimal utilise par le projet, en particulier la collection publique `news` et ses regles d'acces en lecture.

## Requirements

### Requirement: News collection schema is defined in PocketBase
The system SHALL store public news in a PocketBase collection named `news` with the required fields `id`, `title`, `created`, and `updated`.

#### Scenario: News collection fields and types are present
- **GIVEN** the PocketBase collection `news`
- **WHEN** its schema is inspected
- **THEN** it contains `id` as an auto-generated string primary key, `title` as a required text field, `created` as an auto-generated datetime field, and `updated` as an auto-generated datetime field

### Requirement: News collection is publicly readable
The system SHALL allow public read access to the PocketBase collection `news`.

#### Scenario: Public user can list news
- **GIVEN** an authenticated or unauthenticated user
- **WHEN** the user reads the `news` collection
- **THEN** the user can list and read public news records
