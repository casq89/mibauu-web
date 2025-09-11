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
  );
}
