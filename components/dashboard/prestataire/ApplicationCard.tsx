import { ApplicationCardProps } from '@/types'
import { FC } from 'react'
import FlagApplication from './FlagApplication'
import { budgetCurrency } from '@/hooks/useTasks'
import { formatAmount, formatFrenchDateIntl } from '@/lib/utils'
import { useMediaQuery } from '@reactuses/core';

const ApplicationCard: FC<{application: ApplicationCardProps}> = ({application:{task,status, created_at}}) => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  if(isMobile){
    return (
      <div className="p-4 rounded-lg bg-white-solid flex justify-between items-center border-gray-200 border gap-5">
          <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-[0.9rem] text-scarpa-flow-gray-34 mt-1">Soumis le {formatFrenchDateIntl(created_at.substring(0,10))}</p>
          </div>
          <FlagApplication status={status} />
      </div>
    )
  }
  else return (
    <div className='bg-white border p-5'>
       <div className='flex items-center justify-between flex-wrap-reverse gap-5 lg:gap-2'>
            <p className='font-bold line-clamp-2'>{task.title}</p>
            <div className='self-end'><FlagApplication status={status} /></div>
       </div>
       <div className='flex items-center w-full justify-between lg:flex-col lg:items-start lg:text-[0.9rem] xl:text-md xl:items-center xl:flex-row mt-3'>
            <p className='text-scarpa-flow-gray-34 lg:w-full lg:flex lg:justify-between lg:items-center xl:w-max'><span className='hidden lg:inline xl:hidden '>Soumis le </span> <span>{formatFrenchDateIntl(created_at.substring(0,10))}</span> </p>
            <p className='font-semibold lg:w-full lg:flex lg:justify-between lg:items-center xl:w-max'> <span className='hidden lg:inline xl:hidden'>Budget </span> <span>{formatAmount(task.budget)} {budgetCurrency}</span></p>
       </div>                                       
    </div>
  )
}

export default ApplicationCard