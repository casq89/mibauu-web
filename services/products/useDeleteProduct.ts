import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { Product } from '@/types/products';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';

type Response = {
  data: Product[];
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
    return [];
  }
};

export const useDeleteProducts = () => {
  return useMutation({
    mutationKey: ['delete_products'],
    mutationFn: (id: number) => deleteProducts(id),
  });
};
