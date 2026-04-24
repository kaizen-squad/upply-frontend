'use client'
import MissionBoard from '@/components/dashboard/client/MissionBoard';
import Button from '@/components/ui/Button/Button';
import Spinner from '@/components/ui/Spinner/Spinner';
import { useTasks } from '@/hooks/useTasks';
import { Loader, Plus, RotateCw, Zap } from 'lucide-react';

const page = () => {
    const {tasks, loading, refetch} = useTasks('mine');
    const formatNumber = (number:number) => {
        return (number < 10 && number!== 0) ? `0${number}` : number;
    }
  return (
    <div className='grid grid-cols-[65%_25%] gap-25'>
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h1>VUE D'ENSEMBLE</h1>
                    <p>Suivi en temps réel de votre activité opérationnelle.</p>
                </div>
                <Button 
                    textContent='NOUVELLE MISSION'
                    Icon={Plus}
                    className='px-5 py-3 rounded-sm bg-alizarin-crimson-red-51 font-medium text-white-solid'
                />          
            </div>

            <div className='grid grid-cols-3 gap-8 mt-10'>
                <div className='rounded-sm bg-white-solid p-5 border-2 border-gray-200 shadow-2xs'>
                    <small className='text-jumbo-gray-46 font-semibold'>MISSIONS OUVERTES</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold mt-3'>{formatNumber(tasks.filter(({status})=>status==='OUVERTE').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse mt-3'></p> 
                    }
                    
                </div>
                <div className='rounded-sm bg-white-solid p-5 border-2 border-gray-200 shadow-2xs'>
                    <small className='text-jumbo-gray-46 font-semibold'>EN COURS</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold mt-3'>{formatNumber(tasks.filter(({status})=>status==='EN_COURS').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse mt-3'></p> 
                    }
                </div>
                <div className='rounded-sm bg-white-solid p-5 border-2 border-gray-200 shadow-2xs'>
                    <small className='text-jumbo-gray-46 font-semibold'>TERMINEES</small>
                    {
                        !loading ? 
                            <p className='text-4xl font-bold mt-3'>{formatNumber(tasks.filter(({status})=>status==='VALIDEE').length)}</p>
                        : 
                            <p className='h-10 rounded-md bg-gray-200 w-25 animate-pulse mt-3'></p> 
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
                        <MissionBoard tasks={tasks}/>
                    :
                        <div className='flex items-center gap-5'>
                            {/* En attendant l'etat de chartgement designé */}
                            <Spinner/>
                            <small className='text-lg font-semibold'>Loading tasks...</small>
                        </div>
                }
                
            </div>
        </div>

        <div className='px-5 py-8 bg-woodsmoke-gray-8 rounded-sm h-max'>
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