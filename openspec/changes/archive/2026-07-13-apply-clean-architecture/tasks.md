## 1. Creer l'arborescence de couches

- [x] 1.1 Creer les repertoires `src/domain/`, `src/application/ports/`, `src/infrastructure/session/`, `src/infrastructure/sw/`, `src/presentation/pages/`, `src/presentation/components/`.

## 2. Couche Domain

- [x] 2.1 Creer `src/domain/member.ts` avec l'entite `Member` (champs `id: string`, `email: string`) — zero import externe.

## 3. Couche Application

- [x] 3.1 Creer `src/application/ports/session-port.ts` definissant l'interface `SessionPort` (`hasSession(): boolean`).

## 4. Couche Infrastructure

- [x] 4.1 Creer `src/infrastructure/session/session-storage-adapter.ts` implementant `SessionPort` via `sessionStorage`.
- [x] 4.2 Deplacer `src/sw.ts` → `src/infrastructure/sw/sw.ts` et mettre a jour `vite.config.ts` (`srcDir`, `filename`).

## 5. Couche Presentation

- [x] 5.1 Deplacer `src/pages/PublicPage.tsx` → `src/presentation/pages/PublicPage.tsx`.
- [x] 5.2 Deplacer `src/pages/MembersPage.tsx` → `src/presentation/pages/MembersPage.tsx`.
- [x] 5.3 Deplacer `src/components/PrivateRoute.tsx` → `src/presentation/components/PrivateRoute.tsx` et le faire consommer `SessionPort` via `SessionStorageAdapter`.
- [x] 5.4 Deplacer `src/App.tsx` → `src/presentation/App.tsx` et mettre a jour les imports.
- [x] 5.5 Mettre a jour `src/main.tsx` pour importer depuis `src/presentation/App`.

## 6. Tests et imports

- [x] 6.1 Mettre a jour les imports dans `src/__tests__/offline.test.tsx` vers les nouveaux chemins.
- [x] 6.2 Mettre a jour les imports dans `src/__tests__/sw-cache-policy.test.ts` vers le nouveau chemin du SW.
- [x] 6.3 Lancer `npm test` — tous les tests doivent passer.
- [x] 6.4 Lancer `npm run build` — le build PWA doit reussir sans erreur.
