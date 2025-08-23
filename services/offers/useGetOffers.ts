import { useQuery } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { Offer } from '@/types/Offers';

type Response = {
  data: Offer[];
};

const getOffers = async () => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.get<Response>('/functions/v1/offers', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const useGetOffers = () => {
  return useQuery({
    queryKey: ['offers'],
    queryFn: getOffers,
  });
};
