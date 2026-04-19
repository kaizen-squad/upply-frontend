>[!IMPORTANT]
>Toutes les revues de code, explications et commentaires générés doivent être rédigés exclusivement en français, quel que soit le langage utilisé dans le code source.

# Upply — Copilot Instructions (Frontend)

## Conventions obligatoires

Avant toute review, vérifie que les conventions définies dans [`REPOSITORY-CONVENTIONS.md`](../REPOSITORY-CONVENTIONS.md) sont respectées. Tout écart doit être signalé comme erreur bloquante.

---

## Stack technique de référence

| Couche | Technologie |
|---|---|
| Framework | Next.js 14 — App Router |
| Styling | Tailwind CSS — classes utilitaires uniquement |
| Authentification | Access Token (mémoire React/store uniquement) + Refresh Token (cookie HttpOnly géré par le backend) |
| HTTP Client | Axios ou fetch wrapper centralisé |
| Paiement | FedaPay `checkout.js` — widget côté client |

---

## Règles de qualité — Non négociables

- **Valeurs sensibles :** Aucune clé API, token ou valeur sensible ne doit apparaître dans le code. Tout passe par les variables d'environnement Next.js (`NEXT_PUBLIC_` pour les variables exposées au client, sans préfixe pour les variables serveur). Signale toute valeur hardcodée comme erreur bloquante.
- **Gestion des états :** Tout appel API doit gérer trois états : chargement, succès, erreur. Un composant qui affiche des données sans gérer l'état de chargement ou l'état d'erreur est incomplet. Signale-le comme avertissement.
- **Stockage des tokens :** L'Access Token doit être stocké exclusivement en mémoire (Context React ou store Zustand). Il ne doit jamais être stocké dans `localStorage`, `sessionStorage`, ou un cookie — quelle que soit sa configuration. Sa disparition au rafraîchissement de page est un comportement attendu et intentionnel : le refresh automatique via le cookie HttpOnly du Refresh Token prend le relais. Signale tout stockage persistant de l'Access Token comme erreur bloquante.

---

## Architecture frontend — Structure de référence

```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (client)/
│   ├── dashboard/
│   ├── tasks/
│   │   ├── new/
│   │   └── [id]/
│   │       ├── applications/
│   │       ├── payment/
│   │       └── validate/
├── (prestataire)/
│   ├── dashboard/
│   ├── tasks/
│   │   └── [id]/
│   │       └── deliver/
│   └── applications/
├── layout.tsx
└── page.tsx

components/
├── ui/          ← Composants de base (Button, Card, Badge, Input, Modal)
├── tasks/       ← Composants spécifiques aux tâches
├── payment/     ← Composants liés au paiement FedaPay
└── shared/      ← Composants communs aux deux rôles

lib/
├── api.ts       ← Client HTTP centralisé (gestion token + refresh automatique)
├── auth.ts      ← Utilitaires d'authentification
└── utils.ts     ← Fonctions utilitaires générales

hooks/           ← Hooks personnalisés (useTasks, useAuth, etc.)

types/
└── index.ts     ← Types TypeScript partagés
```

**Règle absolue :** Tout appel API passe par le client HTTP centralisé défini dans `lib/api.ts`. Aucun appel `fetch` ou `axios` direct ne doit apparaître dans les composants. Signale toute violation comme erreur bloquante.

---

## Client HTTP centralisé — Comportement attendu

Le client HTTP dans `lib/api.ts` doit :

- Injecter automatiquement le Bearer Token dans chaque requête
- Intercepter les réponses `401` et déclencher automatiquement le refresh du token
- Relancer la requête originale après un refresh réussi
- Rediriger vers `/login` si le refresh échoue

Toute implémentation qui duplique cette logique dans un composant est une erreur bloquante.

---

## Authentification — Règles strictes

