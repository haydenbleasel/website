import { withContentCollections } from '@content-collections/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import { createSecureHeaders } from 'next-secure-headers';

let config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'shared.akamai.steamstatic.com',
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

  // biome-ignore lint/suspicious/useAwait: headers is async
  async headers() {
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

  // biome-ignore lint/suspicious/useAwait: redirects is async
  async redirects() {
    return [
      {
        source: '/video',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work/:slug',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/mailing-list',
        destination: '/',
        permanent: true,
      },
      {
        source: '/clients',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/apps',
        destination: '/about',
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
};

if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer()(config);
} else {
  config = withContentCollections(config);
}

export default config;
