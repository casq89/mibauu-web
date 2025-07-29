'use client';
import { CardProductProps } from '@/types/products';
import React, { useEffect } from 'react';
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
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteProducts } from '@/services/products/useDeleteProduct';

export const CardProduct = (product: CardProductProps) => {
  const { imagen_url, categories } = product;
  const [canUpdate, setCanUpdate] = React.useState(false);
  const defaultState = productDefaultState(product);
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateProduct,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = usePutProducts();
  const {
    mutateAsync: deleteProduct,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteProducts();

  const handleRemoveProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await deleteProduct(product.id);
  };

  const formik = useFormik({
    initialValues: defaultState,
    validationSchema: productValidationSchema,
    onSubmit: async ({ productName, ...restProduct }) => {
      await updateProduct({
        ...restProduct,
        name: productName,
      });
    },
  });

  useEffect(() => {
    if (isSuccessUpdate || isSuccessDelete) {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  }, [isSuccessUpdate, isSuccessDelete]);

  React.useEffect(() => {
    const productHasChanged = hasChanged(defaultState, formik.values);
    setCanUpdate(productHasChanged);
  }, [formik.values, product]);

  const isDisabledSubmit = !canUpdate || isPendingUpdate || isPendingDelete;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 pb-1">
      <form onSubmit={formik.handleSubmit}>
        <Image
          className="max-w-lg mx-auto align-middle"
          alt="product image"
          width={200}
          height={0}
          src={imagen_url}
        />
        <div className="p-4 space-y-2">
          <ThinInput
            label="Nombre"
            id="productName"
            name="productName"
            onChange={formik.handleChange}
            value={formik.values.productName}
          />
          <ThinInput
            label="Descripción"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <ThinInput
            label="Código"
            id="code"
            name="code"
            type="number"
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
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          <ThinInput
            label="Precio"
            id="price"
            name="price"
            type="number"
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
        <div className="flex justify-around">
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