- Le Refresh Token est géré exclusivement via cookie HttpOnly — le frontend ne le lit jamais directement
- La protection des routes se fait via middleware Next.js (`middleware.ts`) — pas de vérification dans chaque composant individuellement
- La redirection après connexion dépend du rôle : `client` → `/client/dashboard`, `prestataire` → `/prestataire/dashboard`
- Un utilisateur non authentifié qui accède à une route protégée est redirigé vers `/login`
- Un client qui accède à une route prestataire (et inversement) reçoit un `403` ou est redirigé

---

## Intégration FedaPay — Règles spécifiques

- Le widget `checkout.js` est chargé uniquement sur la page de paiement, pas globalement
- La fonction `onComplete` récupère l'ID de transaction FedaPay et appelle immédiatement `POST /api/tasks/{id}/payment/verify` via le client HTTP centralisé
- Le frontend ne fait jamais confiance au statut retourné par le widget seul — la vérification côté serveur est obligatoire
- Les trois états du paiement doivent être gérés visuellement : en attente, succès, échec

---

## Composants — Règles de structure

- Tout composant qui affiche des données issues d'une API doit gérer explicitement : état chargement (skeleton ou spinner), état erreur (message + possibilité de retry), état vide (empty state)
- Les composants de la bibliothèque `components/ui/` sont les seuls composants de base autorisés — pas de recréation d'un Button ou d'une Card en dehors de ce dossier
- Un composant ne fait pas d'appel API directement — il reçoit les données en props ou via un hook dédié
- Les hooks personnalisés (`useTasks`, `useAuth`, etc.) sont dans le dossier `hooks/` à la racine

---

npm run dev

```typescript

type Role = 'client' | 'prestataire'

type TaskStatus = 'OUVERTE' | 'EN_COURS' | 'LIVREE' | 'VALIDEE'

type TransactionStatus = 'EN_SEQUESTRE' | 'LIBERE'

type ApplicationStatus = 'EN_ATTENTE' | 'ACCEPTEE' | 'REJETEE'

interface User {
  id: string
  name: string
  email: string
  role: Role
  phone: string | null
  rating_avg: number
}

interface Task {
  id: string
  client_id: string
  prestataire_id: string | null
  title: string
  description: string
  budget: number
  deadline: string // YYYY-MM-DD
  status: TaskStatus
}

interface Application {
  id: string
  task_id: string
  prestataire_id: string
  message: string
  status: ApplicationStatus
}

interface Transaction {
  id: string
  task_id: string
  amount_gross: number
  commission: number
  amount_net: number
  status: TransactionStatus
  liberated_at: string | null
}

interface Deliverable {
  id: string
  task_id: string
  prestataire_id: string
  content: string
  file_path: string | null
  submitted_at: string
}

interface Review {
  id: string
  task_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number // 1-5
  comment: string | null
}
```

Tout composant ou hook qui manipule ces entités doit utiliser ces types. L'usage de `any` est interdit. Signale tout `any` explicite comme avertissement.

---

## Endpoints consommés — Référence

### Auth
`POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/refresh` · `POST /api/auth/logout`

### Tâches
`GET /api/tasks` · `GET /api/tasks/{id}` · `POST /api/tasks` · `GET /api/tasks/mine` · `DELETE /api/tasks/{id}`

### Candidatures
`POST /api/tasks/{id}/apply` · `GET /api/tasks/{id}/applications` · `GET /api/applications/mine` · `PATCH /api/applications/{id}/accept` · `PATCH /api/applications/{id}/reject`

### Paiement & Escrow
`POST /api/tasks/{id}/payment/verify` · `GET /api/tasks/{id}/transaction`

### Livrables
`POST /api/tasks/{id}/deliver` · `GET /api/tasks/{id}/deliverable` · `POST /api/tasks/{id}/validate`

### Notation & Dashboard
`POST /api/tasks/{id}/review` · `GET /api/dashboard/client` · `GET /api/dashboard/prestataire`
