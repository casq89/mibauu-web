import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';

type Response = {
  data: { success: boolean };
};

const deleteCategory = async (id: string) => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.delete<Response>(
      `/functions/v1/categories/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Categoría eliminada correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return { success: false };
  }
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationKey: ['delete_category'],
    mutationFn: (id: string) => deleteCategory(id),
  });
};
