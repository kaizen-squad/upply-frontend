'use client'
import type { FC } from 'react';
import type { IButtonProps } from '../types';
import { cn } from '@/lib/utils';

const Button: FC<IButtonProps> = ({type, textContent, className, Icon, Iposition='left', onClick, ...properties})=>{

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
                'font-medium flex gap-3 justify-center cursor-pointer shadow-2xl items-center',     
               (!className?.includes('hover') &&  ' hover:opacity-90 hover:scale-98 duration-200'),
               className 
            )}            
        >  
            {Icon && ((typeof Icon === 'string') ? <img src={Icon} alt="image-logo" /> : <Icon />)}  
            {textContent}
              
        </button>
    )
}

export default Button