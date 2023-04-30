import { createSecureHeaders } from 'next-secure-headers';
import redirects from './redirects.json' assert { type: 'json' };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...createSecureHeaders({
            // HSTS Preload: https://hstspreload.org/
            forceHTTPSRedirect: [
              true,
              { maxAge: 63072000, includeSubDomains: true, preload: true },
            ],
          }),
        ],
      },
    ];
  },
  redirects() {
    return redirects;
  },
};

export default nextConfig;
