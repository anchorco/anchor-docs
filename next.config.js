/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Optimize for production
  swcMinify: true,
}

module.exports = nextConfig

