import React from 'react';
import AddNew from './components/add-new';

import { db } from '@/lib/db';
import { ColumnData } from './components/column';
import { format } from 'date-fns';
export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedData: ColumnData[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(new Date(item.createdAt), 'MMM do,yyyy'),
  }));
  return (
    <>
      <AddNew data={formattedData} />
    </>
  );
}
