import React from 'react';

const FormInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  autoComplete,
  ariaInvalid,
  ariaDescribedby,
  register,
  className = '',
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        placeholder={placeholder}
        {...register}
        {...props}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {error && (
        <p id={ariaDescribedby} className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
