<<<<<<< HEAD
'use client'
import type { FC } from 'react';
import type { IButtonProps } from '../types';
import { cn } from '@/lib/utils';

const Button: FC<IButtonProps> = ({type, textContent, className, Icon, Iposition='left', onClick, ...properties})=>{
=======
import type { FC } from 'react';
import './Button.css'
import type { IButtonProps } from '../types';

const Button: FC<IButtonProps> = ({type, textContent, className, Icon, onClick, ...properties})=>{
>>>>>>> 5417da9 (Integrated the global components and the ui for the register page)

    return (
        <button 
            {...properties}
            type={type ?? 'button'}
            onClick={(e)=>{
                if(onClick)
                    onClick(e)
            }}
<<<<<<< HEAD
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
              
=======
            className={ className + ' rounded-2xl font-medium flex gap-3 justify-center cursor-pointer shadow-2xl duration-200 hover:opacity-90 hover:scale-99'}            
        >
              {Icon && ((typeof Icon === 'string') ? <img src={Icon} alt="image-logo" /> : <Icon/>)}  {textContent}
>>>>>>> 5417da9 (Integrated the global components and the ui for the register page)
        </button>
    )
}

export default Button