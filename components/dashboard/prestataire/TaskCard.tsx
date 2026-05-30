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
      <div className='my-5 bg-white-solid rounded-md shadow-2xs p-5 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <small className='font-semibold uppercase line-clamp-1'>REF:MS-<span>{task.id.substring(0,10)}...</span> </small>
            <small className='rounded-sm bg-gallery-gray-93 py-1 px-3 font-semibold'>{formatFrenchDateIntl(task.deadline)}</small>
          </div>
          <button onClick={()=>{
            router.push(`/prestataire/tasks/${task.id}`)
          }} className='text-lg font-semibold rounded-sm p-2 py-1 hover:bg-gallery-gray-93 w-max mb-1 cursor-pointer duration-200'>{task.title}</button>
          <div className='flex items-center gap-3 mb-4'>
            <Image
              src={'/Assets/Cash.svg'}
              alt='cash-icon'
              width={20}
              height={20}
            />
            <p className='text-xl font-bold text-alizarin-crimson-red-51'>{formatAmount(task.budget)} {budgetCurrency}</p>
          </div>
          <Button
            textContent='Livrer le travail'
            className='rounded-md py-2 bg-alizarin-crimson-red-51 text-white-solid font-semibold min-w-max w-full'
            onClick={()=>router.push(`/prestataire/tasks/${task.id}/deliver`)}
          />
      </div>
    )
  else return (
      <div className='flex justify-between items-center bg-white-solid border p-5 my-5 lg:block xl:flex'>
        <div>
          <small className='rounded-sm bg-gallery-gray-93 py-1 px-3'>REF:MS-<span>{task.id}</span> </small>
          <div className='mt-3'>
            <p className='text-xl font-semibold w-[90%] lg:w-full xl:w-[90%]'>{task.title}</p>
            <div className='flex items-center gap-15 text-scarpa-flow-gray-34 mt-3'>
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

        <Button
          textContent='Livrer le travail'
          className='py-3 px-5 bg-alizarin-crimson-red-51 rounded-xs text-white-solid font-semibold h-max min-w-max lg:w-full lg:mt-5 xl:mt-0 xl:w-max'
          onClick={()=>router.push(`/prestataire/tasks/${task.id}/deliver`)}
        />
      </div>
  )
}

export default TaskCard