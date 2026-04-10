import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/clients", destination: "/", permanent: true },
      { source: "/games", destination: "/", permanent: true },
      { source: "/work/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
