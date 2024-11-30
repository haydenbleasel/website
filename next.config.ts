import type { NextConfig } from 'next';

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
};

export default nextConfig;
