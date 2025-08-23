import { PencilIcon, TrashIcon } from '@/components/icons';
import { ToggleSwitch } from '@/components/toggle-switch/indext';
import { useConfirmAlert } from '@/hooks/use-confirm-alert';
import { useCategoryStore } from '@/stores/categories';
import { Category, CategoryDefaultState } from '@/types/categories';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import React from 'react';

type CategoryBodyProps = {
  category: Category;
  updateCategory: UseMutateAsyncFunction<
    Category[],
    Error,
    CategoryDefaultState,
    unknown
  >;
  deleteCategory: UseMutateAsyncFunction<
    {
      success: boolean;
    },
    Error,
    string,
    unknown
  >;
  showCategoryModal: () => void;
};

export const CategoryBody = ({
  category,
  updateCategory,
  deleteCategory,
  showCategoryModal,
}: CategoryBodyProps) => {
  const { id, name, description, enable } = category;
  const [categoryState, setCategoryState] = React.useState(enable);
  const { handleConfirmAlert } = useConfirmAlert();
  const deleteCategoryStore = useCategoryStore((state) => state.deleteCategory);
  const setCategory = useCategoryStore((state) => state.setCategory);

  const handleUpdateCategory = async () => {
    setCategoryState(!enable);
    const categoryUpdated = await updateCategory({ id, enable: !enable });
    if (categoryUpdated.length === 0) {
      setCategoryState(enable);
    }
  };

  const handleRemoveCategory = async () => {
    handleConfirmAlert({
      title: 'Eliminar categoría',
      message: '¿Estas seguro que deseas eliminar esta categoría?',
      onclick: async () => {
        deleteCategoryStore(id || '');
        await deleteCategory(id || '');
      },
    });
  };

  const handleShowCategoryModal = () => {
    setCategory(category);
    showCategoryModal();
  };
  return (
    <tr key={id} className="hover:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium">
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs text-secondary">
          {id}
        </code>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-secondary">
        {name}
      </td>
      <td className="px-4 py-3 text-sm text-secondary">
        <p className="line-clamp-2 max-w-xl">{description || '—'}</p>
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <ToggleSwitch enabled={categoryState} onToggle={handleUpdateCategory} />
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <span onClick={handleRemoveCategory}>
          <TrashIcon styles="w-6 cursor-pointer h-6 text-red-400" />
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <span onClick={handleShowCategoryModal}>
          <PencilIcon />
        </span>
      </td>
    </tr>
  );
};
