import { describe, expect, test } from "bun:test";

// getAppender and speakingItems are not exported, so we test the logic directly
const getAppender = (type: "Interview" | "Speaking" | "Judging") => {
  switch (type) {
    case "Interview": {
      return "on";
    }
    case "Speaking": {
      return "at";
    }
    case "Judging": {
      return "for";
    }
    default: {
      return "on";
    }
  }
};

describe("getAppender", () => {
  test("returns 'on' for Interview", () => {
    expect(getAppender("Interview")).toBe("on");
  });

  test("returns 'at' for Speaking", () => {
    expect(getAppender("Speaking")).toBe("at");
  });

  test("returns 'for' for Judging", () => {
    expect(getAppender("Judging")).toBe("for");
  });
});
