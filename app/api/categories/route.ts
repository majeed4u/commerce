import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const user = await initialProfile();

    if (user?.role !== 'ADMIN' || user?.role !== 'SELLER') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const { name, genderId } = await req.json();
    if (!name) return NextResponse.json('Name is required', { status: 400 });

    const category = await db.category.create({
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
export const GET = async (req: Request) => {
  try {
    const category = await db.category.findMany();
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
