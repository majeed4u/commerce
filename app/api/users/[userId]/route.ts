import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const admin = await initialProfile();

    if (admin?.role === 'USER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const { role } = await req.json();

    const updatedUser = await db.profile.update({
      where: {
        id: params.userId,
      },
      data: {
        role,
      },
    });
    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const admin = await initialProfile();

    if (admin?.role === 'USER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const updatedProfile = await db.profile.delete({
      where: {
        id: params.userId,
      },
    });
    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const user = await db.profile.findUnique({
      where: {
        id: params.userId,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
