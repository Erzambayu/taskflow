/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/taskflow',
  assetPrefix: '/taskflow',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 