import qs from 'query-string';
import { Products } from '../types';
const URL = 'http://localhost:3000/api/products';

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export async function getProducts(query: Query): Promise<Products> {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
      isNew: query.isNew,
    },
  });
  const response = await fetch(url, { next: { revalidate: 10 } });
  const products = await response.json();
  return products;
}
