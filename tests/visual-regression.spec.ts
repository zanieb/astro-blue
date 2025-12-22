import { test, type Page } from '@playwright/test';
import { argosScreenshot } from '@argos-ci/playwright';

/**
 * Visual Regression Tests
 *
 * These tests capture screenshots of the current Mintlify/PYX visual design
 * and compare them on future runs. This protects against accidental visual
 * regressions during CSS refactoring.
 *
 * IMPORTANT: Before running these tests, make sure the dev server is running.
 * Run: bun run dev
 *
 * To generate baseline screenshots (first run):
 * bun run test:visual:update
 *
 * To run visual regression tests:
 * bun run test:visual
 */

// Helper to set theme
async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((selectedTheme: string) => {
    document.documentElement.dataset.theme = selectedTheme;
    localStorage.setItem('starlight-theme', selectedTheme);
  }, theme);
  // Wait for theme to apply
  await page.waitForTimeout(500);
}

test.describe('Visual Regression - Homepage', () => {
  test('homepage - light mode - desktop', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'homepage-light-desktop', {
      fullPage: true,
    });
  });

  test('homepage - dark mode - desktop', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'homepage-dark-desktop', {
      fullPage: true,
    });
  });

  test('homepage - light mode - mobile', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'homepage-light-mobile', {
      fullPage: true,
    });
  });

  test('homepage - dark mode - mobile', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'homepage-dark-mobile', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Getting Started', () => {
  test('installation page - light mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'installation-light-desktop', {
      fullPage: true,
    });
  });

  test('installation page - dark mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'installation-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Guides', () => {
  test('guides page - light mode', async ({ page }) => {
    await page.goto('/guides/customization');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'guides-light-desktop', {
      fullPage: true,
    });
  });

  test('guides page - dark mode', async ({ page }) => {
    await page.goto('/guides/customization');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'guides-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Concepts', () => {
  test('concepts page - light mode', async ({ page }) => {
    await page.goto('/concepts/components');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'concepts-light-desktop', {
      fullPage: true,
    });
  });

  test('concepts page - dark mode', async ({ page }) => {
    await page.goto('/concepts/components');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'concepts-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Reference', () => {
  test('reference page - light mode', async ({ page }) => {
    await page.goto('/reference/configuration', { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    // Extra wait for code syntax highlighting to settle
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'reference-light-desktop', {
      fullPage: true,
    });
  });

  test('reference page - dark mode', async ({ page }) => {
    await page.goto('/reference/configuration', { waitUntil: 'networkidle' });
    await setTheme(page, 'dark');
    // Extra wait for code syntax highlighting to settle
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'reference-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - UI Components', () => {
  test('sidebar - expanded state - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    // Make sure sidebar is visible (desktop view)
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot just the sidebar area
    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-expanded-light', {
      element: sidebar,
    });
  });

  test('sidebar - expanded state - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-expanded-dark', {
      element: sidebar,
    });
  });

  test('code block with copy button - light mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    // Find first code block
    const codeBlock = page.locator('.expressive-code').first();
    await argosScreenshot(page, 'code-block-light', {
      element: codeBlock,
    });
  });

  test('code block with copy button - dark mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'dark');

    const codeBlock = page.locator('.expressive-code').first();
    await argosScreenshot(page, 'code-block-dark', {
      element: codeBlock,
    });
  });

  test('search button - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await argosScreenshot(page, 'search-button-light', {
      element: searchButton,
    });
  });

  test('search button - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await argosScreenshot(page, 'search-button-dark', {
      element: searchButton,
    });
  });

  test('theme toggle - light mode', async ({ page }, testInfo) => {
    // Skip on mobile since theme toggle is in hamburger menu
    test.skip(testInfo.project.name === 'mobile-chromium', 'Theme toggle not visible on mobile');

    await page.goto('/');
    await setTheme(page, 'light');

    // Select the theme toggle in the header (not the mobile menu)
    const themeToggle = page.locator('header starlight-theme-select button').first();
    await argosScreenshot(page, 'theme-toggle-light', {
      element: themeToggle,
    });
  });

  test('theme toggle - dark mode', async ({ page }, testInfo) => {
    // Skip on mobile since theme toggle is in hamburger menu
    test.skip(testInfo.project.name === 'mobile-chromium', 'Theme toggle not visible on mobile');

    await page.goto('/');
    await setTheme(page, 'dark');

    // Select the theme toggle in the header (not the mobile menu)
    const themeToggle = page.locator('header starlight-theme-select button').first();
    await argosScreenshot(page, 'theme-toggle-dark', {
      element: themeToggle,
    });
  });
});

test.describe('Visual Regression - Interactive States', () => {
  test('sidebar link - hover state', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Hover over first sidebar link
    const firstLink = page.locator('.sidebar-content a').first();
    await firstLink.hover();

    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-link-hover', {
      element: sidebar,
    });
  });

  test('sidebar link - active/current state', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot sidebar to capture active state
    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-link-active', {
      element: sidebar,
    });
  });

  test('pagination - light mode', async ({ page }) => {
    await page.goto('/getting-started/first-steps');
    await setTheme(page, 'light');

    // Scroll to pagination
    await page.locator('.pagination-links').scrollIntoViewIfNeeded();

    const pagination = page.locator('.pagination-links');
    await argosScreenshot(page, 'pagination-light', {
      element: pagination,
    });
  });

  test('pagination - dark mode', async ({ page }) => {
    await page.goto('/getting-started/first-steps');
    await setTheme(page, 'dark');

    await page.locator('.pagination-links').scrollIntoViewIfNeeded();

    const pagination = page.locator('.pagination-links');
    await argosScreenshot(page, 'pagination-dark', {
      element: pagination,
    });
  });
});
