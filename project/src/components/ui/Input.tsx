import React, { forwardRef } from 'react';
import { XCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className = '', fullWidth = true, ...props }, ref) => {
    const baseStyles = 'block w-full rounded-lg border-gray-300 shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500';
    
    const errorStyles = error ? 'border-danger-300 text-danger-900 focus:border-danger-500 focus:ring-danger-500' : '';
    
    const iconStyles = {
      left: leftIcon ? 'pl-10' : '',
      right: rightIcon ? 'pr-10' : '',
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              ${baseStyles}
              ${errorStyles}
              ${iconStyles.left}
              ${iconStyles.right}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {rightIcon}
            </div>
          )}

          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <XCircle className="h-5 w-5 text-danger-500" />
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${error ? 'text-danger-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;