import { ProductDefaultState } from '@/types/products';
import { createProductDefaultState } from './validation-schema';

export const generateFormRequest = (
  product: typeof createProductDefaultState | ProductDefaultState
) => {
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

  return formData;
};
