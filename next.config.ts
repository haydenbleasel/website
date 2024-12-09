import type { NextConfig } from 'next';
import { createSecureHeaders } from 'next-secure-headers';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'www.gravatar.com', protocol: 'https' },
      { hostname: 'assets.basehub.com', protocol: 'https' },
      { hostname: 'img.logo.dev', protocol: 'https' },
      { hostname: 'i.scdn.co', protocol: 'https' },
      { hostname: 'shared.akamai.steamstatic.com', protocol: 'https' },
    ],
  },

  // biome-ignore lint/suspicious/useAwait: "headers" is async
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

  // biome-ignore lint/suspicious/useAwait: "redirects" is async
  async redirects() {
    return [
      {
        source: '/video',
        destination: '/travel',
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
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/speaking',
        destination: '/live',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/live',
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

export default nextConfig;
