'use client'
import type { FC } from 'react';
import Image from 'next/image';
import type { IButtonProps } from '../types';
import { cn } from '@/lib/utils';
import Spinner from '../Spinner/Spinner';

const Button: FC<IButtonProps> = ({type, textContent, className, Icon, isLoading, Iposition='left', onClick, ...properties})=>{

    return (
        <button 
                {...properties}
            type={type ?? 'button'}
            onClick={(e)=>{
                if(onClick)
                    onClick(e)
            }}
            className={cn(
                Iposition === 'left' 
                ? '' : 'flex-row-reverse',
                'font-medium flex gap-2.5 justify-center cursor-pointer shadow-2xl items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-none',
               (!className?.includes('hover') &&  ' hover:opacity-90 hover:scale-98 duration-200 transition-transform'),
               className 
            )}            
        >  
            { !isLoading && Icon && ((typeof Icon === 'string') ? <Image src={Icon} alt="" width={24} height={24} unoptimized /> : <Icon />) }
            { isLoading && <Spinner size={8}/> } 
            { textContent }
              
        </button>
    )
}

export default Button
