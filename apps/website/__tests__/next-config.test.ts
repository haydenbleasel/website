import { describe, expect, test } from "bun:test";

import nextConfig from "../next.config";

describe("next.config", () => {
  test("configures image formats", () => {
    expect(nextConfig.images?.formats).toEqual(["image/avif", "image/webp"]);
  });

  test("defines redirects", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toBeDefined();
    expect(Array.isArray(redirects)).toBe(true);
    expect(redirects?.length).toBe(4);
  });

  test("all redirects are permanent and point to /", async () => {
    const redirects = await nextConfig.redirects?.();

    for (const redirect of redirects ?? []) {
      expect(redirect.destination).toBe("/");
      expect(redirect.permanent).toBe(true);
    }
  });

  test("redirects cover expected legacy routes", async () => {
    const redirects = await nextConfig.redirects?.();
    const sources = redirects?.map((r) => r.source);

    expect(sources).toContain("/blog/:path*");
    expect(sources).toContain("/clients");
    expect(sources).toContain("/games");
    expect(sources).toContain("/work/:path*");
  });
});
