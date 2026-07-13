## 1. Infrastructure CI (workflow GitHub Actions)

- [ ] 1.1 Mettre a jour `.github/workflows/deploy.yml` pour injecter `VITE_POCKETBASE_URL` au step `npm run build`.
- [ ] 1.2 Ajouter une verification explicite dans le workflow pour echouer avec message clair si `VITE_POCKETBASE_URL` est absente/vide.
- [ ] 1.3 Verifier que la valeur provient de `secrets` ou `vars` GitHub, sans URL hardcodee dans le repository.

## 2. Configuration de plateforme (GitHub)

- [ ] 2.1 Definir la source de verite de `VITE_POCKETBASE_URL` (secret ou variable) au niveau repository/environnement.
- [ ] 2.2 Documenter les permissions/restrictions d'acces a cette configuration pour les maintainers.

## 3. Documentation (presentation/infrastructure)

- [ ] 3.1 Mettre a jour `README.md` avec la configuration GitHub Actions requise pour le build CI.
- [ ] 3.2 Ajouter un exemple de mapping entre configuration locale (`.env`) et configuration CI (`secrets`/`vars`).

## 4. Validation (cross-couche)

- [ ] 4.1 Verifier qu'un build local reste possible avec `VITE_POCKETBASE_URL` defini.
- [ ] 4.2 Verifier qu'un run CI echoue explicitement sans `VITE_POCKETBASE_URL`.
- [ ] 4.3 Verifier qu'un run CI passe quand `VITE_POCKETBASE_URL` est configuree.
