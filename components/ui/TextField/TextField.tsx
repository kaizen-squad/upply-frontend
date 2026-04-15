'use client'

import { type FC } from 'react'
import type { ITextFieldProps } from '../types';
import { cn } from '@/lib/utils';

const TextField: FC<ITextFieldProps> = ( { type, id, label, value, className, placeholder, onChange, errorMessage, Icon, Eposition='top', ...props } ) => {
        const textFieldId = id || label?.toLowerCase().replace(/\s/g, '-');
    return ( 
        <div className='flex flex-col gap-2 w-full'>  
            {label && <div className='flex justify-between w-full'>
<<<<<<< HEAD
                <label htmlFor={props.name} className={cn('font-bold ', errorMessage ? 'text-red-600' : '') }>{label}</label>
                {(errorMessage && Eposition ==='top') && <small className='text-red-500'>{errorMessage}</small>}
=======
                <label htmlFor={label} className='font-bold text-gray-700'>{label}</label>
                {errorMessage && <small className='text-red-500'>{errorMessage}</small>}
>>>>>>> 78a43c6 (Fixed auth structure, api service and middleware)
            </div>}              
           
           <div className='relative'>
                {Icon && <Icon className='absolute left-3 top-[7px] text-gray-400 w-5'/>}
                <input 
                    {...props} 
                    value={value ?? ''} 
                    type={type ?? 'text'} id={props.name} 
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