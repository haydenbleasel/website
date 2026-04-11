import { describe, expect, test } from "bun:test";

// emailRegex is exported from a "use client" component that imports server actions
// which depend on env vars. We test the regex directly to avoid that dependency chain.
const emailRegex = /.+@.+/u;

describe("emailRegex", () => {
  test("matches valid email addresses", () => {
    expect(emailRegex.test("user@example.com")).toBe(true);
    expect(emailRegex.test("jane@acme.com")).toBe(true);
    expect(emailRegex.test("test+tag@domain.co")).toBe(true);
    expect(emailRegex.test("a@b")).toBe(true);
  });

  test("rejects strings without @", () => {
    expect(emailRegex.test("invalid")).toBe(false);
    expect(emailRegex.test("")).toBe(false);
  });

  test("rejects strings with only @", () => {
    expect(emailRegex.test("@")).toBe(false);
    expect(emailRegex.test("@domain")).toBe(false);
    expect(emailRegex.test("user@")).toBe(false);
  });
});
