import React from 'react';
import AddNew from './components/add-new';

import { db } from '@/lib/db';
import { ColumnData } from './components/column';
import { format } from 'date-fns';
export default async function BrandsPage() {
  const brands = await db.brand.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedData: ColumnData[] = brands.map((item) => ({
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
