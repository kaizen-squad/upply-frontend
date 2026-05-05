'use client'
import MissionBoard from '@/components/dashboard/client/MissionBoard';
import Button from '@/components/ui/Button/Button';
import Spinner from '@/components/ui/Spinner/Spinner';
import { useTasks } from '@/hooks/useTasks';
import { BookOpenCheck, Lightbulb, Plus, Zap } from 'lucide-react';

const page = () => {
    const {tasks, loading, refetch} = useTasks('mine');
    const formatNumber = (number:number) => {
        return number < 10 ? `0${number}` : number;
    }
  return (
    
    <div className='block grid-cols-[67%_3%_30%] m-auto w-[90%] lg:w-[95%] lg:m-auto xl:grid'>
        <div>
            <div className='md:flex items-center justify-between'>
                <div>
                    {
                        loading ? 
                        <div>
                            <p className='h-10 rounded-md bg-gray-200 w-50 animate-pulse lg:mt-3 mb-2'></p> 
                            <p  className='h-7 rounded-md bg-gray-200 w-80 animate-pulse lg:mt-3'></p>
                        </div>
                            
                        : (
                            Boolean(tasks.length) ? 
                            <div>
                                <h1>VUE D'ENSEMBLE</h1>
                                <p className='text-santa-gray text-[0.9rem] mt-2 lg:text-md'>Suivi en temps réel de votre activité opérationnelle.</p>
                            </div>  : 
                            <div>
                                <h1>Prêt à déléguer votre première tâche ?</h1>
                                <p className='text-santa-gray text-[0.9rem] mt-2 lg:text-md'>Votre tableau de bord est prêt à recevoir vos projets.</p>
                            </div>
                        )
                        }
                    
                </div>

                {
                    (!loading && Boolean(tasks.length)) &&
                    <Button 
                        textContent='NOUVELLE MISSION'
                        Icon={Plus}
                        className='min-w-max px-5 py-3 rounded-sm bg-alizarin-crimson-red-51 font-medium text-white-solid scale-80 hover:scale-77 duration-200 hidden md:flex'
                    />
                }          
            </div>

            <div className='lg:grid-cols-3 lg:gap-8 gap-5 mt-10 grid'>
                <div 
                className='border-l-7 border-l-scorpion-gray-37 flex items-center justify-between lg:block rounded-sm bg-white-solid p-5 lg:border-2 lg:border-gray-200 shadow-2xs' 
                >
                    <small className='text-jumbo-gray-46 font-semibold'>MISSIONS OUVERTES</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold lg:mt-3 text-alizarin-crimson-red-51'>{formatNumber(tasks.filter(({status})=>status==='OUVERTE').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse lg:mt-3'></p> 
                    }
                    
                </div>
                <div className='border-l-7 border-l-orange-alert flex items-center justify-between lg:block rounded-sm bg-white-solid p-5 lg:border-2 lg:border-gray-200 shadow-2xs'>
                    <small className='text-jumbo-gray-46 font-semibold' >EN COURS</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold lg:mt-3'>{formatNumber(tasks.filter(({status})=>status==='EN_COURS').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse lg:mt-3'></p> 
                    }
                </div>
                <div className='border-l-7 border-l-green-success flex items-center justify-between lg:block rounded-sm bg-white-solid p-5 lg:border-2 lg:border-gray-200 shadow-2xs'>
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
                
                {
                    !loading ?
                        <MissionBoard tasks={tasks} refetch={refetch} />
                    :
                        <div className='flex items-center gap-5 w-max m-auto mt-10'>
                            {/* En attendant l'etat de chargement designé */}
                            <Spinner/>
                            <small className='text-lg font-semibold'>Loading tasks...</small>
                        </div>
                }
                
            </div>
        </div>
        <div></div>

        <div>
            {
                Boolean(tasks.length) &&
               <div className='grid grid-cols-2 gap-5 lg:block'>
                    <div className='px-5 py-8 bg-woodsmoke-gray-8 rounded-sm h-max md:max-w-[85%] xl:w-full md:w-max mt-10 mx-auto'>
                        <Zap stroke='white' strokeWidth={2}/>
                        <h3 className='my-2 text-white-solid'>Optimisez votre annonce</h3>
                        <p className='text-santa-gray'>Une description détaillée avec des étapes claires augmente vos chances de recevoir des candidatures qualifiées de 40%. N'hésitez pas à joindre des fichiers de référence pour guider les prestataires.</p>  
                    </div>

                    <div className='px-5 py-8 bg-woodsmoke-gray-8 rounded-sm h-max md:max-w-[85%] xl:w-full md:w-max mt-10 mx-auto'>
                        <Zap stroke='white' strokeWidth={2}/>
                        <h3 className='my-2 text-white-solid'>Notez vos prestaires</h3>
                        <p className='text-santa-gray'>Évaluez vos prestataires avec justesse. Un retour constructif après chaque mission aide la communauté à identifier les meilleurs talents et améliore la qualité globale des livrables sur Upply.</p>  
                    </div>

                    <div className='px-5 py-8 bg-woodsmoke-gray-8 rounded-sm h-max md:max-w-[85%] xl:w-full md:w-max mt-10 mx-auto'>
                        <div className='flex items-center gap-2'>
                            <Lightbulb className='text-orange-500'/>
                            <h3 className='my-2 text-white-solid'>Optimisez votre annonce</h3>
                        </div>
                        <p className='text-santa-gray'>Comparez les notes et les expériences passées des candidats. Un candidat avec une expérience spécifique dans l'e-commerce garantira souvent de meilleurs résultats pour cette mission..</p>  
                    </div>
                </div> 
            }
            
            {
                (!loading && !Boolean(tasks.length)) &&
                <div className='flex h-full mt-10 xl:m-0'>
                    <div className='h-max m-auto'>
                        <div className='bg-white-solid border-2 border-gray-300'>
                            <div className='flex items-center gap-3 py-5 px-5'>
                                <BookOpenCheck width={30} className='text-orange-500'/>
                                <h2>Guide de démarrage</h2>
                            </div>
                            <hr className='w-full border-gray-200' />

                            <div className='px-5 py-5'>
                                {
                                    [
                                        {textLeft:'COMPTE', textRight:"100'", bg:'#E31A1C', color:''},
                                        {textLeft:'PROFIL', textRight:"80'", bg:'linear-gradient(to right, #1A1A1A 80%, #EEE 20%)', color:''},
                                        {textLeft:'MISSION', textRight:"0'", bg:'#EEE', color: 'var(--alizarin-crimson-red-51)'}
                                    ].map(({textLeft, textRight, bg, color}, index)=> <div key={`${textLeft}-${index}`} className='my-3'>
                                        <div className='flex items-center justify-between mb-1' style={{color:color}}>
                                            <small className='font-semibold'>{textLeft}</small>
                                            <p className='text-santa-gray' style={{color:color}}>{textRight}</p>
                                        </div>
                                        <div className='h-1.5 w-full border-2 border-gray-300' style={{background: bg}}></div>
                                    </div>)
                                } 
                            </div>
                        </div>

                        <div className='bg-white-solid border-2 border-gray-300 mt-5'>
                            <div className='flex items-center gap-2 p-5 '>
                                <Lightbulb className='text-orange-500'/>
                                <h3 className='my-2'>Le saviez-vous?</h3>
                            </div>
                            <p className='p-5 bg-gallery-gray-93'>Upply assure une transparence totale de vos transactions. Chaque étape de la facturation est sécurisée garantissant une fiabilité à 100%</p>
                        </div>
                      
                    </div>
                </div>
            }
        </div>     
    </div>
  )
}

export default page