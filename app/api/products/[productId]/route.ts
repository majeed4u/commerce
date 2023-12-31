import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { productId: string } }
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
    const {
      name,
      description,
      price,
      brandId,
      categoryId,
      colorId,
      sizeId,
      genderId,
      imageUrl,
      isFeatured,
      isNew,
    } = await req.json();
    if (!name) return NextResponse.json('Name is required', { status: 400 });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price,
        brandId,
        categoryId,
        colorId,
        sizeId,
        genderId,
        imageUrl,
        isFeatured,
        isNew,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { productId: string } }
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
    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        color: true,
        category: true,
        size: true,
        brand: true,
        gender: true,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
