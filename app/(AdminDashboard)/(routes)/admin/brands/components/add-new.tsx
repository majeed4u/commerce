'use client';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Router } from 'lucide-react';
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
          title={`Brands (${data.length})`}
          description=' Mange brands for your store'
        />
        <Button
          className='text-left '
          size='lg'
          onClick={() => router.push('/admin/brands/new')}
        >
          AddNew
        </Button>
      </div>
      <Separator className='mt-6 ' />
      <DataTable columns={columns} data={data} searchKey='name' />
    </div>
  );
}
