/**
 * Generate an HTML report with embedded diff images for visual regression failures.
 * This creates a self-contained HTML file that can be opened directly from artifacts.
 */

import * as fs from 'fs';
import * as path from 'path';

interface FailedTest {
  title: string;
  projectName: string;
  diffPath: string;
  actualPath: string;
  expectedPath: string;
}

function findTestImages(testResultsDir: string): FailedTest[] {
  const failedMap = new Map<string, FailedTest>();

  if (!fs.existsSync(testResultsDir)) {
    return [];
  }

  const dirs = fs.readdirSync(testResultsDir).filter((name) => {
    const fullPath = path.join(testResultsDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const dir of dirs) {
    const dirPath = path.join(testResultsDir, dir);
    const files = fs.readdirSync(dirPath);

    const diffFile = files.find((f) => f.endsWith('-diff.png'));
    const actualFile = files.find((f) => f.endsWith('-actual.png'));
    const expectedFile = files.find((f) => f.endsWith('-expected.png'));

    if (diffFile && actualFile && expectedFile) {
      // Extract test name from directory
      const match = dir.match(/Visual-R-\w+-(.*?)-(desktop|mobile)-chromium/);
      const testName = match ? match[1].replace(/-/g, ' ') : dir;
      const viewport = dir.includes('mobile') ? 'mobile' : 'desktop';

      // Use test name + viewport as unique key to deduplicate retries
      const key = `${testName}-${viewport}`;

      // Prefer non-retry directories, otherwise use the last retry
      if (!failedMap.has(key) || !dir.includes('retry')) {
        failedMap.set(key, {
          title: testName,
          projectName: `${viewport}-chromium`,
          diffPath: path.join(dirPath, diffFile),
          actualPath: path.join(dirPath, actualFile),
          expectedPath: path.join(dirPath, expectedFile),
        });
      }
    }
  }

  return Array.from(failedMap.values());
}

function imageToBase64(imagePath: string): string {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

function generateHTML(failed: FailedTest[]): string {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Regression Failures</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #0d1117;
      color: #c9d1d9;
      padding: 2rem;
      line-height: 1.6;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      color: #f85149;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #8b949e;
      margin-bottom: 2rem;
    }
    .test-case {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .test-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #30363d;
    }
    .test-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #f85149;
      flex: 1;
    }
    .viewport-badge {
      background: #238636;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .images {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1rem;
    }
    .image-container {
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 1rem;
    }
    .image-label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #58a6ff;
      text-transform: uppercase;
      font-size: 0.875rem;
      letter-spacing: 0.5px;
    }
    .diff-label {
      color: #f85149;
    }
    .expected-label {
      color: #3fb950;
    }
    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 4px;
      border: 1px solid #30363d;
    }
    .no-failures {
      text-align: center;
      padding: 4rem 2rem;
      color: #3fb950;
      font-size: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>❌ Visual Regression Failures</h1>
    <p class="subtitle">${failed.length} test${failed.length !== 1 ? 's' : ''} failed visual regression checks</p>

    ${
      failed.length === 0
        ? '<div class="no-failures">✅ No visual regression failures</div>'
        : failed
            .map((test) => {
              const diffBase64 = imageToBase64(test.diffPath);
              const actualBase64 = imageToBase64(test.actualPath);
              const expectedBase64 = imageToBase64(test.expectedPath);

              return `
    <div class="test-case">
      <div class="test-header">
        <div class="test-title">${test.title}</div>
        <div class="viewport-badge">${test.projectName}</div>
      </div>
      <div class="images">
        <div class="image-container">
          <div class="image-label diff-label">Diff (changes highlighted)</div>
          <img src="data:image/png;base64,${diffBase64}" alt="Diff">
        </div>
        <div class="image-container">
          <div class="image-label">Actual (current)</div>
          <img src="data:image/png;base64,${actualBase64}" alt="Actual">
        </div>
        <div class="image-container">
          <div class="image-label expected-label">Expected (baseline)</div>
          <img src="data:image/png;base64,${expectedBase64}" alt="Expected">
        </div>
      </div>
    </div>`;
            })
            .join('\n')
    }
  </div>
</body>
</html>`;

  return html;
}

// Main execution
const testResultsDir = path.join(process.cwd(), 'test-results');
const outputPath = process.argv[2] || path.join(process.cwd(), 'visual-diffs.html');

const failed = findTestImages(testResultsDir);
const html = generateHTML(failed);

fs.writeFileSync(outputPath, html);

// eslint-disable-next-line no-console
console.log(`HTML diff report generated: ${outputPath} (${failed.length} failures)`);
