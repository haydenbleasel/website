const { createSecureHeaders } = require('next-secure-headers');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'images.prismic.io',
      'i.scdn.co',
      'haydenbleasel.cdn.prismic.io',
      'prismic-io.s3.amazonaws.com',
      'cdn.dribbble.com',
      's3-alpha-sig.figma.com',
      'logo.clearbit.com',
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ];
  },
  async redirects() {
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
        source: '/contact',
        destination: 'https://twitter.com/haydenbleasel',
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
    ];
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

module.exports = withPlugins(
  [[withPWA, pwaConfig], withBundleAnalyzer],
  nextConfig
);
