## Context

Le frontend dispose deja d'une structure Clean Architecture, d'une zone publique offline et d'un Service Worker qui separe les flux publics et prives. Les news publiques sont encore statiques. PocketBase est designe comme backend de donnees, avec un modele `news` deja documente dans la spec `data-model`. Cette change introduit le premier acces de donnees reel, limite a la lecture publique des news.

Chaque nouvel element doit etre place dans la bonne couche:
- `domain/ports/`: interface de repository pour les news
- `application/`: use-case de lecture des news
- `infrastructure/pocketbase/`: client singleton PocketBase + repository `news`
- `presentation/hooks/` et `presentation/pages/`: hook React et rendu UI

## Goals / Non-Goals

**Goals:**
- Introduire un acces lecture seul a la collection PocketBase `news`.
- Respecter strictement la Clean Architecture via un port de domaine et un repository infrastructure dedie.
- Configurer le client PocketBase par variable d'environnement avec valeur par defaut `https://foo.bar`.
- Garder les news publiques compatibles avec le comportement offline/public cache existant.
- Verifier que les endpoints PocketBase publics restent dans des strategies de cache public et que rien n'ouvre la voie a un cache prive.

**Non-Goals:**
- Implementer l'authentification PocketBase.
- Implementer l'ecriture/edition/suppression des news.
- Introduire des flux prives, membres, ou SSE via PocketBase.
- Modifier backend Go, module WASM, ou les flux membres.

## Decisions

1. Le port `ContentsRepositoryPort` vit dans `src/domain/ports/`.
Rationale: conforme a la contrainte config, le domaine declare le contrat et ignore l'implementation.
Alternative: placer le port dans `application/ports/`. Rejetee car le config impose `domain/ports/` pour PocketBase.

2. Un repository infrastructure unique `PocketBaseNewsRepository` mappe 1:1 la collection `news`.
Rationale: "un repository = une collection PocketBase"; le mapping de donnees reste centralise.

3. Le client PocketBase est un singleton `src/infrastructure/pocketbase/client.ts`.
Rationale: evite les instanciations multiples et respecte la regle config.

4. La presentation consomme un use-case et un hook, jamais le repository ni le SDK PocketBase directement.
Rationale: garde les dependances orientees vers l'interieur.

5. Les endpoints PocketBase publics `news` sont traites comme flux publics cacheables; aucune strategie runtime ne doit viser des endpoints PocketBase authentifies.
Rationale: respecte la separation public/prive et les regles SW existantes.

## Risks / Trade-offs

- [Latence ou indisponibilite PocketBase] -> Mitigation: conserver l'affichage offline apres premier chargement et prevoir etat degrade cote UI.
- [Fuite d'appel SDK hors infrastructure] -> Mitigation: revue d'imports et tests ciblant les chemins d'acces.
- [Mauvaise strategie de cache sur endpoints PocketBase] -> Mitigation: audit SW et tests de non-regression sur routes publiques/privees.
- [Ecart entre schema PocketBase reel et spec data-model] -> Mitigation: mapper explicitement `id`, `title`, `created`, `updated` et echouer bruyamment en cas de donnees invalides.

## Migration Plan

1. Ajouter les types/metadonnees de news et le port de repository dans `domain/ports/`.
2. Ajouter le client PocketBase singleton et le repository `news` en infrastructure.
3. Ajouter le use-case de lecture des news en application.
4. Ajouter un hook presentation consommant le use-case.
5. Mettre a jour la page publique pour afficher les news PocketBase.
6. Verifier la configuration SW et les variables d'environnement.
7. Ajouter/adapter les tests, puis valider build et offline.

## Open Questions

- Faut-il prevoir des champs supplementaires de news (contenu, slug) ou rester strictement sur le modele minimal actuel?
- Quelle politique exacte de cache runtime choisir pour les endpoints publics PocketBase `news`: `StaleWhileRevalidate` ou `NetworkFirst`?
