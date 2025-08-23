import React from 'react';

type NoResultsProps = {
  message: string;
  description?: string;
};

export const NoResults = ({ message, description = '' }: NoResultsProps) => {
  return (
    <div className="w-full rounded-2xl border border-dashed border-gray-200 p-8 text-center">
      <h3 className="text-base font-semibold text-primary">{message}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};
