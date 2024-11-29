import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'github.com', protocol: 'https' },
      { hostname: 'www.gravatar.com', protocol: 'https' },
      { hostname: 'assets.basehub.com', protocol: 'https' },
    ],
  },
};

export default nextConfig;
