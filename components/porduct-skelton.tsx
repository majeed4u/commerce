'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React from 'react';

export default function ProductSkeleton({ cards }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((item, index) => (
          <div
            key={index}
            className='w-full h-full max-w-sm mx-auto border-neutral-50'
          >
            <div className='px-4 space-y-10  h-[420px] '>
              <Skeleton className='w-full h-72 ' />
              <div className='space-y-4 text-center '>
                <div className='text-xl '>
                  <h1 className='text-xl font-semibold'>
                    <Skeleton />
                  </h1>
                </div>
                <div>
                  <p className='text-xl font-semibold text-neutral-500'>
                    <Skeleton />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
