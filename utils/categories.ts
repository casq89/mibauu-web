import { Category } from '@/types/categories';

export const getSelectOptions = (categories: Category[] = []) => {
  return categories?.map(({ id, name }) => ({ label: name, value: id }));
};
