'use client';

import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { SelectOptions } from '@/types/global';
import { toast } from 'react-toastify';

import {
  createProductDefaultState,
  createProductValidationSchema,
} from '@/utils/validation-schema';
import { useFormik } from 'formik';
import { ProductImage } from '../product-image';
import React from 'react';
import { MAX_FILE_SIZE, VALID_TYPES_PHOTO } from '@/constants/global';
import { usePostProducts } from '@/services/products/usePostProducts';
import { useProductStore } from '@/stores/products';

type ProductModalProps = {
  isOpen: boolean;
  categoryOptions: SelectOptions[];
  onClose: () => void;
  onCreate: (product: ProductForm) => void;
};

type ProductForm = {
  name: string;
  description: string;
  price: number;
};

export default function ProductModal({
  isOpen,
  onClose,
  categoryOptions,
}: ProductModalProps) {
  const [imageSrc, setImageSrc] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutateAsync: createProduct, isPending: isPendingProduct } =
    usePostProducts();
  const addProductState = useProductStore((state) => state.addProduct);

  const formik = useFormik({
    initialValues: createProductDefaultState,
    validationSchema: createProductValidationSchema,
    onSubmit: async (formData) => {
      if (!formData.image) {
        toast.error('Debes seleccionar una imagen para el producto');
        return;
      }
      const [newProduct] = await createProduct(formData);
      if (newProduct.id) {
        addProductState(newProduct);
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
          Crear Producto
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
            <ProductImage imageSrc={imageSrc} />
          </span>
          <Input
            label="Nombre"
            name="productName"
            id="productName"
            onChange={formik.handleChange}
            value={formik.values.productName}
            error={formik.errors.productName}
          />
          <Input
            label="Descripción"
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description}
          />
          <div>
            <Select
              label="Categorías"
              id="category_id"
              name="category_id"
              options={categoryOptions}
              onChange={formik.handleChange}
              value={formik.values.category_id}
              error={formik.errors.category_id}
            />
          </div>
          <div className="flex gap-2">
            <Input
              label="Código"
              name="code"
              id="code"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.code}
              error={formik.errors.code}
            />
            <Input
              label="Cantidad"
              name="stock"
              id="stock"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.stock}
              error={formik.errors.stock}
            />
            <Input
              label="Precio"
              name="price"
              id="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.errors.price}
            />
            <Input
              label="Descuento"
              name="disccount"
              id="disccount"
              onChange={formik.handleChange}
              value={formik.values.disccount}
              error={formik.errors.disccount}
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              id="promotion"
              name="promotion"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.promotion ? 1 : 0}
              error={formik.errors.promotion}
              htmlElement={
                <label className="text-gray-500">
                  ¿Deseas checkear este producto como promoción?
                </label>
              }
            />
          </div>
          <div className="flex justify-around mb-2">
            <Button label="Guardar" isLoading={isPendingProduct} />
            <Button level="secondary" label="Cerrar" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  );
}
