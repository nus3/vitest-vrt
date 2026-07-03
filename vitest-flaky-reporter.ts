import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, relative } from "node:path";
import type { Reporter, TestCase } from "vitest/node";

const OUTPUT_PATH = "./logs/test-results/flaky-tests-report.jsonl";

interface FlakyTestReport {
  file: string;
  name: string;
  retryCount: number;
}

/**
 * flaky なテスト（リトライした結果パスしたテスト）を検知して JSONL に記録するカスタムレポーター。
 *
 * レポーターはテストの実行環境に関わらず Node.js のメインプロセスで動くため、
 * jsdom / browser / vrt すべての project で共通して flaky を検知できる。
 *
 * flaky の判定には Vitest が提供する diagnostic().flaky（= リトライの結果パスしたか）を用いる。
 * 記録した JSONL は CI（GitHub Actions）で集約し、PR にコメントとして通知する。
 */
export default class FlakyTestReporter implements Reporter {
  onTestCaseResult(testCase: TestCase): void {
    if (!process.env.CI) {
      return;
    }

    const diagnostic = testCase.diagnostic();
    if (!diagnostic?.flaky) {
      return;
    }

    // 出力先ディレクトリを作成
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

    const flakyTest: FlakyTestReport = {
      file: relative(process.cwd(), testCase.module.moduleId),
      name: testCase.fullName,
      retryCount: diagnostic.retryCount,
    };

    appendFileSync(OUTPUT_PATH, `${JSON.stringify(flakyTest)}\n`);
  }
}
