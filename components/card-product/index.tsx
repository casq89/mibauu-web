'use client';
import { CardProductProps } from '@/types/products';
import React from 'react';
import Image from 'next/image';
import { ToggleSwitch } from '../toggle-switch/indext';
import { Button } from '../button';
import { useFormik } from 'formik';
import {
  productDefaultState,
  productValidationSchema,
} from '@/utils/validation-schema';
import { hasChanged } from '@/utils/objects';
import { ThinInput } from '../thin-input';
import { usePutProducts } from '@/services/products/usePutProducts';
import { ThinSelect } from '../thin-select';
import { useDeleteProducts } from '@/services/products/useDeleteProduct';
import { useConfirmAlert } from '@/hooks/use-confirm-alert';
import { useProductStore } from '@/stores/products';
import { MAX_FILE_SIZE, VALID_TYPES_PHOTO } from '@/constants/global';
import { toast } from 'react-toastify';

export const CardProduct = (product: CardProductProps) => {
  const { imagen_url, categories } = product;
  const [canUpdate, setCanUpdate] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(imagen_url);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const defaultState = productDefaultState(product);
  const { handleConfirmAlert } = useConfirmAlert();
  const deleteProductState = useProductStore((state) => state.deleteProduct);
  const updateProductState = useProductStore((state) => state.updateProduct);

  const { mutateAsync: updateProduct, isPending: isPendingUpdate } =
    usePutProducts();
  const { mutateAsync: deleteProduct, isPending: isPendingDelete } =
    useDeleteProducts();

  const handleRemoveProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    handleConfirmAlert({
      title: 'Eliminar producto',
      message: '¿Estas seguro que deseas eliminar este producto?',
      onclick: async () => {
        const response = await deleteProduct(product.id);
        if (response.success === true) {
          deleteProductState(product.id);
        }
      },
    });
  };

  const formik = useFormik({
    initialValues: defaultState,
    validationSchema: productValidationSchema,
    onSubmit: async (productFormData) => {
      const [product] = await updateProduct(productFormData);
      if (product.id) {
        updateProductState(product);
      }
    },
  });

  React.useEffect(() => {
    const productHasChanged = hasChanged(defaultState, formik.values);
    setCanUpdate(productHasChanged);
  }, [formik.values, product, defaultState]);

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
            <Image
              className="mx-auto"
              alt="product image"
              width={200}
              height={0}
              src={imageSrc}
              priority
            />
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
            id="productName"
            name="productName"
            maxLength={100}
            onChange={formik.handleChange}
            value={formik.values.productName}
          />
          <ThinInput
            label="Descripción"
            id="description"
            name="description"
            maxLength={100}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <ThinInput
            label="Código"
            id="code"
            name="code"
            type="number"
            max="10000"
            onChange={formik.handleChange}
            value={formik.values.code}
          />
          <ThinSelect
            label="Categoría"
            id="category_id"
            name="category_id"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            options={categories}
          />
          <ThinInput
            label="Cantidad"
            id="stock"
            name="stock"
            type="number"
            max="10000"
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          <ThinInput
            label="Precio $"
            id="price"
            name="price"
            type="number"
            max="100000000"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <ThinInput
            label="Descuento"
            id="disccount"
            name="disccount"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.disccount}
          />
          <div className="flex justify-between border-b border-gray-200 pb-1">
            <p className="text-sm text-secondary">Promoción:</p>
            <ToggleSwitch
              enabled={formik.values.promotion}
              onToggle={(promotion) =>
                formik.setFieldValue('promotion', promotion)
              }
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-secondary">Habilitado:</p>
            <ToggleSwitch
              enabled={formik.values.enable}
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
