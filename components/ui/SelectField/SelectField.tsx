import { ChevronDown } from 'lucide-react';
import React, { SelectHTMLAttributes, useState } from 'react'

type SelectFieldProps = {
    name: string,
    options: string[],
    placeholder?: string,
    label?: string
} & SelectHTMLAttributes<HTMLSelectElement>

const SelectField: React.FC<SelectFieldProps> = ({options, name, placeholder, label, onChange, value, id, disabled, required, ...props}) => {

    const [isVisible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string>(typeof value === 'string' && value ? value : options[0] || '');
    const [activeIndex, setActiveIndex] = useState(() => Math.max(options.indexOf(typeof value === 'string' ? value : ''), 0));
    const selectedValue = typeof value === 'string' && value ? value : selected;
    const controlId = id || `${name}-combobox`;
    const labelId = `${controlId}-label`;
    const selectedLabelId = `${controlId}-value`;
    const optionsId = `${controlId}-options`;
    const optionId = (index: number) => `${optionsId}-option-${index}`;

    const handleSelectOption = (option: string) => {
      setSelected(option);
      setVisible(false);

      if (onChange) {
        const syntheticEvent = {
          target: { name, value: option }
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

    const openOptions = () => {
      setActiveIndex(Math.max(options.indexOf(selectedValue), 0));
      setVisible(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!isVisible) {
          openOptions();
          return;
        }

        const lastIndex = Math.max(options.length - 1, 0);
        setActiveIndex((current) => event.key === 'ArrowDown'
          ? Math.min(current + 1, lastIndex)
          : Math.max(current - 1, 0));
      } else if (event.key === 'Home' && isVisible) {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === 'End' && isVisible) {
        event.preventDefault();
        setActiveIndex(Math.max(options.length - 1, 0));
      } else if (event.key === 'Escape') {
        setVisible(false);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!isVisible) {
          openOptions();
        } else if (options[activeIndex] !== undefined) {
          handleSelectOption(options[activeIndex]);
        }
      }
    };

  return (
    <div className='max-w-62.5 relative w-max'>

        <select
          {...props}
          name={name}
          id={`${controlId}-native`}
          className='sr-only'
          aria-hidden="true"
          tabIndex={-1}
          disabled={disabled}
          required={required}
          value={selectedValue}
          onChange={(e) => {
            setSelected(e.target.value);
            onChange?.(e);
          }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {label && <label id={labelId} htmlFor={controlId} className='font-semibold text-gray-700 mb-3 block'>{label}</label>}

        <button
          type="button"
          id={controlId}
          role="combobox"
          aria-label={label ? undefined : name}
          aria-labelledby={label ? `${labelId} ${selectedLabelId}` : undefined}
          aria-haspopup="listbox"
          aria-expanded={isVisible}
          aria-controls={optionsId}
          aria-activedescendant={isVisible && options.length ? optionId(activeIndex) : undefined}
          disabled={disabled}
          onClick={() => isVisible ? setVisible(false) : openOptions()}
          onKeyDown={handleKeyDown}
          className='w-full cursor-pointer rounded-md shadow-2xs border-[0.5px] border-gray-300 py-1.5 px-3 bg-white flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        >
            <small id={selectedLabelId} className='w-20 truncate text-left'>{selectedValue ? selectedValue : placeholder}</small>
            <ChevronDown width={19} className='text-gray-500' />
        </button>
        { isVisible && <ul className='absolute rounded-md shadow-2xs border-[0.5px] border-gray-300 my-2 bg-white p-1 w-full z-1'>
            { options.map((option) =>
            <li
              id={optionId(options.indexOf(option))}
              role="option"
              aria-selected={selectedValue === option}
              className={(selectedValue === option ? 'bg-orange-500/80 ' : '') + 'py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center justify-between'}
              key={option}
              onMouseEnter={() => setActiveIndex(options.indexOf(option))}
              onClick={() => handleSelectOption(option)}
            >
               <small>{option}</small>
               {selectedValue === option && <span>✓</span>}
            </li>)}</ul> }
    </div>

  )
}

export default SelectField
