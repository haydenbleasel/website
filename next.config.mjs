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
    ];
  },
};

export default nextConfig;
