import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { Product, ProductDefaultState } from '@/types/products';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';

type Response = {
  data: Product[];
};

const putProducts = async ({ id, ...restProduct }: ProductDefaultState) => {
  try {
    const formData = new FormData();
    formData.append('image', restProduct.image);
    formData.append('code', restProduct.code.toString());
    formData.append('name', restProduct.productName);
    formData.append('description', restProduct.description);
    formData.append('price', restProduct.price.toString());
    formData.append('stock', restProduct.stock.toString());
    formData.append('category_id', restProduct.category_id);
    formData.append('promotion', restProduct.promotion ? 'true' : 'false');
    formData.append('disccount', restProduct.disccount.toString());
    formData.append('enable', restProduct.enable ? 'true' : 'false');
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.put<Response>(
      `/functions/v1/products/${id}`, 
      formData,
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
    mutationFn: (product: ProductDefaultState) => putProducts(product),
  });
};
