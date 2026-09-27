# Carte des appels API — Upply Frontend

Ce document décrit ce que le frontend envoie, ce qu’il attend et comment il traite les erreurs. Il est destiné à aider l’équipe backend à reproduire et diagnostiquer les requêtes émises par l’interface.

> **Limite de portée :** ce dépôt contient le frontend, pas l’implémentation du backend distant. Les méthodes, chemins et payloads ci-dessous sont observés dans le code frontend. Les structures de réponse sont les types attendus par ce code, pas une preuve du comportement réel du serveur. Les points à confirmer sont regroupés à la fin.

## 1. Lire une requête correctement

### 1.1 Deux destinations API

Le routage dépend du premier caractère de l’URL passée à `apiFetch`, dans `lib/api.ts` :

| Forme appelée | Destination | Exemple |
| --- | --- | --- |
| URL commençant par `/` | Route locale Next.js sur la même origine | `/api/auth/refresh` |
| URL sans `/` initial | Backend externe via la valeur `NEXT_PUBLIC_API_BASE_URL` | `api/tasks` |

Le client Axios utilise la variable `NEXT_PUBLIC_API_BASE_URL` telle quelle comme `baseURL`. Les chemins distants observés commencent déjà par `api/`. Il faut donc vérifier la valeur configurée dans l’environnement pour éviter un préfixe `/api/api` ou l’absence du segment `/api`.

Les requêtes externes envoient l’en-tête `X-Requested-With: XMLHttpRequest` et `withCredentials: true`. Si un jeton d’accès est présent, le client ajoute `Authorization: Bearer <accessToken>` aux requêtes externes. Les requêtes locales ne reçoivent pas cet en-tête par cet intercepteur.

### 1.2 Méthode, body et réponse normalisée

`apiFetch<T>(url, body?, method?)` :

- utilise `GET` lorsque la méthode n’est pas fournie;
- place le body dans la propriété `data` Axios;
- renvoie directement le JSON du serveur quand la requête réussit;
- convertit les erreurs Axios en `{ success: false, data: null, message, status }`;
- choisit `message` depuis `response.data.message`, sinon depuis le message Axios;
- utilise le statut HTTP d’origine, ou `408` pour un timeout sans réponse, `503` pour les autres erreurs réseau sans réponse, et `500` pour une erreur non Axios.

Le type déclaré `HTTPResponse<T>` est une union :

```ts
type HTTPResponse<T> =
  | { success: true; data: T; message: string; status: number }
  | { success: false; data: null; message: string; status: number };
```

Cette forme est le **contrat typé attendu** par le client distant. Plusieurs routes locales renvoient toutefois un format abrégé (détaillé ci-dessous). Distinguer le **statut HTTP** (par exemple 400) du champ JSON `status` : les deux ne sont pas toujours identiques ni tous les deux présents.

Le type `HTTPResponse<T>` est une vérification TypeScript seulement : `apiFetch` caste le JSON reçu sans validation Zod de la réponse. Une réponse distante de forme incorrecte peut donc passer sans erreur runtime et échouer plus tard dans un composant.

### 1.3 Renouvellement d’accès

Pour une réponse HTTP 401 sur une requête externe, l’intercepteur Axios tente `POST /api/auth/refresh`. Les requêtes qui contiennent `login`, `register` ou `refresh` dans leur URL ne déclenchent pas ce renouvellement. Les requêtes concurrentes en attente du même renouvellement sont rejouées avec le nouveau jeton. Si le renouvellement échoue, le client redirige le navigateur vers `/login`.

## 2. Schémas de données et validations Zod

Les schémas sont définis dans `types/auth.ts` et `types/index.ts`. Sauf mention explicite pour `/api/applications`, ils sont utilisés par les formulaires frontend via React Hook Form et `zodResolver`. Ils ne valident pas automatiquement les requêtes au niveau du backend : le client peut être contourné.

