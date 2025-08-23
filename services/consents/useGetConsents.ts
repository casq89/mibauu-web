import { useQuery } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { Consents } from '@/types/consents';

type Response = {
  data: Consents[];
};

const getConsents = async () => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.get<Response>(
      '/functions/v1/consents',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const useGetConsents = () => {
  return useQuery({
    queryKey: ['consents'],
    queryFn: getConsents,
  });
};
