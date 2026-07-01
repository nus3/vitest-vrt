import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

// CI ではリトライで flaky を救済しつつ検知する。ローカルでは 0（すぐ失敗させる）。
const retry = process.env.CI ? 3 : 0;

// Browser Mode / VRT で共通のブラウザ設定
const browser = {
  provider: playwright(),
  enabled: true,
  headless: true,
  instances: [{ browser: "chromium" as const }],
  viewport: { width: 1280, height: 720 },
};

// https://vite.dev/config/
export default defineConfig({
  fmt: {},
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      // vite-plus/test 系のインポートは Vitest Browser Mode の実行時に
      // グローバル(describe / page 等)を解決できず失敗するため、
      // 標準の "vitest" / "vitest/browser" インポートを使う。よってこのルールは無効化する。
      "vite-plus/prefer-vite-plus-imports": "off",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  plugins: lazyPlugins(() => [react()]),
  test: {
    // flaky 検知レポーターは Node.js メインプロセスで動くため、
    // jsdom / browser / vrt すべての project で共通して機能する。
    reporters: ["default", "./vitest-flaky-reporter.ts"],
    projects: [
      // ① jsdom を使ったコンポーネントテスト（軽量・高速）
      {
        plugins: [react()],
        test: {
          name: "jsdom",
          globals: true,
          environment: "jsdom",
          setupFiles: ["./vitest-setup.ts"],
          include: ["tests/jsdom/**/*.test.{ts,tsx}"],
          retry,
        },
      },
      // ② Browser Mode を使ったコンポーネントテスト（実ブラウザ）
      {
        plugins: [react()],
        test: {
          name: "browser",
          globals: true,
          include: ["tests/browser/**/*.test.{ts,tsx}"],
          retry,
          browser: {
            ...browser,
            // ローカルではデバッグ用にトレースを取得する（CI では無効）
            trace: process.env.CI ? undefined : "on",
          },
        },
      },
      // ③ VRT（スクリーンショット比較）。通常 CI では回さず vrt.yml で手動実行する
      {
        plugins: [react()],
        test: {
          name: "vrt",
          globals: true,
          setupFiles: ["./vitest-vrt-setup.ts"],
          include: ["tests/vrt/**/*.test.{ts,tsx}"],
          retry,
          browser,
        },
      },
    ],
  },
});