Les messages ci-dessous sont ceux configurés dans le code. Pour les règles sans message personnalisé, Zod fournit son message par défaut, qui peut dépendre de la version et de la langue.

### 2.1 Connexion — `LoginSchema`

| Champ | Type et règle | Message configuré |
| --- | --- | --- |
| `email` | Email valide (`z.email`) | `Incorrect email format!` |
| `password` | Chaîne d’au moins 8 caractères | `8 characters minimum.` |

Payload envoyé à `POST /api/auth/login` :

```json
{
  "email": "client@example.com",
  "password": "mot-de-passe"
}
```

Le formulaire bloque normalement l’envoi tant que le schéma n’est pas valide. Son callback d’erreur affiche aussi le toast générique `Veuillez entrez des données valides!`.

### 2.2 Inscription — `RegisterSchema`

| Champ | Type et règle | Message configuré |
| --- | --- | --- |
| `role` | Chaîne convertie en minuscules puis limitée à `client` ou `prestataire` | Message Zod par défaut si la valeur est hors enum |
| `name` | Chaîne d’au moins 2 caractères | `Too small !` |
| `email` | Email valide | Message Zod par défaut |
| `password` | Chaîne d’au moins 8 caractères | `8 characters minimum!` |
| `phone` | Chaîne d’au moins 10 caractères | `Ex: 1234567890` |
| `password_confirmation` | Chaîne | Message Zod par défaut si absent ou mauvais type |
| `rating_avg` | Nombre facultatif | Message Zod par défaut si fourni avec un type incorrect |
| paire mot de passe | `password` doit être identique à `password_confirmation` | `Passwords do not match!`, chemin d’erreur `password_confirmation` |

Après transformation Zod, les rôles transmis sont minuscules. Le champ est nommé **`password_confirmation`**, pas `confirmPassword`.

Payload attendu par le frontend pour `POST /api/auth/register` :

```json
{
  "role": "client",
  "name": "Nom du compte",
  "email": "client@example.com",
  "password": "mot-de-passe",
  "phone": "+33123456789",
  "password_confirmation": "mot-de-passe",
  "rating_avg": 1.11
}
```

`rating_avg` est facultatif dans le schéma; le formulaire lui fournit actuellement une valeur initiale. La route locale relaie le body sans exécuter `RegisterSchema` côté serveur.

### 2.3 Création d’une mission — `TaskFormProps`

| Champ | Type et règle | Message configuré |
| --- | --- | --- |
| `title` | Chaîne d’au moins 3 caractères | `Entrez un nom convenable!` |
| `description` | Chaîne d’au moins 10 caractères | `Une description est nécessaire!` |
| `budget` | **Chaîne** composée uniquement de chiffres (`/^\d+$/`); pas de décimale ni séparateur | `Le budget doit être un nombre valide` |
| `deadline` | Date valide au format chaîne `YYYY-MM-DD` | Message Zod par défaut |

Payload transmis actuellement à `POST api/tasks` : `TaskFormType`. Son `budget` reste une chaîne numérique, tandis que le champ `budget` d’une mission retournée est typé `number`. La fonction `useTasks` transmet cet objet directement au client Axios; elle n’appelle pas `buildFormData`.

### 2.4 Candidature — `ApplicationFormSchema`

Le schéma valide uniquement `message`, qui doit contenir au moins 20 caractères. Message configuré : `Soyez bon vendeur de vous même!`.

L’identifiant de mission est dans le chemin et non dans le body :

```http
POST /api/tasks/{task_id}/apply
Content-Type: application/json
Authorization: Bearer <accessToken>
```

```json
{
  "message": "Texte de motivation d’au moins vingt caractères."
}
```

La réponse est consommée comme une `ApplicationResponse` ou une liste, même si le type générique indiqué au call site est singulier; le hook la normalise en tableau.

### 2.5 Remise d’un livrable — `DeliveryFormSchema`

