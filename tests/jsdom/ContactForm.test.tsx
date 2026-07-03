import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "../../src/components/ContactForm";

describe("ContactForm (jsdom)", () => {
  it("未入力で送信すると必須エラーを表示する", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "送信" }));

    expect(screen.getByRole("alert")).toHaveTextContent("必須です");
  });

  it("メールアドレスの形式が不正だとエラーを表示する", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("名前"), "山田太郎");
    await user.type(screen.getByLabelText("メールアドレス"), "invalid-email");
    await user.click(screen.getByRole("button", { name: "送信" }));

    expect(screen.getByRole("alert")).toHaveTextContent("形式が正しくありません");
  });

  it("入力して送信すると onSubmit が呼ばれ成功メッセージが出る", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("名前"), "山田太郎");
    await user.type(screen.getByLabelText("メールアドレス"), "taro@example.com");
    await user.click(screen.getByRole("button", { name: "送信" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "山田太郎",
      email: "taro@example.com",
    });
    expect(screen.getByRole("status")).toHaveTextContent("送信しました");
  });
});
