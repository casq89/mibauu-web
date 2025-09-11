'use client';
import { Button } from '@/components/button';
import { useCategoryStore } from '@/stores/categories';
import React from 'react';
import { CategoryBody } from './components/category-body';
import { useGetCategories } from '@/services/categories/useGetCategories';
import { usePutCategories } from '@/services/categories/usePutCategories';
import { useDeleteCategory } from '@/services/categories/useDeleteCategory';
import { CategoryModal } from './components/category-modal';
import { TableSekeleton } from '@/components/table-skeleton';
import { NoResults } from '@/components/no-results';
import { Autocomplete } from '@/components/autocomplete';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const {
    data: categories = [],
    isSuccess: isSuccessCategories,
    isLoading: isLoadingCategories,
  } = useGetCategories();
  const { mutateAsync: updateCategory } = usePutCategories();
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const namesCategories = categories.map((category) => category.name);

  const loadCategories = useCategoryStore((state) => state.loadCategories);
  const cleanCategory = useCategoryStore((state) => state.cleanCategory);
  const allCategories = useCategoryStore((state) => state.allCategories);
  const filteredCategorieByName = useCategoryStore(
    (state) => state.filteredCategorieByName
  );
  const resetFilter = useCategoryStore((state) => state.resetFilter);

  React.useEffect(() => {
    if (isSuccessCategories && categories) {
      loadCategories(categories);
    }
  }, [isSuccessCategories, loadCategories, categories]);

  const categoriesList = useCategoryStore((state) => state.categories);

  const showCategoryModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const showCategoryModalCreate = () => {
    cleanCategory();
    setIsOpenModal(!isOpenModal);
  };

  const handleSelect = (value: string) => {
    if (value === '') {
      resetFilter();
      loadCategories(allCategories);
      return;
    }
    filteredCategorieByName(value);
  };

  if (isLoadingCategories) return <TableSekeleton />;

  return (
    <div className="p-3">
      <div className="flex items-center mb-3 justify-between">
        <div className="flex items-center">
          <h1 className="text-primary mr-3">Categorías</h1>
          <Button label="Crear categoría" onClick={showCategoryModalCreate} />
        </div>

        <div>
          <Autocomplete items={namesCategories} onSelect={handleSelect} />
        </div>
      </div>
      {!categoriesList.length ? (
        <NoResults
          message="No hay categorías"
          description="Agrega una categoría para verla aquí"
        />
      ) : (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Eliminar
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Editar
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {categoriesList.map((category) => (
                  <CategoryBody
                    key={category.id}
                    category={category}
                    updateCategory={updateCategory}
                    deleteCategory={deleteCategory}
                    showCategoryModal={showCategoryModal}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CategoryModal isOpen={isOpenModal} onClose={showCategoryModal} />
    </div>
  );
}
