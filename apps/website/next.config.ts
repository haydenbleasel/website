import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  redirects() {
    return [
      { destination: "/", permanent: true, source: "/blog/:path*" },
      { destination: "/", permanent: true, source: "/clients" },
      { destination: "/", permanent: true, source: "/games" },
      { destination: "/", permanent: true, source: "/work/:path*" },
    ];
  },
};

export default nextConfig;
