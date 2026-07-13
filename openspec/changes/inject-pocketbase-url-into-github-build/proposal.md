## Why

Le build frontend exige maintenant `VITE_POCKETBASE_URL` sans fallback local. Le workflow GitHub Actions de deploiement doit donc injecter explicitement cette variable pour garantir des builds reproductibles et eviter tout echec en CI/CD.

## What Changes

- Mettre a jour le workflow GitHub Actions de build/deploiement pour fournir `VITE_POCKETBASE_URL` au moment de `npm run build`.
- Definir la source de cette valeur via `secrets` ou `vars` GitHub Actions, sans hardcoder une URL dans le repository.
- Faire echouer explicitement le job CI si la variable est absente.
- Documenter la configuration requise cote repository GitHub (secret/variable) pour l'environnement de deploiement.

## Capabilities

### New Capabilities
- `github-actions-build-env`: Le pipeline GitHub Actions fournit les variables d'environnement de build requises pour le frontend, dont `VITE_POCKETBASE_URL`.

### Modified Capabilities
- `pocketbase-news-access`: L'exigence d'URL obligatoire est etendue a la chaine CI/CD pour garantir que les builds de deploiement injectent `VITE_POCKETBASE_URL`.

## Impact

- Workflow impacte: `.github/workflows/deploy.yml` (job `build`).
- Configuration GitHub impactee: `secrets` et/ou `vars` du repository/environnement.
- Documentation impactee: README ou documentation de deploiement CI.
- Aucun impact backend Go ou WASM (desactives dans le scope actuel).
