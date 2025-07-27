'use client';

import { CardProduct } from '@/components/card-product';
import { useGetProducts } from '@/services/products/useGetProducts';
import React from 'react';

export default function Page() {
  const { data: products } = useGetProducts();
  console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-3">
      {products?.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </div>
  );
}
