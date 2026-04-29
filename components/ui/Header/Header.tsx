'use client'
import { Controller, useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction } from 'react'

const Header:FC<{isMobileSidebarOpened: boolean, setIsMobileSidebarOpened:Dispatch<SetStateAction<boolean>>}> = ({isMobileSidebarOpened, setIsMobileSidebarOpened}) => {
    const {control, handleSubmit} = useForm<{search:string}>({
        mode: 'onChange',
    });
  return (
    <header className='h-(--header-height) relative bg-white z-50'>
        <form className='h-(--header-height) hidden sm:flex sm:gap-10 md:gap-[20%] py-4 bg-gallery-gray-93 shadow-2xs border-b border-b-gray-200 px-10 items-center'>
            <Image
                src={'/Assets/UpplySVG.svg'}
                loading='eager'
                width={100}
                height={100}
                alt='upply-logo'
            />
            <Controller  
                name='search'
                control={control}
                render={({field})=> 
                <TextField 
                    Icon={Search}
                    placeholder='Rechercher une mission...'
                    className='sm:w-full md:w-[90%] rounded-sm border-black py-2'
                    {...field}
                />}
            />

            <button 
                type='button'
                className='sm:flex md:hidden items-center justify-center rounded-full cursor-pointer duration-200 hover:bg-gray-200'
                onClick={()=> {
                    if(!isMobileSidebarOpened)
                        setIsMobileSidebarOpened(true)
                }}>
                <Image
                    src={'/Assets/User.svg'}
                    alt='sidebar'
                    width={60}
                    height={60}
                    loading='eager'
                />
            </button>
        </form>

        {/* Header Mobile */}

        <div className='h-(--header-height) flex items-center justify-between px-5 py-3 sm:hidden border-b border-b-gallery-gray-93 z-50 relative bg-white'>
            <Image
                src={'/Assets/UpplySVG.svg'}
                loading='eager'
                width={80}
                height={80}
                alt='upply-logo'
            />
            <button 
                className='flex items-center justify-center rounded-full cursor-pointer duration-200 hover:bg-gray-200'
                onClick={()=> {
                    if(!isMobileSidebarOpened)
                        setIsMobileSidebarOpened(true)
                }}>
                <Image
                    src={'/Assets/User.svg'}
                    alt='sidebar'
                    width={40}
                    height={40}
                    loading='eager'
                />
            </button>
            
        </div>
    </header>
    
  )
}

export default Header