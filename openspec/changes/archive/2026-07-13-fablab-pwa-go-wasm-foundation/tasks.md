## 1. Frontend Foundation (React + Public/Member Routing)

- [x] 1.1 Migrer le point d'entree frontend vers React 18+ en conservant le packaging Vite/PWA existant.
- [x] 1.2 Introduire un routage separant clairement les ecrans publics des ecrans membres.
- [x] 1.3 Ajouter des garde-fous de navigation sur les routes membres (redirect si pas de session) sans implementer l'auth.

## 2. Service Worker Cache Boundaries

- [x] 2.1 Definir une whitelist explicite des ressources/routes publiques autorisees au cache offline.
- [x] 2.2 Declarer les routes membres et endpoints prives comme non-cacheables (no-store) par defaut.
- [x] 2.3 Ajouter des tests automatiques verifiant public-cache allowed et routes membres no-store.

## 3. Validation

- [x] 3.1 Ajouter des tests de non-regression offline pour la zone publique apres premier chargement.
- [x] 3.2 Documenter les limites de scope: backend Go, chat SSE/POST, Matrix, STL/WASM et OIDC/OAuth2 reportes a des changes ulterieures.
