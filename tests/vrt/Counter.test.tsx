import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

import { Counter } from "../../src/components/Counter";

describe("Counter (VRT)", () => {
  it("初期表示のスクリーンショット", async () => {
    const { container } = await render(<Counter initialCount={5} />);

    await expect.element(page.getByTestId("count")).toBeVisible();

    await expect(container).toMatchScreenshot("counter-initial.png");
  });
});
