## Why

Le code respecte deja la structure Clean Architecture, mais l'identite visuelle n'est pas encore alignee sur la nouvelle charte monochrome definie dans le contexte OpenSpec. Appliquer cette charte maintenant permet d'unifier l'experience publique et membres avant la reprise des travaux backend/WASM.

## What Changes

- Appliquer une charte visuelle monochrome (noir, blanc, nuances de gris) sur l'ensemble des ecrans frontend.
- Introduire un systeme de tokens de design (palette de gris, echelles typo, contrastes, etats interactifs) sans couleur d'accent.
- Mettre a jour les composants presentation (public et membres) pour respecter la hierarchie typographique et les contraintes de contraste WCAG AA.
- Garantir que les etats hover, focus et disabled sont signales par contraste/opacite/soulignement.
- **BREAKING** Uniformisation des styles existants: certains contrastes, espacements et classes CSS actuelles seront modifies.

## Capabilities

### New Capabilities
- `monochrome-style-charter`: Definition et application d'une charte de style monochrome coherente sur les couches presentation et infrastructure de styles.

### Modified Capabilities
- Aucun (pas de changement des exigences fonctionnelles de `public-offline-content`, `service-worker-boundaries` ou `clean-architecture-structure`).

## Impact

- Zone impactee: les deux zones (publique et membres).
- Frontend: `src/style.css`, composants sous `src/presentation/`, et eventuels tokens CSS partages.
- Architecture: aucun ecart avec la Clean Architecture; changements confines principalement a la couche `presentation`.
- Backend/WASM: aucun impact direct (backend et module WASM desactives dans ce scope).
- Tests: ajout/ajustement de tests UI et accessibilite (contraste/etats interactifs) pour verrouiller la charte.
