## Why

Le codebase actuel (`src/`) est une structure plate (pages, components, sw) sans separation entre logique metier, orchestration et UI. Appliquer la Clean Architecture maintenant, avant d'ajouter le backend Go et le chat, evite d'avoir a refactorer sous contrainte fonctionnelle : les couches domain/application/infrastructure/presentation sont posees une fois, proprement, et toutes les prochaines changes (auth, chat SSE, WASM) s'inserent dans ce cadre.

## What Changes

- **BREAKING** — Reorganiser `src/` en quatre couches : `domain/`, `application/`, `infrastructure/`, `presentation/`.
- Deplacer les composants React existants (`App.tsx`, pages, `PrivateRoute`) sous `presentation/`.
- Deplacer `sw.ts` (infrastructure Service Worker) sous `infrastructure/sw/`.
- Introduire des interfaces (ports) dans `application/` pour les acces futurs aux donnees (session, cache).
- Introduire une entite `Member` minimale dans `domain/` comme premier aggregate metier.
- S'assurer que la regle de dependance est appliquee : aucune couche interne n'importe une couche externe.

## Capabilities

### New Capabilities
- `clean-architecture-structure`: Structure de repertoires et regles de dependance imposant la Clean Architecture au frontend.

### Modified Capabilities
- Aucune (les exigences fonctionnelles de `public-offline-content` et `service-worker-boundaries` ne changent pas — seule l'organisation interne du code change).

## Impact

- `src/` entier reorganise — les imports existants cassent et doivent etre mis a jour.
- Aucun changement de comportement observable : les tests existants doivent continuer a passer.
- Aucune dependance npm nouvelle requise.
- Les prochaines changes (auth, chat, WASM) devront respecter le placement par couche.
