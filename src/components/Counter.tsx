import { useState } from "react";

type CounterProps = {
  initialCount?: number;
};

/**
 * 記事用のサンプルコンポーネント。
 * 増減・リセットができるシンプルなカウンター。
 */
export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="counter">
      <p>
        カウント: <span data-testid="count">{count}</span>
      </p>
      <div className="counter-buttons">
        <button type="button" onClick={() => setCount((c) => c - 1)}>
          減らす
        </button>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          増やす
        </button>
        <button type="button" onClick={() => setCount(initialCount)}>
          リセット
        </button>
      </div>
    </div>
  );
}
