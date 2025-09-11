'use client';

import React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Select } from '@/components/select';
import { useProductStore } from '@/stores/products';
import { RangeSlider } from '@/components/price-range';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const filters = useProductStore((state) => state.filters);
  const allProducts = useProductStore((state) => state.allProducts);
  const toggleCategory = useProductStore((state) => state.toggleCategory);
  const updatePriceRange = useProductStore((state) => state.updatePriceRange);
  const updateSort = useProductStore((state) => state.updateSort);
  const clearFilters = useProductStore((state) => state.clearFilters);
  const resetFilter = useProductStore((state) => state.resetFilter);
  const getActiveFiltersCount = useProductStore(
    (state) => state.getActiveFiltersCount
  );

  const categories = allProducts.map((p) => ({
    name: p.category?.name,
    id: p.category_id,
  }));

  const uniqueCategories = categories.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const activeFiltersCount = getActiveFiltersCount();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClearAndClose = () => {
    clearFilters();
    onClose();
    resetFilter();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Filtros de Productos
            </h2>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-100 text-black text-sm font-medium px-2.5 py-1 rounded-full">
                {activeFiltersCount} activos
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Categorías
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {uniqueCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(
                        category?.name || ''
                      )}
                      onChange={() => toggleCategory(category?.name || '')}
                      htmlElement={
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {category?.name}
                        </label>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2">
              <RangeSlider
                label="Rango de precios"
                minValue={0}
                maxValue={1000000}
                step={1000}
                value={{
                  min: filters.priceRange[0],
                  max: filters.priceRange[1],
                }}
                onChange={({ min, max }) => updatePriceRange([min, max])}
              />
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Ordenar por
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label=""
                  options={[
                    { value: 'name', label: 'Nombre' },
                    { value: 'price', label: 'Precio' },
                    { value: 'rating', label: 'Calificación' },
                    { value: 'newest', label: 'Más recientes' },
                  ]}
                  value={filters.sortBy}
                  onChange={(e) =>
                    updateSort(e.target.value as any, filters.sortOrder)
                  }
                />
                <Select
                  label=""
                  options={[
                    { value: 'asc', label: 'Ascendente' },
                    { value: 'desc', label: 'Descendente' },
                  ]}
                  value={filters.sortOrder}
                  onChange={(e) =>
                    updateSort(filters.sortBy, e.target.value as any)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleClearAndClose}
              label="Limpiar y cerrar"
              level="success"
            />
            <Button onClick={onClose} label="Aplicar filtros" />
          </div>
        </div>
      </div>
    </div>
  );
}
