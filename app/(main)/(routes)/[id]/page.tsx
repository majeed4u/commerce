import { getProduct } from '@/app/actions/get-product';
import React from 'react';
import SingleProductData from '../../components/single-product-data';

export default async function page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return (
    <div>
      <SingleProductData product={product} />
    </div>
  );
}
