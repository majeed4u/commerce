'use client';
import React from 'react';
interface HeadingProps {
  title: string;
  description: string;
}
export default function Heading({ title, description }: HeadingProps) {
  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight '>{title}</h1>
      <p className='text-sm  text-muted-foreground'>{description}</p>
    </div>
  );
}