| Champ | Type et règle | Message configuré |
| --- | --- | --- |
| `task_id` | Chaîne | Aucun message personnalisé |
| `content` | Chaîne; le champ du formulaire est aussi marqué requis | Aucun message Zod personnalisé |
| `file` | Objet `File` requis; taille maximale 5 Mio; MIME permis : `image/jpeg`, `image/png`, `application/pdf` | `Le fichier ne doit pas dépasser 5 Mo`; `Format accepté : JPG, PNG ou PDF` |

Payload TypeScript déclaré : `{ task_id: string; content: string; file: File }`. L’URL externe utilisée est `POST api/deliverables/submit`.

**À vérifier avec le backend : encodage du fichier sur le réseau.** Le formulaire HTML indique `multipart/form-data`, mais son gestionnaire intercepte la soumission et `useTasks` transmet ensuite l’objet JavaScript directement à `apiFetch`. Aucun appel à `buildFormData`, construction explicite de `FormData` ou en-tête `Content-Type` multipart n’est visible dans ce parcours. L’attribut `encType` du formulaire natif ne détermine pas l’encodage de l’appel Axios. Vérifier la requête réelle dans l’onglet Réseau et confirmer le format, le nom du champ fichier et la limite côté serveur.

Le type de réponse attendu par le hook est `Deliverable`. Attention : l’union `FileType` inclut `zip`, mais le schéma de remise rejette les ZIP.

### 2.6 Évaluation — `ReviewSchema`

| Champ | Type et règle Zod | Observation |
| --- | --- | --- |
| `task_id` | Chaîne | Le formulaire initialise ce champ depuis l’identifiant de mission |
| `rating` | Nombre | Aucun minimum ni maximum n’est imposé par Zod; le formulaire marque le contrôle requis et affiche une note sur 5 |
| `comment` | Chaîne facultative | Aucun minimum n’est défini |

L’URL est `POST api/tasks/{task_id}/review`. Le body actuel contient `task_id`, `rating` et éventuellement `comment`. **`reviewee_id` n’est ni demandé par `ReviewSchema` ni fourni par ce formulaire.** La réponse attendue est `Review`. La lecture utilise `GET api/tasks/{task_id}/review` et attend une liste, dont le hook ne conserve que le premier élément.

### 2.7 Sélection d’un prestataire — validation serveur locale

`PrestataireSelectedDataSchema` exige trois chaînes :

```json
{
  "application_id": "identifiant-candidature",
  "task_id": "identifiant-mission",
  "prestataire_name": "Nom du prestataire"
}
```

Le schéma utilise `.passthrough()` : des propriétés supplémentaires ne sont pas rejetées. Il ne définit aucune contrainte de longueur ou de format pour ces chaînes.

Cette validation se trouve dans la route Next locale `/api/applications`, pas dans l’API backend distante. La route ne renvoie pas les détails `ZodError.issues` : les erreurs JSON ou Zod deviennent toutes le message générique `Invalid application data`.

### 2.8 Cookie utilisateur

`UserCookieSchema` exige `name` de type chaîne et `role` égal à `client` ou `prestataire`. Les champs supplémentaires sont conservés via `.passthrough()`. La route locale `GET /api/auth/login` efface les cookies de session si leur JSON est illisible ou ne satisfait pas ce schéma.

## 3. Modèles de réponse consommés par le frontend

Ces interfaces décrivent la forme utilisée par TypeScript. Elles doivent être comparées au JSON réellement observé dans les réponses du backend.

### 3.1 Authentification

- `User` : `{ id: string; name: string; role: "client" | "prestataire" }`.
- `AuthDataResponse` : `{ accessToken: string; refreshToken?: string; user: User }`. Le refresh token est facultatif dans le type, mais la route locale ne crée pas la session si la réponse de connexion/inscription n’en contient pas.
- `RefreshTokenResponse` : `{ accessToken: string }`.

### 3.2 Mission, collection et pagination

Mission (`TaskProps`) :

