## 1. Infrastructure (couche infrastructure)

- [x] 1.1 Retirer la valeur par defaut hardcodee de `src/infrastructure/pocketbase/client.ts`.
- [x] 1.2 Exiger `VITE_POCKETBASE_URL` et lever une erreur explicite si la variable est absente ou vide.
- [x] 1.3 Valider le format de l'URL fournie (ex: constructeur `URL`) et lever une erreur explicite si invalide.
- [x] 1.4 Conserver le client PocketBase en singleton dans `infrastructure/pocketbase/client.ts`.

## 2. Domain/Application (couches domain + application)

- [x] 2.1 Verifier qu'aucun changement n'est necessaire sur les ports/use-cases (pas de fuite de details d'infrastructure).
- [x] 2.2 Verifier que les use-cases continuent de consommer uniquement les ports existants.

## 3. Presentation (couche presentation)

- [x] 3.1 Verifier que les hooks/composants ne changent pas de contrat et ne dependent pas directement du SDK PocketBase.
- [x] 3.2 Verifier que le comportement UI en cas de config manquante reste explicite (etat d'erreur coherent).

## 4. Build & Config

- [x] 4.1 Mettre a jour `src/vite-env.d.ts` et/ou typage pour rendre `VITE_POCKETBASE_URL` mandatory dans le flux de build.
- [x] 4.2 Mettre a jour la documentation de build/deploiement (README ou equivalent) pour exiger `VITE_POCKETBASE_URL`.
- [x] 4.3 Ajouter ou mettre a jour un exemple d'environnement (`.env.example` ou equivalent) avec `VITE_POCKETBASE_URL` sans valeur de prod hardcodee.

## 5. Validation (cross-couche)

- [x] 5.1 Ajouter/adapter tests unitaires du client PocketBase: variable presente, absente, invalide.
- [x] 5.2 Verifier que les tests existants passent apres suppression du fallback.
- [x] 5.3 Verifier que le build passe quand `VITE_POCKETBASE_URL` est fourni.
- [x] 5.4 Verifier que le build echoue explicitement quand `VITE_POCKETBASE_URL` n'est pas fourni.
