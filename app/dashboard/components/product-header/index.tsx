'use client';

import React from 'react';
// import { FilterButton } from './FilterButton';
import { Autocomplete } from '@/components/autocomplete';
import { useProductStore } from '@/stores/products';
import { Button } from '@/components/button';
import { FilterButton } from '../filter-button';

type Props = {
  showProductModal: () => void;
};

export function ProductHeader({ showProductModal }: Props) {
  const products = useProductStore((state) => state.products);
  const allProducts = useProductStore((state) => state.allProducts);

  const filterProductsByName = useProductStore(
    (state) => state.filterProductsByName
  );
  const resetFilterProducts = useProductStore((state) => state.resetFilter);
  const productsNames = products.map((product) => product.name);

  const handleSelect = (value: string) => {
    if (value === '') resetFilterProducts();
    filterProductsByName(value);
  };

  return (
    <div className="flex items-center mb-3">
      <div className="flex-1 justify-between flex items-center">
        <div className="flex items-center">
          <h1 className="text-primary mr-3">Productos</h1>
          <Button label="Crear producto" onClick={showProductModal} />
        </div>
        <div className="ml-8">
          {/* <Autocomplete items={productsNames} onSelect={handleSelect} /> */}
          <FilterButton />
        </div>
      </div>
    </div>
    // <div className="bg-white/95 border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //     <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
    //       <div className="flex items-center space-x-4 flex-1">
    //         <Autocomplete items={productsNames} onSelect={handleSelect} />
    //         {/* <FilterButton /> */}
    //       </div>

    //       <div className="flex items-center space-x-4">
    //         <span className="text-sm text-gray-600">
    //           Mostrando {products.length} de {allProducts.length} productos
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
