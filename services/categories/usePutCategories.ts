import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';
import { Category } from '@/types/categories';
import { generateFormRequestCategory } from '@/utils/categories';

type Response = {
  data: Category[];
};

const putCategories = async ({ id, ...restCategory }: Category) => {
  console.log({ id, ...restCategory });
  try {
    const data = generateFormRequestCategory({ id, ...restCategory });
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.put<Response>(
      `/functions/v1/categories/${id}`,
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Categoría actualizada correctamente');
    return response.data.data;
  } catch (error) {
    console.log('error: ', error);
    handleError(error);
    return [];
  }
};

export const usePutCategories = () => {
  return useMutation({
    mutationKey: ['put_categories'],
    mutationFn: (category: Category) => putCategories(category),
  });
};
