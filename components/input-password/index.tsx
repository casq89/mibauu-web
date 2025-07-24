'use client';

import React, { InputHTMLAttributes } from 'react';
import { Input } from '../input';
import { EyeIcon, EyeSlashIcon } from '../icons';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const InputPassword = ({ ...inputProps }: InputProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div className="flex">
      <Input type={`${isVisible ? 'text' : 'password'}`} {...inputProps} />
      <span
        className="absolute right-0"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? (
          <EyeIcon styles="text-secondary" />
        ) : (
          <EyeSlashIcon styles="text-secondary" />
        )}
      </span>
    </div>
  );
};
