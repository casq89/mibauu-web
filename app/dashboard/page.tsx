'use client';

import { CardProduct } from '@/components/card-product';
import { useGetCategories } from '@/services/categories/useGetCategories';
import { useGetProducts } from '@/services/products/useGetProducts';
import { getSelectOptions } from '@/utils/categories';
import React from 'react';
import ProductModal from './components/product-modal';
import { useProductStore } from '@/stores/products';
import { CardSkeleton } from '@/components/card-skeleton';
import { ProductHeader } from './components/product-header';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const {
    data: products = [],
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
  } = useGetProducts();
  const { data: categories = [] } = useGetCategories();
  const loadProducts = useProductStore((state) => state.loadProducts);

  React.useEffect(() => {
    if (isSuccessProducts && products) {
      loadProducts(products);
    }
  }, [isSuccessProducts, products, loadProducts]);

  const productList = useProductStore((state) => state.products);

  const categoryOptions = getSelectOptions(categories);

  const showProductModal = () => setIsOpenModal(!isOpenModal);

  return (
    <div className="p-3">
      <ProductHeader showProductModal={showProductModal} />
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
