import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.cloudflare.steamstatic.com" },
      { hostname: "steamcdn-a.akamaihd.net" },
      { hostname: "i.scdn.co" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
