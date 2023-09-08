import React from 'react';
import AddNew from './components/add-new';

import { db } from '@/lib/db';
import { ColumnData } from './components/column';
import { format } from 'date-fns';
export default async function SizePage() {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedData: ColumnData[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(new Date(item.createdAt), 'MMM do,yyyy'),
  }));
  return (
    <>
      <AddNew data={formattedData} />
    </>
  );
}
