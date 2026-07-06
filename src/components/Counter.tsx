import { useState } from "react";

import styles from "./Counter.module.css";

type CounterProps = {
  initialCount?: number;
};

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className={styles.counter}>
      <p>
        カウント:{" "}
        <span className={styles.countValue} data-testid="count">
          {count}
        </span>
      </p>
      <div className={styles.buttons}>
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
