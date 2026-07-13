## 1. Domain (couche domain)

- [x] 1.1 Ajouter un type/entite `News` representant les champs `id`, `title`, `created`, `updated` conformes au data model.
- [x] 1.2 Ajouter `src/domain/ports/news-repository-port.ts` definissant le contrat de lecture des news publiques.

## 2. Application (couche application)

- [x] 2.1 Ajouter un use-case de lecture des news publiques s'appuyant uniquement sur `NewsRepositoryPort`.
- [x] 2.2 Ajouter les types de resultat/erreur applicatifs necessaires pour la lecture des news sans exposer PocketBase a la presentation.

## 3. Infrastructure (couche infrastructure)

- [x] 3.1 Installer/configurer le SDK PocketBase cote frontend.
- [x] 3.2 Ajouter `src/infrastructure/pocketbase/client.ts` comme singleton avec URL issue d'une variable d'environnement et valeur par defaut `https://foo.bar`.
- [x] 3.3 Ajouter `src/infrastructure/pocketbase/news-repository.ts` implementant `NewsRepositoryPort` et mappant la collection `news`.
- [x] 3.4 Verifier qu'aucun appel `pb.collection(...)` n'existe hors `src/infrastructure/pocketbase/`.
- [x] 3.5 Verifier la configuration Service Worker/cache runtime pour traiter les endpoints PocketBase publics de news comme flux publics cacheables et exclure tout endpoint authentifie.

## 4. Presentation (couche presentation)

- [x] 4.1 Ajouter un hook React dedie aux news publiques consommant uniquement le use-case applicatif.
- [x] 4.2 Mettre a jour la page publique pour afficher la liste des news PocketBase avec etats chargement/erreur/empty.
- [x] 4.3 Verifier que la charte monochrome est preservee pour les news publiques et que la distinction public/offline reste explicite.

## 5. Validation (couche presentation + infrastructure)

- [x] 5.1 Ajouter/adapter les tests unitaires des hooks/use-cases/repository pour la lecture des news.
- [x] 5.2 Ajouter/adapter les tests de non-regression offline pour les news publiques apres premier chargement.
- [x] 5.3 Verifier que les tests existants passent.
- [x] 5.4 Verifier que le build Vite/PWA passe avec l'integration PocketBase.
