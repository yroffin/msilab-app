## Context

La nouvelle charte de style impose une direction visuelle monochrome, graphique et fortement typographique sur toute l'application. Le codebase a deja ete migre vers une structure Clean Architecture et les styles actuels sont encore heterogenes. Cette change cible la coherence visuelle transverse sans modifier la logique metier ni les flux reseau.

## Goals / Non-Goals

**Goals:**
- Appliquer une palette monochrome unique (noir/blanc + echelle de gris) sur les ecrans publics et membres.
- Introduire des tokens de style reutilisables (couleurs, typo, contraste, etats interactifs).
- Renforcer la hierarchie de lecture via taille/poids/espacements typographiques.
- Garantir un contraste minimum WCAG AA sur composants et textes.
- Conserver la separation public/prive visuellement explicite sans melanger les signaux d'etat.

**Non-Goals:**
- Modifier les flux backend, SSE, auth ou cache Service Worker.
- Ajouter des dependances backend Go ou WASM TinyGo.
- Changer la structure des couches Clean Architecture.

## Decisions

1. Centraliser la charte dans des variables CSS globales (palette, typo, etats) dans la couche presentation.
Rationale: limiter la duplication et faciliter la maintenance.
Alternative: classes utilitaires ponctuelles uniquement. Rejetee car trop diffuse et moins traçable.
Couche: presentation.

2. Appliquer les styles par composants presentation existants, sans impacter domain/application/infrastructure.
Rationale: la charte est un sujet UI.
Couche: presentation.

3. Encadrer les etats interactifs sans accent couleur: hover/focus/disabled par contraste, opacite et soulignement.
Rationale: respect strict de la charte et accessibilite.
Couche: presentation.

4. Verifier explicitement la separation visuelle des zones publiques (offline) et privees (authentifiees) via labels, contrastes et containers differencies.
Rationale: correspondance avec les regles OpenSpec sur flux publics/prives.
Couche: presentation.

5. Ne pas ajouter de dependance Go/TinyGo dans cette change.
Rationale: backend et WASM desactives dans le scope actuel.
Couche: domain/application/infrastructure non impactees.

## Risks / Trade-offs

- [Contraste insuffisant sur certains composants] -> Mitigation: audit de contraste systematique et tests visuels.
- [Regressions de lisibilite mobile] -> Mitigation: revue responsive et ajustement des echelles typographiques.
- [Perte de distinction public/prive] -> Mitigation: conventions visuelles explicites et checklist de review UI.

## Migration Plan

1. Definir les tokens monochromes globaux dans les styles presentation.
2. Appliquer les tokens aux pages publiques.
3. Appliquer les tokens aux pages membres et composants partages.
4. Ajuster les etats interactifs et verifier contrastes WCAG AA.
5. Valider les ecrans desktop/mobile et corriger regressions.

## Open Questions

- Quelle police graphique adopter definitivement (licence/performance) pour rester conforme a l'identite?
- Faut-il definir une grille typographique stricte (taille/line-height) pour tous les composants avant implementation de nouvelles features?
