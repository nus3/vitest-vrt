import { describe, expect, it } from "vitest";

// 「意図的に flaky なテスト」（Browser Mode 版）。
let attempts = 0;

describe("flakyなテスト（browser）", () => {
  it("リトライでパスする flaky なテスト", () => {
    attempts += 1;

    if (import.meta.env.CI && attempts === 1) {
      throw new Error("flakyなテストだよ");
    }

    expect(attempts).toBeGreaterThanOrEqual(1);
  });
});
