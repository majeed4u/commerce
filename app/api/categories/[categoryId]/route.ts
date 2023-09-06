import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const user = await initialProfile();

    if (user?.role !== 'ADMIN' || user?.role !== 'SELLER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const { name, genderId } = await req.json();
    if (!name) return NextResponse.json('Name is required', { status: 400 });

    const category = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        genderId,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const user = await initialProfile();

    if (user?.role !== 'ADMIN' || user?.role !== 'SELLER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const category = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
