import React from 'react';
import AddNew from './components/add-new';

import { db } from '@/lib/db';
import { ColumnData } from './components/column';
import { format } from 'date-fns';
export default async function CategoriesPage() {
  const profiles = await db.profile.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedData: ColumnData[] = profiles.map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    createdAt: format(new Date(item.createdAt), 'MMM do,yyyy'),
  }));
  return (
    <>
      <AddNew data={formattedData} />
    </>
  );
}
