import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'
import { Search } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
    const {control, handleSubmit} = useForm<{search:string}>({
        mode: 'onChange',
    });
  return (
    <header>
        <form className='hidden sm:flex py-2 bg-gallery-gray-93 shadow-2xs border-b border-b-gray-200 gap-[20%] px-10 items-center'>
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
                    className='w-[90%] rounded-sm border-black py-2'
                    {...field}
                />}
            />
        </form>
        <div className='flex items-center justify-between px-5 py-3 sm:hidden'>
            <Image
                src={'/Assets/UpplySVG.svg'}
                loading='eager'
                width={80}
                height={80}
                alt='upply-logo'
            />
            <button className='cursor-pointer'>
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