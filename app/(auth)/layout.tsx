import Image from 'next/image'
import { FC, ReactNode } from 'react'

const layout: FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className='flex'>
      <div className='w-[45%] bg-cover-beige'>
        <Image 
          src={'/Images/cover1.jpg'}
          className='h-screen m-auto'
          width={600}
          height={500}
          alt='cover'
        />
      </div>
      
      <div className='w-[35%] m-auto'>
        {children}
      </div>
    </div>
  )
}

export default layout