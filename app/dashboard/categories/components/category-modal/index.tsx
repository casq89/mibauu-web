'use client';

import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Input } from '@/components/input';
import { toast } from 'react-toastify';

import {
  createCategoryDefatulState,
  createCategoryValidationSchema,
} from '@/utils/validation-schema';
import { useFormik } from 'formik';
import React from 'react';
import { MAX_FILE_SIZE, VALID_TYPES_PHOTO } from '@/constants/global';
import { DefaultImage } from '@/components/default-image';
import { usePostCategories } from '@/services/categories/usePostCategories';
import { useCategoryStore } from '@/stores/categories';

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CategoryModal = ({ isOpen, onClose }: ProductModalProps) => {
  const [imageSrc, setImageSrc] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutateAsync: createCategory, isPending: isPendingCategory } =
    usePostCategories();
  const addCategoryState = useCategoryStore((state) => state.addCategory);

  const formik = useFormik({
    initialValues: createCategoryDefatulState,
    validationSchema: createCategoryValidationSchema,
    onSubmit: async (formData) => {
      if (!formData.image) {
        toast.error('Debes seleccionar una imagen para el producto');
        return;
      }
      const [newProduct] = await createCategory({
        ...formData,
        enable: formData.enable === 'true',
      });
      if (newProduct.id) {
        addCategoryState(newProduct);
        formik.resetForm();
        onClose();
      }
    },
  });

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  bg-black/60 flex items-center justify-center">
      <div className="bg-white  mx-auto rounded-xl shadow-lg p-6">
        <h2 className="text-xl text-secondary text-center mb-4">
          Crear Categoría
        </h2>
        <form
          id="upload-form"
          className="space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <span onClick={handleUploadImage}>
            <DefaultImage imageSrc={imageSrc} />
          </span>
          <Input
            label="Nombre"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Input
            label="Descripción"
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description}
          />

          <div className="flex items-center">
            <Checkbox
              id="promotion"
              name="promotion"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.enable ? 1 : 0}
              error={formik.errors.enable}
              htmlElement={
                <label className="text-gray-500">
                  Habilitar esta categoria
                </label>
              }
            />
          </div>
          <div className="flex justify-around mb-2">
            <Button label="Guardar" isLoading={isPendingCategory} />
            <Button level="secondary" label="Cerrar" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
