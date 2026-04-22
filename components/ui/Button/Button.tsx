'use client'
import type { FC } from 'react';
import type { IButtonProps } from '../types';

const Button: FC<IButtonProps> = ({type, textContent, className, Icon, onClick, ...properties})=>{

    return (
        <button 
            {...properties}
            type={type ?? 'button'}
            onClick={(e)=>{
                if(onClick)
                    onClick(e)
            }}
            className={ (className ?? '') + ' font-medium flex gap-3 justify-center cursor-pointer shadow-2xl duration-200 hover:opacity-90 hover:scale-98'}            
        >
              {Icon && ((typeof Icon === 'string') ? <img src={Icon} alt="image-logo" /> : <Icon/>)}  {textContent}
        </button>
    )
}

export default Button