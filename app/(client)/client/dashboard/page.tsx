'use client'
import MissionBoard from '@/components/dashboard/client/MissionBoard';
import { flagColor } from '@/components/tasks/Task';
import Button from '@/components/ui/Button/Button';
import Spinner from '@/components/ui/Spinner/Spinner';
import { useTasks } from '@/hooks/useTasks';
import { TaskProps } from '@/types';
import { Loader, Plus, RotateCw, Zap } from 'lucide-react';

const page = () => {
    const {tasks, loading, refetch} = useTasks('mine');

 const mockTasks: TaskProps[] = [
  {
    id: "task_001",
    client_id: "client_001",
    prestataire_id: "prestataire_101",
    title: "Création d'une API REST pour plateforme e-commerce",
    description: "Développer une API REST complète avec authentification JWT, documentation Swagger, et endpoints pour la gestion des produits et commandes.",
    budget: 1500,
    deadline: "2026-05-15",
    status: "EN_COURS"
  },
  {
    id: "task_002",
    client_id: "client_002",
    prestataire_id: null,
    title: "Design UI/UX pour application mobile fitness",
    description: "Créer le design complet d'une application mobile fitness (iOS/Android) avec maquettes Figma, système de design, et prototypes interactifs.",
    budget: 800,
    deadline: "2026-04-30",
    status: "OUVERTE"
  },
  {
    id: "task_003",
    client_id: "client_003",
    prestataire_id: "prestataire_102",
    title: "Migration base de données PostgreSQL vers MySQL",
    description: "Migrer une base de données de 500GB avec scripts de conversion, validation des données, et optimisation des performances.",
    budget: 2500,
    deadline: "2026-05-20",
    status: "LIVREE"
  },
  {
    id: "task_004",
    client_id: "client_001",
    prestataire_id: "prestataire_103",
    title: "Intégration API de paiement Stripe",
    description: "Intégrer Stripe Connect pour permettre les paiements entre utilisateurs, gérer les webhooks, et implémenter le système d'escrow.",
    budget: 1200,
    deadline: "2026-04-25",
    status: "VALIDEE"
  },
  {
    id: "task_005",
    client_id: "client_004",
    prestataire_id: null,
    title: "Optimisation SEO pour site vitrine",
    description: "Audit SEO complet, optimisation des balises, amélioration des performances, et création de backlinks pour un site e-learning.",
    budget: 600,
    deadline: "2026-05-10",
    status: "OUVERTE"
  },
  {
    id: "task_006",
    client_id: "client_005",
    prestataire_id: "prestataire_104",
    title: "Développement plugin WordPress personnalisé",
    description: "Créer un plugin de réservation pour WordPress avec gestion des disponibilités, notifications email, et interface d'administration.",
    budget: 950,
    deadline: "2026-05-05",
    status: "EN_COURS"
  },
  {
    id: "task_007",
    client_id: "client_002",
    prestataire_id: "prestataire_105",
    title: "Tests de sécurité et pénétration",
    description: "Réaliser des tests d'intrusion sur une application web, fournir un rapport détaillé des vulnérabilités et recommandations.",
    budget: 2000,
    deadline: "2026-04-28",
    status: "LIVREE"
  },
  {
    id: "task_008",
    client_id: "client_006",
    prestataire_id: null,
    title: "Création de contenu vidéo formation technique",
    description: "Produire 5 vidéos tutorielles sur React.js (10-15 min chacune) avec montage, sous-titres, et miniatures personnalisées.",
    budget: 750,
    deadline: "2026-06-01",
    status: "OUVERTE"
  },
  {
    id: "task_009",
    client_id: "client_003",
    prestataire_id: "prestataire_106",
    title: "Configuration CI/CD avec GitHub Actions",
    description: "Mettre en place des pipelines CI/CD automatisés avec tests, linting, build, et déploiement sur Vercel/AWS.",
    budget: 1100,
    deadline: "2026-05-12",
    status: "VALIDEE"
  },
  {
    id: "task_010",
    client_id: "client_007",
    prestataire_id: "prestataire_107",
    title: "Refonte architecture microservices",
    description: "Refactoriser une application monolithique en microservices avec Docker, Kubernetes, et mise en place d'un API Gateway.",
    budget: 3500,
    deadline: "2026-06-15",
    status: "EN_COURS"
  }
];
    const formatNumber = (number:number) => {
        return (number < 10 && number!== 0) ? `0${number}` : number;
    }
  return (
    <div className='block grid-cols-[67%_3%_30%] m-auto w-[90%] lg:w-full lg:pl-10 xl:grid'>
        <div>
            <div className='md:flex items-center justify-between'>
                <div>
                    <h1>VUE D'ENSEMBLE</h1>
                    <p className='text-santa-gray text-[0.9rem] mt-2 lg:text-md'>Suivi en temps réel de votre activité opérationnelle.</p>
                </div>

                <Button 
                    textContent='NOUVELLE MISSION'
                    Icon={Plus}
                    className='min-w-max px-5 py-3 rounded-sm bg-alizarin-crimson-red-51 font-medium text-white-solid scale-80 hover:scale-77 duration-200 hidden md:flex'
                />          
            </div>

            <div className='lg:grid-cols-3 lg:gap-8 gap-5 mt-10 grid'>
                <div 
                className='border-l-7 flex items-center justify-between lg:block rounded-sm bg-white-solid p-5 lg:border-2 lg:border-l-7 border-gray-200 shadow-2xs' 
                style={{borderLeftColor: `var(--${flagColor.OUVERTE})`}}>
                    <small className='text-jumbo-gray-46 font-semibold'>MISSIONS OUVERTES</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold lg:mt-3 text-alizarin-crimson-red-51'>{formatNumber(tasks.filter(({status})=>status==='OUVERTE').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse lg:mt-3'></p> 
                    }
                    
                </div>
                <div className='border-l-7 flex items-center justify-between lg:block rounded-sm bg-white-solid p-5 lg:border-2 border-gray-200 shadow-2xs lg:border-l-7' style={{borderLeftColor: `var(--${flagColor.EN_COURS})`}}>
                    <small className='text-jumbo-gray-46 font-semibold' >EN COURS</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold lg:mt-3'>{formatNumber(tasks.filter(({status})=>status==='EN_COURS').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse lg:mt-3'></p> 
                    }
                </div>
                <div className='border-l-7 flex items-center justify-between lg:block rounded-sm bg-white-solid p-5 lg:border-2 border-gray-200 shadow-2xs lg:border-l-7' style={{borderLeftColor: `var(--${flagColor.VALIDEE})`}}>
                    <small className='text-jumbo-gray-46 font-semibold' >TERMINEES</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold lg:mt-3'>{formatNumber(tasks.filter(({status})=>status==='VALIDEE').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse lg:mt-3'></p> 
                    }
                </div>
            </div>

            <div className='mt-15'>
                <div className='flex items-center justify-between'>
                    <h2 className='my-3'>MISSIONS RECENTES</h2>
                    <button 
                        className='flex bg-alizarin-crimson-red-51 rounded-md text-white-solid font-semibold text-xl items-center px-4 py-2 gap-3 scale-80 cursor-pointer duration-200 hover:opacity-80 hover:scale-77'
                        onClick={()=>refetch('mine')}
                    >
                        <span className=''>Refresh</span>
                        <Loader width={19} strokeWidth={3} />
                    </button>
                </div>
                {
                    !loading ?
                        <MissionBoard tasks={mockTasks}/>
                    :
                        <div className='flex items-center gap-5 w-max m-auto mt-10'>
                            {/* En attendant l'etat de chartgement designé */}
                            <Spinner/>
                            <small className='text-lg font-semibold'>Loading tasks...</small>
                        </div>
                }
                
            </div>
        </div>
        <div></div>
        <div className='px-5 py-8 bg-woodsmoke-gray-8 rounded-sm h-max md:max-w-[85%] xl:w-full md:w-max mt-10 mx-auto'>
            <Zap stroke='white' strokeWidth={2}/>
            <h3 className='my-2 text-white-solid'>Accélerez vos missions</h3>
            <p className='text-santa-gray'>Boostez la visibilité de vos taches pour un recrutement 2x plus rapide.</p>  
            <Button
                textContent='EN SAVOIR PLUS'
                className='text-xs text-alizarin-crimson-red-51 mt-2'
            />
        </div>
            
    </div>
  )
}

export default page