import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.cloudflare.steamstatic.com" },
      { hostname: "steamcdn-a.akamaihd.net" },
      { hostname: "shared.akamai.steamstatic.com" },
      { hostname: "*.scdn.co" },
      { hostname: "image-cdn-*.spotifycdn.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "oku.ams3.cdn.digitaloceanspaces.com" },
    ],
  },
};

export default nextConfig;
