'use client';

import { SideBar } from '@/components/side-bar';
import { ExitIcon } from '@/components/side-icons';
import { Spinner } from '@/components/spinner';
import { useAuth } from '@/hooks/use-auth';
import { queryClient } from '@/services/common/react-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout, verifyToken, isLoadingAuth } = useAuth();
  const tokenWasVerified = React.useRef(false);

  React.useEffect(() => {
    const handleVerifyToken = async () => {
      await verifyToken();
      tokenWasVerified.current = true;
    };
    handleVerifyToken();
  }, []);

  if (isLoadingAuth || !tokenWasVerified.current) return <Spinner />;
  return (
    <QueryClientProvider client={queryClient}>
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
            <p className="text-lg text-center text-primary">
              Admin: {JSON.parse(localStorage.getItem('user') || '')?.email}
            </p>
          </div>
          <div className="flex w-1/4 justify-end">
            <div className="flex cursor-pointer" onClick={logout}>
              <ExitIcon />
              <span className="text-primary ml-2 cursor-pointer">Salir</span>
            </div>
          </div>
        </div>
        <SideBar />
        <div className="pt-2 ml-64 w-3/4">{children}</div>
      </section>
    </QueryClientProvider>
  );
}
