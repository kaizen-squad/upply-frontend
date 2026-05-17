# Documentation - Modalify

## Vue d'ensemble

La fonction `modalify` est un hook React qui permet d'afficher facilement des modales de confirmation avec du contenu personnalisé. Elle utilise les portals React pour rendre les modales en dehors de l'arborescence DOM principale.

## Installation et configuration

### 1. Providers setup (déjà fait dans `app/Providers.tsx`)

Le composant `Providers` enveloppe l'ensemble de l'application et initialise:
- `NotificationProvider` - pour les notifications
- `ModalProvider` - pour les modales
- `ClientAuthProvider` - pour l'authentification

```tsx
import Providers from './Providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers initialUser={user}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### 2. HTML Portals (déjà configurés)

Deux éléments DOM sont nécessaires:
- `<div id="notification-root" />` - pour les notifications
- `<div id="modal-root" />` - pour les modales

Ces éléments sont créés automatiquement dans le composant `Providers`.

## Utilisation

### Import du hook

```tsx
import { useModalify } from '@/hooks/useModalify';
```

### Utilisation basique

```tsx
'use client';

import { useModalify } from '@/hooks/useModalify';

export function MyComponent() {
  const { modalify } = useModalify();

  const handleDelete = async () => {
    modalify(
      <p>Êtes-vous sûr de vouloir supprimer cet élément?</p>,
      {
        title: 'Confirmation de suppression',
        onConfirm: async () => {
          // Votre logique de suppression
          await api.delete('/item/123');
        },
      }
    );
  };

  return <button onClick={handleDelete}>Supprimer</button>;
}
```

### Signature de la fonction

```typescript
modalify(
  children: React.ReactNode,
  options?: ModalifyOptions
): void
```

#### Paramètres

**children** (obligatoire)
- Type: `React.ReactNode`
- Description: Contenu à afficher dans la modale
- Exemple: `<p>Contenu</p>` ou n'importe quel JSX

**options** (optionnel)
```typescript
interface ModalifyOptions {
  title?: string;              // Titre de la modale
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';  // Taille
  onConfirm?: () => void | Promise<void>;     // Callback de confirmation
  onCancel?: () => void | Promise<void>;      // Callback d'annulation
}
```

## Exemples

### Exemple 1: Modale de confirmation simple

```tsx
const { modalify } = useModalify();

modalify(
  <div>
    <p>Voulez-vous continuer?</p>
  </div>,
  {
    title: 'Confirmation',
    onConfirm: () => console.log('Confirmé'),
  }
);
```

### Exemple 2: Modale avec formulaire

```tsx
const { modalify } = useModalify();

modalify(
  <form className="space-y-4">
    <input type="text" placeholder="Nom" className="w-full px-3 py-2 border" />
    <input type="email" placeholder="Email" className="w-full px-3 py-2 border" />
    <textarea placeholder="Message" className="w-full px-3 py-2 border" />
  </form>,
  {
    title: 'Nouveau formulaire',
    size: 'lg',
    onConfirm: async () => {
      // Soumettre le formulaire
    },
  }
);
```

### Exemple 3: Modale d'avertissement avec suppression

```tsx
const { modalify } = useModalify();

const handleDelete = async (itemId: string) => {
  modalify(
    <div className="text-center space-y-4">
      <div className="bg-red-100 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
        <span className="text-xl">⚠️</span>
      </div>
      <div>
        <h3 className="font-semibold">Supprimer cet élément?</h3>
        <p className="text-sm text-gray-600">Cette action ne peut pas être annulée.</p>
      </div>
    </div>,
    {
      title: 'Confirmer la suppression',
      size: 'sm',
      onConfirm: async () => {
        await apiClient.delete(`/api/items/${itemId}`);
        notification.success('Élément supprimé');
      },
    }
  );
};
```

### Exemple 4: Boutons personnalisés dans le contenu de la modale

```tsx
'use client';

import { useModalify } from '@/components/ui/Modal/hooks/useModalify';

