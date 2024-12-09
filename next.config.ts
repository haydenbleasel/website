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
};

export default nextConfig;
