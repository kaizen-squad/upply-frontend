'use client'
import Tab from '@/components/ui/Tabs/Tab'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

const layout: FC<{children:ReactNode}> = ({children}) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className='flex h-screen flex-col gap-10 lg:flex-row my-auto'>

      <div className="lg:w-full h-max lg:h-screen my-auto flex flex-col gap-10 lg:flex-row lg:gap-0">
         {/* Image gauche */}
        <div className='w-[45%] bg-cover-beige hidden lg:block'>
          <Image 
            src='/Images/cover.jpg'
            className='h-screen m-auto'
            width={600}
            height={500}
            alt='cover'
            loading='eager'
          />
        </div>

        <div className='lg:hidden'>
          <Image 
            src='/Assets/UpplySVG.svg'
            className='m-auto'
            width={100}
            height={100}
            alt='logo'
            loading='eager'
          />
        </div>
        
        {/* Zone de formulaire */}
        <div className='w-[80%] md:w-[60%] lg:w-[40%] mx-auto flex flex-col h-max lg:my-auto'>
          <Tab options={['Login', 'Register']} current={pathname?.includes('login') ? 'Login' : 'Register'} onclick={(e)=> {
              router.push((e.currentTarget.id  === 'Login') ? '/login' : '/register')
          }} />
          <div className='h-max mx-auto w-full'>
            {children}
          </div>
        </div>

      </div>

    </div>
  )
}

export default layout