import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

import { Counter } from "../../src/components/Counter";

describe("Counter (browser)", () => {
  it("増やす/減らすボタンでカウントが変化する", async () => {
    await render(<Counter />);

    await page.getByRole("button", { name: "増やす" }).click();
    await page.getByRole("button", { name: "増やす" }).click();
    await expect.element(page.getByTestId("count")).toHaveTextContent("2");

    await page.getByRole("button", { name: "減らす" }).click();
    await expect.element(page.getByTestId("count")).toHaveTextContent("1");
  });

  it("リセットボタンで初期値に戻る", async () => {
    await render(<Counter initialCount={10} />);

    await page.getByRole("button", { name: "増やす" }).click();
    await expect.element(page.getByTestId("count")).toHaveTextContent("11");

    await page.getByRole("button", { name: "リセット" }).click();
    await expect.element(page.getByTestId("count")).toHaveTextContent("10");
  });
});
