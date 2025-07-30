'use client';

import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { SelectOptions } from '@/types/global';
import {
  createProductDefaultState,
  createProductValidationSchema,
} from '@/utils/validation-schema';
import { useFormik } from 'formik';

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

const handleUploadImage = () => document?.getElementById('file')?.click();

export default function ProductModal({
  isOpen,
  onClose,
  categoryOptions,
}: ProductModalProps) {
  const formik = useFormik({
    initialValues: createProductDefaultState,
    validationSchema: createProductValidationSchema,
    onSubmit: async (formData) => {
      console.log(formData);
    },
  });

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  bg-black/60 flex items-center justify-center">
      <div className="bg-white  mx-auto rounded-xl shadow-lg p-6">
        <h2 className="text-xl text-secondary text-center mb-4">
          Crear Producto
        </h2>
        <form onSubmit={() => console.log} className="space-y-4">
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpeg, .jpg, .png, .webp"
            className="hidden"
            onChange={console.log}
          />
          <span onClick={handleUploadImage}>
            <img
              src="data:image/svg+xml;utf8,
                <svg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'>
                    <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
                    <path d='M3 16l5-5a2 2 0 0 1 2.8 0l7.2 7'></path>
                    <path d='M14 14l1-1a2 2 0 0 1 2.8 0L21 16'></path>
                    <circle cx='7.5' cy='7.5' r='1.5'></circle>
                </svg>"
              alt="Imagen no disponible"
              className="h-50 mx-auto mb-2"
            />
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
            <Button label="Guardar" />
            <Button level="secondary" label="Cerrar" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  );
}
