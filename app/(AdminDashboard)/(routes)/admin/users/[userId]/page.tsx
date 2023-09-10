import React from 'react';
import AddNew from '../components/add-new';
import { db } from '@/lib/db';
import FormAction from '../components/form-action';

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const users = await db.profile.findUnique({
    where: { id: params.userId },
  });

  return (
    <div className='max-w-screen-xl mx-auto '>
      <FormAction initialData={users} />
    </div>
  );
}
