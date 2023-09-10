'use client';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ColumnData, columns } from './column';
import DataTable from '@/components/ui/data-table';

interface AddNewProps {
  data: ColumnData[];
}

export default function AddNew({ data }: AddNewProps) {
  const router = useRouter();

  return (
    <div className='max-w-screen-xl mx-auto '>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Users (${data.length})`}
          description=' Mange User for your store'
        />
        <Button
          className='text-left '
          size='lg'
          onClick={() => router.push('/admin/users/new')}
        >
          AddNew
        </Button>
      </div>
      <Separator className='mt-6 ' />
      <DataTable columns={columns} data={data} searchKey='name' />
    </div>
  );
}
