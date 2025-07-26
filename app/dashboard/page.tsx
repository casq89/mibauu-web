'use client';

import { useGetProducts } from '@/services/products/useGetProducts';
import React from 'react';

export default function Page() {
  const { data: products } = useGetProducts();

  return (
    <div>
      <h1>Dashboard page</h1>
      {products?.map((product) => (
        <p
          key={product.id}
        >{`${product.code} -----${product.name} ----- ${product.stock}  ----- $${product.price}`}</p>
      ))}
    </div>
  );
}
