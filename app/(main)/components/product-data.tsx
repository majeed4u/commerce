/* eslint-disable react/jsx-key */
'use client';
import { Products } from '@/app/types';
import ProductCard from '@/components/product-card';
import React from 'react';
import { useProductModalContext } from '@/providers/modal-provider';
import SingleProductModal from '@/components/single-product-modal';
import ProductPreview from './product-preview';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';
import ProductSkeleton from '@/components/porduct-skelton';

export default function ProductData() {
  const { setVisible, visible } = useProductModalContext();
  const { data, isLoading, error } = useSWR(
    'http://localhost:3000/api/products',
    fetcher
  );
  const products: Products[] = data;

  const [popup, setPopup] = React.useState<Products[]>([]);
  const changePopup = (product: Products) => {
    setPopup([product]);
  };

  return (
    <>
      <div className='container grid grid-cols-1 gap-3 mx-auto md:grid-cols-2 lg:grid-cols-3'>
        {isLoading && <ProductSkeleton cards={11} />}
        {products?.map((product: Products) => (
          <>
            <ProductCard
              key={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              id={product.id}
              isLoading={isLoading}
              title='quick view'
              onClick={() => {
                setVisible(true);
                changePopup(product);
              }}
            />
          </>
        ))}
      </div>
      {/* product popup */}
      {isLoading && <ProductSkeleton cards={1} />}
      <SingleProductModal isVisible={visible} onClose={() => setVisible(false)}>
        {popup?.map((product: Products) => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </SingleProductModal>
    </>
  );
}
