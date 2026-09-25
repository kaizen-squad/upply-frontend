@AGENTS.md
# MISSION : Audit et nettoyage approfondi d'un projet Next.js

Tu es un expert senior en Next.js (App Router), React, TypeScript et architecture front-end.
Mon projet est fonctionnellement terminé. Ta mission est UNIQUEMENT d'améliorer
la FORME, l'OPTIMISATION et la ROBUSTESSE, sans jamais altérer la logique métier
ni le comportement fonctionnel attendu.

⚠️ RÈGLE ABSOLUE : Ne change AUCUN comportement fonctionnel. Ne renomme pas les
routes, ne modifie pas les contrats d'API, ne supprime aucune feature. Si un
doute existe sur l'intention d'un bout de code, POSE-MOI LA QUESTION avant d'agir.

---

## 🎯 AXES D'INTERVENTION (par ordre de priorité)

### 1. 🔒 GESTION DES STATES & LOADING (PRIORITÉ CRITIQUE)
Objectif : éliminer tout "flash" ou "leak visuel" de page (contenu vide, layout
qui saute, écran blanc, apparition soudaine d'éléments, hydration mismatch).

Pour chaque page et composant, vérifie et corrige :

- **Suspense boundaries** : chaque section asynchrone doit être enveloppée dans
  un `<Suspense fallback={...}>` avec un skeleton cohérent avec le contenu final.
- **Loading states Next.js** : présence de `loading.tsx` au bon niveau de
  l'arborescence app/ pour les routes qui en ont besoin.
- **Skeletons vs spinners** : privilégier les skeletons qui reproduisent la
  structure finale (même hauteur, même largeur) pour éviter le layout shift.
- **États vides vs états de chargement** : ne jamais afficher "aucune donnée"
  pendant qu'une requête est en cours. Distinguer clairement :
  `isLoading` | `isError` | `isEmpty` | `isSuccess`.
- **Hydration mismatch** : vérifier que tout ce qui dépend de `Date.now()`,
  `Math.random()`, `window`, `localStorage` soit dans un `useEffect` ou derrière
  un `mounted` state.
- **Transitions** : utiliser `useTransition` / `startTransition` pour les
  navigations et mutations qui ne doivent pas bloquer l'UI.
- **Erreurs** : présence de `error.tsx` et `not-found.tsx` aux bons niveaux.
- **Optimistic UI** : là où c'est pertinent, utiliser `useOptimistic` pour
  éviter les allers-retours visuels.
- **FOUC** : vérifier l'absence de Flash Of Unstyled Content (CSS, fonts,
  thème sombre/clair).

### 2. 🧹 NETTOYAGE DE LA FORME
- Supprimer les imports inutilisés, variables mortes, `console.log` oubliés.
- Supprimer le code commenté obsolète (garder uniquement s'il documente une
  décision importante avec un commentaire explicite).
- Uniformiser le style : guillemets, points-virgules, indentation (via Prettier).
- Corriger les fautes de frappe dans les noms de variables et commentaires.
- Réorganiser les imports : React → Next → libs externes → internes → types.
- Extraire les constantes magiques dans des `const` nommées en haut de fichier.
- Découper les fichiers > 300 lignes en sous-composants ou hooks logiques.
- Vérifier la cohérence des noms (camelCase, PascalCase, kebab-case pour fichiers).

### 3. ⚡ OPTIMISATION DE BOUT DE CODE
- Remplacer les boucles `.map().filter()` chaînées par un seul passage quand pertinent.
- Mémoïser les calculs coûteux avec `useMemo`, les callbacks avec `useCallback`
  (UNIQUEMENT si justifié par des re-renders mesurés, pas par réflexe).
