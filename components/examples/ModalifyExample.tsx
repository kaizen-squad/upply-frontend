'use client';

import { useModalify } from '@/components/ui/Modal/hooks/useModalify';
import Button from '../ui/Button/Button';

/**
 * Exemple d'utilisation de la fonction modalify
 * Montre comment afficher une modale de confirmation avec du contenu personnalisé
 */
export function ModalifyExample() {
  const { modalify } = useModalify();

  const handleShowConfirmation = () => {
    modalify(
      <div className="space-y-4">
        <p className="text-gray-700">
          Êtes-vous sûr de vouloir effectuer cette action ?
        </p>
        <p className="text-sm text-gray-500">
          Cette action ne peut pas être annulée.
        </p>
      </div>,
      {
        title: 'Confirmation',
        size: 'md',
        onConfirm: async () => {
          console.log('Action confirmée');
          // Effectuer l'action ici
        },
        onCancel: () => {
          console.log('Action annulée');
        },
      }
    );
  };

  const handleShowCustom = () => {
    modalify(
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Contenu personnalisé</h3>
          <p className="mt-2 text-gray-600">
            Vous pouvez inclure n'importe quel contenu React dans la modale.
          </p>
        </div>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={4}
          />
        </form>
      </div>,
      {
        title: 'Formulaire personnalisé',
        size: 'lg',
      }
    );
  };

  const handleShowDelete = () => {
    modalify(
      <div className="space-y-4 text-center">
        <div className="bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Supprimer l'élément</h3>
          <p className="mt-2 text-gray-600">
            Cette action supprimera définitivement l'élément.
          </p>
        </div>
      </div>,
      {
        title: 'Confirmer la suppression',
        size: 'sm',
        onConfirm: async () => {
          console.log('Élément supprimé');
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <Button textContent="SHOW" onClick={handleShowConfirmation}>
        Modale de confirmation
      </Button>
      <Button textContent="Clear" onClick={handleShowCustom}>
        Modale personnalisée
      </Button>
      <Button textContent="Save" onClick={handleShowDelete}>
        Modale de suppression
      </Button>
    </div>
  );
}

export default ModalifyExample;
