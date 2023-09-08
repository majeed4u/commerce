import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function GenderPage({
  params,
}: {
  params: { genderId: string };
}) {
  const genders = await db.gender.findUnique({
    where: { id: params.genderId },
  });
  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction initialData={genders} />
    </div>
  );
}
