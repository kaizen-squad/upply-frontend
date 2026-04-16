import { ChevronDown } from 'lucide-react';
import React, { SelectHTMLAttributes, useState } from 'react'

type SelectFieldProps = {
    name: string,
    options: string[],
    placeholder?: string,
    label?: string
} & SelectHTMLAttributes<HTMLSelectElement>

const SelectField: React.FC<SelectFieldProps> = ({options, name, placeholder, label, onChange, value, ...props}) => {

    const [isVisible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string>(typeof value === 'string' && value ? value : options[0] || '');

    React.useEffect(() => {
      if (typeof value === 'string' && value && value !== selected) {
        setSelected(value.toLowerCase());
      }

    }, [value, selected]);

    const handleSelectOption = (option: string) => {
      setSelected(option.toLowerCase());
      setVisible(false);

      if (onChange) {
        const syntheticEvent = {
          target: { name, value: option }
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

  return (  
    <div className='max-w-62.5 relative w-max'>

        <select
          {...props}
          name={name.toLowerCase()}
          id={name.toLowerCase()}
          className='hidden'
          value={selected.toLowerCase()}
          onChange={(e) => {
            setSelected(e.target.value);
            onChange?.(e);
          }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>

        {label && <p className='font-semibold text-gray-700 mb-3'>{label}</p>}

        <div className='cursor-pointer rounded-md shadow-2xs border-[0.5px] border-gray-300 py-1.5 px-3 bg-white flex items-center justify-between' onClick={()=> setVisible(!isVisible)}>
            <small className='w-20'>{selected ? selected : placeholder}</small>
            <ChevronDown width={19} className='text-gray-500' />
        </div>
        { isVisible && <ul aria-expanded={isVisible} aria-haspopup="listbox" className='absolute rounded-md shadow-2xs border-[0.5px] border-gray-300 my-2 bg-white p-1 w-full z-1'>
            { options.map((option, index) => 
            <li className={(selected === option ? 'bg-orange-500/80 ' : '') + 'py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center justify-between'}  key={index} onClick={()=> handleSelectOption(option)}>
               <small>{option}</small> 
               {selected === option && <span>✓</span>}
            </li>)}</ul> }
    </div>
    
  )
}

export default SelectField