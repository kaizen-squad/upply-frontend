import { flagColor } from '@/components/tasks/Task'
import { TaskProps } from '@/types'
import React from 'react'

const MissionBoard:React.FC<{tasks: TaskProps[]}> = ({tasks}) => {

  return (
    <div>
        {
            Boolean(tasks.length) && 
            <div>
                <table className='mt-10 w-full shadow-2xs border border-gray-200 hidden lg:block'>
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
                            <tr className='border-b border-b-gray-300'>
                                <td className='px-8 w-[45%] h-max py-6 font-semibold'>
                                    <p className='border-l-4 pl-3' h-max style={{borderColor: `var(--${flagColor[status]})`}}>{title}</p>
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
                
                <div className='block md:grid md:grid-cols-2 md:gap-7 lg:hidden mt-10'>
                    {tasks.map(({title, deadline, budget, status})=>(
                        <div className='my-5 md:my-0 bg-white-solid p-5 rounded-md shadow-xl'>
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
            </div>

        }
        {
            !Boolean(tasks.length) && 
            <div className='w-max m-auto mt-20'>
                {/* Etat vide en attente de design */}
                <h2>Créez une mission pour en suivre l'activité.</h2>
            </div>
        }
    </div>
    
  )
}

export default MissionBoard