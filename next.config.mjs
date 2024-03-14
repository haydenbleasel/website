import withBundleAnalyzer from '@next/bundle-analyzer';
import { createContentlayerPlugin } from 'next-contentlayer';
import { createSecureHeaders } from 'next-secure-headers';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'steamcdn-a.akamaihd.net',
        protocol: 'https',
      },
      {
        hostname: 'logo.clearbit.com',
        protocol: 'https',
      },
    ],
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
        source: '/gaming',
        destination: '/',
        permanent: true,
      },
      {
        source: '/videos',
        destination:
          'https://www.youtube.com/playlist?list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2',
        permanent: true,
      },
      {
        source: '/work/:slug',
        destination: 'https://www.linkedin.com/in/haydenbleasel/',
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

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

// eslint-disable-next-line import/no-mutable-exports
let config = nextConfig;

if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer()(config);
} else {
  config = withContentlayer(nextConfig);
}

export default config;
