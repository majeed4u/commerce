import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const admin = await initialProfile();
    const user = await currentUser();
    const profile = await db.profile.findFirst({
      where: { id: user?.id, userId: admin?.id },
    });

    if (profile?.role === 'USER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const { name, value } = await req.json();
    if (!name) return NextResponse.json('Name is required', { status: 400 });

    const size = await db.size.create({
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (req: Request) => {
  try {
    const size = await db.size.findMany();
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
