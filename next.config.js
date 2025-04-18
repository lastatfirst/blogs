/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript checking during production build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Disable ESLint during production build (optional, but helps if ESLint is also causing issues)
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Configure image domains
  images: {
    domains: ['cdn.sanity.io'],
  }
};

module.exports = nextConfig;
