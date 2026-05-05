'use client'
import { flagColor } from '@/components/shared/tasks/Task'
import Button from '@/components/ui/Button/Button'
import { TaskProps } from '@/types'
import { useMediaQuery } from '@reactuses/core';
import { ArrowRight, Loader } from 'lucide-react'
import React from 'react'

const MissionBoard:React.FC<{tasks: TaskProps[], refetch: (id:string)=>void}> = ({tasks, refetch}) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <div>
        {
            Boolean(tasks.length) && 
            <div>
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
                    isMobile ? 
                        <div className='md:grid md:grid-cols-2 md:gap-7 mt-10'>
                            {tasks.map(({title, deadline, budget, status})=>(
                                <div key={title} className='my-5 md:my-0 bg-white-solid p-5 rounded-md shadow-xl'>
                                    <div className='flex items-center justify-between my-2'>
                                        <p className='font-semibold w-[70%] line-clamp-1' title={title}>{title}</p>
                                        <p className='text-alizarin-crimson-red-51 font-semibold line-clamp-1 text-lg'>{budget} <small>FCFA</small> </p>
                                    </div>
                                    <p>{deadline}</p>

                                    <div className='mt-4 flex items-center gap-2'>
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
                                    <th className='px-8'>BUDGET</th>
                                    <th className='p-5 text-right pr-10'>STATUT</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tasks.map(({title, deadline, budget, status})=>(
                                    <tr key={title} className='border-b border-b-gray-300'>
                                        <td className='px-8 w-[45%] h-max py-6 font-semibold'>
                                            <p className='border-l-4 pl-3 h-max' style={{borderColor: `var(--${flagColor[status]})`}}>{title}</p>
                                        </td>
                                        <td className='text-jumbo-gray-46 px-8'>{deadline}</td>
                                        <td className='px-8'>{budget}</td>
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
                    />
                </div>
            </div>
        }
    </div>
    
  )
}

export default MissionBoard