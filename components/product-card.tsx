'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Products } from '@/app/types';

interface ProductListProps {
  product: Products;
}
export default function ProductCard({ product }: ProductListProps) {
  return (
    <Card className='w-full max-w-sm p-0 mx-auto'>
      <CardHeader>
        <Image
          src={product.imageURL}
          alt={product.name}
          width={300}
          height={200}
          className='object-cover w-full h-44'
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.gender}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant='default' size='lg'>
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
