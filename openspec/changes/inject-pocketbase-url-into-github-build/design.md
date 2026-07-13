## Context

Le projet deploie la PWA via GitHub Pages avec le workflow `.github/workflows/deploy.yml`. Depuis la change precedente, le frontend exige `VITE_POCKETBASE_URL` sans fallback. Le build CI doit donc fournir explicitement cette variable, sinon le job echoue avant generation des artefacts statiques.

Elements concernes par couche:
- infrastructure (ops/ci): workflow GitHub Actions de build/deploiement
- presentation/infrastructure frontend: consommation existante de `VITE_POCKETBASE_URL` deja en place, sans changement fonctionnel cote UI
- domain/application: aucun changement

## Goals / Non-Goals

**Goals:**
- Injecter `VITE_POCKETBASE_URL` dans le job GitHub Actions qui execute `npm run build`.
- Forcer un echec explicite si la variable n'est pas configuree dans GitHub.
- Eviter toute URL hardcodee dans les fichiers de workflow et dans le repository.
- Documenter le prerequis de configuration GitHub (secret ou variable d'environnement).

**Non-Goals:**
- Modifier la logique metier des news ou le repository PocketBase.
- Modifier le comportement Service Worker public/prive.
- Ajouter des dependances Go/TinyGo ou toucher le module WASM (hors scope).

## Decisions

1. Utiliser une variable GitHub Actions (`secrets` ou `vars`) pour alimenter `VITE_POCKETBASE_URL` au step de build.
Rationale: valeur sensible et environnements differents selon deploiement.
Alternative: hardcoder l'URL dans le workflow. Rejetee pour raisons de securite et de maintenabilite.

2. Ajouter une verification explicite en amont du build dans le workflow.
Rationale: message d'erreur CI clair et rapide avant compilation.
Alternative: laisser le build echouer implicitement. Rejetee car retour moins explicite pour l'operateur.

3. Garder la responsabilite dans la couche infrastructure CI uniquement, sans modifier domain/application.
Rationale: changement de pipeline, pas de comportement metier.

## Risks / Trade-offs

- [Secret/variable absent dans GitHub] -> Mitigation: etape de validation explicite + documentation de setup.
- [Mauvaise URL configuree] -> Mitigation: validation URL deja presente cote frontend + erreur build explicite.
- [Divergence local vs CI] -> Mitigation: utiliser le meme nom de variable (`VITE_POCKETBASE_URL`) partout.

## Migration Plan

1. Mettre a jour `.github/workflows/deploy.yml` pour injecter `VITE_POCKETBASE_URL` au build.
2. Ajouter un step de validation qui echoue si la variable est vide/absente.
3. Mettre a jour la documentation pour indiquer la configuration GitHub requise.
4. Verifier l'execution du workflow sur une branche de test.

## Open Questions

- Faut-il stocker la valeur dans `secrets` (prive) ou `vars` (non masque) selon la politique du repository ?
- Faut-il supporter une URL differente par environnement GitHub (preview/staging/prod) des maintenant ?
