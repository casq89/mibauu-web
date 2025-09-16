import { Category } from '@/types/categories';
import { SelectOptions } from '@/types/global';

export const getSelectOptions = (
  categories: Category[] = []
): SelectOptions[] => {
  return categories?.map(({ id, name }) => ({ label: name, value: id }));
};

export const generateFormRequestCategory = (category: Category) => {
  const formData = new FormData();

  formData.append('image', category.image || '');
  formData.append('name', category.name);
  formData.append('description', category.description);
  formData.append('enable', category.enable ? 'true' : 'false');

  return formData;
};
