/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.chec.io'],
  },
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
};
