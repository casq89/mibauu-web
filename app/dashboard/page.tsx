'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/button';

export default function Page() {
  const tokenWasVerified = React.useRef(false);
  const { verifyToken, isLoadingAuth, logout } = useAuth();

  React.useEffect(() => {
    const handleVerifyToken = async () => {
      await verifyToken();
      tokenWasVerified.current = true;
    };
    handleVerifyToken();
  }, []);

  if (isLoadingAuth || !tokenWasVerified.current) return <Spinner />;

  return (
    <div className="max-w-sm mx-auto align-middle mt-[100px]  p-5 rounded-xl z-10  shadow-lg shadow-secondary/50">
      <h1>Dashboard page......</h1>
      <Button label="logout" onClick={() => logout()} />
    </div>
  );
}
