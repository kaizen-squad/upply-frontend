'use client'
import Tab from '@/components/ui/Tabs/Tab'
import Image from 'next/image'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

const layout: FC<{children:ReactNode}> = ({children}) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className='flex'>
      
      {/* Left Image */}
      <div className='w-[45%] bg-cover-beige'>
        <Image 
          src='/images/cover.jpg'
          className='h-screen m-auto'
          width={600}
          height={500}
          alt='cover'
          loading='eager'
        />
      </div>
      
      {/* Forms Zone */}
      <div className='w-[35%] m-auto flex flex-col'>
        <Tab options={['Login', 'Register']} current={pathname?.includes('login') ? 'Login' : 'Register'} onclick={(e)=> {
            router.push((e.currentTarget.id  === 'Login') ? '/login' : '/register')
        }} />
        <div className='h-max m-auto w-full'>
          {children}
        </div>
      </div>

    </div>
  )
}

export default layout