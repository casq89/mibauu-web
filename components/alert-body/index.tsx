'use client';

import React from 'react';
import { LogoHeader } from '../logo-header';

type AlertBodyProps = {
  title: string;
  message: string;
};

export const AlertBody = ({ title, message }: AlertBodyProps) => {
  return (
    <div className="text-center text-secondary">
      <LogoHeader text={title} />
      <p>{message}</p>
    </div>
  );
};
