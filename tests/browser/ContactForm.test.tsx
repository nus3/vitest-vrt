import { describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

import { ContactForm } from "../../src/components/ContactForm";

describe("ContactForm (browser)", () => {
  it("未入力で送信するとエラーが表示される", async () => {
    await render(<ContactForm />);

    await page.getByRole("button", { name: "送信" }).click();

    await expect.element(page.getByRole("alert")).toBeVisible();
  });

  it("入力して送信すると成功メッセージが表示される", async () => {
    const onSubmit = vi.fn();
    await render(<ContactForm onSubmit={onSubmit} />);

    await page.getByLabelText("名前").fill("山田太郎");
    await page.getByLabelText("メールアドレス").fill("taro@example.com");
    await page.getByRole("button", { name: "送信" }).click();

    await expect.element(page.getByRole("status")).toBeVisible();
    expect(onSubmit).toHaveBeenCalledWith({
      name: "山田太郎",
      email: "taro@example.com",
    });
  });
});
