import { cn } from '@/lib/utils'
import { FC } from 'react'

const Spinner:FC<{size?: number}> = ({size = 11}) => {
  const bigCircleSize = `size-${size}`
  const smallCircleSize = `size-${size - 3}`

  return (
    <div className={cn('rounded-full flex items-center justify-center animate-spin', bigCircleSize)} style={{background: 'linear-gradient(to right, #f59e0b 30%, #EEE 30%)'}}>
        <div className={cn('rounded-full bg-white-solid ', smallCircleSize)}></div>
    </div>
  )
}

export default Spinner