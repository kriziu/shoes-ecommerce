/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
};
