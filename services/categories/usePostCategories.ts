import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';
import { Category } from '@/types/categories';
import { generateFormRequestCategory } from '@/utils/categories';

type Response = {
  data: Category[];
};

const postCategories = async (category: Category) => {
  try {
    const data = generateFormRequestCategory(category);
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.post<Response>(
      `/functions/v1/categories`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Categoría añadida correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const usePostCategories = () => {
  return useMutation({
    mutationKey: ['post_categories'],
    mutationFn: (category: Category) => postCategories(category),
  });
};
