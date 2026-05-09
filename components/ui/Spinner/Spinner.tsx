import { cn } from '@/lib/utils'
import { FC } from 'react'

const Spinner:FC<{size?: number}> = ({size = 11}) => {
 

  return (
    <div 
        className='rounded-full flex items-center justify-center animate-spin'
        style={{background: 'linear-gradient(to right, var(--alizarin-crimson-red-51) 30%, #EEE 30%)', height: `${size * 4}px`, width: `${size * 4}px`}}
    >
        <div className='rounded-full bg-white-solid' style={{height: `${(size - 3) * 4}px`, width: `${(size - 3) * 4}px`}}></div>
    </div>
  )
}

export default Spinner