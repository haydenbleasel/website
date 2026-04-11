import { describe, expect, test } from "bun:test";

import robots from "../app/robots";

describe("robots", () => {
  test("returns valid robots config", () => {
    const config = robots();

    expect(config.rules).toBeDefined();
    expect(Array.isArray(config.rules)).toBe(true);
  });

  test("allows all user agents", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

    expect(rules[0].userAgent).toBe("*");
    expect(rules[0].allow).toBe("/");
  });

  test("includes sitemap URL", () => {
    const config = robots();

    expect(config.sitemap).toBeDefined();
    expect(config.sitemap).toContain("/sitemap.xml");
  });
});
