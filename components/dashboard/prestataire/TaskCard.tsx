import { TaskProps } from '@/types'
import { FC } from 'react'
import { formatAmount, formatFrenchDateIntl } from '@/lib/utils';
import { budgetCurrency } from '@/hooks/useTasks';
import Button from '@/components/ui/Button/Button';
import { useMediaQuery } from '@reactuses/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TaskCard:FC<{task:TaskProps}> = ({task}) => {
  const isMobile = useMediaQuery('(max-width: 650px)')
  const router = useRouter();
  if(isMobile)
    return (
      <div className='my-5 bg-white-solid rounded-sm shadow-2xs p-5 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <small className='uppercase line-clamp-1'>REF:MS-<span>{task.id.substring(0,10)}...</span> </small>
            <div className='flex items-center gap-2'>
              {
                task.status === 'LIVREE' &&
                <div className='flex items-center justify-end'>
                  <small className='text-white rounded-sm py-0.5 px-2 bg-yellow'>En attente de validation</small>
                </div>
              }
              {
                task.status === 'VALIDEE' &&
                <div className='flex items-center justify-end'>
                  <small className='text-white rounded-sm py-0.5 px-2 bg-green-success'>Mission validée</small>
                </div>
              }              
              <small className='rounded-sm bg-gallery-gray-93 py-1 px-3 font-semibold'>{formatFrenchDateIntl(task.deadline)}</small>
            </div>
          </div>
          <button onClick={()=>{
            router.push(`/prestataire/tasks/${task.id}`)
          }} className='text-lg font-semibold rounded-sm hover:px-2 py-1 hover:bg-gallery-gray-93 w-max mb-1 cursor-pointer duration-200'>{task.title}</button>
          <div className='flex items-center gap-3 mb-4'>
            <Image
              src={'/Assets/Cash.svg'}
              alt='cash-icon'
              width={20}
              height={20}
            />
            <p className='text-xl font-bold text-alizarin-crimson-red-51'>{formatAmount(task.budget)} {budgetCurrency}</p>
          </div>
          {
            task.status === 'EN_COURS' &&
            <Button
            textContent='Livrer le travail'
            className='rounded-md py-2 bg-alizarin-crimson-red-51 text-white-solid font-semibold min-w-max w-full'
            onClick={()=>router.push(`/prestataire/tasks/${task.id}/deliver`)}
          />
          }
      </div>
    )
  else return (
      <div className='w-full flex justify-between rounded-sm items-center bg-white-solid border p-5 my-5 lg:block xl:flex'>
        <div className='w-full'>
          <div className='w-full flex items-stretch justify-between '>
            <small className='rounded-sm bg-gallery-gray-93 py-1 px-3'>REF:MS-<span>{task.id.substring(0,10)}...</span> </small>
            {
              task.status === 'LIVREE' &&
              <small className='text-white rounded-sm py-0.5 px-2 bg-yellow flex items-center'>En attente de validation</small>
            }
            {
              task.status === 'VALIDEE' &&
              <small className='text-white rounded-sm  px-2 bg-green-success flex items-center py-0.5'>Mission validée</small>
            }              
            
          </div>
          <div className='mt-3 w-full'>
            <button onClick={()=>{
              router.push(`/prestataire/tasks/${task.id}`)
            }} className='text-lg font-semibold rounded-sm hover:px-2 py-1 hover:bg-gallery-gray-93 w-max cursor-pointer duration-200'>{task.title}</button>           
             <div className='flex items-center gap-15 text-scarpa-flow-gray-34 mt-3 w-full jus'>
                <div>
                  <small className='font-semibold'>DEADLINE</small>
                  <p>{formatFrenchDateIntl(task.deadline)}</p>
                </div>
                <div>
                  <small className='font-semibold'>BUDGET</small>
                  <p>{formatAmount(task.budget)} {budgetCurrency}</p>
                </div>
            </div>
          </div>
        </div>
        {
          task.status === 'EN_COURS' &&        
            <Button
              textContent='Livrer le travail'
              className='py-3 px-5 bg-alizarin-crimson-red-51 rounded-xs text-white-solid font-semibold h-max min-w-max lg:w-full lg:mt-5 xl:mt-0 xl:w-max'
              onClick={()=>router.push(`/prestataire/tasks/${task.id}/deliver`)}
            />
        }
      </div>
  )
}

export default TaskCard