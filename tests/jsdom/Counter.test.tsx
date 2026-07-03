import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Counter } from "../../src/components/Counter";

describe("Counter (jsdom)", () => {
  it("初期値を表示する", () => {
    render(<Counter initialCount={3} />);

    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });

  it("増やす/減らすボタンでカウントが変化する", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole("button", { name: "増やす" }));
    await user.click(screen.getByRole("button", { name: "増やす" }));
    expect(screen.getByTestId("count")).toHaveTextContent("2");

    await user.click(screen.getByRole("button", { name: "減らす" }));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("リセットボタンで初期値に戻る", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={10} />);

    await user.click(screen.getByRole("button", { name: "増やす" }));
    expect(screen.getByTestId("count")).toHaveTextContent("11");

    await user.click(screen.getByRole("button", { name: "リセット" }));
    expect(screen.getByTestId("count")).toHaveTextContent("10");
  });
});
