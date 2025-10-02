const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

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

module.exports = withPWA(nextConfig);