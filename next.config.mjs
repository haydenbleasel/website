import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'cdn.dribbble.com',
      's3-alpha-sig.figma.com',
      's3-alpha.figma.com',
      'logo.clearbit.com',
      'i.scdn.co',
      'mosaic.scdn.co',
      'source.unsplash.com',
    ],
  },

  // Temporary
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default withContentlayer(nextConfig);
