'use client'
import DeliverForm from '@/components/dashboard/client/DeliverForm';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import Button from '@/components/ui/Button/Button';
<<<<<<< HEAD
import Spinner from '@/components/ui/Spinner/Spinner';
import { ApplicationResponse, TaskProps } from '@/types';
import { LockKeyhole, Zap, CircleCheck } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page= () => {
    const {tasks:[task]} = useTasksContext<ApplicationResponse>();
    const router = useRouter();

    useEffect(()=>{
        if(!task)
            return router.push('/not-found')
    }, [])

  return task ? (
    
=======
import { TaskProps } from '@/types';
import { LockKeyhole, Zap, CircleCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const page= () => {
    const {tasks:[]} = useTasksContext();
        const tasksA:TaskProps[] = [
      {
        id: 'task_001',
        client_id: 'client_001',
        prestataire_id: 'prestataire_101',
        title: 'Création API REST pour application de réservation',
        description: 'Développer une API complète avec authentification JWT, documentation Swagger, endpoints pour gérer les réservations, utilisateurs et paiements.',
        budget: 2500,
        deadline: '2026-06-15',
        status: 'EN_COURS',
        created_at: '2026-04-01T10:30:00Z',
      },
      {
        id: 'task_002',
        client_id: 'client_002',
        prestataire_id: null,
        title: 'Refonte UI/UX du tableau de bord utilisateur',
        description: 'Redesign complet de l’interface dashboard avec maquettes Figma, intégration responsive et optimisation des performances.',
        budget: 1200,
        deadline: '2026-05-30',
        status: 'OUVERTE',
        created_at: '2026-04-10T08:45:00Z',
      },
      {
        id: 'task_003',
        client_id: 'client_003',
        prestataire_id: 'prestataire_102',
        title: 'Migration base de données PostgreSQL vers MySQL',
        description: 'Migrer 500Go de données avec scripts de conversion, validation des données et mise en place de réplication.',
        budget: 3800,
        deadline: '2026-07-10',
        status: 'LIVREE',
        created_at: '2026-03-15T14:20:00Z',
      },
      {
        id: 'task_004',
        client_id: 'client_001',
        prestataire_id: null,
        title: 'Intégration du widget de paiement FedaPay',
        description: 'Intégrer FedaPay checkout.js sur la page de paiement, gérer les webhooks et implémenter l’escrow.',
        budget: 950,
        deadline: '2026-05-20',
        status: 'OUVERTE',
        created_at: '2026-04-18T09:12:00Z',
      },
      {
        id: 'task_005',
        client_id: 'client_004',
        prestataire_id: 'prestataire_103',
        title: 'Optimisation SEO pour site e-commerce',
        description: 'Audit SEO technique, optimisation des balises, amélioration des temps de chargement, création de backlinks.',
        budget: 700,
        deadline: '2026-05-25',
        status: 'EN_COURS',
        created_at: '2026-04-05T11:05:00Z',
      },
      {
        id: 'task_006',
        client_id: 'client_005',
        prestataire_id: 'prestataire_104',
        title: 'Développement d’un plugin WordPress sur mesure',
        description: 'Plugin de synchronisation des produits entre WooCommerce et un ERP externe via API REST.',
        budget: 1800,
        deadline: '2026-06-30',
        status: 'VALIDEE',
        created_at: '2026-03-20T16:30:00Z',
      },
      {
        id: 'task_007',
        client_id: 'client_006',
        prestataire_id: null,
        title: 'Tests de sécurité et pentest applicatif',
        description: 'Réaliser des tests d’intrusion, fournir un rapport de vulnérabilités avec recommandations.',
        budget: 2200,
        deadline: '2026-06-01',
        status: 'OUVERTE',
        created_at: '2026-04-12T13:47:00Z',
      },
      {
        id: 'task_008',
        client_id: 'client_002',
        prestataire_id: 'prestataire_105',
        title: 'Création de contenu vidéo pour formation React',
        description: 'Produire 5 tutoriels vidéo (10-15 min) sur React.js avec montage, sous-titres et miniatures.',
        budget: 850,
        deadline: '2026-05-18',
        status: 'LIVREE',
        created_at: '2026-04-02T10:00:00Z',
      },
      {
        id: 'task_009',
        client_id: 'client_007',
        prestataire_id: 'prestataire_106',
        title: 'Mise en place CI/CD avec GitHub Actions',
        description: 'Configurer des pipelines automatiques de test, linting, build et déploiement sur Vercel.',
        budget: 1100,
        deadline: '2026-05-12',
        status: 'VALIDEE',
        created_at: '2026-03-28T09:23:00Z',
      },
      {
        id: 'task_010',
        client_id: 'client_008',
        prestataire_id: null,
        title: 'Design d’une application mobile fitness',
        description: 'Création des maquettes UI/UX, design system et prototypes interactifs pour iOS/Android.',
        budget: 1450,
        deadline: '2026-06-20',
        status: 'OUVERTE',
        created_at: '2026-04-20T15:15:00Z',
      },
    ];
    const task = tasksA[0];

  return (
>>>>>>> 49d1066 (Added delivery page and submission for prestataire)
    <div className='py-10'>
        <h1>Soumettre mon Livrable</h1>
        <p>Complétez les informations ci-dessous pour valider la livrables.</p>

        <div className='border-2 mt-7'>
            <h2 className='my-6 ml-5'>Récapitulatif de la tache</h2>
            <div className='md:flex justify-between items-center px-6 py-2 pb-6 lg:p-6 md:bg-gallery-gray-93'>
                <div className='w-full md:w-[60%] lg:w-max'>
                    <small className='hidden md:block'>Mission</small>
                    <p className='font-semibold '>{task?.title ?? ''}</p>
                </div>
                <div className='rounded-lg bg-gallery-gray-93 py-3 px-5 flex justify-between items-center mt-4 md:block md:bg-transparent md:p-0'>
                    <small className='text-[0.9rem] font-semibold md:text-xs'>Montant sécurisé (Escrow)</small>
                    <p className='text-alizarin-crimson-red-51 text-3xl font-black'>{task?.budget ?? ''}</p>
                </div>
            </div>
        </div>

        <div className='p-6 border-2 mt-6 bg-white-solid'>
<<<<<<< HEAD
            <DeliverForm task_id={task?.id} />
=======
            <DeliverForm task_id={task.id} />
>>>>>>> 49d1066 (Added delivery page and submission for prestataire)
        </div>
        
        <div className='border-2 bg-white-solid flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 xl:grid-rows-1 xl:grid-cols-3 gap-5 mt-5 p-5'>
            <div className='border-l-5 border-l-alizarin-crimson-red-51 rounded-sm p-3 shadow-[2px_2px_2px_0px] shadow-gray-300 flex items-center'>
                <div className='p-5 rounded-sm bg-gallery-gray-93 border border-gray-100'>
                    <div className='flex items-center gap-2'>
                        <LockKeyhole className='text-alizarin-crimson-red-51' /> 
                        <p className='font-semibold'>Fonds sécurisés</p>
                    </div> 
                    <p className='text-santa-gray mt-3'>Les fonds pour cette mission (25,000 FCFA) sont actuellement conservés en toute sécurité dans l'escrow FedaPay.</p>
                </div>
            </div>
                
            <div className='p-5 rounded-sm bg-woodsmoke-gray-8'>
                <p className='text-alizarin-crimson-red-51 font-bold'>Prochaines étapes</p>
                <div className='text-white mt-5'>
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Validation de la livraison</p>  
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Revue par le client.</p> 
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Approbation du travail</p> 
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Déblocage des fonds</p>
                </div>
            </div>

            <div className='p-5 rounded-sm bg-woodsmoke-gray-8 text-white-solid lg:col-start-1 lg:col-end-3 lg:w-[60%] lg:m-auto xl:col-start-3 xl:w-full'>
                <Zap className='stroke-2 text-white' />
                <p className='font-semibold mt-2'>Accélerez vos missions</p>
                <p className='my-3'>Boostez la visibilité de vos taches pour un recrutement 2x plus rapide.</p>
                <Button textContent='En savoir plus' className='text-alizarin-crimson-red-51 font-semibold mt-3' />
            </div>

        </div>
    </div>
<<<<<<< HEAD
  ) : 
  (
    <div className="h-(--main-height) w-full flex">
        <div className="flex gap-3 items-center w-max h-max m-auto">
            <Spinner/>
            <p>Loading..</p>
        </div>
        
    </div>
=======
>>>>>>> 49d1066 (Added delivery page and submission for prestataire)
  )
}

export default page