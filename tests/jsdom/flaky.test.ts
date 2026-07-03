import { describe, expect, it } from "vitest";

// 「意図的に flaky なテスト」。
let attempts = 0;

describe("flakyなテスト（jsdom）", () => {
  it("リトライでパスする flaky なテスト", () => {
    attempts += 1;

    if (process.env.CI && attempts === 1) {
      throw new Error("flakyなテストだよ");
    }

    expect(attempts).toBeGreaterThanOrEqual(1);
  });
});
