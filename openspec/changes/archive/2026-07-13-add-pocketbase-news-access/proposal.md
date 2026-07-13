## Why

La zone publique affiche aujourd'hui un shell statique sans source de donnees reelle pour les news. Integrer PocketBase maintenant, limite a la collection `news`, permet d'introduire la premiere brique d'acces aux donnees publiques en respectant la Clean Architecture et sans rouvrir le scope backend Go/WASM.

## What Changes

- Ajouter un acces PocketBase limite a la collection publique `news`.
- Introduire un port de domaine pour la lecture des news et son repository PocketBase associe.
- Introduire un client PocketBase singleton en infrastructure, configure par variable d'environnement avec valeur par defaut de production.
- Ajouter un use-case applicatif pour recuperer les news publiques.
- Ajouter un hook presentation consommant exclusivement le use-case pour afficher les news dans la zone publique.
- Mettre a jour la zone publique pour afficher les news PocketBase avec un comportement compatible offline/public cache.

## Capabilities

### New Capabilities
- `pocketbase-news-access`: Acces lecture seul a la collection PocketBase `news` via ports, repository et use-case dedies.

### Modified Capabilities
- `public-offline-content`: Les news publiques ne sont plus statiques et doivent rester consultables offline apres chargement et mises a jour.
- `service-worker-boundaries`: Les endpoints PocketBase publics de news doivent etre identifies comme flux publics cacheables sans impacter les flux prives/authentifies.

## Impact

- Zone impactee: zone publique uniquement.
- Clean Architecture: aucun ecart, avec port/repository/use-case/hook separes par couche.
- Infrastructure: nouveau client PocketBase singleton et repository `news` dedie.
- Service Worker: verification des strategies runtime pour les endpoints publics PocketBase `news`.
- Module WASM: aucun impact.
