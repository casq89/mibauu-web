import { useQuery } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { Product } from '@/types/products';
import { handleError } from '@/utils/requests';

type Response = {
  data: Product[];
};

const getProducts = async () => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.get<Response>(
      '/functions/v1/products',
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

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
