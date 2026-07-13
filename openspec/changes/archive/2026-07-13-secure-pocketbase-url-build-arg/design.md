## Context

Le client PocketBase est actuellement configure avec une URL provenant de `VITE_POCKETBASE_URL` mais conserve une valeur par defaut hardcodee vers la production. Ce fallback simplifie le developpement local mais augmente le risque de cibler involontairement l'environnement de production et rend la posture de securite moins explicite. Cette change impose une configuration stricte: URL fournie au build, sans fallback en code.

Couches concernees:
- infrastructure: `infrastructure/pocketbase/client.ts` (source de verite de configuration)
- application/presentation: impact indirect via l'initialisation du client
- domain: aucun changement

## Goals / Non-Goals

**Goals:**
- Supprimer toute valeur par defaut hardcodee de l'URL PocketBase.
- Exiger `VITE_POCKETBASE_URL` au build/deploiement.
- Echouer explicitement si la variable est absente ou vide.
- Mettre a jour la documentation/env sample/scripts pour clarifier l'obligation.

**Non-Goals:**
- Modifier le modele de donnees `news`.
- Modifier les repositories/use-cases PocketBase hors mecanisme de configuration.
- Ajouter auth PocketBase ou autres endpoints.

## Decisions

1. Validation stricte de config dans `infrastructure/pocketbase/client.ts`.
Rationale: un point unique d'echec controle, en couche infrastructure.
Alternative: fallback en local/dev uniquement. Rejetee pour eviter ambiguite et divergence entre environnements.

2. Variable `VITE_POCKETBASE_URL` obligatoire pour build et runtime init.
Rationale: configuration explicite et auditable par pipeline CI/CD.

3. Message d'erreur explicite si variable absente/invalid.
Rationale: feedback rapide pour les environnements mal configures.

4. Aucun changement de la regle architecture: hooks et presentation continuent de consommer des use-cases, pas le SDK.

## Risks / Trade-offs

- [Builds locaux cassent sans variable] -> Mitigation: documenter clairement `VITE_POCKETBASE_URL` et fournir exemple `.env`.
- [Mauvaise URL injectee au build] -> Mitigation: valider format URL et faire echouer l'init avec message clair.
- [Regression sur tests existants] -> Mitigation: tests unitaires du client avec cas variable absente/presente.

## Migration Plan

1. Modifier `client.ts` pour retirer le fallback hardcode et exiger la variable.
2. Ajouter validation de format basique URL (parse via URL API).
3. Mettre a jour `vite-env.d.ts` et docs/env sample.
4. Ajouter tests unitaires pour la configuration stricte.
5. Verifier `npm test` et `npm run build` avec variable fournie.

## Open Questions

- Faut-il autoriser une URL locale implicite en mode dev (ex: `http://127.0.0.1:8090`) ou rester 100% strict sans exception : oui
