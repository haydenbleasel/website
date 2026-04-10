import { url } from "@/lib/url";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
    },
  ],
  sitemap: new URL("/sitemap.xml", url).href,
});

export default robots;
