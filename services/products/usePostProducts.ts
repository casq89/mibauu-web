import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { Product } from '@/types/products';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';
import { createProductDefaultState } from '@/utils/validation-schema';

type Response = {
  data: Product[];
};

const postProducts = async (product: typeof createProductDefaultState) => {
  try {
    const formData = new FormData();

    formData.append('image', product.image);
    formData.append('code', product.code.toString());
    formData.append('name', product.productName);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('category_id', product.category_id);
    formData.append('promotion', product.promotion ? 'true' : 'false');
    formData.append('disccount', product.disccount.toString());
    formData.append('enable', product.enable ? 'true' : 'false');
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.post<Response>(
      `/functions/v1/products`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Producto añadido correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const usePostProducts = () => {
  return useMutation({
    mutationKey: ['post_products'],
    mutationFn: (product: typeof createProductDefaultState) =>
      postProducts(product),
  });
};
