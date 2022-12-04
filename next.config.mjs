import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.dribbble.com'],
  },

  // Temporary
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default withContentlayer(nextConfig);
