/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.nike.com',
      'cdn.shopify.com',
      'assets.adidas.com',
      'assets.reebok.com',
      'images.vans.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
