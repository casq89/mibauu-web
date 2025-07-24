'use client';

import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  style?: string;
  level?: 'primary' | 'secondary';
};

const levels = {
  primary: {
    background: 'bg-primary text-secondary',
    hover: 'hover:bg-primary/80',
  },
  secondary: {
    background: 'bg-gray-300 text-slate-500',
    hover: 'hover:bg-gray-300/80',
  },
};

export const Button = ({
  label,
  style,
  level = 'primary',
  ...buttonProps
}: ButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className={`${levels[level].background} ${levels[level].hover} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center  ${style}`}
        {...buttonProps}
      >
        {label}
      </button>
    </div>
  );
};
