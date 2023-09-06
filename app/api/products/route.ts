import { NextResponse } from 'next/server';
import { products } from '@/db';

export const GET = async (req: Request) => {
  return NextResponse.json(products);
};
