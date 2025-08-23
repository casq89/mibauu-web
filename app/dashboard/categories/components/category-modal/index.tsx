import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { usePostCategories } from '@/services/categories/usePostCategories';
import { usePutCategories } from '@/services/categories/usePutCategories';
import { useCategoryStore } from '@/stores/categories';
import {
  createCategoryDefatulState,
  createCategoryValidationSchema,
} from '@/utils/validation-schema';
import { useFormik } from 'formik';
import React from 'react';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CategoryModal = ({ isOpen, onClose }: CategoryModalProps) => {
  const { mutateAsync: createCategory, isPending: isPendingCategory } =
    usePostCategories();
  const { mutateAsync: updateCategory, isPending: isPendingPutCategory } =
    usePutCategories();
  const addCategoryState = useCategoryStore((state) => state.addCategory);
  const updateCategoryState = useCategoryStore((state) => state.updateCategory);
  const { id, name, description, enable } = useCategoryStore(
    (state) => state.category
  );
  const isEditing = !!id;

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    onClose();
  };

  const formik = useFormik({
    initialValues: createCategoryDefatulState,
    validationSchema: createCategoryValidationSchema,
    onSubmit: async ({ id, categoryName, description, enable }) => {
      if (isEditing) {
        const [updatedCategory] = await updateCategory({
          id,
          name: categoryName,
          description,
          enable: enable === 'true' ? true : false,
        });
        if (!updatedCategory.id) return;
        updateCategoryState(updatedCategory);
        formik.resetForm();
        onClose();
      } else {
        const [newCategory] = await createCategory({
          name: categoryName,
          description,
          enable: !!enable,
        });
        if (!newCategory.id) return;
        addCategoryState(newCategory);
        formik.resetForm();
        onClose();
      }
    },
  });

  React.useEffect(() => {
    if (isEditing) {
      formik.setValues({
        id: id || '',
        categoryName: name,
        description,
        enable: enable ? 'true' : ' false',
      });
    } else {
      formik.setValues(createCategoryDefatulState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  bg-black/60 flex items-center justify-center">
      <div className="bg-white w-1/4  mx-auto rounded-xl shadow-lg p-6">
        <h2 className="text-xl text-secondary text-center mb-4">
          {`${isEditing ? 'Editar' : 'Crear'} Categoría`}
        </h2>
        <form
          id="category-form"
          className="space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <Input
            label="Nombre"
            name="categoryName"
            id="categoryName"
            onChange={formik.handleChange}
            value={formik.values.categoryName}
            error={formik.errors.categoryName}
          />
          <Input
            label="Descripción"
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description}
          />
          <div className="flex justify-around mb-2">
            <Button
              label="Guardar"
              isLoading={isPendingCategory || isPendingPutCategory}
            />
            <Button level="secondary" label="Cerrar" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
