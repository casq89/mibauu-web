import { SelectOptions } from './global';

export type Product = {
  id: number;
  code: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  promotion: boolean;
  disccount: number;
  imagen_url: string;
  category?: {
    name: string;
  };
  enable: boolean;
};

export type CardProductProps = Omit<Product, 'name'> & {
  productName: string;
  categories?: SelectOptions[];
};

export type CreateProduct = {
  id: string;
  name: string;
  description: string;
  enable?: boolean;
  image_url?: string;
};

export type ProductDefaultState = {
  id: number;
  image: string;
  code: number;
  productName: string;
  description: string;
  price: number;
  stock: number;
  promotion: boolean;
  disccount: number;
  enable: boolean;
  imagen_url: string;
  category_id: string;
};

export interface FilterState {
  searchQuery: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  sortOrder: 'asc' | 'desc';
}
