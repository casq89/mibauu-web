'use client';

import React, { InputHTMLAttributes } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  htmlElement: React.ReactNode;
  error?: string;
  style?: string;
};

export const Checkbox = ({
  htmlElement,
  style,
  error,
  ...restProps
}: CheckboxProps) => {
  return (
    <>
      <input
        {...restProps}
        type="checkbox"
        className={`w-6 h-4  accent-primary${style}`}
      />

      {htmlElement}
      {error ? (
        <p id="filled_error_help" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </>
  );
};
