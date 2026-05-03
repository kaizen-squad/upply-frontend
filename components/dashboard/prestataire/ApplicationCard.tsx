import { ApplicationCardProps } from '@/types'
import { FC } from 'react'
import FlagApplication from './FlagApplication'
import { budgetCurrency } from '@/hooks/useTasks'

const ApplicationCard: FC<{application: ApplicationCardProps}> = ({application:{mission_title, budget_mission, applied_at, status_application}}) => {
  return (
    <div className='bg-white border p-5'>
       <div className='flex items-center justify-between gap-5'>
            <p className='text-xl font-bold line-clamp-2'>{mission_title}</p>
            <FlagApplication status={status_application} />
       </div>
       <div className='flex items-center justify-between'>
            <p className='text-scarpa-flow-gray-34'>{applied_at}</p>
            <p className='font-semibold text-lg'>{budget_mission} {budgetCurrency}</p>
       </div>
    </div>
  )
}

export default ApplicationCard