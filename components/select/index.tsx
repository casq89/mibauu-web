'use client';

import { SelectOptions } from '@/types/global';
import React, { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOptions[];
  error?: string;
};

export const Select = ({ label, options, error, ...rest }: SelectProps) => {
  return (
    <div className="relative w-full mb-6 group mt-[-4px]">
      <label htmlFor={rest.name} className="text-sm text-gray-500">
        {label}
      </label>
      <select
        id="underline_select"
        className="block w-full text-sm px-1 text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        {...rest}
      >
        <option key={''} value={''}>
          Seleccione...
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error ? (
        <p id="filled_error_help" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};
