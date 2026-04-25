// components/ui/Textarea.tsx
'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  optional?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, optional, id, disabled, required, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, '-');
    console.log(error)
    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={props.name}
            className={cn(
              'block text-md font-bold text-gray-700',
              disabled && 'text-gray-400',
              error && 'text-red-600'
            )}
          >
            {label}
            {optional && (
              <span className="ml-1 text-xs font-normal text-gray-400">
                (optionnel)
              </span>
            )}
            {required && !optional && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={props.name}
          className={cn(
            // Base styles
            'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-2 outline-transparent',
            'text-gray-900 placeholder:text-gray-400',
            'focus:ring-2',
            
            // Disabled
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            
            // Error state
            error
              ? 'outline-red-500 focus:outline-red-500'
              : 'focus-visible:outline-blue-500 ',
            
            // Resize
            'resize-none',
            
            // Custom className
            className
          )}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-red-600 animate-in fade-in duration-200"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };