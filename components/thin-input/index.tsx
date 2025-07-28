import React, { InputHTMLAttributes } from 'react';
import { PencilIcon } from '../icons';

type ThinInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const ThinInput = ({ label, ...restProps }: ThinInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200  focus-within:bg-blue-100  rounded">
      <label className="text-sm text-secondary whitespace-nowrap">
        {label}:
      </label>
      <input
        ref={inputRef}
        type="text"
        className="text-sm text-secondary bg-transparent focus:outline-none  flex-1"
        {...restProps}
      />
      <span onClick={handleIconClick}>
        <PencilIcon />
      </span>
    </div>
  );
};
