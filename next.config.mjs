import { withContentCollections } from '@content-collections/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { createSecureHeaders } from 'next-secure-headers';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'steamcdn-a.akamaihd.net',
        protocol: 'https',
      },
      {
        hostname: 'img.logo.dev',
        protocol: 'https',
      },
      {
        hostname: 'i.scdn.co',
        protocol: 'https',
      },
    ],
  },

  experimental: {
    reactCompiler: true,
  },

  headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          // HSTS Preload: https://hstspreload.org/
          forceHTTPSRedirect: [
            true,
            { maxAge: 63072000, includeSubDomains: true, preload: true },
          ],
        }),
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/video',
        destination:
          'https://www.youtube.com/playlist?list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2',
        permanent: true,
      },
      {
        source: '/work/:slug',
        destination: 'https://www.linkedin.com/in/haydenbleasel/',
        permanent: true,
      },
      {
        source: '/mailing-list',
        destination: '/',
        permanent: true,
      },
      {
        source: '/clients',
        destination: '/',
        permanent: true,
      },
      {
        source: '/apps',
        destination: '/',
        permanent: true,
      },
      {
        source: '/speaking',
        destination: '/features',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/gaming',
        destination: '/',
        permanent: true,
      },
      {
        source: '/design',
        destination: 'https://www.figma.com/@haydenbleasel',
        permanent: true,
      },
      {
        source: '/code',
        destination: 'https://github.com/haydenbleasel',
        permanent: true,
      },
    ];
  },

  // Silence, contentlayer
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

let config = nextConfig;

if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer()(config);
} else {
  config = withContentCollections(config);
}

export default config;
