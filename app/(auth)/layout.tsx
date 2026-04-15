'use client'
import Tab from '@/components/ui/Tabs/Tab'
import Image from 'next/image'
import { redirect, usePathname } from 'next/navigation'
import { FC, ReactNode } from 'react'

const layout: FC<{children:ReactNode}> = ({children}) => {
  const pathname = usePathname();
  return (
    <div className='flex'>
      
      {/* Left Image */}
      <div className='w-[45%] bg-cover-beige'>
        <Image 
          src={'/Images/cover1.jpg'}
          className='h-screen m-auto'
          width={600}
          height={500}
          alt='cover'
          loading='eager'
        />
      </div>
      
      {/* Forms Zone */}
      <div className='w-[35%] m-auto mt-35'>
        <Tab options={['Login', 'Register']} current={pathname?.includes('login') ? 'Login' : 'Register'} onclick={(e)=> {
            redirect((e.currentTarget.id  === 'Login' ? '/login' : '/register'))
        }} />
        <div>
          {children}
        </div>
      </div>

    </div>
  )
}

export default layout