- Éviter les re-renders inutiles : vérifier les dépendances de `useEffect`.
- Remplacer les objets/tableaux inline dans les props par des références stables.
- Utiliser les Server Components par défaut, `"use client"` seulement si nécessaire.
- Remplacer `fetch` en cascade par `Promise.all` quand indépendants.
- Utiliser `next/image` pour toutes les images, `next/font` pour les polices.
- Vérifier le tree-shaking des imports (imports nommés plutôt que `*`).
- Détecter les N+1 côté client (boucles avec fetch).
- Vérifier que les `key` dans les listes sont stables et uniques (jamais l'index
  si la liste peut être réordonnée).
- Code splitting : `dynamic()` pour les composants lourds non critiques.

### 4. 🏗️ OPTIMISATION FONCTIONNELLE (architecture, sans changer le comportement)
- Regrouper la logique répétée dans des hooks custom (`useXxx`).
- Extraire les utilitaires purs dans `lib/` ou `utils/`.
- Centraliser les constantes et types partagés.
- Vérifier la cohérence des schémas de validation (Zod ou autre).
- Vérifier que les Server Actions / routes API gèrent bien les erreurs.
- Supprimer les dépendances npm non utilisées (vérifier `package.json`).
- Vérifier le typage TypeScript : supprimer les `any`, `as unknown as`, `@ts-ignore`
  (ou les justifier par un commentaire).

### 5. 🎨 COHÉRENCE VISUELLE
- Uniformiser les espacements, tailles de police, rayons, ombres via les tokens
  Tailwind (ou votre système de design).
- Vérifier les états hover/focus/active/disabled sur tous les éléments interactifs.
- Accessibilité minimale : `alt`, `aria-label`, contrastes, navigation clavier,
  `focus-visible`.
- Responsive : vérifier qu'aucun composant ne casse sur mobile/tablette.

---

## 📐 MÉTHODE DE TRAVAIL ATTENDUE

1. **Analyse d'abord, code ensuite.** Commence par me livrer un RAPPORT
   structuré listant :
   - Les problèmes détectés par fichier
   - Le niveau de criticité (critique / important / mineur)
   - La correction proposée en une phrase
   - NE MODIFIE RIEN tant que je n'ai pas validé le rapport.

2. **Une passe à la fois.** Traite un axe à la fois (d'abord loading/states,
   puis forme, puis optim, etc.). Ne mélange pas les refactors.

3. **Commits atomiques.** Si tu peux committer, fais un commit par catégorie
   avec un message clair du type :
   `refactor(loading): add Suspense boundaries on /dashboard`
   `chore(cleanup): remove unused imports in components/`

4. **Justifie chaque changement non trivial** dans le message de commit ou
   en commentaire dans le code.

5. **Tests de non-régression.** Après chaque passe, vérifie que :
   - `npm run build` passe sans erreur ni warning
   - `npm run lint` est clean
   - `npx tsc --noEmit` est clean
   - Les pages principales s'affichent sans flash ni erreur console

6. **Point d'arrêt.** Si tu rencontres un cas ambigu (logique métier floue,
   comportement étrange mais intentionnel ?), ARRÊTE-TOI et demande-moi.

---

## 🚫 INTERDICTIONS FORMELLES

- ❌ Ne PAS changer la logique métier
- ❌ Ne PAS renommer les routes, endpoints ou clés d'API
- ❌ Ne PAS changer les contrats de props des composants exportés
- ❌ Ne PAS ajouter de nouvelles features
- ❌ Ne PAS supprimer de code sans comprendre son rôle
- ❌ Ne PAS introduire de nouvelles dépendances sans me demander
- ❌ Ne PAS reformater tout le projet d'un coup (diffs illisibles)

---

## ✅ LIVRABLE FINAL ATTENDU

1. Un rapport d'audit initial (avant toute modification)
2. Les modifications appliquées par passes successives
3. Un récapitulatif final listant :
   - Nombre de fichiers touchés
   - Principaux gains (perf, lisibilité, robustesse)
   - Points laissés en suspens (avec raison)

Commence par l'étape 1 : le RAPPORT D'AUDIT. Ne touche à aucun fichier pour
l'instant.