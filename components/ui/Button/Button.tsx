import type { FC } from 'react';
import './Button.css'
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
            className={ className + ' rounded-2xl font-medium flex gap-3 justify-center cursor-pointer shadow-2xl duration-200 hover:opacity-90 hover:scale-99'}            
        >
              {Icon && ((typeof Icon === 'string') ? <img src={Icon} alt="image-logo" /> : <Icon/>)}  {textContent}
        </button>
    )
}

export default Button