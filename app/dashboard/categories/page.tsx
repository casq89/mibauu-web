'use client';
import { Button } from '@/components/button';
import { useCategoryStore } from '@/stores/categories';
import React from 'react';
import { useGetCategories } from '@/services/categories/useGetCategories';
import { CategoryModal } from './components/category-modal';
import { NoResults } from '@/components/no-results';
import { Autocomplete } from '@/components/autocomplete';
import { CardCategory } from '@/components/card-category';
import { CardSkeleton } from '@/components/card-skeleton';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const {
    data: categories = [],
    isSuccess: isSuccessCategories,
    isLoading: isLoadingCategories,
  } = useGetCategories();
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

  console.log('categoriesList: ', categoriesList);

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

  //  if (isLoadingCategories) return <TableSekeleton />;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {isLoadingCategories ? <CardSkeleton /> : null}
      </div>

      {!categoriesList.length ? (
        <NoResults
          message="No hay categorías"
          description="Agrega una categoría para verla aquí"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {categoriesList?.map(
            ({ id, name, image_url, enable, description }) => (
              <CardCategory
                id={id || ''}
                key={id}
                name={name}
                description={description}
                image_url={image_url}
                enable={enable}
              />
            )
          )}
        </div>
      )}
      <CategoryModal isOpen={isOpenModal} onClose={showCategoryModal} />
    </div>
  );
}
