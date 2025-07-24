import { useQuery } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';

type Product = {
  id: number;
  name: string;
  category_id: string;
  price: number;
  imagen_url: string;
};

type Response = {
  data: Product[];
};

const getProducts = async () => {
  try {
    const response = await miBauuClient.get<Response>('/products');
    const products = response.data.data;

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
