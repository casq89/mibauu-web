import { FilterState, Product } from '@/types/products';
import { create } from 'zustand';

const initialFilters: FilterState = {
  searchQuery: '',
  categories: [],
  brands: [],
  priceRange: [0, 1000000],
  inStockOnly: false,
  sortBy: 'name',
  sortOrder: 'asc',
};

type ProductStore = {
  filters: FilterState;
  products: Product[];
  allProducts: Product[];
  resetFilter: () => void;
  loadProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  filterProductsByName: (name: string) => void;
  getActiveFiltersCount: () => number;
  toggleCategory: (category: string) => void;
  updatePriceRange: (range: [number, number]) => void;
  toggleInStockOnly: () => void;
  updateSort: (
    sortBy: FilterState['sortBy'],
    order: FilterState['sortOrder']
  ) => void;

  clearFilters: () => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  allProducts: [],
  filters: initialFilters,
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

  toggleCategory: (category: string) => {
    set((state) => {
      const categories = state.filters.categories.includes(category)
        ? state.filters.categories.filter((c) => c !== category)
        : [...state.filters.categories, category];

      const newFilters = { ...state.filters, categories };

      return {
        filters: newFilters,
        products: filterAndSortProducts(state.allProducts, newFilters),
      };
    });
  },

  updatePriceRange: (range: [number, number]) => {
    console.log(range);
    set((state) => {
      const newFilters = { ...state.filters, priceRange: range };
      return {
        filters: newFilters,
        products: filterAndSortProducts(state.allProducts, newFilters),
      };
    });
  },

  toggleInStockOnly: () => {
    set((state) => {
      const newFilters = {
        ...state.filters,
        inStockOnly: !state.filters.inStockOnly,
      };
      return {
        filters: newFilters,
        filteredProducts: filterAndSortProducts(state.products, newFilters),
      };
    });
  },

  updateSort: (
    sortBy: FilterState['sortBy'],
    order: FilterState['sortOrder']
  ) => {
    set((state) => {
      const newFilters = { ...state.filters, sortBy, sortOrder: order };
      return {
        filters: newFilters,
        filteredProducts: filterAndSortProducts(state.products, newFilters),
      };
    });
  },

  clearFilters: () => {
    set(() => ({
      filters: initialFilters,
    }));
  },

  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;

    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++;
    if (filters.inStockOnly) count++;

    return count;
  },
}));

const filterAndSortProducts = (
  products: Product[],
  filters: FilterState
): Product[] => {
  let filtered = [...products];

  // Search filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (filters.categories.length > 0) {
    console.log('Category filter =>', filters.categories);
    filtered = filtered.filter((product) =>
      filters.categories.includes(product?.category?.name || '')
    );
  }

  console.log('price range filter =>', filters.priceRange);

  filtered = filtered.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );

  // Stock filter
  if (filters.inStockOnly) {
    filtered = filtered.filter((product) => product.stock > 0);
  }

  // Sort products
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      // case 'rating':
      //   comparison = a.rating - b.rating;
      //   break;
      // case 'newest':
      //   comparison = parseInt(a.id) - parseInt(b.id);
      //   break;
    }

    return filters.sortOrder === 'desc' ? -comparison : comparison;
  });

  return filtered;
};
