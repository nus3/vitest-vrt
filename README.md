# vitest-vrt

Vitest ではじめるシンプルな VRT（Visual Regression Test）のサンプルリポジトリ

[Vite+](https://viteplus.dev/) 上で、jsdom / Browser Mode / VRT の 3 種類のテストを 1 つの設定で動かす。

## テストの種類

`vite.config.ts` の `test.projects` で 3 つの project を定義している。

| project   | 環境       | 用途                                            |
| --------- | ---------- | ----------------------------------------------- |
| `jsdom`   | jsdom      | 軽量・高速なコンポーネントテスト                |
| `browser` | 実ブラウザ | Browser Mode（Playwright / Chromium）でのテスト |
| `vrt`     | 実ブラウザ | スクリーンショット比較による VRT                |

## セットアップ

```sh
pnpm install
pnpm dev:setup   # Playwright の Chromium をインストール
```

## テストの実行

```sh
pnpm test            # jsdom + browser
pnpm test:jsdom      # jsdom のみ
pnpm test:browser    # Browser Mode のみ
pnpm test:vrt        # VRT を実行（ベースライン画像と比較）
pnpm test:vrt:update # VRT のベースライン画像を更新
```

## VRT の仕組み

- Browser Mode で描画した結果を `toMatchScreenshot()` でキャプチャし、コミット済みのベースライン画像と比較する。
- 差分検出時はベースラインを確認のうえ、`pnpm test:vrt:update` で更新する。
- flaky な差分を避けるため `vitest-vrt-setup.ts` でアニメーション / トランジションを無効化している。
- 画像などブレやすい要素は `tests/vrt/helpers/maskImages.ts` でマスクできる。

## その他

- VRT は通常の CI では回さず、`.github/workflows/vrt.yml` で手動実行する。
- flaky テストは CI ではリトライで救済しつつ検知する（`vitest-flaky-reporter.ts`）。

## ディレクトリ構成

```
src/                  React コンポーネント
tests/jsdom/          jsdom テスト
tests/browser/        Browser Mode テスト
tests/vrt/            VRT テスト（ベースライン画像もここに配置）
vite.config.ts        3 project 分のテスト設定
```
