import { describe, expect, it } from "vitest";

// ⚠️ デモ用の「意図的に flaky なテスト」。
//
// CI（process.env.CI=true）でのみ初回だけ失敗し、Vitest の retry で 2 回目に成功する。
// これにより diagnostic().flaky が true になり、vitest-flaky-reporter.ts が JSONL に記録し、
// CI ワークフローが「flaky 検出」として PR にコメントする挙動を確認できる。
//
// ローカル（CI 環境変数なし）では常に成功するため、通常のテスト実行は壊れない。
// 記事用のデモが不要になったらこのファイルごと削除してよい。
let attempts = 0;

describe("flaky (デモ)", () => {
  it("CI ではリトライで救済される flaky なテスト", () => {
    attempts += 1;

    if (process.env.CI && attempts === 1) {
      throw new Error("意図的な flaky: 初回のみ失敗します（retry で救済される想定）");
    }

    expect(attempts).toBeGreaterThanOrEqual(1);
  });
});
