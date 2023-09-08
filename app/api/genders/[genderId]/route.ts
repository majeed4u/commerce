import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { genderId: string } }
) => {
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

    const gender = await db.gender.update({
      where: {
        id: params.genderId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(gender, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { genderId: string } }
) => {
  try {
    const admin = await initialProfile();
    const user = await currentUser();
    const profile = await db.profile.findFirst({
      where: { id: user?.id, userId: admin?.id },
    });

    if (profile?.role === 'USER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const gender = await db.gender.delete({
      where: {
        id: params.genderId,
      },
    });
    return NextResponse.json(gender, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (
  req: Request,
  { params }: { params: { genderId: string } }
) => {
  try {
    const gender = await db.gender.findUnique({
      where: {
        id: params.genderId,
      },
    });
    return NextResponse.json(gender, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
