import { SelectOptions } from '@/types/global';
import { PencilIcon } from '../icons';
import React from 'react';

type ThinSelectProps = {
  label: string;
  options: SelectOptions[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const ThinSelect = ({
  label,
  options=[],
  ...restProps
}: ThinSelectProps) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  const handleIconClick = () => {
    selectRef.current?.focus();
    selectRef.current?.click();
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 focus-within:bg-blue-50 rounded">
      <label className="text-sm text-secondary whitespace-nowrap">
        {label}:
      </label>
      <select
        ref={selectRef}
        className="text-sm text-secondary bg-transparent focus:outline-none flex-1 appearance-none"
        {...restProps}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span onClick={handleIconClick}>
        <PencilIcon />
      </span>
    </div>
  );
};
