## Context

La base actuelle couvre surtout une PWA minimale installable, sans separation formalisee entre contenu public offline et zone membres. Cette change pose les fondations frontend : structure de routes, politique Service Worker, et points d'extension pour les prochaines changes (backend Go, auth, chat).

Les contraintes de securite/cache sont structurantes meme sans backend actif:
- aucune fuite de token/session vers le cache partage du Service Worker
- les routes membres doivent etre declarees non-cacheables des maintenant pour eviter des regressions futures

## Goals / Non-Goals

**Goals:**
- Definir une separation d'architecture claire entre contenu public cacheable et contenu prive non-cacheable.
- Poser les fondations de routage frontend (zones publique/membres) pour les prochaines evolutions.
- Poser des exigences testables pour migration frontend vers React 18+ sous Vite.

**Non-Goals:**
- Implementer le backend Go (chat SSE/POST, auth) dans cette change.
- Integrer Matrix ou tout service externe de messagerie.
- Ajouter un module STL/WASM.
- Traiter l'authentification federée (OIDC/OAuth2).
- Concevoir une UX detaillee ecran par ecran.

## Decisions

1. Separation stricte des zones publique/membres au niveau routes et strategie de cache Service Worker.
- Rationale: limite les risques de fuite de donnees authentifiees et simplifie l'audit securite; anticiper cette separation maintenant evite des regressions quand le backend arrivera.
- Alternative consideree: cache unifie avec invalidation fine. Rejetee car plus fragile et difficile a verifier.

2. Service Worker avec listes explicites: autoriser cache public statique, bloquer par defaut les routes membres et tous les futurs endpoints prives.
- Rationale: defense en profondeur; la whitelist rend la politique auditable et resistante aux ajouts de routes futurs.
- Alternative consideree: exclusion par pattern global. Rejetee car trop implicite et sujette aux regressions.

3. Structure de routes React preparee pour l'auth future sans en implementer la logique.
- Rationale: garde-fous de navigation posés maintenant pour eviter d'exposer des pages membres vides sans session; l'implementation d'auth viendra dans une change dediee.

## Risks / Trade-offs

- [Mauvaise configuration Service Worker menant a cache de contenu prive] -> Mitigation: tests automatises de politique de cache (public allowed, membres no-store) integres des cette change.
- [Complexite de migration vers React 18+] -> Mitigation: migration incrementale en preservant les points d'entree PWA et en ajoutant tests de non-regression offline.
