'use client'
import type { FC } from 'react';
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
                'font-medium flex gap-2.5 justify-center cursor-pointer shadow-2xl items-center disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-none',     
               (!className?.includes('hover') &&  ' hover:opacity-90 hover:scale-98 duration-200'),
               className 
            )}            
        >  
            { !isLoading && Icon && ((typeof Icon === 'string') ? <img src={Icon} alt="image-logo" /> : <Icon />) } 
            { isLoading && <Spinner size={8}/> } 
            { textContent }
              
        </button>
    )
}

export default Button