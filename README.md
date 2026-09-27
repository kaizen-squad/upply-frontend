# Upply — application web

Upply met en relation des clients qui publient des missions et des prestataires qui y candidatent. Le client peut sélectionner un prestataire, payer la mission et valider le livrable; le prestataire peut parcourir le marché, candidater et remettre son travail.

L’application est construite avec Next.js App Router, React et TypeScript. Elle utilise Tailwind CSS, Zustand pour certains états partagés, Zod pour la validation et Axios pour les appels HTTP.

## Prérequis

- Node.js 20.9 ou supérieur, requis par Next.js 16.
- npm et l’accès au dépôt du backend Upply.
- Une clé publique FedaPay pour les parcours de paiement qui l’utilisent.

## Installation et configuration

```bash
npm install
```

Créer un fichier `.env.local` à la racine du projet et renseigner les variables nécessaires à l’environnement :

| Variable | Usage dans l’application |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | URL de base du backend externe appelée par `lib/api.ts`. |
| `NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY` | Clé publique utilisée par l’intégration FedaPay côté client. |
| `FRONTEND_BASE_URL` | Origine consultée par `proxy.ts` pour rediriger la racine `/` d’un utilisateur connecté vers son tableau de bord. |

Les deux variables `NEXT_PUBLIC_*` sont intégrées au bundle client et ne doivent contenir que des valeurs destinées à être publiques. Ne pas versionner `.env.local` ni y placer des secrets serveur. Aucun fichier `.env.example` n’est actuellement fourni.

## Commandes

```bash
npm run dev              # Serveur Next.js de développement
npm run build            # Compilation de production
npm run start            # Démarre la compilation de production
npm run lint             # ESLint
npx tsc --noEmit         # Vérification TypeScript
npm test                 # Tests unitaires puis fonctionnels
npm run test:unit        # Tests Vitest
npm run test:unit:watch  # Vitest en mode interactif
npm run test:functional  # Tests Playwright sur Chromium
```

Le serveur de développement est disponible sur [http://localhost:3000](http://localhost:3000). Playwright démarre ou réutilise le serveur sur `http://127.0.0.1:3001`; en CI, il démarre son propre serveur.

## Parcours et routes

### Authentification

- `/login` : connexion.
- `/register` : création d’un compte client ou prestataire.
- `proxy.ts` : contrôle la présence des cookies de session, protège les routes et redirige selon le rôle.
- `app/api/auth/*` : routes Next.js locales qui gèrent les cookies de session et relaient les opérations d’authentification.

Les cookies `refreshToken` et `user` sont configurés comme HttpOnly par les routes d’authentification. Le client utilise le jeton d’accès en mémoire et `lib/api.ts` tente un renouvellement après une réponse 401.

### Espace client

- `/client/dashboard` : tableau de bord.
- `/client/tasks` : missions du client.
- `/client/tasks/new` : création d’une mission.
- `/client/tasks/[id]` : détail de mission et accès aux candidatures.
- `/client/tasks/[id]/applications` : gestion des candidatures.
- `/client/tasks/[id]/payment` : parcours de paiement.
- `/client/tasks/[id]/validate` : validation du livrable.
- `/client/tasks/[id]/review` : route de revue actuellement présentée comme introuvable.

### Espace prestataire

- `/prestataire/dashboard` : tableau de bord.
- `/prestataire/tasks` : marché des missions.
- `/prestataire/tasks/[id]` : détail d’une mission.
- `/prestataire/tasks/[id]/deliver` : remise d’un livrable.

Les segments entre parenthèses comme `(client)` et `(prestataire)` sont des groupes de routes Next.js et ne font pas partie des URL.

## Organisation du code

```text
app/          Routes App Router, layouts et routes API locales
components/   Composants d’interface, tableaux de bord et éléments partagés
hooks/        Hooks métier, gestion de session et stores Zustand
lib/          Client HTTP et fonctions utilitaires
types/        Types TypeScript et schémas de validation Zod
tests/        Tests unitaires Vitest et tests fonctionnels Playwright
public/       Images, icônes et autres ressources statiques
```

Les providers globaux (session, notifications, modales) sont assemblés dans `app/Providers.tsx`. Les composants de page se trouvent dans `app/`, tandis que les opérations de missions, candidatures, tableau de bord et paiement sont principalement encapsulées dans les hooks de `hooks/`.

## Appels API

`lib/api.ts` fournit `apiFetch<T>()` et centralise les appels Axios, l’ajout du jeton d’accès et le renouvellement sur réponse 401. Le préfixe du chemin détermine la destination :

- Une URL commençant par `/` cible une route locale Next.js, par exemple `/api/auth/refresh`.
- Une URL sans slash initial cible le backend externe avec `NEXT_PUBLIC_API_BASE_URL`.

Les modèles de requêtes et réponses sont définis dans `types/`. Les routes locales d’authentification et `/api/applications` utilisent des cookies gérés par Next.js.

La description détaillée des appels backend et des structures de données est dans [API_BACKEND_STRUCTURE.md](./API_BACKEND_STRUCTURE.md).

## Tests

- `tests/unit/` contient les tests Vitest et React Testing Library des utilitaires, hooks et composants.
- `tests/functional/` contient les parcours Playwright exécutés avec Chromium.
- `tests/setup.ts` configure le nettoyage du DOM entre les tests de composants.

Les scripts et les configurations correspondantes sont définis dans `package.json`, `vitest.config.mts` et `playwright.config.ts`.

## Paiement, notifications et modales

L’intégration FedaPay est dans `components/dashboard/client/payment/`. Les notifications et modales sont fournies par les providers assemblés dans `app/Providers.tsx`. La documentation du système de modales est dans [MODALIFY_DOCUMENTATION.md](./MODALIFY_DOCUMENTATION.md).

Les conventions de branches, commits et revue figurent dans [REPOSITORY-CONVENTIONS.md](./REPOSITORY-CONVENTIONS.md). Les consignes de maintenance du projet figurent dans [CLAUDE.md](./CLAUDE.md).

## Production

Créer une compilation avec `npm run build`, puis démarrer le serveur avec `npm run start`. Définir les variables d’environnement requises dans la plateforme d’hébergement avant le démarrage. Le déploiement statique n’est pas configuré : l’application utilise des routes API et des fonctions serveur Next.js.
