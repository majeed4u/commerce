/* eslint-disable react/no-unescaped-entities */
import { initialProfile } from '@/lib/initial-profile';
import AdminNav from './(routes)/admin/components/admin-nav';
import AdminSidebar from './(routes)/admin/components/admin-sidebar';
import Image from 'next/image';
import Link from 'next/link';
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await initialProfile();
  if (profile?.role !== 'ADMIN' && profile?.role !== 'SELLER') {
    return (
      <div className='flex items-center justify-center w-full h-full '>
        <div className='flex flex-col items-center justify-center gap-y-3'>
          <h1 className='text-3xl font-bold text-neutral-900'>
            401 Unauthorized
          </h1>
          <p className='mb-3 text-base font-bold text-center text-gray-400 w-96'>
            we couldn't validate your credentials , please check with your admin
          </p>
          <Link
            href='/'
            className='p-2 text-white transition-colors duration-500 rounded-md bg-neutral-900 hover:bg-neutral-800'
          >
            Back to Home page
          </Link>
        </div>
      </div>
    );
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
