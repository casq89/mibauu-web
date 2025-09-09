'use client';

import React, { useState } from 'react';
//import { Filter } from 'lucide-react';

import { useProductStore } from '@/stores/products';
import { Button } from '@/components/button';
import { FilterModal } from '../filter-modal';

export function FilterButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getActiveFiltersCount = useProductStore(
    (state) => state.getActiveFiltersCount
  );

  const activeFiltersCount = getActiveFiltersCount();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>
        <span className="font-medium">
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-1 text-blue-600">({activeFiltersCount})</span>
          )}
        </span>
      </Button>

      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
