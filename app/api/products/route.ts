import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { currentUser } from '@clerk/nextjs';
import { ca } from 'date-fns/locale';
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
    const {
      name,
      description,
      price,
      brandId,
      categoryId,
      colorId,
      sizeId,
      imageUrl,
      genderId,
      isFeatured,
      isNew,
    } = await req.json();
    if (!name) return NextResponse.json('Name is required', { status: 400 });

    const product = await db.product.create({
      data: {
        name,
        description,
        price,
        brandId,
        categoryId,
        sizeId,
        colorId,
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
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const colorId = searchParams.get('colorId');
  const sizeId = searchParams.get('sizeId');
  const isFeatured = searchParams.get('isFeatured ');
  const isNew = searchParams.get('isNew');
  const genderId = searchParams.get('genderId');
  const brandId = searchParams.get('brandId');
  const price = searchParams.get('price');
  const name = searchParams.get('name');

  try {
    const product = await db.product.findMany({
      where: {
        categoryId: categoryId ? categoryId : undefined,
        colorId: colorId ? colorId : undefined,
        sizeId: sizeId ? sizeId : undefined,
        isFeatured: isFeatured ? true : undefined,
        isNew: isNew ? true : undefined,
        genderId: genderId ? genderId : undefined,
        brandId: brandId ? brandId : undefined,
        price: price ? price : undefined,
        name: name ? name : undefined,
      },
      include: {
        color: true,
        category: true,
        size: true,
        brand: true,
        gender: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`${error}, Server Error`, { status: 500 });
  }
};