| Champ | Type TypeScript | Présence |
| --- | --- | --- |
| `id` | chaîne | requis |
| `client_id` | chaîne | requis |
| `title` | chaîne | requis |
| `description` | chaîne | requis |
| `budget` | nombre | requis |
| `deadline` | chaîne `YYYY-MM-DD` | requis |
| `status` | `OUVERTE`, `EN_COURS`, `LIVREE` ou `VALIDEE` | requis |
| `created_at` | chaîne | facultatif |
| `total_applications` | nombre | facultatif |

La définition courante n’inclut pas `prestataire_id`.

Une collection peut être un tableau de missions ou `{ tasks: TaskProps[]; pagination?: TaskPagination }`. La pagination, quand elle est présente, contient `total`, `per_page`, `current_page` et `last_page`, tous numériques. `useTasks` accepte aussi un objet mission unique et le convertit en tableau. Ce comportement de compatibilité ne signifie pas que l’API devrait renvoyer une mission unique pour une liste.

### 3.3 Dashboard client

`CDashboardData` :

```ts
{
  tasks: TaskProps[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  statistics: {
    opened: number;
    pending: number;
    validated: number;
  };
  total_spent: number;
}
```

`total_spent` est au niveau racine, pas dans `statistics`.

### 3.4 Dashboard prestataire

`PDashboardData` :

```ts
{
  tasks: TaskProps[];
  applications: Array<{
    status: "EN_ATTENTE" | "ACCEPTEE" | "REJETEE";
    created_at: string;
    task: TaskProps;
  }>;
  statistics: {
    waiting_budget: number;
    waiting_applications: number;
    active_missions: number;
  };
}
```

### 3.5 Candidature

`Application` contient `id`, `task_id`, `prestataire_id`, `message`, `status` et `created_at`. `status` est `EN_ATTENTE`, `ACCEPTEE` ou `REJETEE`.

`ApplicationResponse` ajoute `prestataire` avec `name`, `email`, `role`, `phone`, `rating_avg` et `created_at`. Le type déclare `created_at: Date`; une réponse JSON réseau transporte normalement une chaîne, vérifier la sérialisation et le typage attendu côté backend.

### 3.6 Livrable et évaluation

- `Deliverable` : `id`, `task_id`, `prestataire_id`, `content`, `file_path` (chaîne ou null), `submitted_at`.
- `DeliverableDTO`, utilisé pour afficher un livrable au client : `id`, `content`, `prestataire: { name, rating_avg }`, `file: { file_url, file_name, file_size, file_type }`, `submitted_at`. `file_type` est déclaré `pdf`, `png`, `jpg` ou `zip`.
- `Review` : `id`, `task_id`, `reviewer_id`, `reviewee_id`, `rating` et `comment` (chaîne ou null).

## 4. Routes locales Next.js

Ces routes sont hébergées par le frontend. Certaines relaient des appels au backend distant; `/api/applications` ne contacte que ses cookies locaux.

