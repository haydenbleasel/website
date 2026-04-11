import { describe, expect, mock, test } from "bun:test";

import { main, output } from "../src/index";

describe("cli", () => {
  test("output contains expected content", () => {
    expect(output).toContain("haydenbleasel.com");
    expect(output).toContain("OpenAI");
    expect(output).toContain("San Francisco");
  });

  test("main writes output to stdout", () => {
    const write = mock(() => true);
    const original = process.stdout.write;
    process.stdout.write = write as unknown as typeof process.stdout.write;

    main();

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith(`${output}\n`);

    process.stdout.write = original;
  });
});
