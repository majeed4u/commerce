import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const sizes = await db.size.findUnique({
    where: { id: params.sizeId },
  });
  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction initialData={sizes} />
    </div>
  );
}
