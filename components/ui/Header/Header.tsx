'use client'
import { Controller, useForm } from 'react-hook-form'
import TextField from '../TextField/TextField'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Role } from '@/types/auth';

const Header:FC<{role: Role}> = ({role}) => {
    const {control, handleSubmit} = useForm<{search:string}>({
        mode: 'onChange',
    });
    const router = useRouter();
  return (
    <header className='h-(--header-height) relative bg-white z-50'>
        <form className='h-(--header-height) flex sm:gap-10 md:gap-[20%] py-4 bg-gallery-gray-93 shadow-2xs border-b border-b-gray-200 px-10 items-center'>
            <Image
                src={'/Assets/UpplySVG.svg'}
                loading='eager'
                width={100}
                height={100}
                alt='upply-logo'
                onClick={()=>router.push(`/${role}/dashboard`)}
                className="cursor-pointer"
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
        </form>
    </header>
    
  )
}

export default Header