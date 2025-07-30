'use client';

import { Button } from '@/components/button';
import { CardProduct } from '@/components/card-product';
import { useGetCategories } from '@/services/categories/useGetCategories';
import { useGetProducts } from '@/services/products/useGetProducts';
import { getSelectOptions } from '@/utils/categories';
import React from 'react';
import ProductModal from './components/product-modal';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const { data: products = [] } = useGetProducts();
  const { data: categories = [] } = useGetCategories();

  const categoryOptions = getSelectOptions(categories);

  const showProductModal = () => setIsOpenModal(!isOpenModal);

  return (
    <div className="p-3">
      <div className="flex items-center mb-3">
        <h1 className="text-primary mr-3">Productos</h1>
        <Button label="Crear producto" onClick={showProductModal} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {products?.map(({ name, ...product }) => (
          <CardProduct
            key={product.id}
            productName={name}
            {...product}
            categories={categoryOptions}
          />
        ))}
      </div>
      <ProductModal
        categoryOptions={categoryOptions}
        isOpen={isOpenModal}
        onClose={showProductModal}
        onCreate={() => console.log}
      />
    </div>
  );
}
