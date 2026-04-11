import { describe, expect, test } from "bun:test";

import sitemap from "../app/sitemap";

describe("sitemap", () => {
  test("returns an array with at least one entry", () => {
    const entries = sitemap();

    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThanOrEqual(1);
  });

  test("first entry has required fields", () => {
    const [entry] = sitemap();

    expect(entry.url).toBeDefined();
    expect(entry.changeFrequency).toBe("monthly");
    expect(entry.priority).toBe(1);
    expect(entry.lastModified).toBeInstanceOf(Date);
  });
});
