'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Progress } from '../progress';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  style?: string;
  level?: 'primary' | 'secondary';
  isLoading?: boolean;
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
  isLoading,
  ...buttonProps
}: ButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        disabled={isLoading}
        type="submit"
        className={`${levels[level].background} ${levels[level].hover} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-1/2 px-5 py-2.5 text-center  ${style}`}
        {...buttonProps}
      >
        {!isLoading ? label : <Progress />}
      </button>
    </div>
  );
};
