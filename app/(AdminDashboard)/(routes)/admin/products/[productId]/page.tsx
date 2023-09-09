import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const products = await db.product.findUnique({
    where: { id: params.productId },
  });
  const categories = await db.category.findMany();
  const brands = await db.brand.findMany();
  const colors = await db.color.findMany();
  const sizes = await db.size.findMany();
  const genders = await db.gender.findMany();
  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction
        initialData={products}
        colors={colors}
        categories={categories}
        brands={brands}
        sizes={sizes}
        genders={genders}
      />
    </div>
  );
}
