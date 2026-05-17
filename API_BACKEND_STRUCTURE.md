# Documentation de la structure des données backend

Ce document recense les appels API utilisés dans le projet et les formats de données attendus. Il est construit à partir des routes appelées depuis le frontend et des types définis dans `types/auth.ts` et `types/index.ts`.

---

## Conventions générales

- Tous les appels renvoient un wrapper commun `HTTPResponse<T>` :
  - `success: boolean`
  - `data: T`
  - `message: string`
  - `status: number`

- Dans `lib/api.ts`, `apiFetch(url, ...)` fonctionne ainsi :
  - Si `url` commence par `/`, la requête est dirigée vers le backend Next.js local (`baseURL = ''`).
  - Sinon, la requête est envoyée vers `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`.

---

## Types centraux

### Auth

#### `LoginProps`
- `email: string`
- `password: string`

#### `RegisterProps`
- `role: 'client' | 'prestataire'`
- `name: string`
- `email: string`
- `password: string`
- `phone: string`
- `confirmPassword: string`

#### `User`
- `name: string`
- `role: 'client' | 'prestataire'`
- `id: string`

#### `AuthDataResponse`
- `accessToken: string`
- `refreshToken: string`
- `user: User`

#### `RefreshTokenResponse`
- `accessToken: string`

### Tâches et candidatures

#### `TaskProps`
- `id: string`
- `client_id: string`
- `prestataire_id: string | null`
- `title: string`
- `description: string`
- `budget: number`
- `deadline: string` (YYYY-MM-DD)
- `status: 'OUVERTE' | 'EN_COURS' | 'LIVREE' | 'VALIDEE'`
- `created_at?: string`

#### `ApplicationFormType`
- `message: string`
- `task_id: string`

#### `Application`
- `id?: string`
- `task_id: string`
- `prestataire_id: string`
- `message: string`
- `status: 'EN_ATTENTE' | 'ACCEPTEE' | 'REJETEE'`
- `created_at: string`

#### `TaskPropsOnPrestataire`
- tous les champs de `TaskProps`
- `application_id: string`
- `applied_at: string | undefined`
- `application_status: 'EN_ATTENTE' | 'ACCEPTEE' | 'REJETEE' | undefined`

#### `Deliverable`
- `id: string`
- `task_id: string`
- `prestataire_id: string`
- `content: string`
- `file_path: string | null`
- `submitted_at: string`

#### `Review`
- `id: string`
- `task_id: string`
- `reviewer_id: string`
- `reviewee_id: string`
- `rating: number`
- `comment: string | null`

#### `DeliverableDTO`
- `content: string`
- `prestataire: { name: string; rating_avg: number }`
- `file: { file_url: string; file_name: string; file_size: string; file_type: 'pdf' | 'png' | 'jpg' | 'zip' }`
- `created_at: string`

#### Dashboard

##### `CDashboardData`
- `tasks: TaskProps[]`
- `statistics: { opened: number; pending: number; validated: number; total_spent: number }

##### `PDashboardData`
- `tasks: TaskProps[]`
- `applications: { mission_title: string; status_application: ApplicationStatus; applied_at: string; budget_mission: number }[]`
- `statistics: { waiting_budget: number; waiting_applications: number; active_missions: number }

---

## Endpoints locaux Next.js attendus (URL commençant par `/`)

### 1. `POST /api/auth/login`
- Usage frontend : `hooks/useAuth.ts`
- Corps attendu : `LoginProps`
- Wrapper de réponse : `HTTPResponse<AuthDataResponse>`
- Réponse interne en succès :
  - `accessToken: string`
  - `user: User`
- Effet secondaire : création des cookies `refreshToken` et `user`

### 2. `POST /api/auth/register`
- Usage frontend : `hooks/useAuth.ts`
- Corps attendu : `RegisterProps`
- Wrapper de réponse : `HTTPResponse<AuthDataResponse>`
- Réponse interne en succès :
  - `accessToken: string`
  - `user: User`
- Effet secondaire : création des cookies `refreshToken` et `user`

### 3. `POST /api/auth/refresh`
- Usage interne : rafraîchissement token via cookie HttpOnly
- Corps interne envoyé au backend distant : `{ refreshToken: string }`
- Wrapper de réponse : `HTTPResponse<RefreshTokenResponse>`
- Réponse interne en succès :
  - `accessToken: string`

### 4. `POST /api/auth/logout`
- Usage frontend : `hooks/useAuth.ts`
- Corps attendu : aucun (`{}` envoyé)
- Retour attendu du backend distant : `HTTPResponse<any>`
- Effet secondaire en succès : suppression des cookies `refreshToken` et `user`

