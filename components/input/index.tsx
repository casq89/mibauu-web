'use client';

import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  contentStyles?: string;
};

export const Input = ({
  label,
  error,
  contentStyles,
  maxLength = 100,
  ...inputProps
}: InputProps) => {
  return (
    <div className={`relative z-0 w-full mb-4 group ${contentStyles ?? ''}`}>
      <div className="relative">
        <input
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
          {...inputProps}
          placeholder=" "
          maxLength={maxLength}
        />
        <label
          htmlFor={inputProps.name}
          className="peer-focus:font-medium absolute text-base text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id="filled_error_help" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};
