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
    const { name } = await req.json();
    if (!name) return NextResponse.json('Name is required', { status: 400 });

    const gender = await db.gender.create({
      data: {
        name,
      },
    });
    return NextResponse.json(gender, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (req: Request) => {
  try {
    const gender = await db.gender.findMany();
    return NextResponse.json(gender, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
