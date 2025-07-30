import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { Product } from '@/types/products';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';

type Response = {
  data: Product[];
};

const putProducts = async ({ id, ...restProduct }: Product) => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.put<Response>(
      `/functions/v1/products/${id}`,
      restProduct,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Producto actualizado correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const usePutProducts = () => {
  return useMutation({
    mutationKey: ['put_products'],
    mutationFn: (product: Product) => putProducts(product),
  });
};
