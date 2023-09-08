import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  return <div>AdminPage</div>;
}
