import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

import { Counter } from "../../src/components/Counter";

// VRT（Visual Regression Test）。
// Browser Mode で描画した結果をスクリーンショットに撮り、
// コミット済みのベースライン画像と比較して差分を検出する。
// ベースラインは `pnpm test:vrt:update`（vp test --project vrt --update）で更新する。
describe("Counter (VRT)", () => {
  it("初期表示のスクリーンショット", async () => {
    const { container } = await render(<Counter initialCount={5} />);

    // 描画完了を待ってからキャプチャする
    await expect.element(page.getByTestId("count")).toBeVisible();

    await expect(container).toMatchScreenshot("counter-initial.png");
  });
});
