import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';
import AdminNav from './(routes)/admin/components/admin-nav';
import AdminSidebar from './(routes)/admin/components/admin-sidebar';

import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await initialProfile();
  if (profile?.role !== 'ADMIN' && profile?.role !== 'SELLER') {
    return redirect('/');
  }
  return (
    <div className=''>
      <div className='flex '>
        <div className='flex-1 h-screen px-3 text-gray-100 bg-gray-900/90 '>
          <h1 className='flex items-center p-6 mb-20 '>
            <Image
              height={100}
              width={100}
              src='/images/logo.png'
              alt='logo'
              className='font-bold w-28 h-28'
            />
          </h1>
          <AdminSidebar />
        </div>
        <div className=' flex-[7]'>
          <AdminNav />
          {children}
        </div>
      </div>
    </div>
  );
}
