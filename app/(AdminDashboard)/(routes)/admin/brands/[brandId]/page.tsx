import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function BrandPage({
  params,
}: {
  params: { brandId: string };
}) {
  const brands = await db.brand.findUnique({
    where: { id: params.brandId },
  });
  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction initialData={brands} />
    </div>
  );
}