| Méthode et URL locale | Appel distant / body local | Réponse observée et effets |
| --- | --- | --- |
| `POST /api/auth/login` | Body login relayé à `POST api/login` | Si le backend répond `success: true` avec `data.refreshToken`, pose les cookies `refreshToken` et `user`, supprime `refreshToken` de `data` puis renvoie le wrapper backend. Sinon relaie le wrapper. La réponse HTTP Next reste par défaut 200. |
| `GET /api/auth/login` | Aucun body; lit les cookies `user` et `refreshToken` | Cookie valide : `{ success: true, data: parsedUser, message: "User info" }`; `parsedUser` exige `name` et `role` et conserve les propriétés supplémentaires. Cookie absent/invalide : `{ success: false }`; cookie invalide supprimé. Le champ `status` n’est pas fourni. |
| `POST /api/auth/register` | Body inscription relayé à `POST api/register` | Si le backend répond `success: true` avec `data.refreshToken`, pose les cookies puis renvoie `{ accessToken, user }` sans wrapper `success/data/message/status`. Sinon relaie le wrapper backend. Ce format de succès ne correspond pas au `HTTPResponse<AuthDataResponse>` attendu par `useAuth`. |
| `POST /api/auth/refresh` | Aucun body local. Lit le cookie HttpOnly puis envoie `{ tokenString: refreshToken }` à `POST api/refresh` | Sans cookie : HTTP 401 et body `{ message: "No refresh token" }`. Échec distant : supprime le cookie et relaie le body distant. Succès : relaie le body distant. |
| `GET /api/auth/logout` | Aucun body ni appel distant | Supprime `refreshToken` et `user`; renvoie `{ success: true }` sans `data/message/status`. |
| `POST /api/applications` | JSON de sélection validé par `PrestataireSelectedDataSchema` | Body invalide ou JSON illisible : HTTP 400 et `{ success: false, data: null, message: "Invalid application data" }`. Succès : cookie HttpOnly `applicationData`; réponse `{ success: true, message: "Application data stored in cookie." }`. |
| `GET /api/applications` | Aucun body; lit et valide `applicationData` | Cookie valide : `{ success: true, data, message }`. Absent/invalide : `{ success: false, data: null, message: "No application data found in cookie" }`; cookie invalide supprimé. Pas de champ `status`. |
| `DELETE /api/applications` | Aucun body | Supprime `applicationData`; renvoie `{ success: true, message: "Application data deleted." }` sans `data/status`. |

Les cookies de session ont `httpOnly: true`, `sameSite: "lax"`, `path: "/"` et une durée de sept jours. L’option `secure` est active en production.

## 5. Appels au backend distant

Les chemins ci-dessous sont relatifs à `NEXT_PUBLIC_API_BASE_URL`. À part l’authentification relayée par les routes locales, les requêtes proviennent du navigateur et reçoivent le Bearer token si le store en contient un.

| Méthode et chemin appelé | Payload envoyé | Type de succès consommé / usage |
| --- | --- | --- |
| `POST api/login` | `LoginProps` | `HTTPResponse<AuthDataResponse>` attendu par la route proxy; refresh token requis pour poser la session |
| `POST api/register` | `RegisterProps` | `HTTPResponse<AuthDataResponse>` attendu par la route proxy; refresh token requis pour poser la session |
| `POST api/refresh` | `{ tokenString: string }`, construit par `/api/auth/refresh` | `HTTPResponse<RefreshTokenResponse>` |
| `GET api/logout` | Aucun body; méthode GET implicite de `apiFetch` | Le hook vérifie `success` avant d’effacer les cookies locaux |
| `GET api/tasks` | Aucun body | Collection de missions; le frontend tolère un tableau, `{ tasks, pagination? }` ou une mission unique |
| `GET api/tasks/{task_id}` | Aucun body | Mission utilisée comme `TaskProps` |
| `POST api/tasks` | `TaskFormType` JSON; `budget` est une chaîne de chiffres | Mission de succès consommée comme `TaskProps` |
| `PUT api/tasks/{task_id}` | `TaskProps`; `budget` est un nombre | Mission de succès consommée comme `TaskProps` |
| `DELETE api/tasks/{task_id}` | Aucun body | Le hook ne dépend que de `success/message`; son type générique est `TaskProps` |
| `POST api/tasks/{task_id}/apply` | `{ message: string }`; l’identifiant est dans le chemin | `ApplicationResponse` ou élément normalisé en tableau |
| `GET api/tasks/{task_id}/applications` | Aucun body; vue client | Liste ou élément `ApplicationResponse`; le hook traite le statut 404 comme une liste vide |
| `GET api/tasks/{task_id}/applications/me` | Aucun body; vue prestataire | Même forme consommée que la route précédente |
| `PUT api/application/{application_id}/accept` | Body vide `{}` | `HTTPResponse<null>` attendu; succès met à jour le store côté client |
| `PUT api/application/{application_id}/reject` | Aucun body | `HTTPResponse<null>` attendu; succès met à jour le store côté client |
| `POST api/deliverables/submit` | `DeliveryFormProps` côté TypeScript; transport du `File` à confirmer (voir la section 2.5) | `Deliverable` |
| `GET api/tasks/{task_id}/deliverable` | Aucun body | `DeliverableDTO` affiché sur la page client de validation |
| `POST api/deliverables/validate/{deliverable_id}` | Aucun body | `HTTPResponse<null>` attendu; succès redirige le client au dashboard |
| `POST api/tasks/{task_id}/review` | `ReviewProps` : `task_id`, `rating`, optionnellement `comment` | `Review` |
| `GET api/tasks/{task_id}/review` | Aucun body | Liste de `ReviewProps`; le hook n’utilise que le premier élément |
| `GET api/dashboard/client` | Aucun body | `CDashboardData` |
| `GET api/dashboard/prestataire` | Aucun body | `PDashboardData` |
| `POST api/tasks/{task_id}/payment/verify` | `{ transaction_id: string }` | `HTTPResponse<null>` attendu; succès efface ensuite la sélection locale |

