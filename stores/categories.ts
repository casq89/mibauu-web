import { Category } from '@/types/categories';
import { create } from 'zustand';

type CategoryStore = {
  categories: Category[];
  allCategories: Category[];
  category: Category;
  loadCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (updatedCategory: Category) => void;
  deleteCategory: (categoryId: string) => void;
  setCategory: (category: Category) => void;
  cleanCategory: () => void;
  filteredCategorieByName: (string: string) => void;
  resetFilter: () => void;
};

const categoryDefault = { id: '', name: '', description: '', enable: false };

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  allCategories: [],
  category: categoryDefault,
  loadCategories: (categories) =>
    set({ categories, allCategories: categories }),
  addCategory: (category) =>
    set((state) => ({
      categories: [category, ...state.categories],
    })),

  updateCategory: (updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    })),

  deleteCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter(
        (category) => category.id !== categoryId
      ),
    })),
  setCategory: (category: Category) =>
    set(() => ({
      category,
    })),
  cleanCategory: () => set(() => ({ category: categoryDefault })),
  filteredCategorieByName: (name: string) => {
    const copyCategories = [...useCategoryStore.getState().allCategories];
    if (name === '') {
      set(() => ({ categories: copyCategories }));
      return;
    }

    set(() => ({
      categories: copyCategories.filter((category) =>
        category.name.toLowerCase().includes(name.toLowerCase())
      ),
    }));
  },

  resetFilter: () => set(() => ({ categories: [] })),
}));
