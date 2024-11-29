import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ hostname: 'www.gravatar.com', protocol: 'https' }],
  },
};

export default nextConfig;
