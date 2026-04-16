'use client'

import { type FC } from 'react'
import type { ITextFieldProps } from '../types';
import { cn } from '@/lib/utils';

const TextField: FC<ITextFieldProps> = ( { type, id, label, value, className, placeholder, onChange, errorMessage, Icon, Eposition='top', ...props } ) => {
        const textFieldId = props.name || id || label?.toLowerCase().replace(/\s/g, '-');
    return ( 
        <div className='flex flex-col gap-2 w-full'>  
            {label && <div className='flex justify-between w-full'>
                <label htmlFor={textFieldId} className={cn('font-bold ', errorMessage ? 'text-red-600' : '') }>{label}</label>
                {(errorMessage && Eposition ==='top') && <small className='text-red-500'>{errorMessage}</small>}
            </div>}              
           
           <div className='relative'>
                {Icon && <Icon className='absolute left-3 top-[7px] text-gray-400 w-5'/>}
                <input 
                    {...props} 
                    value={value ?? ''} 
                    type={type ?? 'text'} id={textFieldId} 
                    className={cn(
                                'block max-w-full w-full px-3 py-[5px] shadow-2xs rounded-lg border-[0.5px] border-gray-300 outline-2 ', 
                                errorMessage 
                                ? 'outline-red-500 text-red-700'
                                : 'focus-visible:outline-blue-500 outline-transparent bg-gray-50',
                                Icon ? ' pl-10' : '',
                                className
                            )
                             } 
                    placeholder={placeholder} 
                    onChange={(e)=>{
                        if(onChange)
                            onChange(e)
                     }} 
                    required  
                />
           </div>
           {(errorMessage && Eposition === 'bottom') && <p
            id={`${textFieldId}-error`}
            className="text-sm text-red-600 animate-in fade-in duration-200"
          >
            {errorMessage}
          </p>}
        </div>
     );
}

export default TextField