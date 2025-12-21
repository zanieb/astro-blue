/**
 * Generate a markdown report from Playwright visual regression test results.
 *
 * This script parses the JSON test results and creates a formatted report
 * suitable for PR comments and GitHub Step Summaries.
 *
 * Usage: bun run scripts/generate-visual-report.ts [--output <file>]
 */

import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  title: string;
  fullTitle: string;
  status: 'passed' | 'failed' | 'skipped' | 'timedOut';
  duration: number;
  projectName: string;
  attachments?: Array<{
    name: string;
    path?: string;
    contentType: string;
  }>;
  errors?: Array<{
    message?: string;
    stack?: string;
  }>;
}

interface TestSuite {
  title: string;
  file: string;
  specs: TestSpec[];
  suites?: TestSuite[];
}

interface TestSpec {
  title: string;
  tests: TestResult[];
}

interface PlaywrightReport {
  suites: TestSuite[];
  stats: {
    expected: number;
    unexpected: number;
    skipped: number;
    flaky: number;
    duration: number;
  };
}

function collectTests(suite: TestSuite): TestResult[] {
  const tests: TestResult[] = [];

  for (const spec of suite.specs || []) {
    tests.push(...spec.tests);
  }

  for (const childSuite of suite.suites || []) {
    tests.push(...collectTests(childSuite));
  }

  return tests;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function getViewportEmoji(projectName: string): string {
  if (projectName.includes('mobile')) return '📱';
  if (projectName.includes('desktop')) return '🖥️';
  return '🔲';
}

function generateReport(resultsPath: string): string {
  if (!fs.existsSync(resultsPath)) {
    return '⚠️ No test results found. Tests may not have run.';
  }

  const report: PlaywrightReport = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

  const allTests: TestResult[] = [];
  for (const suite of report.suites) {
    allTests.push(...collectTests(suite));
  }

  const passed = allTests.filter((t) => t.status === 'passed');
  const failed = allTests.filter((t) => t.status === 'failed');
  const skipped = allTests.filter((t) => t.status === 'skipped');

  const lines: string[] = [];

  // Header with summary
  if (failed.length === 0) {
    lines.push('## ✅ Visual Regression Tests Passed');
    lines.push('');
    lines.push(`All **${passed.length}** visual regression tests passed successfully.`);
  } else {
    lines.push('## ❌ Visual Regression Tests Failed');
    lines.push('');
    lines.push(
      `**${failed.length}** of **${allTests.length}** tests failed. Please review the visual differences below.`
    );
  }

  lines.push('');

  // Stats table
  lines.push('### Summary');
  lines.push('');
  lines.push('| Status | Count |');
  lines.push('|--------|-------|');
  lines.push(`| ✅ Passed | ${passed.length} |`);
  lines.push(`| ❌ Failed | ${failed.length} |`);
  if (skipped.length > 0) {
    lines.push(`| ⏭️ Skipped | ${skipped.length} |`);
  }
  lines.push(`| ⏱️ Duration | ${formatDuration(report.stats.duration)} |`);
  lines.push('');

  // Failed tests details
  if (failed.length > 0) {
    lines.push('### Failed Tests');
    lines.push('');

    // Group by viewport
    const byViewport = new Map<string, TestResult[]>();
    for (const test of failed) {
      const viewport = test.projectName || 'unknown';
      if (!byViewport.has(viewport)) {
        byViewport.set(viewport, []);
      }
      byViewport.get(viewport)!.push(test);
    }

    for (const [viewport, tests] of byViewport) {
      lines.push(`#### ${getViewportEmoji(viewport)} ${viewport}`);
      lines.push('');

      for (const test of tests) {
        lines.push(`<details>`);
        lines.push(`<summary><strong>${test.title}</strong></summary>`);
        lines.push('');

        // Extract error message
        if (test.errors && test.errors.length > 0) {
          const error = test.errors[0];
          let errorMsg = error.message || 'Unknown error';

          // Clean up the error message for readability
          if (errorMsg.includes('Screenshot comparison failed')) {
            const diffMatch = errorMsg.match(/(\d+(?:\.\d+)?)\s*pixels.*differ/i);
            if (diffMatch) {
              lines.push(`**Difference:** ${diffMatch[1]} pixels differ from baseline`);
            } else {
              lines.push('**Difference:** Screenshot does not match baseline');
            }
          } else {
            // Truncate very long error messages
            if (errorMsg.length > 500) {
              errorMsg = errorMsg.substring(0, 500) + '...';
            }
            lines.push('```');
            lines.push(errorMsg);
            lines.push('```');
          }
        }

        // List attachments
        if (test.attachments && test.attachments.length > 0) {
          const diffs = test.attachments.filter(
            (a) =>
              a.name.includes('diff') || a.name.includes('actual') || a.name.includes('expected')
          );
          if (diffs.length > 0) {
            lines.push('');
            lines.push('**Attachments:**');
            for (const att of diffs) {
              const name = att.name.replace(/-/g, ' ');
              lines.push(`- ${name}`);
            }
          }
        }

        lines.push('');
        lines.push('</details>');
        lines.push('');
      }
    }

    // Instructions for viewing diffs
    lines.push('### 📥 How to Review');
    lines.push('');
    lines.push('1. **Download the artifact** from the workflow run (see link above)');
    lines.push('2. **Open the HTML report**: Extract and open `playwright-report/index.html`');
    lines.push(
      '3. **Review side-by-side diffs**: The report shows Expected vs Actual vs Diff views'
    );
    lines.push('');
    lines.push('The `test-results/` folder contains:');
    lines.push('| File | Description |');
    lines.push('|------|-------------|');
    lines.push('| `*-actual.png` | What the test captured |');
    lines.push('| `*-expected.png` | The baseline snapshot |');
    lines.push('| `*-diff.png` | Visual diff highlighting changes in pink |');
    lines.push('');
    lines.push('### 🔄 Updating Baselines');
    lines.push('');
    lines.push('If the visual changes are **intentional**, you can update baselines in two ways:');
    lines.push('');
    lines.push('**Option 1: Comment command** (easiest)');
    lines.push('');
    lines.push(
      'Comment `/update-snapshots` on this PR to automatically update and commit new baselines.'
    );
    lines.push('');
    lines.push('**Option 2: Local update**');
    lines.push('');
    lines.push('```bash');
    lines.push('bun run test:visual:update');
    lines.push('git add tests/__screenshots__/');
    lines.push('git commit -m "test: update visual regression baselines"');
    lines.push('```');
    lines.push('');
    lines.push('> ⚠️ **Review carefully!** Unintended visual changes may indicate a regression.');
  }

  return lines.join('\n');
}

// Main execution
const args = process.argv.slice(2);
const resultsPath = args[0] || path.join(process.cwd(), 'test-results/results.json');
const outputIndex = args.indexOf('--output');
const outputPath = outputIndex !== -1 ? args[outputIndex + 1] : undefined;

const report = generateReport(resultsPath);

if (outputPath) {
  fs.writeFileSync(outputPath, report);
  // eslint-disable-next-line no-console
  console.log(`Report written to ${outputPath}`);
} else {
  // eslint-disable-next-line no-console
  console.log(report);
}
