import { cn } from '@/lib/utils'
import { FC } from 'react'

const Spinner:FC<{scale?: string}> = ({scale}) => {
  return (
    <div className={cn('rounded-full size-11 flex items-center justify-center animate-spin', scale)} style={{background: 'linear-gradient(to right, #f59e0b 30%, #EEE 30%)'}}>
        <div className='rounded-full bg-white-solid size-8 '></div>
    </div>
  )
}

export default Spinner