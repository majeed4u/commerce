import React from 'react';
import AdminMainNav from './admin-main-nav';

import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';

export default async function AdminSidebar() {
  const profiles = await initialProfile();
  return (
    <div>
      <AdminMainNav profiles={profiles} />
    </div>
  );
}
