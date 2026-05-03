import { TaskProps } from '@/types'
import { FC } from 'react'
import { formatFrenchDateIntl } from '../../../lib/utils';
import { budgetCurrency } from '@/hooks/useTasks';
import Button from '@/components/ui/Button/Button';

const TaskCard:FC<{task:TaskProps}> = ({task}) => {

  return (
    <div className='bg-white-solid border p-5 flex justify-between items-center my-5'>
      <div>
        <small className='rounded-sm bg-gallery-gray-93 py-1 px-3'>REF:MS-<span>{task.id}</span> </small>
        <div className='mt-3'>
          <p className='text-xl font-semibold w-[90%]'>{task.title}</p>
          <div className='flex items-center gap-15 text-scarpa-flow-gray-34 mt-3'>
              <div>
                <small className='font-semibold'>DEADLINE</small>
                <p>{formatFrenchDateIntl(task.deadline)}</p>
              </div>
              <div>
                <small className='font-semibold'>BUDGET</small>
                <p>{task.budget} {budgetCurrency}</p>
              </div>
          </div>
        </div>
      </div>

      <Button
        textContent='Livrer le travail'
        className='py-3 px-5 bg-alizarin-crimson-red-51 rounded-xs text-white-solid font-semibold h-max'
      />
    </div>
  )
}

export default TaskCard