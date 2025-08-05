import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';

type Response = {
  data: { success: boolean };
};

const deleteProducts = async (id: number) => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.delete<Response>(
      `/functions/v1/products/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Producto eliminado correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return { success: false };
  }
};

export const useDeleteProducts = () => {
  return useMutation({
    mutationKey: ['delete_products'],
    mutationFn: (id: number) => deleteProducts(id),
  });
};
