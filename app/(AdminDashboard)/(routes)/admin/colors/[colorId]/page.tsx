import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const colors = await db.color.findUnique({
    where: { id: params.colorId },
  });
  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction initialData={colors} />
    </div>
  );
}