---

## Endpoints externes vers `${NEXT_PUBLIC_API_BASE_URL}/api/`

Ces endpoints sont utilisés lorsqu’on appelle `apiFetch` avec une URL ne commençant pas par `/`.

### 5. `POST login`
- Requête interne envoyée au backend distant depuis `app/api/auth/login/route.ts`
- Corps attendu : `LoginProps`
- Réponse attendue : `HTTPResponse<AuthDataResponse>`

### 6. `POST register`
- Requête interne envoyée au backend distant depuis `app/api/auth/register/route.ts`
- Corps attendu : `RegisterProps`
- Réponse attendue : `HTTPResponse<AuthDataResponse>`

### 7. `POST refresh`
- Requête interne envoyée au backend distant depuis `app/api/auth/refresh/route.ts`
- Corps attendu : `{ refreshToken: string }`
- Réponse attendue : `HTTPResponse<RefreshTokenResponse>`

### 8. `POST logout`
- Requête interne envoyée au backend distant depuis `app/api/auth/logout/route.ts`
- Corps attendu : `{}`
- Réponse attendue : `HTTPResponse<any>`

### 9. `GET api/tasks` et `GET api/tasks/{id}`
- Usage frontend : `hooks/useTasks.ts`
- Pas de corps de requête
- Réponse attendue : `HTTPResponse<TaskProps[]>`

### 10. `POST api/tasks`
- Usage frontend : `hooks/useTasks.ts`
- Corps attendu : `TaskFormType` converti via `buildFormData`
  - `title: string`
  - `description: string`
  - `budget: number`
  - `deadline: string`
- Réponse attendue : `HTTPResponse<object>`

### 11. `POST api/tasks/{task_id}/deliver`
- Usage frontend : `hooks/useTasks.ts`
- Corps attendu : `DeliveryFormProps`
  - `task_id: string`
  - `content: string`
  - `file: File`
- Réponse attendue : `HTTPResponse<Deliverable>`

### 12. `POST api/tasks/{task_id}/review`
- Usage frontend : `hooks/useTasks.ts`
- Corps attendu : `ReviewProps`
  - `task_id: string`
  - `reviewee_id: string`
  - `rating: number`
  - `comment?: string`
- Réponse attendue : `HTTPResponse<Review>`

### 13. `POST api/tasks/{task_id}/apply`
- Usage frontend : `hooks/useTasks.ts`
- Corps attendu : `ApplicationFormType`
  - `message: string`
  - `task_id: string`
- Réponse attendue : `HTTPResponse<Application>`

### 14. `DELETE api/applications/cancel`
- Usage frontend : `hooks/useTasks.ts`
- Corps attendu : `{ id: string }`
- Réponse attendue : `HTTPResponse<null>`

### 15. `GET api/dashboard/client`
- Usage frontend : `hooks/useTasks.ts` et `app/(client)/client/dashboard/page.tsx`
- Pas de corps de requête
- Réponse attendue : `HTTPResponse<CDashboardData>`

### 16. `GET api/dashboard/prestataire`
- Usage frontend : `hooks/useTasks.ts` et `app/(prestataire)/prestataire/dashboard/page.tsx`
- Pas de corps de requête
- Réponse attendue : `HTTPResponse<PDashboardData>`

### 17. `GET api/tasks/{id}/deliverable`
- Usage frontend : `app/(client)/client/tasks/[id]/validate/page.tsx`
- Pas de corps de requête
- Réponse attendue : `HTTPResponse<DeliverableDTO>`

---

## Remarques importantes

- Le projet utilise un wrapper global `HTTPResponse<T>`, donc chaque endpoint frontend doit renvoyer ce format, même si la donnée métier est dans `data`.
- La distinction locale / externe est critique :
  - `/api/...` → Next.js backend local
  - `api/...` (sans slash) → backend externe défini par `NEXT_PUBLIC_API_BASE_URL`
- Les types `TaskProps`, `Application`, `Deliverable`, `Review`, `CDashboardData`, `PDashboardData`, `AuthDataResponse` et `RefreshTokenResponse` sont les sources de vérité pour les données attendues.

---

## Vérification rapide

- Si un appel doit atteindre l’API Next.js locale, il doit être écrit avec un `/` initial.
- Les routes `app/api/auth/*` sont des proxys locaux qui appellent ensuite les chemins distants `login`, `register`, `refresh`, et `logout`.
