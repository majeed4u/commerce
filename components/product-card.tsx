'use client';

import Image from 'next/image';

import Link from 'next/link';
import { formatter } from '@/lib/utils';

interface ProductCardProps {
  id?: string;
  name?: string;
  title?: string;
  price?: number;
  isFeatured?: boolean;
  imageUrl?: string;
  isNew?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}
export default function ProductCard({
  id,
  imageUrl,
  isFeatured,
  isNew,
  title,
  name,
  price,
  onClick,
  isLoading,
}: ProductCardProps) {
  return (
    <div className='w-full h-full max-w-sm mx-auto border-neutral-50'>
      <div className='px-4 space-y-10  h-[420px] '>
        <div className='relative bg-white h-72 group '>
          <Link
            href={`/${id}`}
            className='cursor-pointer group group-hover:opacity-70 group-hover:transition-all group-hover:ease-in-out group-hover:duration-1000 '
          >
            <Image
              src={imageUrl}
              alt={name}
              width={400}
              height={200}
              className='object-cover w-full h-64 '
            />
          </Link>
          <button
            onClick={onClick}
            className='absolute w-full p-2 text-center text-white rounded-sm opacity-0 group-hover:transition-all top-64 bg-neutral-700 group-hover:block group-hover:opacity-70 group-hover:-translate-y-1 group-hover:duration-1000 group-hover:ease-in-out '
          >
            {title}
          </button>
        </div>
        <div className='space-y-4 text-center '>
          <div className='text-xl '>
            <h1 className='text-xl font-semibold'>{name}</h1>
          </div>
          <div>
            <p className='text-xl font-semibold text-neutral-500'>
              {formatter.format(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
