'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Progress } from '../progress';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  style?: string;
  level?: 'primary' | 'secondary' | 'disabled' | 'danger' | 'success';
  isLoading?: boolean;
};

const levels = {
  primary: {
    background: 'bg-primary text-secondary',
    hover: 'hover:bg-primary/80',
  },
  secondary: {
    background: 'bg-secondary text-primary',
    hover: 'hover:bg-secondary/80',
  },
  disabled: {
    background: 'bg-gray-300 text-slate-500',
    hover: '',
  },
  danger: {
    background: 'bg-red-400 text-white',
    hover: 'hover:bg-red-400/80',
  },
  success: {
    background: 'bg-green-400 text-white',
    hover: 'hover:bg-green-400/80',
  },
};

export const Button = ({
  label,
  style,
  level = 'primary',
  isLoading,
  ...buttonProps
}: ButtonProps) => {
  const progressColor = level === 'primary' ? 'bg-secondary' : 'bg-white';
  return (
    <div className="flex justify-center">
      <button
        disabled={isLoading}
        type="submit"
        className={`${levels[level].background} ${levels[level].hover} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-auto px-5 py-2.5 text-center  ${style}`}
        {...buttonProps}
      >
        {!isLoading ? label : <Progress color={progressColor} />}
      </button>
    </div>
  );
};