L’ancien chemin `DELETE api/applications/cancel` ne correspond à aucun appel trouvé dans le frontend actuel. Les acceptations/rejets utilisent `PUT api/application/{id}/accept` et `PUT api/application/{id}/reject`.

## 6. Erreurs : correspondance observée

### 6.1 Validation Zod frontend

Les erreurs des formulaires sont levées avant l’appel réseau et attachées aux champs par React Hook Form. Les callbacks d’erreur ajoutent des toasts génériques :

| Formulaire | Toast si formulaire invalide | Détails disponibles |
| --- | --- | --- |
| Connexion | `Veuillez entrez des données valides!` | Erreur Zod par champ `email` ou `password` |
| Inscription | `Veuillez entrez des données valides!` | Erreur Zod par champ; le champ de confirmation reçoit aussi l’erreur de mismatch |
| Création de mission | `Veuillez entrez des données valides!` | Erreur Zod par champ; budget doit être un entier sous forme chaîne |
| Candidature | `Considérez vos qualités personnelles, votre expérience et vos réalisations!` | `message` doit faire au moins 20 caractères |
| Remise | `Données non valides!` | Taille/type du fichier et champs de formulaire |
| Évaluation | `Les étoiles sont nécessaires a la notation.` | `rating` requis dans le contrôle; le schéma seul n’impose pas de plage |

Ces erreurs n’atteignent pas le backend. Si le backend reçoit quand même un body invalide, appliquer sa propre validation et renvoyer un statut et une forme d’erreur définis côté serveur.

### 6.2 Statuts distants interprétés dans l’interface

| Endpoint / statut JSON lu | Réaction frontend |
| --- | --- |
| `POST /api/auth/login`, échec avec `status === 401` | Toast « Invalid email or password. » |
| `POST /api/auth/register`, échec avec `status === 422` | Toast « Email ou phone number already in use! » |
| `GET api/tasks/{id}/applications[(/me)]`, échec avec `status === 404` | Candidatures affichées comme liste vide; pas de toast d’erreur |
| Autres échecs contenant `message` | Message serveur affiché dans la plupart des hooks |
| Échec sans `message` ou exception de transport | Toast générique propre à l’action (connexion, mission, candidature, paiement, etc.) |

Les hooks lisent le champ JSON `status` de la réponse normalisée. Retourner un statut uniquement dans la ligne HTTP ne garantit pas que le code métier le voie si la réponse HTTP est 200 avec un wrapper d’erreur. Pour les erreurs HTTP, `apiFetch` lit le statut de transport et fabrique son propre objet d’échec.

### 6.3 Erreurs des routes locales

