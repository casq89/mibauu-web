'use client';
import { CreateProduct } from '@/types/products';
import React from 'react';
import { ToggleSwitch } from '../toggle-switch/indext';
import { Button } from '../button';
import { useFormik } from 'formik';
import { createCategoryValidationSchema } from '@/utils/validation-schema';
import { hasChanged } from '@/utils/objects';
import { ThinInput } from '../thin-input';
import { useConfirmAlert } from '@/hooks/use-confirm-alert';
import { MAX_FILE_SIZE, VALID_TYPES_PHOTO } from '@/constants/global';
import { toast } from 'react-toastify';
import { ImageUI } from '../image';
import { useDeleteCategory } from '@/services/categories/useDeleteCategory';
import { usePutCategories } from '@/services/categories/usePutCategories';
import { useCategoryStore } from '@/stores/categories';

export const CardCategory = (category: CreateProduct) => {
  const { image_url } = category;
  const [canUpdate, setCanUpdate] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(image_url);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const defaultState = {
    id: category.id,
    name: category.name,
    description: category.description,
    enable: category.enable,
    image: category.image_url,
  };
  const { handleConfirmAlert } = useConfirmAlert();
  const deleteCategoryState = useCategoryStore((state) => state.deleteCategory);
  const updateCategoryState = useCategoryStore((state) => state.updateCategory);

  const { mutateAsync: updateCategory, isPending: isPendingUpdate } =
    usePutCategories();
  const { mutateAsync: deleteCategory, isPending: isPendingDelete } =
    useDeleteCategory();

  const handleRemoveProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    handleConfirmAlert({
      title: 'Eliminar esta categoría',
      message: '¿Estas seguro que deseas eliminar este categoria?',
      onclick: async () => {
        const response = await deleteCategory(category.id);
        if (response.success === true) {
          deleteCategoryState(category.id);
        }
      },
    });
  };

  const formik = useFormik({
    initialValues: defaultState,
    validationSchema: createCategoryValidationSchema,
    onSubmit: async (categoryFormData) => {
      console.log('categoryFormData: ', categoryFormData);
      const [product] = await updateCategory(categoryFormData);
      console.log('product: ', product);
      if (product.id) {
        updateCategoryState(product);
      }
    },
  });

  React.useEffect(() => {
    const productHasChanged = hasChanged(defaultState, formik.values);
    setCanUpdate(productHasChanged);
  }, [formik.values, category, defaultState]);

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target?.files?.length) return;

    const file = event.target.files[0];

    if (file) {
      if (!VALID_TYPES_PHOTO.includes(file.type)) {
        toast.error(
          'Formato de archivo no válido. Por favor, suba una imagen .jpeg, .jpg, .png o .webp.'
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          'El archivo es demasiado grande. El tamaño máximo permitido es de 2 MB.'
        );
        return;
      }
      formik.setFieldValue('image', file);
      const tempUrl = URL.createObjectURL(file);
      setImageSrc(tempUrl);
    }
  };

  const isDisabledSubmit = !canUpdate || isPendingUpdate || isPendingDelete;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
      <form onSubmit={formik.handleSubmit}>
        <div className="h-50 cursor-pointer hover:opacity-80">
          <span onClick={handleUploadImage}>
            <ImageUI alt="category image" src={imageSrc || ''} />
          </span>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="p-4 space-y-1">
          <ThinInput
            label="Nombre"
            id="name"
            name="name"
            maxLength={100}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <ThinInput
            label="Descripción"
            id="description"
            name="description"
            maxLength={100}
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <div className="flex justify-between border-b border-gray-200 pb-1">
            <p className="text-sm text-secondary">Habilitado:</p>
            <ToggleSwitch
              enabled={!!formik.values.enable}
              onToggle={(enable) => formik.setFieldValue('enable', enable)}
            />
          </div>
        </div>
        <div className="flex justify-around mb-2">
          <Button
            level={canUpdate ? 'success' : 'disabled'}
            label="Guardar"
            disabled={isDisabledSubmit}
            isLoading={isPendingUpdate}
          />
          <Button
            level="danger"
            label="Eliminar"
            isLoading={isPendingDelete}
            onClick={handleRemoveProduct}
          />
        </div>
      </form>
    </div>
  );
};
