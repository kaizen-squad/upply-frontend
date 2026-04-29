'use client'
import FlagTask from "@/components/tasks/FlagTask";
import { useTasks } from "@/hooks/useTasks";
import { formatFrenchDateIntl, formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import ApplicationForm from "@/components/dashboard/prestataire/ApplicationForm";
import Spinner from "@/components/ui/Spinner/Spinner";
import { TaskProps } from "@/types";

const page: React.FC<{params:Promise<{id:string}>}> = ({params}) => {
    const {tasks:[], refetch, loading} = useTasks(undefined, true);
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

    useEffect(()=>{
      const getTask = async()=> {
        const {id}= await params;
        refetch(id)
      }
      getTask();
    }, [params]);

  return (
    <div className="py-10">
        {/* While loading */}
        {
          loading && 
          <div className=" h-(--main-height) w-full flex">
              <div className="flex items-center gap-2 h-max m-auto">
                <Spinner/> 
                <p>Loading...</p>
              </div>
          </div>
        }

        {/* When it's ok */}
        {
          (!loading && task) &&
          <div>

            <div className="hidden md:block">
              <FlagTask status={task.status} />
              <h1 className="mt-3">{task.title}</h1>
              <p className="my-2 text-scarpa-flow-gray-34">{formatRelativeTime(task.created_at ?? '')}</p>
            </div>

            <div className="block bg-white md:hidden p-5 border border-gray-200 shadow-2xs rounded-sm">
              <div className="flex justify-between items-center">
                <FlagTask status={task.status} />
                <div className="w-max text-right">
                  <small className="text-scarpa-flow-gray-34 font-semibold">BUDGET</small>
                  <p className="text-alizarin-crimson-red-51 font-black text-2xl">{task.budget}</p>
                </div>
              </div>
              
              <h1 className="my-3">{task.title}</h1>
              <hr className="border border-gray-100 my-6" />

              <small className="text-scarpa-flow-gray-34 font-semibold">DATE LIMITE</small>
              <div className="flex items-center gap-1 mt-1p">
                <Image
                  width={15}
                  height={15}
                  alt="deadline-icon"
                  src={'/Assets/Deadline_icon.svg'}
                />
                <p>{formatFrenchDateIntl(task.deadline)}</p>
              </div>
            </div>
            

            <div className="mt-7 grid xl:grid-cols-[60%_38%] lg:gap-[2%] gap-7">
              {/* left */}
                <div>
                    <div className="hidden md:grid grid-cols-2 bg-white border-2 text-center">
                        <div className="py-10 px-12">
                           <small className="text-scarpa-flow-gray-34">REMUNERATION</small>
                           <p className="text-alizarin-crimson-red-51 font-black mt-2 text-2xl">{task.budget}</p>
                        </div>
                        <div className="py-10 px-12 border-l-2">
                          <small className="text-scarpa-flow-gray-34">DEADLINE</small>
                          <p className="font-black mt-2 text-2xl">{formatFrenchDateIntl(task.deadline).toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="p-5 shadow-[5px_5px_1px_0] border border-gray-200 border-l-6 border-l-alizarin-crimson-red-51 bg-white md:mt-10 shadow-gallery-gray-93">
                       <h2>Description de la Mission</h2>
                       <p className="text-scarpa-flow-gray-34 mt-10">{task.description}</p>
                    </div>

                </div>

              {/* Right */}
                <div className="flex flex-col gap-7">
                  <ApplicationForm task={tasksA[0]} />
                  <div className="bg-woodsmoke-gray-10 p-5">
                      <div className="flex items-center gap-4 text-white">
                         <div className="px-4 py-2 bg-alizarin-crimson-red-51 font-black">U</div>
                         <div>
                            <small className="text-santa-gray">CLIENT VERIFIE</small>
                            <p className="font-bold">Upply Logistique Hub</p>
                         </div>
                      </div>
                      <Image
                            src={'/Assets/NotationUpply.svg'}
                            width={500}
                            height={500}
                            alt="notation-upply"
                            className="my-3"
                         />
                      <p className="text-santa-gray">Plus de 500 missions complétées avec succès sur la plateforme. Paiement garanti sous 24h après validation.</p>
                  </div>
                </div>
            </div>
          </div>
        }

        {/* When ther is error */}
        
        { 
          !task?.id &&
          <div className="h-(--main-height) flex w-full">
            <div className="w-full h-max m-auto -translate-y-15">
              <Image 
                src={'/Assets/Empty_Desktop.svg'}
                width={200}
                height={200}
                alt="empty-page"
                className="m-auto scale-200"
               />
              <h1 className="text-center h-max m-auto mt-5">This task doesn't exist or has been removed!</h1>
            </div>
          </div>
        }
    </div>
  )
}

export default page