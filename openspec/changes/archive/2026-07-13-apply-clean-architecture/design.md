## Context

Le codebase frontend actuel (`src/`) est une structure plate : `App.tsx`, `pages/`, `components/`, `sw.ts`. Tout est au meme niveau, sans separation explicite entre logique metier, orchestration, adaptateurs d'infrastructure et composants UI. Le `config.yaml` impose desormais une Clean Architecture a quatre couches avec une regle de dependance stricte (inner layers never know about outer layers). Cette change aligne le code sur ce contrat avant que les prochaines changes (chat SSE, WASM, auth) ne viennent complexifier le graphe de dependances.

## Goals / Non-Goals

**Goals:**
- Reorganiser `src/` en quatre couches : `domain/`, `application/`, `infrastructure/`, `presentation/`.
- Deplacer le code existant dans les couches appropriees sans modifier le comportement.
- Introduire une entite `Member` minimale dans `domain/` comme exemple d'aggregate metier pur.
- Introduire un port `SessionPort` dans `application/` pour abstraire l'acces a la session (actuellement `sessionStorage`).
- Deplacer `sw.ts` sous `infrastructure/sw/` et les composants React sous `presentation/`.
- Garantir que tous les tests existants continuent de passer apres le refactor.

**Non-Goals:**
- Modifier le comportement fonctionnel existant.
- Implementer de nouveaux use-cases (chat, auth, WASM) — ce sont des changes separees.
- Ajouter des tests supplementaires au-dela de la correction des imports.
- Introduire un framework d'injection de dependances.

## Decisions

1. **Structure de repertoires calquee directement sur les 4 couches du config.yaml.**
   ```
   src/
     domain/          # entites pures, zero import externe
     application/     # ports (interfaces) + use-cases
     infrastructure/  # implementations concretes (sw, session)
     presentation/    # App.tsx, pages/, components/
   ```
   Rationale: reflete exactement le vocabulaire du config, facilite l'onboarding et les revues.
   Alternative consideree: dossier `core/` pour domain+application. Rejetee — cache la distinction essentielle.

2. **`SessionPort` comme interface dans `application/`, `SessionStorageAdapter` comme implementation dans `infrastructure/`.**
   Rationale: `PrivateRoute` depend actuellement de `sessionStorage` directement — violant la regle de dependance. Un port permet de substituer l'implementation (ex. cookie-based) sans toucher la presentation.
   Alternative consideree: laisser `PrivateRoute` lire `sessionStorage` directement. Rejetee — bloque les futures implementations d'auth.

3. **Entite `Member` minimale dans `domain/` — champ `id` et `email` seulement.**
   Rationale: pose l'aggregate de base pour le domaine membres sans sur-ingenierie.
   Pas d'alternative pertinente a ce stade.

4. **Mise a jour des chemins d'import dans les tests existants — aucun test supprime.**
   Rationale: les tests sont le filet de securite du refactor, ils doivent rester verts.

## Risks / Trade-offs

- [Imports cassés pendant la migration] → Mitigation: migrer couche par couche, lancer `npm test` entre chaque etape.
- [Oubli d'un fichier dans la couche presentation] → Mitigation: verifier que `src/` ne contient plus de fichiers `.tsx/.ts` a la racine apres migration (sauf `main.tsx` et `test-setup.ts`).
- [Vite ne trouve plus les modules] → Mitigation: verifier le build apres chaque deplacement.

## Migration Plan

1. Creer les repertoires `domain/`, `application/`, `infrastructure/`, `presentation/`.
2. Creer `domain/member.ts` (entite Member).
3. Creer `application/ports/session-port.ts` (interface SessionPort).
4. Creer `infrastructure/session/session-storage-adapter.ts` (implementation SessionPort).
5. Deplacer `sw.ts` → `infrastructure/sw/sw.ts`, mettre a jour `vite.config.ts`.
6. Deplacer `pages/` et `components/` → `presentation/pages/` et `presentation/components/`.
7. Deplacer `App.tsx` → `presentation/App.tsx`.
8. Mettre a jour `PrivateRoute` pour consommer `SessionPort` via l'adapter.
9. Mettre a jour tous les imports dans `main.tsx` et les tests.
10. `npm test && npm run build` — tout doit passer au vert.
