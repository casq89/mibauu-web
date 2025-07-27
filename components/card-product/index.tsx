'use client';
import { Product } from '@/types/products';
import React, { InputHTMLAttributes } from 'react';
import Image from 'next/image';
import { ToggleSwitch } from '../toggle-switch/indext';
import { Button } from '../button';
import { EyeIcon, PencilIcon } from '../icons';
import { useFormik } from 'formik';

type LabeledThinInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const LabeledThinInput = ({ label, ...restProps }: LabeledThinInputProps) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200">
      <label className="text-sm text-secondary whitespace-nowrap">
        {label}:
      </label>
      <input
        type="text"
        className="text-sm text-secondary bg-transparent focus:outline-none flex-1"
        {...restProps}
      />
      <PencilIcon />
    </div>
  );
};

export const CardProduct = ({
  code,
  name,
  description,
  price,
  stock,
  promotion,
  disccount,
  category: { name: categoryName },
  enable,
  imagen_url,
}: Product) => {
  const [promotionChange, setPromotionChange] = React.useState(promotion);
  const [enableChange, setEnableChange] = React.useState(enable);
  const [disccountChange, setDisccountChange] = React.useState(disccount ?? 0);

  const formik = useFormik({
    initialValues: {
      code,
      name,
      description,
      price,
      stock,
      promotion,
      disccount: disccount ?? 0,
      enable,
      imagen_url,
    },
    validationSchema: {},
    onSubmit: async (formData) => {
      //   const wasLogged = await login(formData);
    },
  });

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 pb-1">
      <form onSubmit={formik.handleSubmit}>
        <Image
          className="max-w-lg mx-auto align-middle"
          alt="product image"
          width={200}
          height={0}
          src={imagen_url}
          style={{ width: '200px', height: 'auto' }}
        />
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary">Nombre: {name}</h2>
          </div>
          <p className="text-sm text-secondary border-b border-gray-200 pb-1">
            Descripción: {description}
          </p>
          <p className="text-sm text-secondary border-b border-gray-200 pb-1">
            Código: {code}
          </p>
          <p className="text-sm text-secondary border-b border-gray-200 pb-1">
            Categoría: {categoryName}
          </p>
          <p className="text-sm text-secondary border-b border-gray-200 pb-1">
            Cantidad: {stock}
          </p>
          <p className="text-sm text-secondary border-b border-gray-200 pb-1">
            Precio: {price}
          </p>
          <LabeledThinInput
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
              enabled={promotionChange}
              onToggle={() => setPromotionChange(!promotionChange)}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-secondary">Habilitado:</p>
            <ToggleSwitch
              enabled={enableChange}
              onToggle={() => setEnableChange(!enableChange)}
            />
          </div>
        </div>
        <div className="flex justify-around">
          <Button level="success" label="Actualizar producto" />
          <Button level="danger" label="Borrar Producto" />
        </div>
      </form>
    </div>
  );
};
