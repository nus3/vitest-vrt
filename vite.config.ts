import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

// テストが失敗した際のリトライ回数
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
    reporters: ["default", "./vitest-flaky-reporter.ts"],
    projects: [
      {
        plugins: [react()],
        test: {
          name: "jsdom",
          environment: "jsdom",
          setupFiles: ["./vitest-jsdom-setup.ts"],
          include: ["tests/jsdom/**/*.test.{ts,tsx}"],
          retry,
        },
      },
      {
        plugins: [react()],
        test: {
          name: "browser",
          include: ["tests/browser/**/*.test.{ts,tsx}"],
          retry,
          // ブラウザ内では process.env を参照できないため、
          // CI フラグを import.meta.env.CI としてテストに公開する
          env: { CI: process.env.CI ?? "" },
          browser: {
            ...browser,
            // ローカルではデバッグ用にトレースを取得する（CI では無効）
            trace: process.env.CI ? undefined : "on",
          },
        },
      },
      {
        plugins: [react()],
        test: {
          name: "vrt",
          setupFiles: ["./vitest-vrt-setup.ts"],
          include: ["tests/vrt/**/*.test.{ts,tsx}"],
          retry,
          browser,
        },
      },
    ],
  },
});
