import { Products } from '@/app/types';

import ProductCard from './product-card';
interface ProductListProps {
  products: Products[];
}
export default function ProductList({ products }: ProductListProps) {
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
