import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom project 用のセットアップ。
// @testing-library/jest-dom のカスタムマッチャー（toBeVisible / toHaveTextContent など）を
// Vitest の expect に登録する。
import "@testing-library/jest-dom/vitest";

// @testing-library/react の自動 cleanup は「グローバルの afterEach が存在するか」で
// 判定されるため、globals: false の環境では動かない。ここで明示的に登録する。
// これがないとテスト間で render が残留し、要素の重複でテストが壊れる。
afterEach(() => {
  cleanup();
});
