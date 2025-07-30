"use client";

import React, { InputHTMLAttributes } from "react";

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
        className={`w-6 h-4 ${style}`}
        checked={!!restProps.value}
      />
      {htmlElement}
      {error ? (
        <p
          id="filled_error_help"
          className="mt-2 text-xs text-red-600"
        >
          {error}
        </p>
      ) : null}
    </>
  );
};