function CustomModalContent() {
  return (
    <div className="space-y-4">
      <p>Voici un contenu personnalisé sans fermeture automatique.</p>
    </div>
  );
}

const { modalify, close } = useModalify();

const modalId = modalify(<CustomModalContent />, {
  id: 'confirm-action-modal',
  title: 'Confirmation personnalisée',
  size: 'sm',
  onConfirm: async () => {
    await apiClient.post('/api/actions/confirm');
  },
  onCancel: () => {
    console.log('Modale annulée');
  },
});

// Pour fermer la modale plus tard :
close(modalId);
```

## Architecture

### Fichiers créés

```
hooks/
├── useModal.ts              # Hook pour accéder au contexte des modales
├── useModalify.ts           # Hook principal pour afficher une modale

components/ui/Modal/
├── ModalProvider.tsx        # Fournit le contexte des modales
├── ModalPortal.tsx          # Rendu via createPortal
├── ModalContainer.tsx       # Conteneur qui affiche les modales
└── hooks/
    └── useModalManager.ts   # Gestion de l'état des modales

app/
└── Providers.tsx            # Configuration globale des providers
```

### Structure du flux

```
┌─────────────────────────────────────┐
│      App/Providers                  │
│  (initialise ModalManager)          │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   ModalProvider                     │
│   (fournit le contexte)             │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   useModalify hook                  │
│   (gère l'interface utilisateur)    │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   ModalContainer                    │
│   (affiche les modales via portal)  │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   Modale + Overlay                  │
│   (rendu dans #modal-root)          │
└─────────────────────────────────────┘
```

## API complète

### useModalify()

```typescript
const { modalify } = useModalify();
```

**Retour**: `{ modalify: Function }`

---

### useModal()

Accès bas niveau au gestionnaire de modales:

```typescript
const { modals, open, close, closeAll } = useModal();
```

**Propriétés**:
- `modals: ModalConfig[]` - Liste des modales actuellement ouvertes
- `open: (config) => void` - Ouvre une nouvelle modale
- `close: (id) => void` - Ferme une modale spécifique
- `closeAll: () => void` - Ferme toutes les modales

## Conventions et bonnes pratiques

1. **Utilisez le hook dans les composants clients**
   ```tsx
   'use client';
   import { useModalify } from '@/hooks/useModalify';
   ```

2. **Gérez les erreurs dans les callbacks**
   ```tsx
   onConfirm: async () => {
     try {
       await api.delete(...);
     } catch (error) {
       console.error('Erreur:', error);
     }
   }
   ```

3. **Utilisez les tailles appropriées**
   - `sm` - Confirmation simple
   - `md` - Contenu standard (défaut)
   - `lg` - Formulaires
   - `xl` - Grand contenu
   - `full` - Écran complet

4. **Rendez le contenu accessible**
   ```tsx
   <div role="alertdialog" aria-labelledby="modal-title">
     <h2 id="modal-title">{title}</h2>
     {children}
   </div>
   ```

## Composant Modale

### Configuration

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}
```

## Dépannage

### Erreur: "useModal doit être utilisé dans un ModalProvider"

**Cause**: Le composant n'est pas enveloppé par le `Providers` component.

**Solution**: Assurez-vous que le layout utilise le composant `Providers`:
```tsx
<Providers initialUser={user}>
  {children}
</Providers>
```

### La modale n'apparaît pas

**Causes possibles**:
1. L'élément `#modal-root` n'existe pas
2. Le composant n'est pas un composant client (`'use client'`)
3. Le `ModalProvider` n'est pas initialisé

**Solutions**:
1. Vérifiez que `Providers.tsx` est utilisé dans le layout
2. Ajoutez `'use client'` en haut du composant
3. Vérifiez la console pour les erreurs

## Performances

- Les modales utilisent les portals React pour éviter les problèmes de z-index
- Les animations utilisent CSS transitions pour fluidité
- Les états sont gérés localement avec des hooks React

## Compatibilité

- Next.js 14+ avec App Router
- React 18+
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
