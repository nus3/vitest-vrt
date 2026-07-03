import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { maskImages } from "./helpers/maskImages";

// VRT ヘルパー maskImages のデモ。
// 外部 URL の画像を置き換える
describe("maskImages (VRT ヘルパー)", () => {
  it("読み込めない画像をマスクしてスクリーンショットを安定させる", async () => {
    maskImages("img[data-mask]");

    const { container } = await render(
      <div style={{ padding: 16, fontFamily: "sans-serif" }}>
        <p>アバター:</p>
        <img
          data-mask
          src="https://example.com/not-exist-avatar.png"
          alt="avatar"
          width={64}
          height={64}
        />
      </div>,
    );

    await expect(container).toMatchScreenshot("mask-images-demo.png");
  });
});
