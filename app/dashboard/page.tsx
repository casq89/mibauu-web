'use client';

import { CardProduct } from '@/components/card-product';
import { useGetCategories } from '@/services/categories/useGetCategories';
import { useGetProducts } from '@/services/products/useGetProducts';
import { getSelectOptions } from '@/utils/categories';
import React from 'react';

export default function Page() {
  const { data: products = [] } = useGetProducts();
  const { data: categories = [] } = useGetCategories();

  const categoryOptions = getSelectOptions(categories);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-3">
      {products?.map(({ name, ...product }) => (
        <CardProduct
          key={product.id}
          productName={name}
          {...product}
          categories={categoryOptions}
        />
      ))}
    </div>
  );
}
