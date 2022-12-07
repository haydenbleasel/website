/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { withContentlayer } from 'next-contentlayer';
import { createSecureHeaders } from 'next-secure-headers';
import withPWA from 'next-pwa';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
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
        headers: createSecureHeaders(),
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/work/presumi',
        destination: '/blog/presumi',
        permanent: true,
      },
      {
        source: '/thoughts/presumi',
        destination: '/blog/presumi',
        permanent: true,
      },
      {
        source: '/presumi',
        destination: '/blog/presumi',
        permanent: true,
      },
      {
        source: '/awards',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/jellypepper',
        destination: '/work/jellypepper',
        permanent: true,
      },
      {
        source: '/journal/how-to-growth-hack-your-resume',
        destination: '/',
        permanent: true,
      },
      {
        source: '/projects/harmony',
        destination: 'https://github.com/haydenbleasel/harmony',
        permanent: true,
      },
      {
        source: '/projects/neutral',
        destination: 'https://tryneutral.com/',
        permanent: true,
      },
      {
        source: '/recommendations',
        destination: '/stack',
        permanent: true,
      },
      {
        source: '/clients',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/now',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/colophon',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/education',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/games',
        destination: '/about',
        permanent: true,
      },
    ];
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
