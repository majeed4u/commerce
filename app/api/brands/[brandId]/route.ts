import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { brandId: string } }
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

    const brand = await db.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { brandId: string } }
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
    const brand = await db.brand.delete({
      where: {
        id: params.brandId,
      },
    });
    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (
  req: Request,
  { params }: { params: { brandId: string } }
) => {
  try {
    const brand = await db.brand.findUnique({
      where: {
        id: params.brandId,
      },
    });
    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
