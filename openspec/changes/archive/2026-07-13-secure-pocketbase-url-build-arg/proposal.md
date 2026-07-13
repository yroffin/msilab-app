## Why

L'URL PocketBase est actuellement definie avec une valeur par defaut en dur, ce qui augmente le risque d'exposer une cible de production involontairement et rend le deploiement moins strict. Forcer la valeur via argument de build permet un controle explicite des environnements et reduit la surface d'erreur de configuration.

## What Changes

- Supprimer toute valeur par defaut hardcodee pour l'URL PocketBase dans le client frontend.
- Exiger une variable d'environnement build-time (`VITE_POCKETBASE_URL`) fournie explicitement.
- Faire echouer la construction/runtime initialisation si l'URL n'est pas fournie ou invalide.
- Mettre a jour la documentation build/deploiement pour exiger cet argument.
- Ajouter des tests de non-regression sur l'initialisation du client PocketBase sans fallback.

## Capabilities

### New Capabilities
- Aucun.

### Modified Capabilities
- `pocketbase-news-access`: La configuration du client PocketBase passe d'un modele "env avec fallback" a un modele "env obligatoire au build".

## Impact

- Zone impactee: zone publique (news) uniquement.
- Architecture: aucun ecart Clean Architecture (changement confine a l'infrastructure de configuration client).
- Module WASM: aucun impact.
- Pipeline de build/deploiement: obligation de fournir `VITE_POCKETBASE_URL`.
