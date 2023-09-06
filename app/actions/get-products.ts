export const getProducts = async () => {
  const response = await fetch('http://localhost:3001/products');
  const products = await response.json();
  return products;
};
