import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'img.logo.dev',
        protocol: 'https',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default withContentCollections(nextConfig);
