import { Product } from '@/types/products';
import { create } from 'zustand';

type ProductStore = {
  products: Product[];
  allProducts: Product[];
  resetFilter: () => void;
  loadProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  filterProductsByName: (name: string) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  allProducts: [],
  loadProducts: (products) => set({ products, allProducts: products }),

  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),

  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  filterProductsByName: (name: string) =>
    set(() => {
      const products = [...get().products];
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );

      return { products: filteredProducts };
    }),

  resetFilter: () => set(() => ({ products: get().allProducts })),
}));
