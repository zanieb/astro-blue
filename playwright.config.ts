import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing.
 *
 * This config protects the current Mintlify/PYX visual design by capturing
 * screenshots and comparing them on future runs. Any visual changes >1% will
 * fail the tests, preventing accidental regressions during refactoring.
 */
export default defineConfig({
  testDir: './tests',

  // Fail fast - stop on first failure to avoid wasting time
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    // Base URL for the dev server
    baseURL: 'http://localhost:4321',

    // Collect trace on failure for debugging
    trace: 'on-first-retry',

    // Screenshot settings for visual regression
    screenshot: 'only-on-failure',
  },

  // Configure projects for different viewports
  // Using only Chromium for both desktop and mobile to avoid installing multiple browsers
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Desktop Chrome'], // Use Chrome with mobile viewport
        viewport: { width: 375, height: 667 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  // Run dev server before tests
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Visual comparison settings
  expect: {
    toHaveScreenshot: {
      // Allow 1% difference for anti-aliasing variations
      maxDiffPixelRatio: 0.01,
      // Use custom snapshot path
      animations: 'disabled',
    },
  },
});
