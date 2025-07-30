import React from 'react';
import { miBauuClient } from '@/services/common/serviceBase';
import { loginDefaultState } from '@/utils/validation-schema';
import { handleError } from '@/utils/requests';
import { supabaseClient } from '@/services/common/supabaseClient';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

type LoginResponse = AxiosResponse<{ token: string; user: { email: string } }>;

export const useAuth = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const login = async (data: typeof loginDefaultState) => {
    try {
      setIsLoading(true);
      const response = await miBauuClient.post<
        typeof loginDefaultState,
        LoginResponse
      >('/functions/v1/login', data);

      if (response.data.token) {
        const { token, user } = response.data;
        await localStorage.setItem('token', token);
        await localStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return handleError(error);
    }
  };

  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();
      await localStorage.removeItem('token');
      await localStorage.removeItem('user');
      router.push('/login');
      return true;
    } catch (error) {
      return handleError(error);
    }
  };

  const verifyToken = async () => {
    try {
      setIsLoading(true);
      const token = (await localStorage.getItem('token')) || '';
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser(token);
      setIsLoading(false);
      if (error || !user) {
        router.push('/login');
        return false;
      }
      return true;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    login,
    logout,
    verifyToken,
    isLoadingAuth: isLoading,
  };
};
