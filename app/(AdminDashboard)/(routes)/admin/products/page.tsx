import React from 'react';
import AddNew from './components/add-new';

import { db } from '@/lib/db';
import { ColumnData } from './components/column';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
export default async function CategoriesPage() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      brand: true,
      category: true,
      color: true,
      size: true,
    },
  });

  const formattedData: ColumnData[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price.toNumber()),
    description: item.description,
    isNew: item.isFeatured,
    isFeatured: item.isFeatured,
    brand: item.brand.name,
    category: item.category.name,
    color: item.color.value,
    size: item.size.value,
    createdAt: format(new Date(item.createdAt), 'MMM do,yyyy'),
  }));
  return (
    <>
      <AddNew data={formattedData} />
    </>
  );
}
