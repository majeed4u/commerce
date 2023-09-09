'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnData = {
  id: string;
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  gender: string;
  color: string;
  size: string;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },

  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },

  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <span className='flex items-center gap-x-2'>
        {row.original.color}
        <div
          style={{ backgroundColor: `${row.original.color}` }}
          className='w-5 h-5 p-1 border border-gray-300 rounded-full '
        />
      </span>
    ),
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'isNew',
    header: 'New',
  },

  {
    accessorKey: 'createdAt',
    header: 'Date',
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
