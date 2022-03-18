const { createSecureHeaders } = require("next-secure-headers");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      'images.prismic.io'
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders(),
      },
    ];
  },
};

const pwaConfig = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    dynamicStartUrl: false,
    mode: process.env.NODE_ENV,
  },
};

module.exports = withPlugins(
  [[withPWA, pwaConfig], withBundleAnalyzer],
  nextConfig
);
