'use client';
import React from 'react';
import { Products } from '@/app/types';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { formatter } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface SingleProductCardProps {
  product: Products | undefined;
}
export default function ProductPreview({ product }: SingleProductCardProps) {
  return (
    <div className='h-[55vh] max-w-screen-2xl flex flex-col justify-center mx-auto overflow-y-scroll overflow-x-hidden  '>
      <div className='flex gap-3 '>
        {/* product image */}
        <div className='flex-1 '>
          <div className='bg-white '>
            <Image
              width={400}
              height={400}
              src={product.imageUrl}
              alt={product.name}
              className='object-contain w-full max-w-sm h-[32rem] '
            />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1 '>
          <div className='flex flex-col space-y-2 w-[26rem]  '>
            <div className='flex items-center justify-between '>
              <span className='font-semibold text-neutral-600'>
                {product.gender?.name},{product.category?.name}
              </span>
              <div className='flex items-center gap-2 '>
                <span className='p-1 text-white transition-colors duration-700 cursor-pointer bg-stone-600 hover:bg-stone-500'>
                  <ChevronLeft />
                </span>
                <span className='p-1 text-white transition-colors duration-700 cursor-pointer bg-stone-600 hover:bg-stone-500'>
                  <ChevronRight />
                </span>
              </div>
            </div>
            <h1 className='text-2xl font-semibold text-neutral-900'>
              {product.name}
            </h1>
            <span className='text-2xl font-bold text-stone-500'>
              {formatter.format(product.price)}
              <span className='text-base text-stone-400'> & Free Shipping</span>
            </span>
            <div className='text-xl text-neutral-400'>
              <p>{product.description}</p>
            </div>
            <div className='flex items-center gap-x-5 '>
              <div className='flex items-center '>
                <button
                  onClick={() => {}}
                  className='px-4  hover:bg-white transition-colors duration-500 font-bold py-1.5 border text-stone-600 '
                >
                  -
                </button>
                <span className='px-4 py-1.5 border text-stone-600 '>1</span>
                <button
                  onClick={() => {}}
                  className='px-4 font-bold py-1.5 border text-stone-600 hover:bg-white transition-colors duration-500 '
                >
                  +
                </button>
              </div>
              <div>
                <button className='px-4 py-1.5  text-base tracking-wider text-white capitalize bg-stone-600 hover:bg-stone-500'>
                  Add to cart
                </button>
              </div>
            </div>
            <Separator />
            <span className='font-semibold text-neutral-600'>
              <span className='font-normal text-stone-400'>Categories: </span>
              {product.gender?.name},{product.category?.name}
            </span>
            <span className='flex items-center font-normal gap-x-2 text-stone-400'>
              Colors:
              <div
                style={{ backgroundColor: product.color?.value }}
                className='w-5 h-5 p-2 border rounded-full'
              />
            </span>
            <span className='font-semibold text-neutral-600'>
              <span className='font-normal text-stone-400'>Size: </span>
              {product.size?.value}
            </span>
            <div className='flex items-center gap-2 '>
              <Separator className='w-1/5 ' />
              <h1 className='font-bold text-stone-400'>
                Guaranteed Safe Checkout
              </h1>
              <Separator className='w-1/5 ' />
            </div>
            <div className='h-12 '>
              <Image
                height={400}
                width={400}
                src='/images/payment.png'
                alt='payment'
                className='object-contain w-full h-4/5 '
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
