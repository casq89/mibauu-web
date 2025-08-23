import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';
import { Category, CategoryDefaultState } from '@/types/categories';

type Response = {
  data: Category[];
};

const putCategories = async ({ id, ...restCategory }: CategoryDefaultState) => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.put<Response>(
      `/functions/v1/categories/${id}`,
      restCategory,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Categoría actualizada correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const usePutCategories = () => {
  return useMutation({
    mutationKey: ['put_categories'],
    mutationFn: (category: CategoryDefaultState) => putCategories(category),
  });
};
