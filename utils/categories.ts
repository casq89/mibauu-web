import { Category } from '@/types/categories';
import { SelectOptions } from '@/types/global';

export const getSelectOptions = (
  categories: Category[] = []
): SelectOptions[] => {
  return categories?.map(({ id, name }) => ({ label: name, value: id }));
};
