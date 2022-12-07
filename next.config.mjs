/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { withContentlayer } from 'next-contentlayer';
import { createSecureHeaders } from 'next-secure-headers';
import withPWA from 'next-pwa';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import redirects from './redirects.json' assert { type: 'json' };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    // runtime: 'experimental-edge',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
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
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...createSecureHeaders(),
          // HSTS Preload: https://hstspreload.org/
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  redirects() {
    return redirects;
  },

  // Temporary
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/iu,
      issuer: /\.tsx?$/u,
      use: ['@svgr/webpack'],
    });

    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

const pwaConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    dynamicStartUrl: false,
    mode: process.env.NODE_ENV,
  },
};

const bundle = withPlugins(
  [
    withContentlayer,
    [withPWA, pwaConfig],
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    }),
  ],
  nextConfig
);

export default bundle;
