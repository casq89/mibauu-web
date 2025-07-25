'use client';

import { Button } from '@/components/button';
import { UserIcon } from '@/components/icons';
import { SideBar } from '@/components/side-bar';
import { ExitIcon } from '@/components/side-icons';
import Image from 'next/image';
import React from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const handleUploadPhoto = () => document?.getElementById('file')?.click();
const user = {};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <section>
      <div className="w-full flex p-5 z-10  shadow-lg shadow-secondary/50">
        <div className="flex-auto   w-1/4">
          <Image
            width={200}
            height={67}
            src={'/logo_mibauu.png'}
            alt="Logo e-talento"
            priority
          />
        </div>
        <div className="flex-auto w-1/4">
          <p className="text-lg text-center">Camilo Sanchez</p>
        </div>
        <div className="flex-auto w-1/4 justify-end">
          <ExitIcon />
        </div>
      </div>
      <SideBar />
      <div className="pt-2 ml-64 w-3/4">{children}</div>
    </section>
  );
}
