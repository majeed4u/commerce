import React from 'react';
import AdminMainNav from './admin-main-nav';
import { initialProfile } from '@/lib/initial-profile';
import { ProfileProps } from '@/app/types';

export default async function AdminSidebar() {
  const adminRole: ProfileProps = await initialProfile();
  console.log(adminRole);
  return (
    <div>
      <AdminMainNav adminRole={adminRole} />
    </div>
  );
}