- `POST /api/applications` : réponse HTTP 400 pour JSON illisible et pour échec Zod; le body indique seulement `Invalid application data`. Aucun `issues` ni chemin de champ n’est renvoyé.
- `POST /api/auth/refresh` sans cookie : réponse HTTP 401 avec `{ message: "No refresh token" }`; `apiFetch` convertit cette réponse HTTP en wrapper d’échec côté navigateur.
- `GET /api/auth/login` avec cookie user malformé : suppression des cookies puis `{ success: false }`, sans message ni statut JSON.
- `POST /api/auth/login` et `POST /api/auth/register` : les erreurs distantes sont relayées dans le body, mais `NextResponse.json` ne transmet pas automatiquement le champ JSON `status` comme statut HTTP. Sans option explicite, le statut HTTP de la réponse locale est 200.
- `GET /api/auth/logout` et les routes de cookie applications renvoient des réponses compactes; elles ne correspondent pas complètement à `HTTPResponse<T>`.

### 6.4 Format recommandé pour les erreurs backend

Pour que `apiFetch` et les hooks puissent conserver un message et un statut exploitables, une réponse d’erreur distante devrait respecter le contrat déjà typé :

```json
{
  "success": false,
  "data": null,
  "message": "Explication lisible et stable pour cette erreur",
  "status": 422
}
```

Le statut HTTP devrait être cohérent avec `status` dans le JSON. Pour une erreur de validation, convenir d’un format détaillé avec l’équipe frontend avant de l’ajouter : actuellement `apiFetch` ne conserve que `message` et le statut, et les routes locales de sélection masquent les `ZodError.issues`.

## 7. Méthode de diagnostic d’une erreur de route

1. Identifier si l’URL commence par `/` : route locale Next ou API distante.
2. Relever la méthode, le chemin final résolu avec la base, l’en-tête Bearer et le body effectivement émis.
3. Comparer les noms, types et règles du body avec la section Zod et le call site du hook.
4. Lire séparément le statut HTTP, le JSON retourné et le message finalement affiché dans l’interface.
5. Pour un fichier, vérifier l’encodage réellement reçu au serveur; ne pas se fier uniquement à l’attribut HTML `encType`.
6. Comparer le payload/réponse observé avec le modèle TypeScript concerné, puis confirmer tout comportement serveur non décrit par ce dépôt.

## 8. Points à confirmer avec le backend

Ces contrats ne peuvent pas être prouvés à partir du seul dépôt frontend :

- Format d’erreur détaillé officiel (notamment erreurs champ par champ) et si `status` JSON doit être systématiquement présent.
- Statuts HTTP réels attendus pour login, inscription, candidatures absentes et erreurs de validation.
- Format de transport réellement exigé pour le fichier de `POST api/deliverables/submit`.
- Présence de `refreshToken` dans les réponses réussies de login et d’inscription; le proxy en dépend pour créer les cookies.
- Sérialisation des dates, particulièrement `prestataire.created_at`, déclaré `Date` dans TypeScript mais transporté en JSON.
- Portée de la pagination : le type dashboard client exige un objet `pagination`, tandis que la réponse de collection de missions la rend optionnelle.
- Le schéma côté backend pour le rating (plage, entier ou décimal) et les validations serveur à appliquer aux champs mission, candidature et livrable.

## 9. Sources dans le dépôt

- Transport et erreurs HTTP : `lib/api.ts`
- Modèles et validations Zod : `types/index.ts`, `types/auth.ts`
- Hooks d’appel : `hooks/useAuth.ts`, `hooks/useTasks.ts`, `hooks/useApplication.ts`, `hooks/useDashboard.ts`, `hooks/usePayment.ts`
- Routes Next locales : `app/api/auth/**`, `app/api/applications/route.ts`
- Formulaires et messages d’erreur : `app/(auth)/**`, `components/dashboard/client/**`, `components/dashboard/prestataire/ApplicationForm.tsx`, `components/shared/review/ReviewForm.tsx`
