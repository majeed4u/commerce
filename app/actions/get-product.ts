const URL = 'http://localhost:3000/api/products';
export const getProduct = async (id: string) => {
  const response = await fetch(`${URL}/${id}`);
  const products = await response.json();
  return products;
};
