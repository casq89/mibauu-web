'use client';

import { Button } from '@/components/button';
import { CardProduct } from '@/components/card-product';
import { useGetCategories } from '@/services/categories/useGetCategories';
import { useGetProducts } from '@/services/products/useGetProducts';
import { getSelectOptions } from '@/utils/categories';
import React from 'react';
import ProductModal from './components/product-modal';
import { useProductStore } from '@/stores/products';
import { CardSkeleton } from '@/components/card-skeleton';
import { Autocomplete } from '@/components/autocomplete';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const {
    data: products = [],
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
  } = useGetProducts();
  const { data: categories = [] } = useGetCategories();
  const loadProducts = useProductStore((state) => state.loadProducts);
  const filterProductsByName = useProductStore(
    (state) => state.filterProductsByName
  );
  const resetFilterProducts = useProductStore((state) => state.resetFilter);
  const productsNames = products.map((product) => product.name);

  React.useEffect(() => {
    if (isSuccessProducts && products) {
      loadProducts(products);
    }
  }, [isSuccessProducts, products, loadProducts]);

  const productList = useProductStore((state) => state.products);

  const categoryOptions = getSelectOptions(categories);

  const showProductModal = () => setIsOpenModal(!isOpenModal);

  const handleSelect = (value: string) => {
    if (value === '') resetFilterProducts();
    filterProductsByName(value);
  };

  return (
    <div className="p-3">
      <div className="flex items-center mb-3">
        <div className="flex-1 justify-between flex items-center">
          <div className="flex items-center">
            <h1 className="text-primary mr-3">Productos</h1>
            <Button label="Crear producto" onClick={showProductModal} />
          </div>
          <div className="ml-8">
            <Autocomplete items={productsNames} onSelect={handleSelect} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {isLoadingProducts ? <CardSkeleton /> : null}
        {productList?.map(({ name, ...product }) => (
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
      />
    </div>
  );
}
