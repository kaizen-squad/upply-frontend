'use client'
import EmptyImage from '@/components/shared/EmptyImage';
import { flagColor } from '@/components/shared/tasks/Task'
import Button from '@/components/ui/Button/Button'
import MenuListComposition from '@/components/ui/Menu/Menu';
import { budgetCurrency } from '@/hooks/useTasks';
import { formatAmount } from '@/lib/utils';
import { TaskProps } from '@/types'
import { MenuItem } from '@mui/material';
import { useMediaQuery } from '@reactuses/core';
import { ArrowRight, Check, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const MissionBoard:React.FC<{tasks: TaskProps[], loadDashboard: ()=>void}> = ({tasks, loadDashboard}) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const isMdMobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();
    const [activeFilter, setActiveFilter] = React.useState('ALL');
    const tasksFiltered = React.useMemo(()=>{ 
        if (activeFilter === 'ALL') {
            return tasks;
        }
        return tasks.filter(({status})=> status === activeFilter)
    }, [activeFilter, tasks]);

  return (
    <div>
        {
            Boolean(tasks.length) && 
            <div>
                <div className='flex items-center justify-between'>
                    <h2 className='my-3'>MISSIONS RECENTES</h2>
                    <div className="flex items-stretch gap-3 scale-90 translate-x-2">
                        <Button 
                            textContent={isMdMobile ? '' : 'Refresh'}
                            onClick={()=>loadDashboard()}
                            Icon={()=><Loader width={19} strokeWidth={3} />}
                            className="rounded-md px-3 py-2 bg-alizarin-crimson-red-51 text-white"
                            Iposition="right"
                        />
                        <MenuListComposition
                            items={[
                                {label:'Toutes les missions', key:'ALL'},
                                {label:'Ouvertes', key:'OUVERTE'},
                                {label:'En cours', key:'EN_COURS'},
                                {label:'Livrées', key:'LIVREE'},
                                {label:'Terminées', key:'VALIDEES'}
                            ]}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        />

                    </div>
                </div>

                {   
                    isMobile ? 
                        <div className='md:grid md:grid-cols-2 md:gap-7 mt-10'>
                            {
                                tasksFiltered.length === 0 && 
                                <div className='col-span-2 flex flex-col items-center py-10 bg-white-solid border border-gray-300 rounded-md'>
                                    <EmptyImage/>
                                    <p className='text-lg text-center col-span-2 text-scarpa-flow-gray-34 z-1'>Aucune mission trouvée pour ce statut</p>
                                </div>
                            }
                            {
                                tasksFiltered.length > 0 &&
                                tasksFiltered.map(({title, deadline, budget, status, id})=>(
                                    <div key={title} className='my-5 md:my-0 bg-white-solid pl-3 pr-5 py-5 rounded-md shadow-xl'>
                                        <div className='flex items-center justify-between my-2'>
                                            <button onClick={()=> router.push(`/client/tasks/${id}`)} className='font-semibold max-w-[70%] line-clamp-1 py-1 px-2 rounded-md hover:bg-gallery-gray-93 cursor-pointer text-left' title={title}>{title}</button>
                                            <p className='text-alizarin-crimson-red-51 font-semibold line-clamp-1 text-lg'>{formatAmount(budget)} <small>FCFA</small> </p>
                                        </div>
                                        <p className="ml-2">{deadline}</p>

                                        <div className='mt-4 flex items-center gap-2 ml-2'>
                                            <small className='rounded-md px-3 py-1 text-white-solid font-semibold' style={{background: `var(--${flagColor[status]})`}}>{status}</small>
                                            <hr className='border-gray-200 w-full' />
                                        </div>
                                    </div>
                            ))}
                        </div>
                        :
                        <table className='mt-10 w-full shadow-2xs border border-gray-200'>
                            <thead className='text-left text-xs bg-gallery-gray-93'>
                                <tr>
                                    <th className='p-5 pl-8'>TITRE DE LA MISSION</th>
                                    <th className='px-8'>DATE</th>
                                    <th className='px-8 min-w-max'>BUDGET ({budgetCurrency})</th>
                                    <th className='p-5 text-right pr-10'>STATUT</th>
                                </tr>
                            </thead>

                            <tbody>
                                
                                {
                                tasksFiltered.length === 0 && 
                                <tr>
                                    <td colSpan={4} className='text-center py-10 text-santa-gray'>Aucune mission trouvée pour ce statut</td>
                                </tr>
                                }
                                {
                                    tasksFiltered.length > 0 &&
                                tasksFiltered.map(({id, title, deadline, budget, status})=>(
                                    <tr key={title} className='border-b border-b-gray-300'>
                                        <td className='px-8 w-[45%] h-max py-6 font-semibold'>
                                            <button onClick={()=>router.push(`/client/tasks/${id}`)} className='w-full text-left duration-200 hover:rounded-md px-3 py-2 hover:bg-gallery-gray-93 hover:underline cursor-pointer border-l-4 h-max' style={{borderColor: `var(--${flagColor[status]})`}}>{title}</button>
                                        </td>
                                        <td className='text-jumbo-gray-46 px-8'>{deadline}</td>
                                        <td className='px-8'>{formatAmount(budget)}</td>
                                        <td className='p-5 flex justify-end pr-10'>
                                            <span className='text-white-solid py-1.5 px-2 rounded-sm text-[0.7rem] font-semibold' style={{background: `var(--${flagColor[status]})`}}>{status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }
            </div>

        }
        {
            !Boolean(tasks.length) && 
            <div className='w-full m-auto mt-20 text-center bg-white-solid border border-gray-300'>
                <div className='w-[70%] m-auto py-15'>
                    <h2 className='my-3'>Lancer un projet maintenant</h2>
                    <p className='my-3 text-santa-gray'>Décrivez votre besoin et nous trouverons le prestataire idéal pour votre mission.</p>
                    <Button
                        textContent='COMMENCER ICI'
                        Icon={ArrowRight}
                        Iposition='right'
                        className='bg-alizarin-crimson-red-51 rounded-sm py-3 px-5 text-white w-max m-auto mt-5'
                        onClick={()=> router.push('/client/tasks/new')}
                    />
                </div>
            </div>
        }
    </div>
    
  )
}

export default MissionBoard