import { useQuery } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { Category } from '@/types/categories';

type Response = {
  data: Category[];
};

const getCategories = async () => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.get<Response>(
      '/functions/v1/categories',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
