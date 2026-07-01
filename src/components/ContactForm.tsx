import { useState, type FormEvent } from "react";

export type ContactFormValues = {
  name: string;
  email: string;
};

type ContactFormProps = {
  onSubmit?: (values: ContactFormValues) => void;
};

/**
 * 記事用のサンプルコンポーネント。
 * 入力バリデーションと送信結果の表示を持つシンプルなお問い合わせフォーム。
 */
export function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "" || email === "") {
      setSubmitted(false);
      setError("名前とメールアドレスは必須です");
      return;
    }
    if (!email.includes("@")) {
      setSubmitted(false);
      setError("メールアドレスの形式が正しくありません");
      return;
    }

    setError(null);
    setSubmitted(true);
    onSubmit?.({ name, email });
  };

  return (
    <form className="contact-form" aria-label="お問い合わせフォーム" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">名前</label>
        <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {error !== null && <p role="alert">{error}</p>}
      {submitted && <p role="status">送信しました</p>}

      <button type="submit">送信</button>
    </form>
  );
}
