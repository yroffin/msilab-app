## 1. Setup (couche presentation)

- [x] 1.1 Inventorier les styles actuels utilises par les ecrans publics et membres, puis lister les ecarts avec la charte monochrome.
- [x] 1.2 Definir un plan de migration des styles (tokens globaux, composants cibles, sequence de deploiement UI).

## 2. Design tokens (couche presentation)

- [x] 2.1 Introduire une palette monochrome complete (noir, blanc, 10 nuances de gris) sous forme de variables CSS.
- [x] 2.2 Introduire une echelle typographique graphique (taille, poids, line-height) en tokens reutilisables.
- [x] 2.3 Definir des tokens d'etats interactifs (hover/focus/disabled) bases sur contraste, opacite et soulignement.

## 3. UI publique (couche presentation)

- [x] 3.1 Appliquer les nouveaux tokens a la page publique et aux composants associes.
- [x] 3.2 Verifier la hierarchie typographique (titres, textes, labels) sans recours a une couleur d'accent.
- [x] 3.3 Rendre explicite le statut public/offline via conventions visuelles monochromes.

## 4. UI membres (couche presentation)

- [x] 4.1 Appliquer les nouveaux tokens aux ecrans membres et composants partages.
- [x] 4.2 Rendre explicite le statut prive/authentifie via conventions visuelles monochromes.
- [x] 4.3 Verifier que les etats interactifs clavier/souris restent perceptibles sans accent couleur.

## 5. Architecture guards (couche application + infrastructure)

- [x] 5.1 Verifier qu'aucune logique metier n'est introduite dans la couche presentation pendant la migration style.
- [x] 5.2 Verifier qu'aucun changement n'impacte le comportement Service Worker de separation public/prive.

## 6. Validation (couche presentation)

- [x] 6.1 Executer un controle de contraste WCAG AA (4.5:1 texte normal, 3:1 titres/large text) sur les ecrans publics et membres.
- [x] 6.2 Executer les tests existants et ajuster les snapshots/assertions UI si necessaire.
- [x] 6.3 Verifier visuellement desktop/mobile que la charte est appliquee de maniere coherente.
