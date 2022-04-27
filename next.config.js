/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
};
