import React from 'react';

type ToggleSwitchProps = {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
};
export const ToggleSwitch = ({ enabled, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onToggle(!enabled);
      }}
      className={`relative inline-flex h-6 w-11  items-center rounded-full transition-colors ${
        enabled ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};
