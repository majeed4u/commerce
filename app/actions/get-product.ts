export const getProduct = async (id: number) => {
  const response = await fetch(`http://localhost:3001/products/${id}`);
  const products = await response.json();
  return products;
};
