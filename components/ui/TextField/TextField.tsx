'use client'

import { type FC } from 'react'
import type { ITextFieldProps } from '../types';

const TextField: FC<ITextFieldProps> = ( { type, label, value, className, placeholder, onChange, errorMessage, Icon, ...props } ) => {
    return ( 
        <div className='flex flex-col gap-2 w-full'>  
            {label && <div className='flex justify-between w-full'>
                <label htmlFor={props.name} className='font-bold text-gray-700'>{label}</label>
                {errorMessage && <small className='text-red-500'>{errorMessage}</small>}
            </div>}              
           
           <div className='relative'>
                {Icon && <Icon className='absolute left-3 top-[5px] text-gray-400 w-4'/>}
                <input {...props} value={value ?? ''} type={type ?? 'text'} id={props.name} className={className ?? ('block max-w-full w-full px-3 py-[5px] shadow-2xs rounded-lg border-[0.5px] border-gray-300 outline-2 ' + (errorMessage ? 'outline-red-500 text-red-700' : 'focus-visible:outline-blue-500 outline-transparent bg-gray-50')) + (Icon ? ' pl-10' : '') } placeholder={placeholder} onChange={(e)=>{
                    if(onChange)
                        onChange(e)
                }} required  />
           </div>
        </div>
     );
}

export default TextField