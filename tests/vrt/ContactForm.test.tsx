import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

import { ContactForm } from "../../src/components/ContactForm";

describe("ContactForm (VRT)", () => {
  it("初期表示のスクリーンショット", async () => {
    const { container } = await render(<ContactForm />);

    await expect.element(page.getByRole("button", { name: "送信" })).toBeVisible();

    await expect(container).toMatchScreenshot("contact-form-initial.png");
  });

  it("バリデーションエラー表示のスクリーンショット", async () => {
    const { container } = await render(<ContactForm />);

    await page.getByRole("button", { name: "送信" }).click();
    await expect.element(page.getByRole("alert")).toBeVisible();

    await expect(container).toMatchScreenshot("contact-form-error.png");
  });
});
