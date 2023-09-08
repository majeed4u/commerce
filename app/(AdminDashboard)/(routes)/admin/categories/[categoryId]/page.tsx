import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categories = await db.category.findUnique({
    where: { id: params.categoryId },
  });
  const genders = await db.gender.findMany();
  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction initialData={categories} genders={genders} />
    </div>
  );
}
